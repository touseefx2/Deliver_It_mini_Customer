import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import { AUTH_NAV_ID, gotoHome } from "../../navigation";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";

const Login = observer(() => {
  const gotoSignIn = () => {
    Navigation.push(AUTH_NAV_ID, {
      component: {
        name: "SignIn",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      {/* <Image source={require('../../assets/images/wallpaper.jpg')} /> */}
      <TouchableOpacity onPress={gotoSignIn} style={styles.BottomButton}>
        <LinearGradient
          colors={["#0e47a1", "#002171"]}
          style={styles.LinearGradient}
        >
          <View style={styles.ButtonRight}>
            <Text style={styles.buttonText}>Continue with phone number</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
});
export default Login;
