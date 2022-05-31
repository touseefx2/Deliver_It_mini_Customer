import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Clipboard,
  FlatList,
  ToastAndroid,
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import {
  AUTH_NAV_ID,
  gotoHome,
  ROOT_NAV_ID,
  goToLogin,
} from "../../navigation";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { usermanager } from "../../managers/UserManager";
import { carmanager } from "../../managers/CarManager";
import { RadioButton } from "react-native-paper";
import moment from "moment";
import { generalmanager } from "../../managers/generalManager";
import utilsS from "../../utilsS/index";
import db from "../../database/index";

const Help = observer((props: Props) => {
  const [dodshow, setDOdShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [fTime, setfTime] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const goBack = () => {
    Navigation.pop(ROOT_NAV_ID);
  };

  const copyToClipboard = (val: string) => {
    Clipboard.setString(val);
    ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
  };

  useEffect(() => {
    if (props.from == "search") {
      props.removebckhndlr();
    }

    return () => {
      if (props.from == "search") {
        props.addbackhandler();
      }
    };
  }, []);

  let iconcolor = "rgba(0, 63, 125, 1)";

  let phone = "923000000000";
  let email = "a@a.com";
  let address = "islamabad";

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
        <Text style={styles.HeaderText}>Help</Text>
      </View>
      <ScrollView>
        <View style={styles.Body}>
          <Image
            source={require("../../assets/images/contact.png")}
            style={styles.image}
          />

          <Text style={styles.helloText}>
            Need help? <Text style={styles.title}>Contact Us.</Text>
          </Text>

          {/* <FlatList
            data={contact}
            renderItem={({item, index}) => ( */}
          <View style={styles.AddressBox}>
            <View style={styles.Row}>
              <FontAwesome
                onPress={() => Linking.openURL(`tel:${"+" + phone}`)}
                name={"phone"}
                size={26}
                color={iconcolor}
              />
              <Text
                onLongPress={() => copyToClipboard(phone)}
                style={styles.text}
              >
                +{phone}
              </Text>
            </View>

            <View style={styles.Row}>
              <Icon
                onPress={() => Linking.openURL("mailto:" + email)}
                name={"mail"}
                size={26}
                color={iconcolor}
              />
              <Text
                onLongPress={() => copyToClipboard(email)}
                style={styles.text}
              >
                {email}
              </Text>
            </View>
            <View style={styles.Row}>
              <MaterialIcons name={"location-on"} size={26} color={iconcolor} />
              <Text style={styles.text}>{address}</Text>
            </View>
          </View>
          {/* )}
            keyExtractor={(item, index) => index.toString()}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
export default Help;
