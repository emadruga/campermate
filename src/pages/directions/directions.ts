import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { DataProvider } from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'directions-page',
  templateUrl: 'directions.html'
})
export class DirectionsPage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    latitude: number;
    longitude: number;
 
    constructor(public navCtrl: NavController,
		public dataService: DataProvider,
		public geolocation: Geolocation,
		public alertCtrl: AlertController,
		public maps: GoogleMapsProvider) {
 
    }
 
    ionViewDidLoad(){
 	this.dataService.getLocation().then((location) => {

            let savedLocation: any = false;

            if(location && typeof(location) != "undefined"){
		savedLocation = JSON.parse(location);
            }

            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
		console.log('map created!')
		if(savedLocation){
		    this.latitude = savedLocation.latitude;
		    this.longitude = savedLocation.longitude;
		}

            }); 

	});

    }
    
    setLocation(): void {

	this.maps.startNavigating(this.directionsPanel);
	
    }

    reCenter(): void {
	if(!this.latitude || !this.longitude){

	    let alert = this.alertCtrl.create({
		title: 'Nowhere to go!',
		subTitle: 'You need to set your camp location first.',
		buttons: ['Ok']
	    });

	    alert.present();
	}
	else {

	    this.maps.panToMarker()


	}

    }


}
