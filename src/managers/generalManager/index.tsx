import { action, computed, makeObservable, observable } from "mobx"
import { create, persist } from 'mobx-persist'
import { Alert, Platform } from 'react-native';
import React from 'react';
import { USER_TYPE } from './types';
import { gotoHome, goToLogin } from "../../navigation";
import {
    LOGIN_EP,
} from '../configs';


class generalManager {

    @observable location: boolean = false;
    @observable internet: boolean = false;
     
    constructor() {
        makeObservable(this)
    }
    @action.bound
       changeLocation(val: boolean) {
        this.location = val;
    }
    @action.bound
    changeInternet(val: boolean) {
     this.internet = val;
 }
   
}
export const generalmanager = new generalManager();
export const generalManagerContext = React.createContext(generalmanager);
export const getgeneralManager = () => React.useContext(generalManagerContext);