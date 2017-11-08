import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = 'DirectionsPage';
  tab2Root: any = 'MyDetailsPage';
  tab3Root: any = 'CampDetailsPage';
  // tab4Root: any = 'DirectionsPage';

  constructor(){

  }

}
