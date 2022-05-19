import React from "react";
import { action, makeObservable, observable } from "mobx";
import { AppState } from "react-native";
class generalManager {
  @observable location: boolean = false;
  @observable internet: boolean = true;
  @observable exitApp: boolean = false;
  @observable logout: boolean = false;
  @observable apiLevel: String = "";
  @observable appState: String = AppState.currentState;
  @observable updateNeed: boolean = false;

  constructor() {
    makeObservable(this);
  }
  @action.bound
  setapiLevel(val: String) {
    this.apiLevel = val;
  }
  @action.bound
  setappState(val: String) {
    this.appState = val;
  }
  @action.bound
  setupdateNeed(val: boolean) {
    this.updateNeed = val;
  }
  @action.bound
  changeLocation(val: boolean) {
    this.location = val;
  }
  @action.bound
  changeInternet(val: boolean) {
    this.internet = val;
  }
  @action.bound
  changeExitApp(val: boolean) {
    this.exitApp = val;
  }
  @action.bound
  changeLogout(val: boolean) {
    this.logout = val;
  }
}
export const generalmanager = new generalManager();
export const generalManagerContext = React.createContext(generalmanager);
export const getgeneralManager = () => React.useContext(generalManagerContext);
