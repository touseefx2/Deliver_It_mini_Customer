import React, { useState, useRef } from "react";
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
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import Icon from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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

const Settings = observer(() => {
  const [dodshow, setDOdShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [fTime, setfTime] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const gotoUpdate = (option) => {
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Update",
        options: {
          topBar: {
            visible: false,
          },
        },
        passProps: {
          option: option,
        },
      },
    });
  };
  const goBack = () => {
    Navigation.pop(ROOT_NAV_ID);
  };
  const onDODChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var sd = moment(currentDate).format("DD MMM yy");
    setDOdShow(false);
    usermanager.addDOB(sd);
  };

  const showDODatepicker = () => {
    setDOdShow(true);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // setDOdShow(false)
  };

  const UpdateUser = (c) => {
    //update user
    let uid = usermanager.user._id;
    const bodyData = {
      gender: c,
    };
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("put", db.link.updateUser + uid, bodyData, header)
      .then((response) => {
        setLoad(false);
        console.log("Update user response : ", response);

        if (response.msg == "Invalid Token") {
          setLoad(false);
          utilsS.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          carmanager.setvehicleType(false);
          goToLogin();
          return;
        }

        if (response.success) {
          utilsS.ToastAndroid.ToastAndroid_SB("Update Success");
          usermanager.setUser(response.data);
          return;
        }

        if (response.message) {
          utilsS.AlertMessage("", response.message);
          return;
        }
      })
      .catch((e) => {
        setLoad(false);
        utilsS.AlertMessage("", "Network request failed");
        console.error("Update user catch error : ", e);
        return;
      });
  };

  const setGender = (c) => {
    setModalVisible(false);

    if (generalmanager.internet) {
      setLoad(true);
      setTimeout(() => {
        UpdateUser(c);
      }, 1000);
    } else {
      utilsS.AlertMessage("", "Please connect internet !");
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.6}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={600}
        animationOutTiming={600}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
          setDOdShow(false);
        }}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={() => {
          setModalVisible(!isModalVisible);
          setDOdShow(false);
        }}
      >
        <View style={styles.ModalBody}>
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "Inter-Ragular",
              fontSize: 20,
              marginTop: 20,
            }}
          >
            Select Gender
          </Text>
          <TouchableOpacity
            onPress={() => {
              setGender("male");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <RadioButton
              value="male"
              onPress={() => {
                setGender("male");
              }}
              status={
                usermanager.user.gender === "male" ? "checked" : "unchecked"
              }
              color="#0E47A1"
            />
            <Text>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGender("female");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginBottom: 20,
            }}
          >
            <RadioButton
              value="female"
              onPress={() => {
                setGender("female");
              }}
              status={
                usermanager.user.gender === "female" ? "checked" : "unchecked"
              }
              color="#0E47A1"
            />
            <Text>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGender("other");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginBottom: 20,
            }}
          >
            <RadioButton
              value="other"
              onPress={() => {
                setGender("other");
              }}
              status={
                usermanager.user.gender === "other" ? "checked" : "unchecked"
              }
              color="#0E47A1"
            />
            <Text>Other</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <utilsS.Loader load={load} fast={true} title="Update .." />
      <StatusBar
        animated={true}
        barStyle="light-content"
        backgroundColor={"#0E47A1"}
      />
      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack} style={styles.BackButton}>
          <Ionicons name={"arrow-back"} size={25} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>SETTINGS</Text>
      </View>
      <ScrollView>
        <View style={styles.Body}>
          <Text
            style={{
              color: "#0E47A1",
              fontSize: 16,
              fontFamily: "Inter-Regular",
              marginTop: 10,
            }}
          >
            Profile
          </Text>
          <TouchableOpacity
            style={styles.Box}
            onPress={() => gotoUpdate("name")}
          >
            <View style={styles.Icon}>
              <Icon name="user" size={30} color={"#000"} />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Name</Text>
              {usermanager.name != "" ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.SubTitle, { textTransform: "capitalize" }]}
                >
                  {usermanager.user.fullname}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            style={styles.Box}
            onPress={() => gotoUpdate("mobile")}
          >
            <View style={styles.Icon}>
              <AntDesign
                name="mobile1"
                style={{ marginLeft: 3 }}
                size={22}
                color={"#000"}
              />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Mobile number</Text>
              {usermanager.user.mobile_number != "" ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.SubTitle}
                >
                  {usermanager.user.mobile_number}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Box}
            onPress={() => gotoUpdate("city")}
          >
            <View style={styles.Icon}>
              <utilsS.vectorIcon.MaterialIcons
                name="location-city"
                style={{ marginLeft: 3 }}
                size={23}
                color={"#000"}
              />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>City</Text>

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.SubTitle}
              >
                {usermanager.user.city.city_name || "Not added"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Box}
            onPress={() => gotoUpdate("email")}
          >
            <View style={styles.Icon}>
              <AntDesign
                name="mail"
                style={{ marginLeft: 3 }}
                size={22}
                color={"#000"}
              />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Email</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={(styles.SubTitle, { textTransform: "none" })}
              >
                {usermanager.user.email != ""
                  ? usermanager.user.email
                  : "Not added"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Box} onPress={toggleModal}>
            <View style={styles.Icon}>
              <AntDesign
                name="user"
                style={{ marginLeft: 3 }}
                size={22}
                color={"#000"}
              />
            </View>
            <View style={styles.RightBox}>
              <Text style={styles.Title}>Gender</Text>
              <Text style={styles.SubTitle}>{usermanager.user.gender}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.Separator}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
export default Settings;
