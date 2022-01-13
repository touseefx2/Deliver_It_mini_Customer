import { action, computed, makeObservable, observable } from "mobx"
import { create, persist } from 'mobx-persist'
 
import React from 'react';

class CarManager {


    @persist("object") @observable vehicleType = false
 
    constructor() {
        makeObservable(this)
    }

    @action.bound
    setvehicleType(v) {
      this.vehicleType=v
    }
  
}
export const carmanager = new CarManager();
export const CarManagerContext = React.createContext(carmanager);
export const getCarManager = () => React.useContext(CarManagerContext);