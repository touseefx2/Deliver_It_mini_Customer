import { action, computed, makeObservable, observable } from "mobx";
import { create, persist } from "mobx-persist";
import db from "../../database/index";
import React from "react";
import { usermanager } from "../UserManager";

class CarManager {
  @persist("object") @observable vehicleType = false;

  @observable captains = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setvehicleType(v) {
    this.vehicleType = v;
  }

  @action.bound
  setCaptains(v) {
    this.captains = v;
  }

  @action.bound
  attemptToGetCaptains = (loc) => {
    const header = usermanager.authToken;
    let url = `?longitude=${loc.longitude}&latitude=${loc.latitude}`;
    console.log("nearest captains url: ", db.link.getAllCaptainsCAR + url);
    // method, path, body, header
    db.api
      .apiCall("get", db.link.getAllCaptainsCAR + url, false, header)
      .then((response) => {
        console.log("nearest captains car response : ", response);

        if (response.message == "No records found") {
          return;
        }

        if (response.data) {
          this.setCaptains(response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        console.error("nearest captains car error : ", e);
        return;
      });
  };
}
export const carmanager = new CarManager();
export const CarManagerContext = React.createContext(carmanager);
export const getCarManager = () => React.useContext(CarManagerContext);
