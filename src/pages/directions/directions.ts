import { IonicPage, NavController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';

@IonicPage()
@Component({
  selector: 'directions-page',
  templateUrl: 'directions.html'
})
export class DirectionsPage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;
 
    constructor(public navCtrl: NavController) {
 
    }
 
    ionViewDidLoad(){
 
        this.loadMap();
        this.startNavigating();
 
    }
 
    loadMap(){
 
        let rj = new google.maps.LatLng(-34.9290, 138.6010);
 
        let mapOptions = {
          center: rj,
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }
 
    startNavigating(){
 
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
 
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);
 
        directionsService.route({
            origin: 'posto 2, copacabana',
            destination: 'posto 10, ipanema',
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
 
        });
 
    }
 
}
