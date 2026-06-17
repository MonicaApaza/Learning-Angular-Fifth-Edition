# Chapter 5 — Dependency Injection in Angular

## Table of Contents
1. [Angular Injector Hierarchy](#1-angular-injector-hierarchy)
2. [Injecting Services in the Component Tree](#2-injecting-services-in-the-component-tree)
3. [Sharing Dependencies Through Components](#3-sharing-dependencies-through-components)
4. [Sandboxing Components with Multiple Instances](#4-sandboxing-components-with-multiple-instances)
5. [Restricting Provider Lookup](#5-restricting-provider-lookup)
6. [Overriding Providers in the Injector Hierarchy](#6-overriding-providers-in-the-injector-hierarchy)
7. [Providing Services Conditionally](#7-providing-services-conditionally)
8. [Transforming Objects into Angular Services](#8-transforming-objects-into-angular-services)
9. [Summary Table](#9-summary-table)

---

## 1. Angular Injector Hierarchy

Angular has two types of injectors:

| Type | Scope | How to register |
|------|-------|-----------------|
| **Environment (Root) Injector** | Singleton — shared across the entire app | `providedIn: 'root'` in `@Injectable` |
| **Element Injector** | Per component — created when the component is rendered | `providers: [...]` in `@Component` |

**Provider lookup bubble-up:**
```
Component that needs a service
  ↓ checks its own element injector
  ↓ checks parent's element injector
  ↓ ... bubbles up the component tree ...
  ↓ reaches the root environment injector
  ↓ if not found → Error: NG0201: No provider for X found
```

---

## 2. Injecting Services in the Component Tree

Each component creates an element injector configured through the `providers` array of `@Component`.

A service registered in a component's element injector can serve **two purposes**:
- Share with its **child components**
- Create **multiple isolated instances** (one per component render)

**Example — root injector (singleton):**
```typescript
@Injectable({ providedIn: 'root' })
export class ProductsService { }
```

**Example — element injector (scoped):**
```typescript
@Component({
  providers: [ProductsService]  // scoped to this component
})
export class ProductListComponent { }
```

---

## 3. Sharing Dependencies Through Components

When a service is declared in `providers` of a parent component, **all child components inherit access** to that same instance — without having to re-declare it.

```
ProductListComponent
  providers: [ProductsService]       ← registers ONE instance
    └── FavoritesComponent
          constructor(private productService: ProductsService) {}
          // ✅ works — inherits from parent's injector
```

**Key code — `product-list.component.ts`:**
```typescript
@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, FavoritesComponent],
  providers: [ProductsService]   // ← shared with all children
})
```

**Key code — `favorites.component.ts`:**
```typescript
export class FavoritesComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService) {}  // inherited

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
```

> `FavoritesComponent` can use `ProductsService` because it is a direct
> child of `ProductListComponent`, which provides the service.

---

## 4. Sandboxing Components with Multiple Instances

**Sandboxing** = each component render gets its own **isolated** service instance. No shared state between siblings.

### Scenario
Display a product quick-view per item in a list. Each item needs its own local state — sharing one instance would cause all items to show the same product.

### Pattern: service-in-a-service

```typescript
// product-view.service.ts
@Injectable()   // NO providedIn: 'root'
export class ProductViewService {
  private product: Product | undefined;

  constructor(private productService: ProductsService) { }

  getProduct(id: number): Product | undefined {
    if (!this.product) {
      // Cache guard — only works correctly when each instance is isolated
      const products = this.productService.getProducts();
      this.product = products.find(p => p.id === id);
    }
    return this.product;
  }
}
```

```typescript
// product-view.component.ts
@Component({
  providers: [ProductViewService]  // ← new instance per render
})
export class ProductViewComponent implements OnInit {
  id = input<number>();
  product: Product | undefined;

  constructor(private productViewService: ProductViewService) {}

  ngOnInit(): void {
    this.product = this.productViewService.getProduct(this.id()!);
  }
}
```

### Why the cache guard matters

| `providers` location | `if (!this.product)` | Result |
|----------------------|----------------------|--------|
| `ProductViewComponent` ✅ | With or without | Each item shows its own product |
| `ProductListComponent` ❌ | **With** `if` | All items show the SAME product (first one cached) |
| `ProductListComponent` ❌ | **Without** `if` | Appears to work (always searches by id, ignores cache) |

### Template with `@switch`

```html
<!-- product-view.component.html -->
@switch (product?.title) {
  @case ('Keyboard') { ⌨️ }
  @case ('Microphone') { 🎤 }
  @case ('Monitor') { 🖥️ }
  @default { 🏷️ }
}
{{ product?.title }}
```

### Wiring the list

```html
<!-- product-list.component.html -->
@for (product of products | sort; track product.id) {
  <li class="pill" (click)="selectedProduct = product">
    <app-product-view [id]="product.id"></app-product-view>
  </li>
}
```

---

## 5. Restricting Provider Lookup

By default, Angular bubbles up the entire component tree. These decorators **constrain** where Angular looks.

### `@Host` — stop at the host component

```typescript
constructor(@Host() private productService: ProductsService) {}
```

Angular stops searching at the component's host injector. If not found there, it throws:
```
Error: NG0201: No provider for ProductsService found in NodeInjector.
```

### `@Optional` — avoid the error

```typescript
constructor(@Optional() @Host() private productService: ProductsService) {}
```

If not found, Angular injects `null` instead of throwing. You must guard against `null` in the code.

### All 4 lookup decorators

| Decorator | Behavior |
|-----------|----------|
| *(none)* | Bubbles up the full tree to root injector |
| `@Host` | Stops at the host component's injector |
| `@Self` | Only looks in the current component's own injector |
| `@SkipSelf` | Skips the current injector, starts from the parent |

---

## 6. Overriding Providers in the Injector Hierarchy

### Class provider — shorthand vs object literal

```typescript
// Shorthand
providers: [ProductsService]

// Equivalent full syntax (provide object literal)
providers: [{ provide: ProductsService, useClass: ProductsService }]
```

| Property | Purpose |
|----------|---------|
| `provide` | The **token** — what consumers inject in their constructors |
| `useClass` | The **implementation** — the actual class Angular instantiates |

### `useClass` — override service implementation

**Scenario:** `FavoritesComponent` needs a trimmed version of `ProductsService` that returns only 2 products.

```typescript
// favorites.service.ts
export class FavoritesService extends ProductsService {
  constructor() { super(); }

  override getProducts(): Product[] {
    return super.getProducts().slice(1, 3);  // only 2 products
  }
}
```

```typescript
// favorites.component.ts
@Component({
  providers: [
    { provide: ProductsService, useClass: FavoritesService }
    //          ↑ token (what's injected)   ↑ actual implementation
  ]
})
export class FavoritesComponent {
  // still injects ProductsService — doesn't know about FavoritesService
  constructor(private productService: ProductsService) {}
}
```

Angular delivers `FavoritesService` but the component only knows about `ProductsService`. **The override is transparent.**

---

## 7. Providing Services Conditionally

### `useFactory` — decide implementation at runtime

```typescript
// favorites.ts
export function favoritesFactory(isFavorite: boolean) {
  return () => {
    if (isFavorite) {
      return new FavoritesService();
    }
    return new ProductsService();
  };
}
```

```typescript
// favorites.component.ts
providers: [
  { provide: ProductsService, useFactory: favoritesFactory(true) }
]
```

### `useFactory` with dependencies

If the factory itself needs injected services, declare them in `deps`:

```typescript
providers: [
  {
    provide: ProductsService,
    useFactory: favoritesFactory(true),
    deps: [ProductViewService]   // Angular injects this into the factory
  }
]
```

```typescript
// favorites.ts — factory receives the dependency as argument
export function favoritesFactory(isFavorite: boolean) {
  return (productViewService: ProductViewService) => {
    if (isFavorite) {
      return new FavoritesService();
    }
    return new ProductsService();
  };
}
```

---

## 8. Transforming Objects into Angular Services

### Problem: how to inject non-class values (objects, primitives)?

Interfaces and object literals cannot be used as DI tokens — interfaces are erased at compile time.

```typescript
// ❌ ERROR — AppSettings is an interface, doesn't exist at runtime
providers: [{ provide: AppSettings, useValue: appSettings }]
```

### Solution: `InjectionToken`

`InjectionToken` is a runtime object that serves as a unique key in the injector.

**Step 1 — Create `app.settings.ts`:**
```typescript
import { InjectionToken } from '@angular/core';

export interface AppSettings {
  title: string;
  version: string;
}

export const appSettings: AppSettings = {
  title: 'My e-shop',
  version: '1.0'
};

// The token — used as the DI key
export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');
```

**Step 2 — Register with `useValue` in `app.component.ts`:**
```typescript
@Component({
  providers: [
    { provide: APP_SETTINGS, useValue: appSettings }
  ]
})
export class AppComponent {
  // Modern inject() function — no @Inject decorator needed
  settings = inject(APP_SETTINGS);
}
```

**Step 3 — Use in template:**
```html
<footer appCopyright> - v{{ settings.version }}</footer>
```

**Result:**
```
© 2024 My Company. All rights reserved. - v1.0
```

### `inject()` vs constructor injection

```typescript
// Classic — constructor-based
constructor(@Inject(APP_SETTINGS) private settings: AppSettings) {}

// Modern (Angular 14+) — inject() function
settings = inject(APP_SETTINGS);
```

`inject()` is preferred: cleaner, no `@Inject` decorator, works outside the constructor.

---

## 9. Summary Table

### Provider syntax comparison

| Syntax | Token type | Use case |
|--------|-----------|----------|
| `useClass` | Class | Replace one class with another (same interface) |
| `useFactory` | Class or InjectionToken | Conditional logic to decide implementation at runtime |
| `useValue` | `InjectionToken` | Provide a constant object, primitive, or literal |

### Lookup decorator comparison

| Decorator | Search scope | Error if not found? |
|-----------|-------------|---------------------|
| *(none)* | Full tree + root | Yes |
| `@Host` | Host component only | Yes |
| `@Optional` + `@Host` | Host component only | No — returns `null` |
| `@Self` | Current component only | Yes |
| `@SkipSelf` | Parent upward (skips self) | Yes |

### When to use each DI pattern

| Pattern | When |
|---------|------|
| `providedIn: 'root'` | Singleton service needed globally |
| `providers` in component | Service scoped to a component subtree |
| `providers` in each child component | Sandboxed state per instance |
| `useClass` | Swap implementation transparently |
| `useFactory` | Runtime conditional logic |
| `useValue` + `InjectionToken` | Config objects, constants, feature flags |
