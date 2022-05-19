import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { responsiveHeight } from "react-native-responsive-dimensions";
import theme from "./index";

export default function Message(props) {
  let load = props.load;
  let title = props.title;
  let fast = props.fast || false;

  return (
    <Modal transparent visible={load} onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(129, 129, 150, 0.7)",
        }}
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primary_light]}
          style={styles.LinearGradientnl}
        >
          <View style={{ width: "30%", height: responsiveHeight(10) }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              source={require("../assets/uploadImg.gif")}
            />
          </View>

          <View style={{ width: "68%" }}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.titlenl}>
              {title}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  LinearGradientnl: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titlenl: {
    fontSize: 17,
    color: "white",
    letterSpacing: 0.3,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "left",
  },
});
