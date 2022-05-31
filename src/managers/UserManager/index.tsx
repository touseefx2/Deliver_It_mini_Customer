// import { action, computed, makeObservable, observable } from "mobx"
// import { create, persist } from 'mobx-persist'
// import { Alert, Platform } from 'react-native';
// import React from 'react';
// import { USER_TYPE } from './types';
// import { gotoHome, goToLogin } from "../../navigation";
// import {
//     LOGIN_EP,
// } from '../configs';
// import db from "../../database/index"
// import { carmanager } from "../CarManager";

// class UserManager {

//     @persist("object") @observable user = false;
//     @persist @observable notificationToken  = ""
//     @persist @observable authToken  = ""

//     @observable mobile: string = ''
//     @observable nt: string = ""
//     @persist @observable uwbalance  = 0 //user wallet balance
//     @observable trnsctn  = []

//     constructor() {
//         makeObservable(this)
//     }

//     @action.bound
//     setUser(val) {
//        this.user=val
//     }

//     @action.bound
//     settrnsctn(val) {
//        this.trnsctn=val
//     }

//     @action.bound
//     setuwbalance(val) {
//        this.uwbalance=val
//     }

//     @action.bound
//     addMobile(val: string) {
//         this.mobile = val;
//     }

//     @action.bound
//     addnt(n: string) {
//         this.nt = n;
//     }

//     @action.bound
//     addnotificationToken(n: string) {
//         this.notificationToken = n;
//     }
//     @action.bound
//     addauthToken(n: string) {
//         this.authToken = n;
//     }

//     @action.bound
//     attemptToLogout() {
//         this.mobile = '';
//         this.nt = '';
//         this.notificationToken='';
//         this.authToken='';
//         this.uwbalance=0;
//         this.user = false;
//        carmanager.setvehicleType(false);
//     }

//     @action.bound
//        getmyWalletinfo=()=>{

// 		const bodyData=false
// 		const header= this.authToken;
// 		const uid= this.user._id

// 		// method, path, body, header
// 		db.api.apiCall("get",db.link.getcustomerWalletinfo+uid,bodyData,header)
// 		.then((response) => {

// 			 console.log("getmyWalletinforesponse : " , response);

// 			  if(response.data){

//                 if(response.data.length<=0){
//                     this.setuwbalance(0)
//                     this.settrnsctn([])
//                     return;
//                   }

// 				let r=response.data[0]
// 				this.setuwbalance(r.balance)
//                 this.settrnsctn(r.trips)
// 				return;
// 			   }

// 			 if(!response.data){

// 			  return;
// 			 }

// 		}).catch((e) => {

// 		   console.error("getmyWalletinforesponse catch error : ", e)
// 		  return;
// 		})

// 	  }

// }
// export const usermanager = new UserManager();
// export const UserManagerContext = React.createContext(usermanager);
// export const getUserManager = () => React.useContext(UserManagerContext);

import React from "react";
import { Navigation } from "react-native-navigation";
import { AUTH_NAV_ID, gotoHome } from "../../navigation";
import { observable, makeObservable, action } from "mobx";
import { persist } from "mobx-persist";
// import carStore from "../index";
// import NotificationManager from "../index";
import db from "../../database/index";
import { Alert } from "react-native";
import { carmanager } from "../CarManager";
import { notificationmanager } from "../NotificationManager";
import auth from "@react-native-firebase/auth";

class UserManager {
  constructor() {
    makeObservable(this);
  }

  @observable profile = "";
  @observable cnicback = "";
  @observable cnicfront = "";
  @observable licneseback = "";
  @observable licnesefront = "";

  @observable loader = true;

  @observable cl = "";

  @observable cancelationCharges = 0;
  @observable baseCharges = 0;

  @persist("object") polygons = [];

  @persist("object") @observable user = false;

  @persist("object") @observable online = false;

  @persist("object") @observable notificationToken = "";
  @persist("object") @observable authToken: string = "";

  @observable loading = false;

  @observable regloading = false;
  @observable isGetAllDatainSplash = false;
  @observable total = 0; //total uploaded image length
  @observable done = 0; //done uloaded image counter
  @observable isAllImageUploadDone = false;

  @observable mobile: string = "";
  @observable nt: string = "";
  @persist @observable uwbalance = 0; //user wallet balance
  @observable trnsctn = [];

  @observable logoutMsg = false;

  @action.bound
  settrnsctn(val) {
    this.trnsctn = val;
  }

  @action.bound
  setLogoutMsg(val) {
    this.logoutMsg = val;
  }

  @action.bound
  setcanclchrg(val) {
    this.cancelationCharges = val;
  }

  @action.bound
  setbasechrg(val) {
    this.baseCharges = val;
  }

  @action.bound
  addPolygons(val) {
    this.polygons = val;
  }

