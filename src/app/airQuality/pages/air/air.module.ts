import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirPage } from './air';
import { HttpClientModule } from '@angular/common/http';
import { AirService } from '../../provider/services'
import { AirApiService } from '../../provider/airApiService';
import { HighlightModule, RemarkModule, ModulePageComponentModule } from '@espm/shared/components';


@NgModule({
  declarations: [
    AirPage,
  ],
  imports: [
    ModulePageComponentModule,
    HighlightModule,
    RemarkModule,
    IonicPageModule.forChild(AirPage),
    HttpClientModule ,
  ],
  providers: [
    AirService,AirApiService,
  ]
})
export class AirPageModule {}
