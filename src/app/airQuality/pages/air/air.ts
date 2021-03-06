import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Loading, NavController} from 'ionic-angular';
import { AirService } from '../../provider/services';
import { Mapa } from '../../model/mapa.model';
import { AirApiService } from '../../provider/airApiService';
import leaflet from 'leaflet';



@IonicPage()
@Component({
  selector: 'page-air',
  templateUrl: 'air.html',
})

export class AirPage {

  Air: Mapa[];
  mapaId: any[];
  loading: Loading;
  map: any;
  @ViewChild('map') mapContainer: ElementRef;
  constructor(private service: AirService, 
              private apiService: AirApiService,
              private navCtrl: NavController) {


  }

  ionViewDidEnter() {
    this.allDataQualityAir();
    setTimeout(() => {
      this.loadMapa();
    }, 5000);


  }

  /**
   * recebe um id e puxa os dados referentes 
   */
  loadQualityId = (id) => {
    this.apiService.getId(id).subscribe(dados => {
      this.mapaId = dados
    });

  };
  /**
   * puxa todos os dados 
   */
  allDataQualityAir = () => {
    this.service.getAllQualityAir().subscribe(dados => {
      this.Air = dados
      console.log(this.Air)
      return this.Air;

    });
  }
  /**
   * 
   */
  modal(){
    this.navCtrl.push('QualityAirPage');
  }
  
  
  /**
   * 
   */
  
/**
 * 
 */

  loadMapa() {
    let map = leaflet.map('map').setView([-20.2602057, -40.3405489], 11);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    this.Air.map(item => {
    let numberIcon = leaflet.divIcon({
      className: "number-icon",
      iconSize: [48, 60],
      iconAnchor: [19, 60],
      popupAnchor: [3, -40],
      html: "<div class=\"faixa\" style=\"background-color: " + item.Cor + "\">" + item.Iqa.toFixed(0) +"</div>"
  
  });
    
       leaflet.marker([item.Latitude, item.Longitude], {icon: numberIcon}).addTo(map);
      // mark.bindPopup('' + item.Iqa.toFixed(0), { closeOnClick: false, autoClose: false }).openPopup();
      // map.addLayer(mark);
    });
  }
  /**
   * 
   */
}
