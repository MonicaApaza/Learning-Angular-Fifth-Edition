import { InjectionToken } from "@angular/core";

export interface AppSettings {
  title: string;
  version: string;
}

export const appSettings: AppSettings = {
  title: 'myapp-ch3',
  version: '1.0.0',
};

export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');
