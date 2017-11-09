import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GoogleMapsProvider {

    mapElement: any;
    pleaseConnect: any;
    map: any;
    mapInitialised: boolean = false;
    mapLoaded: any;
    mapLoadedObserver: any;
    currentMarker: any;
    apiKey: string = "AIzaSyD8Bb8u9fTTy9t_gzsYHIPPK-v2jGYGlr8";

    constructor(public connectivityService: ConnectivityProvider, public geolocation: Geolocation) {

    }

    init(mapElement: any, pleaseConnect: any): Promise<any> {
	this.mapElement = mapElement;
	this.pleaseConnect = pleaseConnect;
	return this.loadGoogleMaps();
    }

    loadGoogleMaps(): Promise<any> {
	return new Promise((resolve) => {

	    if(typeof google == "undefined" || typeof google.maps == "undefined"){

		console.log("Google maps JavaScript needs to be loaded.");
		this.disableMap();

		if(this.connectivityService.isOnline()){

		    window['mapInit'] = () => {

			this.initMap().then(() => {
			    resolve(true);
			});

			this.enableMap();
		    }

		    let script = document.createElement("script");
		    script.id = "googleMaps";

		    if(this.apiKey){
			script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
		    } else {
			script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
		    }

		    document.body.appendChild(script);  

		} 
	    } else {

		if(this.connectivityService.isOnline()){
		    this.initMap();
		    this.enableMap();
		}
		else {
		    this.disableMap();
		}

	    }

	    this.addConnectivityListeners();

	});
    }

    initMap(): Promise<any> {
	this.mapInitialised = true;
	let rj = { lat  : -22.9068467,
		   lng  : -43.1728965  };

	return new Promise((resolve) => {

	    this.geolocation.getCurrentPosition().then((position) => {

		// let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		let latLng = new google.maps.LatLng(rj.lat,rj.lng);

		let mapOptions = {
		    center: latLng,
		    zoom: 5,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		this.map = new google.maps.Map(this.mapElement, mapOptions);
		resolve(true);

	    });

	});
    }

    disableMap(): void {

	if(this.pleaseConnect){
	    this.pleaseConnect.style.display = "block";
	}

    }

    enableMap(): void {

	if(this.pleaseConnect){
	    this.pleaseConnect.style.display = "none";
	}

    }

    addConnectivityListeners(): void {

	this.connectivityService.watchOnline().subscribe(() => {

	    console.log("online");

	    setTimeout(() => {

		if(typeof google == "undefined" || typeof google.maps == "undefined"){
		    this.loadGoogleMaps();
		} 
		else {
		    if(!this.mapInitialised){
			this.initMap();
		    }

		    this.enableMap();
		}

	    }, 2000);

	});

	this.connectivityService.watchOffline().subscribe(() => {

	    console.log("offline");

	    this.disableMap();

	});

    }

    changeMarker(lat: number, lng: number): void {

	let latLng = new google.maps.LatLng(lat, lng);

	let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: latLng
	});

	if(this.currentMarker){
	    this.currentMarker.setMap(null);        
	}

	this.currentMarker = marker;  
	
    }

    panToMarker(): void {


	if(this.currentMarker){
	    this.map.panTo(this.currentMarker.getPosition());
	}

	
    }

    startNavigating(directionsPanel){
 
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
 
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(directionsPanel.nativeElement);
 
        directionsService.route({
            origin: 'posto 2, copacabana',
            destination: 'posto 10, ipanema',
            travelMode: google.maps.TravelMode['WALKING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
 
        });
 
    }

}
