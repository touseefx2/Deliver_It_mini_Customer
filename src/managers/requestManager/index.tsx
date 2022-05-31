import { action, computed, makeObservable, observable } from "mobx";
import { create, persist } from "mobx-persist";
import { Alert, Platform } from "react-native";
import React from "react";
import { REQ_TYPE } from "../types/Req";
import { gotoHome, goToLogin } from "../../navigation";
import { LOGIN_EP } from "../configs";
import { usermanager } from "../UserManager";
import db from "../../database/index";
import utils from "../../utils";

class requestManager {
  constructor() {
    makeObservable(this);
  }

  // @observable req = "";

  //   @observable req : REQ_TYPE = {};
  // @persist("object")
  @persist("object") @observable req = false;
  @persist("object") @observable acceptRequest = "f";
  @persist("object") @observable atime = "";
  @persist("object") @observable grtime = ""; //generate req time

  @persist("object") @observable ispickup = false;
  @persist("object") @observable isdropoff = false;
  @persist("object") @observable chalo = false;

  @persist("object") @observable ar = 0; //captain avg rating
  @persist("object") @observable arrive = false;
  @persist("object") @observable startride = false;
  @persist("object") @observable endride = false;

  @persist("object") @observable td = ""; //total distance picup to dropoff
  @persist("object") @observable traveltime = ""; //total distance picup to dropoff
  @persist("object") @observable tpd = "---"; //total distance picup to dropoff

  // payment_mode: { type: String, enum: ["cash", "card", "wallet"] },
  @persist("object") @observable pm = "cash"; //total distance picup to dropoff

  @observable getreqloader = false;

  @observable gro = false;

  @action setgetreqloader = (obj) => {
    this.getreqloader = obj;
  };

  @action.bound
  setreq(val) {
    this.req = val;
  }

  @action.bound
  setar(val) {
    this.ar = val;
  }
  @action.bound
  settraveltime(val) {
    this.traveltime = val;
  }

  @action.bound
  setpm(val) {
    this.pm = val;
  }

  @action.bound
  settd(val) {
    this.td = val;
  }

  @action.bound
  settpd(val) {
    this.tpd = val;
  }

  @action.bound
  setacceptRequest(val) {
    this.acceptRequest = val;
  }

  @action setatime = (obj) => {
    //set trip
    this.atime = obj;
  };

  @action setgrtime = (obj) => {
    //set trip
    this.grtime = obj;
  };

  @action setgro = (obj) => {
    //set trip
    this.gro = obj;
  };

  @action setispickup = (obj) => {
    //set trip
    this.ispickup = obj;
  };

  @action setisdropoff = (obj) => {
    //set trip
    this.isdropoff = obj;
  };

  @action setchalo = (obj) => {
    //set trip
    this.chalo = obj;
  };

  @action setarrive = (obj) => {
    //set trip
    this.arrive = obj;
  };
  @action setstartride = (obj) => {
    //set trip
    this.startride = obj;
  };
  @action setendride = (obj) => {
    //set trip
    this.endride = obj;
  };

  @action getReqById = (tid, c) => {
    //get new trip by id
    const bodyData = false;
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getTripsbyId + tid, bodyData, header)
      .then((response) => {
        this.setgetreqloader(false);
        this.setgro(true);
        console.log("Get  req by id response : ", response);

        if (response.msg == "Invalid Token") {
          utils.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          goToLogin();
          return;
        }

        if (!response.data) {
          // utils.AlertMessage("",response.message) ;
          return;
        }

        if (response.data) {
          if (c !== "check") {
            // this.setreq(response.data[0]);
            // this.setacceptRequest(true);
            // this.setatime(new Date())
            // return;
          } else {
            let req = response.data[0];

            if (req.cancelled_by == "captain") {
              this.setacceptRequest(false);
              this.setarrive(false);
              this.setatime("");
              this.setar(0);
              utils.ToastAndroid.ToastAndroid_SBC("Captain cancel this trip !");
              return;
            }

            if (req.captain) {
              this.setreq(req);

              if (req.status.length > 0) {
                req.status.map((e, i, a) => {
                  if (e.status == "accepted") {
                    this.setacceptRequest(true);
                    this.setatime(e.date);
                    this.setgrtime("");
                  }

                  if (e.status == "arrived") {
                    this.setarrive(true);
                  }

                  if (e.status == "started") {
                    this.setstartride(true);
                  }

                  if (e.status == "ended") {
                    this.setendride(true);
                  }
                });
              }

              this.getAvgRate(req.captain._id);
            }

            return;
          }
        }

        return;
      })
      .catch((e) => {
        this.setgetreqloader(false);
        this.setgro(false);
        // utilsS.AlertMessage("","Network request failed");
        console.error("Get req by id catch error : ", e);
        return;
      });
  };

  @action getAvgRate = (id) => {
    //get new trip by id
    const bodyData = false;
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getAvgRating + id, bodyData, header)
      .then((response) => {
        console.log("Get avg rating res : ", response);

        if (response.msg == "Invalid Token") {
          utils.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          goToLogin();
          return;
        }

        if (!response.data) {
          // utils.AlertMessage("",response.message) ;
          return;
        }

        if (response.data) {
          if (response.data.length > 0) {
            this.setar(response.data[0].ratingAvg);
            return;
          }
          this.setar(response.data.ratingAvg);
        }

        return;
      })
      .catch((e) => {
        // utilsS.AlertMessage("","Network request failed");
        console.error("Get avg rating catch error : ", e);
        return;
      });
  };

  // @action.bound
  //       changereq(val: REQ_TYPE,c: string) {
  //      if(c=="accept"){
  //          this.req.accept=val
  //          this.req.status="accept"
  //      }

  //      if(c=="captain"){
  //         this.req.captain=val
  //     }

  //     if(c=="updateCaptainLocation"){
  //         this.req.captain.location=val
  //         this.req.arrive= true
  //     }

  //     if(c=="startRide"){
  //         this.req.startride= true
  //     }

  //     if(c=="endRide"){
  //         this.req.endride= true
  //     }

  //     if(c=="finishRide"){
  //       this.req.finish=true //yani complete ho gya status
  //       this.req.captain.userrate = val
  //     }

  // }
}
export const requestmanager = new requestManager();
export const requestManagerContext = React.createContext(requestmanager);
export const getrequestManager = () => React.useContext(requestManagerContext);