  @action.bound
  setuwbalance(val) {
    this.uwbalance = val;
  }

  @action.bound
  addMobile(val: string) {
    this.mobile = val;
  }

  @action.bound
  addnt(n: string) {
    this.nt = n;
  }

  @action setLoader = (obj) => {
    this.loader = obj;
  };

  @action setonline = (obj) => {
    this.online = obj;
  };

  @action setcl = (obj) => {
    this.cl = obj;
  };

  @action.bound
  setLoadingTrue() {
    this.loading = true;
  }
  @action.bound
  setLoadingFalse() {
    this.loading = false;
  }
  @action.bound
  setisAllImageUploadDone(c) {
    this.isAllImageUploadDone = c;
  }

  @action.bound
  setRegLoading(v) {
    this.regloading = v;
  }

  @action.bound
  settotal(t) {
    this.total = t;
  }

  @action.bound
  setdone(t) {
    this.done = t;
  }

  @action.bound
  setisGetAllDatainSplash(val) {
    this.isGetAllDatainSplash = val;
  }

  @action.bound
  setUser(val) {
    this.user = val;
  }

  @action.bound
  addnotificationToken(txt) {
    this.notificationToken = txt;
  }

  @action.bound
  addUser(token, user) {
    this.addauthToken(token);
    this.setUser(user);
    gotoHome();
    return;
  }

  @action.bound
  addauthToken(n: string) {
    this.authToken = n;
  }

  @action.bound
  attemptToLogout() {
    console.log("logout");
    this.mobile = "";
    this.authToken = "";
    this.uwbalance = 0;
    this.user = false;
    carmanager.setvehicleType(false);
    notificationmanager.removeNotification();
  }

