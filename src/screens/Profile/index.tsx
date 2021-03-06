import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { getUserManager, usermanager } from "../../managers/UserManager";
import Icon from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import { goToLogin, ROOT_NAV_ID } from "../../navigation";
import auth from "@react-native-firebase/auth";

import Modal from "react-native-modal";
import { RadioButton } from "react-native-paper";
import utilsS from "../../utilsS";

interface Props {}
const Profile = observer((props: Props) => {
  const [lang, setLang] = React.useState("English");
  const [isModalVisible, setModalVisible] = useState(false);

  const [isMessage, setisMessage] = useState(false);

  const Logout = () => {
    usermanager.attemptToLogout();
    setisMessage(false);
    goToLogin();
  };
  const gotoNotifications = () => {
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
  const gotoSettings = () => {
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

  const goBack = () => {
    Navigation.pop(ROOT_NAV_ID);
  };

  return (
    <SafeAreaView style={styles.Container}>
      {/* <utilsS.LogoutMessage
        isMessage={isMessage}
        setisMessage={(c) => setisMessage(c)}
        logout={() => Logout()}
        title="Are you sure you want to signout ?"
        title2="Signout ..."
      /> */}

      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={"#0E47A1"}
      />

      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack} style={styles.BackButton}>
          <Ionicons name={"arrow-back"} size={25} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>PROFILE</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 30,
            marginBottom: 10,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: "Inter-Bold",
              fontSize: 24,
              textTransform: "capitalize",
              lineHeight: 30,
              color: "black",
            }}
          >
            {usermanager.user.fullname || ""}
          </Text>
          {usermanager.user.email != "" && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 16,
                lineHeight: 28,
                color: "grey",
              }}
            >
              {usermanager.user.email}
            </Text>
          )}
        </View>

        <View style={styles.Separator}></View>
        <TouchableOpacity onPress={gotoSettings} style={styles.Box}>
          <View style={styles.Icon}>
            <Icon name="user" size={30} color={"grey"} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>
              {usermanager.user.mobile_number || ""}
            </Text>
          </View>
          <View style={styles.IconRight}>
            <Text style={{ color: "black" }}> Edit </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={gotoNotifications} style={styles.Box}>
          <View style={styles.Icon}>
            <Icon name="bell" size={30} color={"grey"} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Notifications</Text>
          </View>
          <View style={styles.Icon}>
            <Material name="greater-than" size={10} color={"grey"} />
          </View>
        </TouchableOpacity>

        <View style={styles.Box}>
          <View style={styles.Icon}>
            <Ionicons name="help-buoy-outline" size={25} color={"grey"} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Help</Text>
          </View>
          <View style={styles.Icon}>
            <Material name="greater-than" size={10} color={"grey"} />
          </View>
        </View>
        <View style={styles.Separator}></View>
        <View style={styles.Box}>
          <View style={styles.Icon}>
            <Icon name="star" size={30} color={"grey"} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Rate the app</Text>
          </View>
          <View style={styles.Icon}>
            <Material name="greater-than" size={10} color={"grey"} />
          </View>
        </View>

        <TouchableOpacity style={styles.Box} onPress={() => setisMessage(true)}>
          <View style={styles.Icon}>
            <SimpleLineIcons name="logout" size={22} color={"grey"} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Sign out</Text>
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
});
export default Profile;
