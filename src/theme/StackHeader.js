import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Linking,
  Image,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import {
  AUTH_NAV_ID,
  ROOT_NAV_ID,
  WALLET_NAV_ID,
  HOME_NAV,
  BOOKING_NAV,
  HISTROY_NAV,
} from "../navigation/navs";
import Icon from "react-native-vector-icons/Ionicons";

import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const theme = {
  colors: {
    background: "#343368", //0045CB
    primary: "#615EB6", //'#0E47A1'
    primary_light: "#39377F", //'#002171'
    containerBackground: "#FAFAFA",
    titletextColor: "#383790",
    textColor: "rgba(0, 0, 0, 0.8)",
    textSubtitleColor: "rgba(0, 0, 0, 0.6)",
    placeholder: "rgba(0, 0, 0, 0.4)",
    disableColor: "#C4C4C4",
    disableTextColor: "white",
    backIcon: "#38464F",
    star: "rgba(237, 175, 58, 1)",
    disableField: "rgba(196, 196, 196, 1)",
    enableField: "rgba(196, 196, 196, 0.2)",
    menuicon: "black",
  },
};

export default function StackHeader(props) {
  let title = props.title;
  let screen = props.screen;
  let nav = props.nav;
  let pos = "left";

  const goBack = () => {
    console.log("screen : ", screen);
    let id = screen == "completeprofile" ? AUTH_NAV_ID : nav;

    Navigation.pop(id);
  };

  if (
    screen !== "profile" &&
    screen !== "editcarscreen" &&
    screen !== "home" &&
    screen !== "history" &&
    screen !== "booking"
  ) {
    return (
      <LinearGradient
        colors={[
          theme.colors.containerBackground,
          theme.colors.containerBackground,
        ]}
        style={
          pos == "left"
            ? [styles.Header, { elevation: screen == "inspection" ? 0 : 7 }]
            : styles.HeaderRight
        }
      >
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={goBack}
          style={styles.MenuButton}
        >
          <AntDesign name={"left"} size={20} color={theme.colors.backIcon} />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={pos == "left" ? styles.Title : styles.TitleRight}
        >
          {title}
        </Text>
      </LinearGradient>
    );
  } else if (screen == "home") {
    let color = [
      theme.colors.containerBackground,
      theme.colors.containerBackground,
    ];
    return (
      <LinearGradient
        colors={color}
        style={[
          styles.Header2,
          {
            elevation: 1,
          },
        ]}
      >
        <View style={{ width: "10%" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.MenuButtonH}
            onPress={props.menuPress}
          >
            <Icon name={"menu"} size={30} color={"#38464F"} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "55%",
          }}
        >
          {/* <Text numberOfLines={1} ellipsizeMode="tail" style={styles.TitleH}>
            Hello,{" "}
            <Text style={[styles.TitleH, { color: "#F05123" }]}>{title}</Text>
          </Text> */}
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={props.notificationPress}
          style={{
            width: "10%",
            alignItems: "flex-end",
          }}
        >
          {/* <View style={styles.MenuButtonH}>
            <FontAwesome name={"bell"} size={25} color={"#38464F"} />
          </View>
          {props.unread > 0 && (
            <View
              style={{
                height: 8,
                width: 8,
                position: "absolute",
                right: 6,
                top: 1,
                borderRadius: 4,
                backgroundColor: "#F05123",
              }}
            />
          )} */}
        </TouchableOpacity>
      </LinearGradient>
    );
  } else {
    let from = props.from;
    let edit = props.edit;

    let styl =
      screen == "profile"
        ? {
            width: "90%",
            alignItems: "center",
            justifyContent: "center",

            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }
        : screen == "history"
        ? {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }
        : screen == "booking"
        ? {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }
        : {
            width: "90%",
            alignItems: "center",
            flexDirection: "row",
          };

    let color = [
      theme.colors.containerBackground,
      theme.colors.containerBackground,
    ];

    return (
      <LinearGradient colors={color} style={styles.Header2}>
        <View style={styl}>
          {screen != "history" && screen != "booking" && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={goBack}
              style={styles.BackButton}
            >
              <Icon name={"arrow-back"} size={28} color={"black"} />
            </TouchableOpacity>
          )}

          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.TitleH}>
            {title}
          </Text>
        </View>

        {from == "allcars" && (
          <TouchableOpacity
            onPress={() => {
              if (edit) {
                props.continue();
              } else {
                props.setEdit(!edit);
              }
            }}
          >
            <Text style={styles.HeaderTextRight}>{edit ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    );
  }
}

export const styles = StyleSheet.create({
  MenuButton: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  BackButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  Title: {
    fontSize: responsiveFontSize(2.6),
    color: "black",
    marginLeft: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "600",
    textTransform: "capitalize",
    width: "80%",
    lineHeight: 26,
  },
  TitleRight: {
    fontSize: responsiveFontSize(2.5),
    color: "#fff",
    marginRight: 20,
    fontWeight: "600",
    fontFamily: "Inter-Regular",
    textTransform: "capitalize",
  },
  Header: {
    backgroundColor: "#FAFAFA",
    height: 63,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    elevation: 7,
  },
  HeaderRight: {
    backgroundColor: "#0E47A1",
    height: 63,
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    elevation: 7,
  },

  Header2: {
    backgroundColor: "#0E47A1",

    height: 63,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,

    elevation: 7,
    width: "100%",
  },
  HeaderRight2: {
    backgroundColor: "#0E47A1",
    height: 63,
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    elevation: 7,
    width: "100%",
  },

  HeaderTextRight: {
    fontSize: responsiveFontSize(2.0),
    color: theme.colors.titletextColor,
    textAlign: "right",
  },

  TitleH: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.6),
    color: "black",
    marginLeft: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "600",
    textTransform: "capitalize",
    width: "80%",
    lineHeight: 26,
  },
  MenuButtonH: {
    width: 30,
  },
});
