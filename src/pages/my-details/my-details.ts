import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-my-details',
  templateUrl: 'my-details.html'
})
export class MyDetailsPage {

  myDetailsForm: FormGroup;

  constructor(public nav: NavController, public platform: Platform, public formBuilder: FormBuilder, public dataService: DataProvider) {

    this.myDetailsForm = formBuilder.group({
      carRegistration: [''],
      trailerRegistration: [''],
      trailerDimensions: [''],
      phoneNumber: [''],
      notes: ['']
    });
  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {

      this.dataService.getMyDetails().then((details) => {

        let savedDetails: any = false;

        if(details && typeof(details) != "undefined"){
          savedDetails = JSON.parse(details);
        }

        let formControls: any = this.myDetailsForm.controls;

        if(savedDetails){
          formControls.carRegistration.setValue(savedDetails.carRegistration);
          formControls.trailerRegistration.setValue(savedDetails.trailerRegistration);
          formControls.trailerDimensions.setValue(savedDetails.trailerDimensions);
          formControls.phoneNumber.setValue(savedDetails.phoneNumber);
          formControls.notes.setValue(savedDetails.notes);
        }

      });

    });

  }

  saveForm(): void {
    let data = this.myDetailsForm.value;
    this.dataService.setMyDetails(data);
  }

}
