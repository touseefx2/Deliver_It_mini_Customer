import { action, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";

import React from "react";
import db from "../../database/index";
import { usermanager } from "../UserManager";

class NotificationManager {
  @observable title = "";
  @observable message = "";
  @observable data = "";
  @observable isShow = false;

  @persist("object") @observable notifications = []; // at start user data will be empty
  @persist @observable loading = false;
  @persist @observable unread = 0;
  constructor() {
    makeObservable(this);
  }

  @action.bound
  setTitle(val) {
    this.title = val;
  }

  @action.bound
  setMessage(val) {
    this.message = val;
  }

  @action.bound
  setData(val) {
    this.data = val;
  }

  @action.bound
  setIsShow(val) {
    this.isShow = val;
  }

  @action.bound
  clearNotification() {
    this.setTitle("");
    this.setMessage("");
    this.setData("");
    this.setIsShow(false);
  }

  @action.bound
  addNotification(val) {
    this.notifications = val;
  }

  @action.bound
  setunRead(val) {
    this.unread = val;
  }

  @action.bound
  removeNotification() {
    this.notifications = [];
    this.setunRead(0);
  }
  @action.bound
  controlLoading() {
    this.loading = !this.loading;
  }
  @action.bound
  attemptToGetNotifications() {
    this.controlLoading();

    let uid = usermanager.user._id;
    const bodyData = false;
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.GET_NOTIFICATION + uid, bodyData, header)
      .then((resp) => {
        console.log("Get notification response : ", resp);
        this.controlLoading();

        if (!resp.data) {
          return;
        }

        if (resp.data) {
          this.addNotification(resp.data);
          this.setunRead(resp.count[0].count_notread);
          return;
        }

        return;
      })
      .catch((e) => {
        // utilsS.AlertMessage("","Network request failed");
        console.error("Get notification catch error : ", e);
        return;
      });
  }
}

export const notificationmanager = new NotificationManager();
export const notificationManagerContext =
  React.createContext(notificationmanager);
export const getNotificationManager = () =>
  React.useContext(notificationManagerContext);
