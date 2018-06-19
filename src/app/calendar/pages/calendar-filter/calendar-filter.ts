import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CalendarFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-filter',
  templateUrl: 'calendar-filter.html'
})
export class CalendarFilterPage {
  availableOrigins: string[];
  selectedOrigins: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.availableOrigins = [];
    this.selectedOrigins = [];
  }

  ionViewDidLoad() {
    if (this.navParams.data.selectedOrigins) {
      this.selectedOrigins = this.navParams.data.selectedOrigins;
    }
    if (this.navParams.data.origins) {
      this.availableOrigins = this.navParams.data.origins;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss(this.selectedOrigins);
  }

  /**
   *
   *
   *
   */
  isAllChecked() {
    return this.selectedOrigins.length !== 0 && this.selectedOrigins.length === this.availableOrigins.length;
  }

  /**
   *
   */
  toggleAllChecked() {
    if (this.isAllChecked()) {
      this.selectedOrigins = [];
    } else if (this.selectedOrigins.length >= 0) {
      this.selectedOrigins = this.availableOrigins.slice(0);
    }
  }

  /**
   *
   *
   */
  public toggleChecked(origin) {
    let idx = this.selectedOrigins.indexOf(origin);
    if (idx > -1) {
      this.selectedOrigins.splice(idx, 1);
    } else {
      this.selectedOrigins.push(origin);
    }

    console.log(this.selectedOrigins);
  }

  /**
   *
   *
   */
  public isSelected(origin) {
    return this.selectedOrigins.indexOf(origin) > -1;
  }
}
