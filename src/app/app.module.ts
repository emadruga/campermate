import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { Keyboard } from '@ionic-native/keyboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage } from '../pages/home/home';


@NgModule({
    declarations: [
	MyApp,
	HomePage
    ],
    imports: [
	BrowserModule,
	IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
	MyApp,
	HomePage
    ],
    providers: [
	StatusBar,
	SplashScreen,
	{provide: ErrorHandler, useClass: IonicErrorHandler},
	DataProvider,
	GoogleMapsProvider,
	ConnectivityProvider,
	Geolocation,
	Network,
	InAppBrowser,
	Keyboard
    ]
})
export class AppModule {}
