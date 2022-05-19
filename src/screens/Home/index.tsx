import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  BackHandler,
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import {
  SideMenuView,
  RNNDrawer,
} from "react-native-navigation-drawer-extension";
import { generalmanager } from "../../managers/generalManager";
import { carmanager } from "../../managers/CarManager";
import AntDesign from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { ROOT_NAV_ID, goToLogin } from "../../navigation";
import ConnectivityManager from "react-native-connectivity-status";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import utils from "../../utils";
import { usermanager } from "../../managers/UserManager";
import db from "../../database/index";
import Modal from "react-native-modal";
import Geolocation from "react-native-geolocation-service";
import { requestmanager } from "../../managers/requestManager";
import NetInfo from "@react-native-community/netinfo";

interface Props {}
const Home = observer((props: Props) => {
  const [load, setload] = useState(false);
  const [showInternerm, setshowInternerm] = useState(false); //selected ride rs

  const [isServerError, setisServerError] = useState("A");
  const [refresh, setrefresh] = useState(false);

  const [vchltypeOnce, setvchltypeOnce] = useState(false);

  let location = generalmanager.location;
  let vt = carmanager.vehicleType;

  useEffect(() => {
    if (generalmanager.internet && !usermanager.isGetAllDatainSplash) {
      usermanager.getAllData();
    }
    if (usermanager.isGetAllDatainSplash) {
      setTimeout(() => {
        usermanager.setisGetAllDatainSplash(false);
      }, 3000);
    }
  }, [generalmanager.internet]);

  async function requestPermissions(c, p) {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: "whenInUse",
      });
    }

    if (Platform.OS === "android") {
      let g = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (g === PermissionsAndroid.RESULTS.GRANTED) {
        generalmanager.changeLocation(true);

        if (c == "click") {
          gotoSearchScreen(p);
        }
        return;
      }

      let msg = "asas";
      if (g === "denied") {
        msg = "Please allow permision to use location";
      }

      if (g === "never_ask_again") {
        msg =
          "Please allow permision to use location in setting in device or reinstall app and allow permission to continue";
      }
      generalmanager.changeLocation(false);

      Alert.alert(
        "",
        msg,
        [{ text: "OK", onPress: () => locationEnabler(c, p) }],
        { cancelable: false }
      );

      return;
    }
  }

  useEffect(() => {
    checkLocation();
    const connectivityStatusSubscription =
      ConnectivityManager.addStatusListener(({ eventType, status }) => {
        switch (eventType) {
          case "location":
            generalmanager.changeLocation(status);
            break;
        }
      });

    return () => {
      connectivityStatusSubscription.remove();
    };
  }, []);

  const locationEnabler = (c, p) => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        requestPermissions(c, p);
      })
      .catch((err) => {
        utils.ToastAndroid.ToastAndroid_SB("Please turn on location !");
        console.log("err loactn enbal : ", err);
      });
  };

  const getUser = () => {
    const bodyData = false;
    const header = usermanager.authToken;
    const uid = usermanager.user._id;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getUserById + uid, bodyData, header)
      .then((response) => {
        console.log("getuser response : ", response);

        if (!response.data) {
          setgetUserOnce(false);
          //  utils.AlertMessage("", response.message ) ;
          return;
        }

        if (response.data) {
          usermanager.setUser(response.data[0]);
          return;
        }

        return;
      })
      .catch((e) => {
        console.error("getuser catch error : ", e);
        return;
      });
  };

  const getVehicleType = () => {
    setisServerError("A");
    setload(true);
    const bodyData = false;
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getVehicleType, bodyData, header)
      .then((response) => {
        setisServerError(false);
        setload(false);

        console.log("getVehicleType response : ", response);

        if (response.msg == "Invalid Token") {
          setload(false);
          utils.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          goToLogin();
          return;
        }

        if (!response.data) {
          setvchltypeOnce(false);
          utils.AlertMessage("", response.message);
          return;
        }

        if (response.data) {
          carmanager.setvehicleType(response.data);
          setvchltypeOnce(true);
          getUser();
          usermanager.getmyWalletinfo();

          if (requestmanager.req) {
            gotoSearch(requestmanager.req.type);
          }
          return;
        }

        return;
      })
      .catch((e) => {
        setload(false);
        setisServerError(true);
        //    utils.AlertMessage("","Network request failed");
        console.error("getVehicleType catch error : ", e);
        return;
      });
  };

  useEffect(() => {
    if (generalmanager.internet) {
      if (!vchltypeOnce) {
        getVehicleType();
      }
    }
  }, [generalmanager.internet]);

  useEffect(() => {
    if (refresh) {
      if (generalmanager.internet) {
        setload(false);
        setisServerError("A");
        setrefresh(false);
        setvchltypeOnce(false);
        getVehicleType();
      } else {
        setrefresh(false);
        utils.AlertMessage("", "Please connect internet !");
      }
    }
  }, [refresh]);

  const checkLocation = async () => {
    const locationServicesAvailable =
      await ConnectivityManager.areLocationServicesEnabled();
    if (!locationServicesAvailable) {
    }
    generalmanager.changeLocation(locationServicesAvailable);
  };

  const gotoSearchScreen = (pickup) => {
    let c = pickup;
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Search",
        passProps: {
          pickupType: c,
        },
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  const gotoSearch = (pickup) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (pickup == "") {
          utils.AlertMessage("", "server not respond \n reload app ");
        } else {
          locationEnabler("click", pickup);
        }
      } else {
        setshowInternerm(true);
      }
    });
  };
  const gotoWallet = () => {
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

  useEffect(() => {
    if (showInternerm) {
      setTimeout(() => {
        setshowInternerm(false);
      }, 1500);
    }
  }, [showInternerm]);

  const renderCategory = () => {
    const c = vt.map((e, i, a) => {
      let t = e.type;
      let image = require("../../assets/images/pickup.png");

      if (t == "pickup") {
        image = require("../../assets/images/pickup.png");
      }

      if (t == "shehzore") {
        image = require("../../assets/images/shehzore.png");
      }

      if (t == "truck") {
        image = require("../../assets/images/truck.png");
      }

      if (t == "container") {
        image = require("../../assets/images/container.png");
      }

      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 65,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={styles.Category}
            onPress={() =>
              gotoSearch(requestmanager.req ? requestmanager.req.type : e)
            }
          >
            <Image source={image} style={styles.CatImage} />
          </TouchableOpacity>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.CatText}>
            {t}
          </Text>
        </View>
      );
    });

    return c;
  };

  const renderServerError = () => {
    return (
      <Modal
        isVisible={isServerError == true ? true : false}
        backdropOpacity={0.8}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={400}
        animationOutTiming={0}
        backdropTransitionInTiming={400}
        backdropTransitionOutTiming={0}
        onRequestClose={() => {
          console.log("yes");
          // setisServerError(false)
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            alignSelf: "center",
            width: 300,
          }}
        >
          <Text style={{ fontSize: 17, color: "black" }}>
            Server not respond
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <View style={{ width: "60%", alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  BackHandler.exitApp();
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "black",
                    textTransform: "capitalize",
                  }}
                >
                  exit
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "25%", alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  setrefresh(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "black",
                    textTransform: "capitalize",
                  }}
                >
                  retry
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const onMenuPressed = () => {
    RNNDrawer.showDrawer({
      component: {
        name: "customDrawer",
        passProps: {
          animationOpenTime: 300,
          animationCloseTime: 300,
          direction: "left",
          dismissWhenTouchOutside: true,
          fadeOpacity: 0.6,
          drawerScreenWidth: "75%" || 445,
          drawerScreenHeight: "100%" || 700,
          parentComponentId: props.componentId,
          style: {
            backgroundColor: "#fff",
          },
        },
        options: {
          layout: {
            componentBackgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    });
  };

  return (
    <SideMenuView style={{ flex: 1 }} drawerName={"customDrawer"}>
      {renderServerError()}
      <utils.Loader l={true} loader={load} />
      <SafeAreaView style={styles.Container}>
        <StatusBar
          animated={true}
          barStyle="dark-content"
          backgroundColor={"#fff"}
        />
        {showInternerm && (
          <utils.TopMessage msg={"Please Connect internet !"} />
        )}
        <View style={styles.Header}>
          <TouchableOpacity
            onPress={onMenuPressed}
            activeOpacity={0.8}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <utils.vectorIcon.Entypo name="menu" color="#0E47A1" size={27} />
          </TouchableOpacity>
          <Text style={styles.HeaderLeft}>DeliverIt Mini</Text>
          {/* <TouchableOpacity style={styles.HeaderRight} onPress={gotoWallet}>
						<AntDesign name={'gift'} size={18} color={'#ffad00'} />
						<Text style={{ fontFamily: 'Inter-Bold', fontSize: 14 }}> 0 pts</Text>
					</TouchableOpacity> */}
        </View>
        <ScrollView>
          <View style={styles.Body}>
            <LinearGradient
              colors={["#0e47a1", "#002171"]}
              style={styles.TopCard}
            >
              <Text style={styles.TopCardTitle}>
                Transport anywhere, anytime
              </Text>
              <Text style={styles.TopCardDescription}>
                Get hassle free goods transport services with{" "}
              </Text>
              <Text
                style={[
                  styles.TopCardDescription,
                  { fontFamily: "Inter-Bold" },
                ]}
              >
                DeliverIt Mini
              </Text>
            </LinearGradient>

            <View style={styles.CategoryBox}>
              {vt && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {renderCategory()}
                </ScrollView>
              )}
              {!generalmanager.internet && !load && !vt && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  Please connect internet !
                </Text>
              )}
            </View>

            <View style={styles.Card}>
              <Text style={styles.CardTitle}>Get Goods Transport Services</Text>
              <Image
                source={require("../../assets/images/delivery.jpg")}
                style={styles.CardImage}
              />
              <Text style={styles.CardDescription}>
                Book a transport vehicle with DeliverIt and transport your goods
                anywhere you want.
              </Text>
              <TouchableOpacity
                style={styles.SearchView}
                onPress={() =>
                  gotoSearch(
                    requestmanager.req
                      ? requestmanager.req.type
                      : vt
                      ? vt[0]
                      : ""
                  )
                }
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    marginTop: 6,
                    backgroundColor: "#0E47A1",
                    borderRadius: 10,
                  }}
                ></View>
                <Text
                  style={{
                    width: "90%",
                    height: "100%",
                    color: "silver",
                    fontFamily: "Inter-Regular",
                    marginLeft: 5,
                  }}
                >
                  Enter your dstination
                </Text>
                <FontAwesome name="search" color="#0E47A1" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CardButton}
                onPress={() =>
                  gotoSearch(
                    requestmanager.req
                      ? requestmanager.req.type
                      : vt
                      ? vt[0]
                      : ""
                  )
                }
              >
                <Text style={{ color: "#fff", fontFamily: "Inter-Bold" }}>
                  Select Destination
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SideMenuView>
  );
});

export default Home;
