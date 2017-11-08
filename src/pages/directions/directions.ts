import { IonicPage, NavController } from 'ionic-angular';
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

    map: any;
    latitude: number;
    longitude: number;
 
    constructor(public navCtrl: NavController,
		public dataService: DataProvider,
		public geolocation: Geolocation,
		public maps: GoogleMapsProvider) {
 
    }
 
    ionViewDidLoad(){
 	this.dataService.getLocation().then((location) => {

            let savedLocation: any = false;

            if(location && typeof(location) != "undefined"){
		savedLocation = JSON.parse(location);
            }

            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

		if(savedLocation){
		    
		    this.latitude = savedLocation.latitude;
		    this.longitude = savedLocation.longitude;


		}

            }); 

	});


        // this.loadMap();
 
    }
    
    setLocation(): void {

	this.geolocation.getCurrentPosition().then((position) => {

	    this.latitude = position.coords.latitude;
	    this.longitude = position.coords.longitude;

	    this.maps.changeMarker(this.latitude, this.longitude);
	    this.maps.startNavigating(this.maps, this.directionsPanel);


	});
	
    }
 
    loadMap(){
 
        let rj = new google.maps.LatLng(43.0741904, -89.3809802);
 
        let mapOptions = {
          center: rj,
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }
 
 
}
