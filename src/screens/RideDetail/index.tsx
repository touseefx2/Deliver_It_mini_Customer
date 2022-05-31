import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Material from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { goToLogin, ROOT_NAV_ID } from "../../navigation";
import moment from "moment";
import utils from "../../utils";
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import { usermanager } from "../../managers/UserManager";
import { generalmanager } from "../../managers/generalManager";
import db from "../../database/index";

const RideDetail = observer((props) => {
  const [visible, setVisible] = useState(false);
  const [starCount, setstarCount] = useState(0);

  const [imgLoad, setimgLoad] = useState(false);
  const [showRating, setshowRating] = useState(false);

  const [loader, setloader] = useState(false);

  const [loaderr, setloaderr] = useState(false);

  const [e, sete] = useState(false); // selected trip data
  const [gettripOnce, setgettripOnce] = useState(false);
  const [isserverErr, setisserverErr] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const trp = props.trip;
  const tid = props.trip._id; //slected trip id
  const trnsctn = props.trnsctn; //trnsctn of this trip

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  useEffect(() => {
    if (refresh) {
      setloader(false);
      setgettripOnce(false);
      setisserverErr(false);
      sete(false);
      setrefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (generalmanager.internet && !refresh) {
      if (!gettripOnce) {
        getTrips();
      }
    }
  }, [generalmanager.internet, refresh, gettripOnce]);

  const getTrips = () => {
    setloader(true);
    setisserverErr(false);
    sete(false);
    setgettripOnce(false);

    const bodyData = false;
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getTripsbyId + tid, bodyData, header)
      .then((response) => {
        setloader(false);
        setisserverErr(false);

        console.log("getallTripsbytid response : ", response);

        if (response.msg == "Invalid Token") {
          utils.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          goToLogin();
          return;
        }

        if (!response.data) {
          utils.AlertMessage("", response.message);
          sete(false);
          setgettripOnce(false);
          return;
        }

        if (response.data) {
          setgettripOnce(true);
          sete(response.data[0]);
        }

        return;
      })
      .catch((e) => {
        setloader(false);
        setisserverErr(true);
        setgettripOnce(false);
        sete(false);
        console.error("getallTripsbytid catch error : ", e);
        return;
      });
  };

  const goBack = () => {
    Navigation.pop(ROOT_NAV_ID);
  };

  const onClickRate = () => {
    setshowRating(true);
  };

  const submitRate = () => {
    setloaderr(true);
    let bodyData = {
      rating: starCount,
    };
    const header = usermanager.authToken;

    db.api
      .apiCall("put", db.link.addTripRating + e._id, bodyData, header)
      .then((response) => {
        setloaderr(false);
        console.log("onTripRating response : ", response);

        if (response.msg == "Invalid Token") {
          utils.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          goToLogin();
          return;
        }

        if (response.success) {
          utils.ToastAndroid.ToastAndroid_SB("Success");
          // sete(response.data);
          closeRateSheet();
          return;
        }

        if (!response.success) {
          utils.AlertMessage("", response.message);
          return;
        }

        return;
      })
      .catch((e) => {
        setloaderr(false);
        utils.AlertMessage("", "Network request failed");
        console.error("onTripRating catch error : ", e);
        return;
      });
  };

  const onclickSubmitRate = () => {
    Alert.alert("Confirmation", "Are you sure you want submit rating ?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          if (generalmanager.internet) {
            submitRate();
          } else {
            utils.AlertMessage("", "Please connect internet !");
          }
        },
      },
    ]);
  };

  const closeRateSheet = () => {
    setshowRating(false);
    setstarCount(0);
  };

  const renderRatingSheet = () => {
    return (
      <Modal
        isVisible={showRating}
        backdropOpacity={0.5}
        animationIn="fadeInUp"
        style={{ flex: 1, padding: 0, margin: 0 }}
        animationOut="fadeOutDown"
        animationInTiming={600}
        animationOutTiming={100}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={100}
        onRequestClose={() => closeRateSheet()}
      >
        <View
          style={{
            padding: 20,
            alignItems: "center",
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => closeRateSheet()}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            <utils.vectorIcon.Entypo
              name="circle-with-cross"
              size={20}
              color={"silver"}
            />
          </TouchableOpacity>

          {(!e.captain.profile_image || e.captain.profile_image == "") && (
            <utils.vectorIcon.FontAwesome
              style={{ alignSelf: "center" }}
              name="user-circle"
              color="#0E47A1"
              size={60}
            />
          )}
          {e.captain.profile_image && e.captain.profile_image !== "" && (
            <View
              style={{
                width: 65,
                height: 65,
                borderColor: "#0E47A1",
                borderRadius: 32.5,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Image
                onLoad={() => {
                  setimgLoad(true);
                }}
                style={{ width: 64, height: 64, borderRadius: 32 }}
                source={{ uri: e.captain.profile_image }}
              />
              {imgLoad == false && (
                <ActivityIndicator
                  size={12}
                  color="#0E47A1"
                  style={{ top: 27.5, position: "absolute" }}
                />
              )}
            </View>
          )}

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              fontSize: 16,
              color: "black",
              lineHeight: 25,
              marginTop: 10,
              marginBottom: 30,
              alignSelf: "center",
            }}
          >
            How was your experience with {e.captain.fullname}. ?
          </Text>

          <StarRating
            maxStars={5}
            starStyle={{ borderWidth: 0, marginLeft: 10 }}
            rating={starCount}
            selectedStar={(r) => {
              !loaderr ? setstarCount(r) : {};
            }}
            fullStarColor={"#0E47A1"}
          />

          {starCount > 0 && !loaderr && (
            <TouchableOpacity
              onPress={() => {
                onclickSubmitRate();
              }}
              style={styles.Button}
            >
              <Text style={styles.ButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          )}

          {starCount > 0 && loaderr && (
            <ActivityIndicator
              size={30}
              color="#0E47A1"
              style={{ marginTop: 30 }}
            />
          )}
        </View>
      </Modal>
    );
  };

  const renderShowStar = () => {
    let arr = [];

    if (cr <= 0) {
      for (let index = 0; index < 5; index++) {
        arr.push(
          <utils.vectorIcon.AntDesign name="staro" size={17} color={"grey"} />
        );
      }
    } else {
      for (let index = 1; index <= 5; index++) {
        if (index <= cr) {
          arr.push(
            <utils.vectorIcon.AntDesign
              name="star"
              size={17}
              style={{ opacity: 0.8 }}
              color={"#0E47A1"}
            />
          );
        } else {
          arr.push(
            <utils.vectorIcon.AntDesign
              name="staro"
              size={17}
              style={{ opacity: 0.8 }}
              color={"grey"}
            />
          );
        }
      }
    }

    return arr;
  };

  const renderCaptain = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: "grey",
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        {!e.captain.profile_image && (
          <utils.vectorIcon.FontAwesome
            name="user-circle"
            color="#0E47A1"
            size={60}
          />
        )}
        {e.captain.profile_image && e.captain.profile_image !== "" && (
          <View
            style={{
              width: 60,
              height: 60,
              borderColor: "#0E47A1",
              borderRadius: 30,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              onLoad={() => {
                setimgLoad(true);
              }}
              style={{ width: 59, height: 59, borderRadius: 29.5 }}
              source={{ uri: e.captain.profile_image }}
            />
            {imgLoad == false && (
              <ActivityIndicator
                size={10}
                color="#0E47A1"
                style={{ top: 25, position: "absolute" }}
              />
            )}
          </View>
        )}
        <View style={{ height: "100%", width: "80%", left: 5 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: "Inter-Bold",
              fontSize: 16,
              color: "#000",
              textTransform: "capitalize",
              lineHeight: 20,
            }}
          >
            {e.captain.fullname}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: "Inter-Regular",
              fontSize: 12,
              color: "grey",
              textTransform: "capitalize",
              lineHeight: 20,
            }}
          >
            {e.type.type} - {e.vehicle.color} {e.vehicle.car_name.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: "Inter-Regular",
              fontSize: 12,
              color: "grey",
              textTransform: "capitalize",
              lineHeight: 20,
            }}
          >
            {e.vehicle.registration_number}
          </Text>

          {ratetrip == false && status == "ended" && (
            <TouchableOpacity
              onPress={() => onClickRate()}
              activeOpacity={0.7}
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontFamily: "Inter-Regular",
                    fontSize: 12,
                    color: "#0E47A1",
                    fontWeight: "700",
                    textTransform: "capitalize",
                    lineHeight: 20,
                  }}
                >
                  Rate this ride
                </Text>
              </View>

              <View style={{ width: "50%", alignItems: "flex-end" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  {renderShowStar()}
                </View>
              </View>
            </TouchableOpacity>
          )}

          {ratetrip && status == "ended" && (
            <View style={{ width: "50%", marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                {renderShowStar()}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderServerErr = () => {
    return (
      <View style={{ marginTop: "60%" }}>
        <Text
          style={{
            color: "grey",
            fontSize: 15,
            alignSelf: "center",
            marginBottom: 5,
          }}
        >
          Server not respond !
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (generalmanager.internet) {
              setrefresh(true);
            } else {
              utils.AlertMessage("", "Please connect internet !");
            }
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 15,
              textDecorationLine: "underline",
              alignSelf: "center",
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDataLoadeErr = () => {
    return (
      <View style={{ marginTop: "60%" }}>
        <Text
          style={{
            color: "grey",
            fontSize: 15,
            alignSelf: "center",
            marginBottom: 5,
          }}
        >
          Data not load !
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (generalmanager.internet) {
              setrefresh(true);
            } else {
              utils.AlertMessage("", "Please connect internet !");
            }
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 15,
              textDecorationLine: "underline",
              alignSelf: "center",
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderInternetErr = () => {
    return (
      <Text
        style={{
          position: "absolute",
          top: "50%",
          color: "grey",
          fontSize: 15,
          alignSelf: "center",
        }}
      >
        No internet connection !
      </Text>
    );
  };

  var ttt;
  var date;
  let createdAt;
  let distance;
  let rent;
  let totaltime;
  let ratetrip;
  let cr;
  let cc;
  let msg;
  let status;
  let pm;
  let waitingTime;
  let iswallet;
  let negativeCharges; //if walet user ngtv amount add in rent
  let positiveCharges; //paymnt amount cut from wallet

  if (e) {
    iswallet = e.deduct_from_wallet || false;
    waitingTime = e.waiting_time || 0;
    ttt = moment(e.createdAt).format("hh:mm a");
    date = moment(e.createdAt).format("DD MMM Y"); //9 july 2021
    createdAt = date + ", " + ttt;
    rent = e.rent_afterBaseCharges || 0; //total amount in trip ride fare
    pm = e.payment_mode;

    distance = e.distance.toFixed(1);

    status = e.status[e.status.length - 1].status;

    totaltime = 0;

    ratetrip = true;
    cr = 0; //cstmr rate

    if (status == "ended") {
      if (e.rating.captain == "No feedback given") {
        ratetrip = false;
      } else {
        cr = parseInt(e.rating.captain).toFixed();
      }

      let startridetime = e.status.filter((obj) => {
        return obj.status === "started" ? obj.date : "";
      });

      let endridetime = e.status.filter((obj) => {
        return obj.status === "ended" ? obj.date : "";
      });

      var t = moment(startridetime[0].date).format("hh:mm:ss a");
      startridetime = t;
      var tt = moment(endridetime[0].date).format("hh:mm:ss a");
      endridetime = tt;
      var st = moment(startridetime, "HH:mm:ss a");
      var et = moment(endridetime, "HH:mm:ss a");

      var duration = moment.duration(et.diff(st));
      totaltime = parseInt(duration.asSeconds());
    }

    cc = 0; //colect cash
    if (pm == "cash" && status == "ended") {
      cc = e.customer_paid || 0;

      if (cc !== 0 && trnsctn.credit > 0) {
        cc = cc + trnsctn.credit;
      }
      if (cc !== 0 && trnsctn.debit > 0) {
        cc = cc - trnsctn.debit;
      }

      negativeCharges = e.amt_from_wallet < 0 ? e.amt_from_wallet : 0; //if walet user ngtv amount add in rent
      positiveCharges = e.amt_from_wallet > 0 ? e.amt_from_wallet : 0; //paymnt amount cut from wallet
    }

    msg = "";
    if (trnsctn) {
      msg =
        trnsctn.debit > 0
          ? "PKR " + trnsctn.debit.toFixed() + " has been cut from your wallet"
          : trnsctn.credit > 0
          ? "PKR " + trnsctn.credit.toFixed() + " has been added to your wallet"
          : "";
    }
  }

  // console.log("trs : ",trnsctn)
  //    console.log("trp : ",e.rating)

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        animated={true}
        barStyle="light-content"
        backgroundColor={"#0E47A1"}
      />
      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack} style={styles.BackButton}>
          <Ionicons name={"arrow-back"} size={25} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>TRIP {trp.t_id}</Text>
      </View>

      {!generalmanager.internet && !isserverErr && !loader && e && (
        <utils.TopMessage msg="No internet connection ! " />
      )}
      {!generalmanager.internet &&
        !isserverErr &&
        !e &&
        !loader &&
        renderInternetErr()}

      <ScrollView>
        {isserverErr && !loader && renderServerErr()}
        {!loader &&
          !e &&
          !isserverErr &&
          generalmanager.internet &&
          renderDataLoadeErr()}
        {loader && (
          <ActivityIndicator
            style={{ marginTop: "70%", alignSelf: "center" }}
            size={35}
            color={"#0E47A1"}
          />
        )}

        {!loader && e && !isserverErr && (
          <View>
            <Image
              source={require("../../assets/images/map.jpg")}
              blurRadius={2}
              style={{
                height: 200,
                width: "100%",
                resizeMode: "contain",
                marginTop: -10,
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginLeft: 20,
                fontSize: 12,
                marginTop: -5,
                color: "black",
              }}
            >
              {createdAt}
            </Text>
            <View style={styles.Body}>
              <View
                style={{
                  height: 80,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "grey",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginLeft: 20,
                    fontFamily: "Inter-Regular",
                    fontSize: 18,
                  }}
                >
                  Ride fare
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter-Regular",
                    fontSize: 18,
                    position: "absolute",
                    right: 40,
                    color: "grey",
                  }}
                >
                  PKR{" "}
                  <Text
                    style={{
                      fontFamily: "Inter-Bold",
                      fontSize: 24,
                      color: "#000",
                    }}
                  >
                    {rent}
                  </Text>
                </Text>
                <Material
                  style={{ position: "absolute", right: 10 }}
                  name={visible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={26}
                  color="grey"
                  onPress={() => setVisible(!visible)}
                />
              </View>
              {visible && (
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#e5e5e5",
                    justifyContent: "center",
                    paddingVertical: 20,
                  }}
                >
                  {status == "ended" && (
                    <View>
                      <Text
                        style={{
                          fontFamily: "Inter-Regular",
                          fontSize: 12,
                          color: "grey",
                          marginLeft: 20,
                        }}
                      >
                        You travelled {distance} km in {secondsToHms(totaltime)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Distance
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            position: "absolute",
                            right: 20,
                            color: "grey",
                          }}
                        >
                          {distance}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Travel Time
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            position: "absolute",
                            right: 20,
                            color: "grey",
                          }}
                        >
                          {totaltime} sec
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Wallet
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            position: "absolute",
                            right: 20,
                            color: "grey",
                          }}
                        >
                          {iswallet ? "On" : "Off"}
                        </Text>
                      </View>

                      {positiveCharges !== 0 && (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Inter-Regular",
                              marginLeft: 20,
                              color: "#000",
                            }}
                          >
                            Wallet pay
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Inter-Regular",
                              position: "absolute",
                              right: 20,
                              color: "grey",
                            }}
                          >
                            PKR {positiveCharges}
                          </Text>
                        </View>
                      )}

                      {negativeCharges !== 0 && (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Inter-Regular",
                              marginLeft: 20,
                              color: "#000",
                            }}
                          >
                            Negative charges
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Inter-Regular",
                              position: "absolute",
                              right: 20,
                              color: "grey",
                            }}
                          >
                            PKR {Math.abs(negativeCharges)}
                          </Text>
                        </View>
                      )}

                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Waiting Time
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            position: "absolute",
                            right: 20,
                            color: "grey",
                          }}
                        >
                          {waitingTime == 0
                            ? "0 sec"
                            : secondsToHms((waitingTime * 60).toFixed(0))}
                        </Text>
                      </View>

                      <View
                        style={{
                          height: 1,
                          width: "100%",
                          backgroundColor: "silver",
                          marginTop: 10,
                        }}
                      ></View>

                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter-Bold",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Payment Mode
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Bold",
                            position: "absolute",
                            right: 20,
                            color: "#000",
                            textTransform: "capitalize",
                          }}
                        >
                          {pm}
                        </Text>
                      </View>
                    </View>
                  )}

                  {status == "cancelled" && (
                    <View>
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Distance
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            position: "absolute",
                            right: 20,
                            color: "grey",
                          }}
                        >
                          {distance} Km
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Cancelled By
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Regular",
                            position: "absolute",
                            right: 20,
                            color: "grey",
                            textTransform: "capitalize",
                          }}
                        >
                          {e.cancelled_by}
                        </Text>
                      </View>

                      <View
                        style={{
                          height: 1,
                          width: "100%",
                          backgroundColor: "silver",
                          marginTop: 10,
                        }}
                      ></View>

                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter-Bold",
                            marginLeft: 20,
                            color: "#000",
                          }}
                        >
                          Payment Mode
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter-Bold",
                            position: "absolute",
                            right: 20,
                            color: "#000",
                            textTransform: "capitalize",
                          }}
                        >
                          {pm}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {status == "ended" && (
                <View>
                  <View
                    style={{
                      height: 80,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "grey",
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/money.png")}
                      style={{
                        marginLeft: 10,
                        height: 20,
                        width: 40,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{ fontFamily: "Inter-Regular", color: "#000" }}
                    >
                      {pm == "cash" ? "Cash Paid" : "Amount charged"}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter-Regular",
                        fontSize: 14,
                        position: "absolute",
                        right: 20,
                        color: "#000",
                      }}
                    >
                      PKR {pm == "cash" ? cc : rent}
                    </Text>
                  </View>
                  {(trnsctn.debit > 0 || trnsctn.credit > 0) && (
                    <View
                      style={{
                        height: 50,
                        width: "100%",
                        backgroundColor: "#eafaff",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter-Regular",
                          color: "#0E47A1",
                          width: "90%",
                          alignSelf: "center",
                        }}
                      >
                        {msg}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {status == "cancelled" && e.cancelled_by == "customer" && (
                <View>
                  <View
                    style={{
                      height: 80,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "grey",
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/money.png")}
                      style={{
                        marginLeft: 10,
                        height: 20,
                        width: 40,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{ fontFamily: "Inter-Regular", color: "#000" }}
                    >
                      Cancellation charged
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: "Inter-Regular",
                        fontSize: 14,
                        position: "absolute",
                        right: 20,
                        color: "#000",
                      }}
                    >
                      PKR {e.amt_paid}
                    </Text>
                  </View>
                  {(trnsctn.debit > 0 || trnsctn.credit > 0) && (
                    <View
                      style={{
                        height: 50,
                        width: "100%",
                        backgroundColor: "#eafaff",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter-Regular",
                          color: "#0E47A1",
                          width: "90%",
                          alignSelf: "center",
                        }}
                      >
                        {msg}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {renderCaptain()}
            </View>
          </View>
        )}
      </ScrollView>

      {e && renderRatingSheet()}
    </SafeAreaView>
  );
});
export default RideDetail;
