import { action, computed, makeObservable, observable } from "mobx"
import { create, persist } from 'mobx-persist'
import { Alert, Platform } from 'react-native';
import React from 'react';
import { USER_TYPE } from './types';
import { gotoHome, goToLogin } from "../../navigation";
import {
    LOGIN_EP,
} from '../configs';
import db from "../../database/index"
import { carmanager } from "../CarManager";


class UserManager {

    @observable mobile: string = ''
    @observable nt: string = ""

    @persist("object") @observable user = false;
    @persist @observable notificationToken  = ""
    @persist @observable authToken  = ""
    @persist @observable uwbalance  = 0 //user wallet balance
    @observable trnsctn  = []
 
    constructor() {
        makeObservable(this)
    }
 
    @action.bound
    addMobile(val: string) {
        this.mobile = val;
    }

    @action.bound
    addnt(n: string) {
        this.nt = n;
    }

    @action.bound
    setUser(val) {
       this.user=val
    }

    @action.bound
    setuwbalance(val) {
       this.uwbalance=val
    }

    @action.bound
    settrnsctn(val) {
       this.trnsctn=val
    }
 
    @action.bound
    addnotificationToken(n: string) {
        this.notificationToken = n;
    }
    @action.bound
    addauthToken(n: string) {
        this.authToken = n;
    }
   
    @action.bound
    attemptToLogout() {
        this.mobile = '';
        this.nt = '';
        this.notificationToken='';
        this.authToken='';
        this.uwbalance=0;
        this.user = false;
       carmanager.setvehicleType(false);
    }

    

    @action.bound
       getmyWalletinfo=()=>{
  
		const bodyData=false
		const header= this.authToken;
		const uid= this.user._id
		
	
		// method, path, body, header
		db.api.apiCall("get",db.link.getcustomerWalletinfo+uid,bodyData,header)
		.then((response) => {
			 
			 console.log("getmyWalletinforesponse : " , response);
	 
	 
			  if(response.data){


                if(response.data.length<=0){
                    this.setuwbalance(0)
                    this.settrnsctn([])
                    return;
                  }
                  

				let r=response.data[0]
				this.setuwbalance(r.balance)
                this.settrnsctn(r.trips)
				return;
			   }
	
			 if(!response.data){
			   
			  
			  return;
			 }
		
			
		  
		}).catch((e) => {
		  
		   console.error("getmyWalletinforesponse catch error : ", e)
		  return;
		})
	
	  }

    

}
export const usermanager = new UserManager();
export const UserManagerContext = React.createContext(usermanager);
export const getUserManager = () => React.useContext(UserManagerContext);