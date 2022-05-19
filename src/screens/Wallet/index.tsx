import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AUTH_NAV_ID, ROOT_NAV_ID } from "../../navigation/navs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from "react-native-paper";
import { usermanager } from "../../managers/UserManager";
import { generalmanager } from "../../managers/generalManager";
interface Props {}
const Wallet = observer((props: Props) => {
  let uwbalance = usermanager.uwbalance;

  const refRBSheet = useRef();
  const [option, setOption] = React.useState("Card");

  useEffect(() => {
    if (generalmanager.internet) {
      usermanager.getmyWalletinfo();
    }
  }, [generalmanager.internet]);

  const goBack = () => {
    Navigation.pop(ROOT_NAV_ID);
  };
  const gotoAddCard = () => {
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "AddCard",
        passProps: {
          from: "wallet",
        },
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };
  const gotoCredit = (option: string) => {
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Credit",
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
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={styles.Status.backgroundColor}
      />
      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack} style={styles.MenuButton}>
          <MaterialIcons
            name={"arrow-back-ios"}
            size={16}
            color={"#000"}
            style={{ marginTop: 9, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.Body}>
          <View style={styles.Headerr}>
            <View>
              <Text style={{ color: "grey", fontFamily: "Inter-Regular" }}>
                Available Credit
              </Text>
              <Text
                style={{ fontFamily: "Inter-Bold", marginTop: 5 }}
                onPress={() => refRBSheet?.current.open()}
              >
                PKR {uwbalance}{" "}
                <AntDesign name="pluscircleo" color="#0E47A1" size={20} />
              </Text>
            </View>
            <View style={styles.RightHeader}>
              <Icon name="qrcode-scan" color="#0E47A1" size={20} />
              <Text style={{ fontFamily: "Inter-Bold", marginTop: 5 }}>
                Scan & Pay
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={["#0e47a1", "#002171"]}
            style={styles.CreditCard}
          >
            <Text style={styles.CreditCardTitle}>Send or request credit</Text>
            <View style={styles.CreditButtonView}>
              <TouchableOpacity
                style={styles.LeftButton}
                onPress={() => gotoCredit("Send credit")}
              >
                <Text style={{ color: "#0E47A1", fontFamily: "Inter-Bold" }}>
                  Send Credit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RightButton}
                onPress={() => gotoCredit("Request credit")}
              >
                <Text style={{ color: "#0E47A1", fontFamily: "Inter-Bold" }}>
                  Request Credit
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={styles.Card}>
            <View style={styles.CardBody}>
              <Text style={{ color: "grey", fontFamily: "Inter-Regular" }}>
                CARDS
              </Text>
              <View style={{ marginTop: 35, flexDirection: "row" }}>
                <View style={styles.CardIcon}>
                  <Icon name="card-bulleted" color="grey" size={20} />
                </View>
                <Text style={styles.GreyText}>
                  Add a card to enjoy a seamless payments experiences
                </Text>
              </View>
              <TouchableOpacity style={styles.AddButton} onPress={gotoAddCard}>
                <Text style={{ color: "#fff", fontFamily: "Inter-Bold" }}>
                  Add card
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: "#fff",
            width: 50,
          },
          container: {
            height: "40%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#0e47a1",
          },
        }}
      >
        <View style={{ height: "100%", width: "90%", alignSelf: "center" }}>
          <View style={{ flexDirection: "row", width: "100%", height: 50 }}>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 20,
                color: "#fff",
                width: "92%",
              }}
            >
              Add funds from
            </Text>
            <Entypo
              name="circle-with-cross"
              color="#fff"
              size={24}
              onPress={() => refRBSheet.current.close()}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              height: 50,
              marginTop: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#fff",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setOption("Card");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Entypo
                name="credit-card"
                color="#fff"
                size={24}
                style={{ width: "10%" }}
              />
              <Text
                style={{
                  fontFamily: "Inter-Bold",
                  color: "#fff",
                  width: "80%",
                }}
              >
                Credit/debit card
              </Text>
              <RadioButton
                value="Card"
                status={option === "Card" ? "checked" : "unchecked"}
                color="#fff"
                onPress={() => setOption("Card")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              height: 50,
              marginTop: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#fff",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setOption("Voucher");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={{ width: "10%" }}>
                <Image
                  source={require("../../assets/images/voucher.png")}
                  style={{ width: 25, height: 30 }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Inter-Bold",
                  color: "#fff",
                  width: "80%",
                }}
              >
                Voucher
              </Text>
              <RadioButton
                value="Voucher"
                status={option === "Voucher" ? "checked" : "unchecked"}
                color="#fff"
                onPress={() => setOption("Voucher")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 48,
              borderRadius: 48,
              marginTop: 20,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={gotoAddCard}
          >
            <Text style={{ color: "#0e47a1", fontFamily: "Inter-Bold" }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
});
export default Wallet;
