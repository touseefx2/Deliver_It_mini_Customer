import React from "react";
import { View, Modal, ActivityIndicator, Text, StatusBar } from "react-native";
import theme from "../themes/index";

export function Loader(props) {
  const bc = props.p ? "rgba(129, 129, 150, 0.7)" : "rgba(0,0,0,0.5)";

  return (
    <Modal animationType="fade" transparent={true} visible={props.loader}>
      <View
        style={{
          flex: 1,
          backgroundColor: bc,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.l == true && (
          <ActivityIndicator size="large" color={"#0E47A1"} />
        )}

        {props.location == true && (
          <View>
            <ActivityIndicator size="large" color={"#0E47A1"} />
            <Text style={{ alignSelf: "center", fontSize: 14, color: "white" }}>
              Getting Current Location ....
            </Text>
          </View>
        )}

        {props.autoV == true && (
          <View>
            <ActivityIndicator size="large" color={"#0E47A1"} />
            <Text
              style={{
                alignSelf: "center",
                fontSize: 14,
                color: "white",
                marginTop: 10,
              }}
            >
              Auto Verification ...
            </Text>
          </View>
        )}

        {props.ride == true && (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              width: "70%",
            }}
          >
            <ActivityIndicator size="large" color={"#0E47A1"} />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ marginLeft: 10, fontSize: 16, color: "#2b2b2b" }}
            >
              Booking your ride ..
            </Text>
          </View>
        )}

        {props.sl == true && (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              width: "70%",
            }}
          >
            <ActivityIndicator size="large" color={"#0E47A1"} />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ marginLeft: 10, fontSize: 16, color: "#2b2b2b" }}
            >
              Loading ...
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
}
