import { BusStop } from './bus-stop.model';
import { EntityStore, EntityState, StoreConfig, ActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface BusStopsState extends EntityState<BusStop>, ActiveState {

}

const initialState = {
  active: null
};

@Injectable()
@StoreConfig({name: 'BusStops', idKey: 'id'})
/**
 * Entidade que armazena os pontos de ônibus.
 */
export class BusStopsStore extends EntityStore<BusStopsState, BusStop> {
  constructor() {
    super(initialState);
  }
}
