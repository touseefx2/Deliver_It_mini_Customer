import React, { useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import { usermanager } from "../../managers/UserManager";
import { observer } from "mobx-react";
import styles from "./styles";
import { gotoHome, goToLogin } from "../../navigation";
import NetInfo from "@react-native-community/netinfo";
import { generalmanager } from "../../managers/generalManager";
import { requestmanager } from "../../managers/requestManager";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";

const getToken = async () => {
  let tok = await messaging().getToken();
  console.log("Token found to update : ", tok);
  usermanager.addnotificationToken(tok);
};

Platform.OS === "android"
  ? PushNotification.configure({
      onRegister: function (token) {
        usermanager.addnotificationToken(token.token);
        console.log("Token found to update : ", token);
      },
    })
  : getToken();

const SplashScreen = observer(() => {
  const setispickup = (c) => {
    requestmanager.setispickup(c);
  };
  const setisdropoff = (c) => {
    requestmanager.setisdropoff(c);
  };
  const setchalo = (c) => {
    requestmanager.setchalo(c);
  };
  const settd = (c) => {
    requestmanager.settd(c);
  };
  const setacceptRequest = (c) => {
    requestmanager.setacceptRequest(c);
  };
  const settpd = (c) => {
    requestmanager.settpd(c);
  };

  const handleConnectivityChange = (state) => {
    if (state.isConnected) {
      generalmanager.changeInternet(true);
    } else {
      generalmanager.changeInternet(false);
    }
  };

  const checkApiLevel = () => {
    DeviceInfo.getApiLevel().then((apiLevel) => {
      generalmanager.setapiLevel(apiLevel);
    });
  };

  useEffect(() => {
    checkApiLevel();
    if (usermanager.user) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          console.log("user true Get all data once");
          usermanager.getAllData();
        }
      });
    }
    NetInfo.addEventListener(handleConnectivityChange);
    setTimeout(() => {
      if (usermanager.user) {
        if (!requestmanager.req) {
          setisdropoff(false);
          setispickup(false);
          setchalo(false);
          settd("");
          settpd("");
        }

        if (requestmanager.req) {
          let status =
            requestmanager.req.status[requestmanager.req.status.length - 1]
              .status;
          if (status == "ended") {
            requestmanager.setreq(false);
            setisdropoff(false);
            setispickup(false);
            setchalo(false);
            settd("");
            settpd("");
          }
        }

        gotoHome("");
      } else {
        goToLogin();
      }
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={"#fff"}
      />
      <Image source={require("../../assets/images/animatedtruck.gif")} />
      <View>
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontSize: 34,
            padding: 10,
            color: "#0e47a1",
          }}
        >
          DeliverIt
        </Text>
      </View>
    </SafeAreaView>
  );
});
export default SplashScreen;