  @action.bound
  attemptToLogin(mobile, ntoken) {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        auth().currentUser?.delete();
        auth().signOut();
      }
    });

    let body = {
      mobile_number: mobile,
      registration_token: ntoken,
    };

    console.log("atmpt to login : ", body);

    // method, path, body, header
    db.api
      .apiCall("post", db.link.login, body, "")
      .then((response) => {
        this.setLoadingFalse();
        console.log("checkIsUserRegister response : ", response);

        if (!response.token) {
          Navigation.push(AUTH_NAV_ID, {
            component: {
              name: "RegisterProfile",
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          });
          return;
        }

        if (response.token) {
          this.addUser(response.token, response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        this.setLoadingFalse();
        Alert.alert("", "Network request failed");
        console.error("checkIsUserRegister catch error : ", e);
        return;
      });
  }

  @action.bound
  attemptToRegister(
    name,
    city,
    email,
    address,
    cnic,
    image,
    cf,
    cb,
    lf,
    lb,
    mobile
  ) {
    cf.chk = "cnicF";
    cb.chk = "cnicB";
    lf.chk = "licenseF";
    lb.chk = "licenseB";

    let imgArr = [];
    if (image != "") {
      image.chk = "profile";
      imgArr.push(image);
    }
    imgArr.push(cf);
    imgArr.push(cb);
    imgArr.push(lf);
    imgArr.push(lb);

    this.regloading = true;
    this.settotal(imgArr.length);
    this.setdone(0);
    this.setisAllImageUploadDone(false);

    try {
      imgArr.map((e, i, a) => {
        const data = new FormData();
        const newFile = {
          uri: e.uri,
          type: e.type,
          name: e.fileName,
        };
        data.append("files", newFile);
        fetch(db.link.links + db.link.uploadFile, {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            this.setdone(this.done + 1);
            if (e.chk == "profile") {
              this.profile = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "cnicF") {
              this.cnicfront = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "cnicB") {
              this.cnicback = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "licenseF") {
              this.licnesefront = responseData.locationArray[0].fileLocation;
            } else if (e.chk == "licenseB") {
              this.licneseback = responseData.locationArray[0].fileLocation;
            }
            if (i == a.length - 1) {
              setTimeout(() => {
                this.setisAllImageUploadDone(true);
                let body = {
                  fullname: name,
                  cnic: cnic,
                  mobile_number: mobile,
                  email: email,
                  city: city,
                  cnic_front_image: this.cnicfront,
                  cnic_back_image: this.cnicback,
                  profile_image: this.profile,
                  address: address,
                  license_front_image: this.licnesefront,
                  license_back_image: this.licneseback,
                  is_online: false,
                  registration_token: this.notificationToken,
                };

                console.log("register user body : ", body);
                db.api
                  .apiCall("post", db.link.RENTER_REG_EP, body, "")
                  ?.then((response) => {
                    console.log("register user resp : ", response);
                    this.setRegLoading(false);

                    if (response.token) {
                      this.addUser(response.token, response.data);
                      //   carStore.carStore.attemptToGetCar();
                      return;
                    }

                    if (response.message) {
                      Alert.alert("", response.message);
                      return;
                    }
                  })
                  .catch((e) => {
                    console.error("register user catch error : ", e);
                    this.setdone(0);
                    this.setisAllImageUploadDone(false);
                    this.settotal(0);
                    this.setRegLoading(false);
                  });
              }, 1000);
              return;
            }
          })
          .catch((err) => {
            console.log("Error in Upload Images arr", err);
            this.regloading = false;
          });
      });
    } catch (e) {
      console.log("add user catch error : ", e);
      this.regloading = false;
    }
  }

  @action.bound
  updateUser(
    name,
    city,
    email,
    address,
    cnic,
    image,
    cf,
    cb,
    lf,
    lb,
    mobile,
    toast
  ) {
    let body = {
      fullname: name,
      cnic: cnic,
      mobile_number: mobile,
      email: email,
      city: city,
      cnic_front_image: cf,
      cnic_back_image: cb,
      profile_image: image,
      address: address,
      license_front_image: lf,
      license_back_image: lb,
    };

    console.log("update user   body : ", body);
    let uid = this.user._id;

    db.api
      .apiCall("put", db.link.UPDATE_USER + uid, body, this.authToken)
      ?.then((response) => {
        console.log("update user resp : ", response);
        this.setRegLoading(false);
        this.setLoadingFalse();
        if (response.success) {
          this.setUser(response.data);
          // toast?.show("Success!");
          return;
        }
      })
      .catch((e) => {
        console.error("update user catch error : ", e);
        this.setRegLoading(false);
        this.setLoadingFalse();
      });
  }

  @action.bound
  attemptToGetUser = () => {
    const header = this.authToken;
    const uid = this.user._id;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getUserById + uid, false, header)
      .then((response) => {
        console.log("getuser response : ", response);

        if (response.message == "No records found") {
          this.attemptToLogout();
          return;
        }

        if (response.data) {
          this.setUser(response.data[0]);
          // this.setonline(response.data[0].is_online);
          return;
        }

        return;
      })
      .catch((e) => {
        console.error("getuser catch error : ", e);
        return;
      });
  };

  @action.bound
  attemptToGetPloygons = () => {
    const header = this.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getPolygons, false, header)
      .then((response) => {
        console.log("get polygons response : ", response.data[0].map);

        // if (response.message == "No records found") {
        //   this.attemptToLogout();
        //   return;
        // }

        if (response.data.length > 0) {
          let arr = [];
          let p = response.data[0].map;

          if (p.length > 0) {
            p.map((e, i, a) => {
              let dd = [];
              if (e.latlngs.length > 0) {
                e.latlngs.map((d, i, a) => {
                  dd.push({ latitude: d.lat, longitude: d.lng });
                });
              }

              arr.push({ _id: e.id, latlngs: dd, region: e.region });
            });
          }

          console.log("arr : ", arr);

          this.addPolygons(arr);
          // this.setonline(response.data[0].is_online);
          return;
        }

        return;
      })
      .catch((e) => {
        console.error("get polygons catch error : ", e);
        return;
      });
  };

  @action.bound
  attemptToGetCharges = () => {
    const header = this.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getCharges, false, header)
      .then((response) => {
        console.log("get charges response : ", response.data);

        if (response.data) {
          if (response.data[0]) {
            this.setcanclchrg(response.data[0].cancellation_charges);
            this.setbasechrg(response.data[0].base_charges);
          }

          return;
        }

        return;
      })
      .catch((e) => {
        console.error("get charges  catch error : ", e);
        return;
      });
  };

  @action.bound
  getAllData = () => {
    this.setisGetAllDatainSplash(true);
    this.attemptToGetUser();
    this.attemptToGetPloygons();
    this.attemptToGetCharges();
    notificationmanager.attemptToGetNotifications();
    // carStore.carStore.attemptToGetCar();
    // carStore.carStore.attemptToGetALLCarNames();
    // carStore.carStore.attemptToGetBrands();
    // carStore.carStore.attemptToGetVehicleType();
  };

  @action.bound
  getmyWalletinfo = () => {
    const bodyData = false;
    const header = this.authToken;
    const uid = this.user._id;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getcustomerWalletinfo + uid, bodyData, header)
      .then((response) => {
        console.log("getmyWalletinforesponse : ", response);

        if (response.data) {
          if (response.data.length <= 0) {
            this.setuwbalance(0);
            this.settrnsctn([]);
            return;
          }

          let r = response.data[0];
          this.setuwbalance(r.balance);
          this.settrnsctn(r.trips);
          return;
        }

        if (!response.data) {
          return;
        }
      })
      .catch((e) => {
        console.error("getmyWalletinforesponse catch error : ", e);
        return;
      });
  };
}

export const usermanager = new UserManager();
export const UserManagerContext = React.createContext(usermanager);
export const getUserManager = () => React.useContext(UserManagerContext);
