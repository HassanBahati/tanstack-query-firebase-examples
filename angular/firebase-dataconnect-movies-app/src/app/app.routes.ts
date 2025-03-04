import { ApplicationConfig } from '@angular/core';
import { Routes } from '@angular/router';
import { connectorConfig } from '@firebasegen/default-connector';

import {
  provideDataConnect,
  getDataConnect,
  connectDataConnectEmulator,
} from '@angular/fire/data-connect';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { environment } from '../environments/environment';
export const routes: Routes = [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideTanStackQuery(new QueryClient()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDataConnect(() => {
      const dc = getDataConnect(connectorConfig);
      // Connect to the Data Connect emulator
      connectDataConnectEmulator(dc, 'localhost', 9399);
      return dc;
    }),
  ],
};
