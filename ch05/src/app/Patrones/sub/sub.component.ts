import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub',
  imports: [],
  templateUrl: './sub.component.html',
  styleUrl: './sub.component.css'
})
export class SubComponent {
public subjectMessage$!: Observable<string>;
}
