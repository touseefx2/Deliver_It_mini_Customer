import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react";
import styles from "./styles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import theme from "../../theme/index";
import { notificationManager } from "../../services/Notification/NotificationManager";
import { notificationmanager } from "../../managers/NotificationManager";
import { generalmanager } from "../../managers/generalManager";
import { Navigation } from "react-native-navigation";
import { AUTH_NAV_ID, ROOT_NAV_ID } from "../../navigation/navs";

interface Props {}
const Notifications = observer((props: Props) => {
  const { internet } = generalmanager;
  const { notifications, attemptToGetNotifications } = notificationmanager;

  const [loader, setLoader] = useState(true);
  const [notifactions, setNotification] = useState([]);
  const [isEndReachFlatlist, setisEndReachFlatlist] = useState(false);

  const gotoDetails = (item: object) => {
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "NotificationDetails",
        options: {
          topBar: {
            visible: false,
          },
        },
        passProps: {
          message: item,
        },
      },
    });
  };

  useEffect(() => {
    if (internet) {
      attemptToGetNotifications();
    }
  }, [internet]);

  useEffect(() => {
    setTimeout(() => {
      sortNotification(notifications);
    }, 150);
  }, [notifications]);

  const sortNotification = async (data) => {
    let length = data.length;

    if (data.length > 0) {
      if (length > 1) {
        var d1 = new Date(data[0].messages.date);
        let ed = moment(d1).format("Y-MM-DD");
        var d2 = new Date(data[length - 1].messages.date);
        let sd = moment(d2).format("Y-MM-DD");

        var listDate = [];
        var startDate = sd;
        var endDate = ed;
        var dateMove = new Date(startDate);
        var strDate = startDate;

        console.log("sd ", sd);
        console.log("ed ", ed);

        if (startDate == endDate) {
          var strDate = dateMove.toISOString().slice(0, 10);
          listDate.push(strDate);
        } else {
          while (strDate < endDate) {
            var strDate = dateMove.toISOString().slice(0, 10);
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate() + 1);
          }
        }

        let fdata = [];
        if (listDate.length > 0) {
          listDate.reverse().map((e, i, a) => {
            let d = e;

            const arr = [];

            data.map((e, i, a) => {
              let dw = new Date(e.messages.date);
              let dd = moment(dw).format("Y-MM-DD");
              let dt = dd;
              if (d == dt) {
                arr.push(e);
              }
            });

            if (arr.length > 0) {
              fdata.push({ date: d, data: arr });
            }
          });
        }

        setNotification(fdata);
        setLoader(false);
      } else {
        var d2 = new Date(data[0].messages.date);
        let sd = moment(d2).format("Y-MM-DD");

        var listDate = [];
        var startDate = sd;
        var dateMove = new Date(startDate);
        var strDate = startDate;

        var strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);

        let fdata = [];
        if (listDate.length > 0) {
          listDate.reverse().map((e, i, a) => {
            let d = e;

            const arr = [];

            data.map((e, i, a) => {
              let dw = new Date(e.messages.date);
              let dd = moment(dw).format("Y-MM-DD");
              let dt = dd;
              if (d == dt) {
                arr.push(e);
              }
            });

            if (arr.length > 0) {
              fdata.push({ date: d, data: arr });
            }
          });
        }

        setNotification(fdata);
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };

  const formateDatewithYear = (d) => {
    var dd = moment(d).format("D MMMM Y");
    return dd;
  };

  const formateDate = (d) => {
    // var dd = moment(d).format('DD-MM-Y');
    var dd = moment(d).format("D MMMM");
    return dd;
  };

  const formateTime = (d) => {
    var tt = moment(d).format("hh:mm a");
    var dd = moment(d).format("DD-MM-Y");
    return tt;
  };

  const renderShowNotifications = (data) => {
    const d = data.map((item, index) => {
      let title = item.messages.title;
      let msg = item.messages.message;
      if (title == "Review") {
        title = "Renter " + title;
      }
      return (
        <TouchableOpacity
          style={styles.Card}
          onPress={() => gotoDetails(item.messages)}
        >
          <Text style={styles.MailText}>{formateTime(item.messages.date)}</Text>

          <View style={styles.Row}>
            {title == "Owner Review" ? (
              <FontAwesome name={"star"} size={33} color={"#003F7D"} />
            ) : (
              <FontAwesome5 name={"car"} size={33} color={"#003F7D"} />
            )}

            <View style={{ width: "95%", marginLeft: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "55%" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.MailTitle}
                  >
                    {title}
                  </Text>
                </View>
                <View style={{ width: "40%" }}>
                  {item.messages.is_read == false && (
                    <View style={styles.Dot} />
                  )}
                </View>
              </View>

              <Text
                style={styles.Message}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {msg}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    return d;
  };

  const renderShowDateSec = ({ item, index }) => {
    let date = item.date;
    let data = item.data;
    let cd = moment(new Date()).format("Y-MM-DD");

    if (cd == date) {
      date = "today";
    } else {
      let dy = new Date(item.date).getFullYear();
      let cdy = new Date(cd).getFullYear();

      date = dy < cdy ? formateDatewithYear(date) : formateDate(date);
    }

    console.log("d : ", date);
    return (
      <View style={styles.CardDate}>
        <Text style={styles.MailTextDate}>{date}</Text>
        {renderShowNotifications(data)}
      </View>
    );
  };

  const footerFlatList = () => {
    return (
      <View
        style={{
          paddingVertical: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isEndReachFlatlist && (
          <ActivityIndicator size={22} color={theme.colors.primary} />
        )}
      </View>
    );
  };

  console.log("nl : ", notifications.length);
  console.log("snl : ", notifactions.length);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={theme.colors.containerBackground}
      />
      <theme.StackHeader
        nav={ROOT_NAV_ID}
        title={"Notifications"}
        screen="notifications"
      />

      <ScrollView>
        <View style={styles.Body}>
          {loader && (
            <ActivityIndicator
              size={30}
              color={theme.colors.primary}
              style={{ alignSelf: "center", marginTop: "70%" }}
            />
          )}

          {notifactions.length > 0 && !loader && (
            <>
              <FlatList
                showsVerticalScrollIndicator
                data={notifactions}
                renderItem={renderShowDateSec}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={(e) => {
                  console.log("   onEndReached : ");
                  setisEndReachFlatlist(true);
                }}
                ListFooterComponent={footerFlatList}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
export default Notifications;
