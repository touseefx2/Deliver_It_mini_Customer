import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  View,
  BackHandler,
  Alert,
} from "react-native";
import utils from "../../../utils/index";

import { Navigation } from "react-native-navigation";
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import Icon from "react-native-vector-icons/EvilIcons";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { usermanager } from "../../../managers/UserManager";
import { goToLogin, gotoHome } from "../../../navigation";
import { ROOT_NAV_ID } from "../../../navigation/navs";
import styles from "./styles";
import { ActivityIndicator } from "react-native-paper";
import { notificationmanager } from "../../../managers/NotificationManager";
import { ScrollView } from "react-native-gesture-handler";

interface Props {}

const CustomDrawer = observer((props: Props) => {
  const [imgLoad, setimgLoad] = useState(false);

  const [isMessage, setisMessage] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      subscription.remove();
    };
  }, []);

  function handleBackButtonClick() {
    RNNDrawer.dismissDrawer();
    return true;
  }

  const goto = () => {
    RNNDrawer.dismissDrawer();
    gotoHome();
  };
  const gotoWallet = () => {
    RNNDrawer.dismissDrawer();
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Wallet",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };
  const gotoSettings = () => {
    RNNDrawer.dismissDrawer();
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Settings",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  const gotoHelp = () => {
    RNNDrawer.dismissDrawer();
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Help",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  const gotoRides = () => {
    RNNDrawer.dismissDrawer();
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "MyRides",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };
  const gotoPackages = () => {
    RNNDrawer.dismissDrawer();
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Packages",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  const gotoProfile = () => {
    RNNDrawer.dismissDrawer();
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Profile",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  const gotoNotifications = () => {
    RNNDrawer.dismissDrawer();
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Notifications",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={"#fff"}
      />
      <ScrollView>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={gotoProfile}
            style={{
              width: 50,
              height: 20,
              position: "absolute",
              top: 15,
              right: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#0E47A1", textDecorationLine: "underline" }}>
              Edit
            </Text>
          </TouchableOpacity>

          {(!usermanager.user.profile_image ||
            usermanager.user.profile_image == "") && (
            <utils.vectorIcon.FontAwesome
              name="user-circle"
              color="#0E47A1"
              size={99}
            />
          )}

          {usermanager.user.profile_image &&
            usermanager.user.profile_image !== "" && (
              <TouchableOpacity
                onPress={gotoProfile}
                activeOpacity={0.6}
                style={{
                  width: 100,
                  height: 100,
                  borderColor: "#0E47A1",
                  borderRadius: 50,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Image
                  onLoad={() => {
                    setimgLoad(true);
                  }}
                  style={{ width: 99, height: 99, borderRadius: 49.5 }}
                  source={{ uri: usermanager.user.profile_image }}
                />
                {imgLoad == false && (
                  <ActivityIndicator
                    size={20}
                    color="#0E47A1"
                    style={{ top: 45, position: "absolute" }}
                  />
                )}
              </TouchableOpacity>
            )}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: "Inter-Bold",
              marginTop: 10,
              fontSize: 22,
              color: "#0E47A1",
              textTransform: "capitalize",
            }}
          >
            {usermanager.user.fullname}
          </Text>

          <View style={styles.Separator}></View>
          <TouchableOpacity style={styles.Box} onPress={gotoRides}>
            <View style={styles.Icon}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={30}
                color={"grey"}
              />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Your rides</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Box} onPress={gotoWallet}>
            <View style={styles.Icon}>
              <MaterialCommunityIcons name="wallet" size={30} color={"grey"} />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Wallet</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Box} onPress={gotoPackages}>
            <View style={styles.Icon}>
              <MaterialCommunityIcons
                name="brightness-percent"
                size={30}
                color={"grey"}
              />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Packages</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.Box} onPress={gotoSettings}>
          <View style={styles.Icon}>
            <Feather name="settings" size={30} color={"grey"} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Settings</Text>
          </View>
        </TouchableOpacity> */}

          <TouchableOpacity onPress={gotoNotifications} style={styles.Box}>
            <View style={styles.Icon}>
              <Icon name="bell" size={30} color={"grey"} />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Notifications</Text>
            </View>
            {notificationmanager.unread > 0 && (
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 3.5,
                  backgroundColor: "red",
                  position: "absolute",
                  top: 24,
                  left: 17,
                }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.Box}>
            <View style={styles.Icon}>
              <Material name="star" size={30} color={"grey"} />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Rate the app</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={gotoHelp} style={styles.Box}>
            <View style={styles.Icon}>
              <MaterialCommunityIcons
                name="help-circle"
                size={30}
                color={"grey"}
              />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Help</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              RNNDrawer.dismissDrawer();
              usermanager.setLogoutMsg(true);
            }}
            style={styles.Box}
          >
            <View style={styles.Icon}>
              <SimpleLineIcons name="logout" size={22} color={"grey"} />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Sign out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default CustomDrawer;
