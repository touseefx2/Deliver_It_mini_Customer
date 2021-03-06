import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  TextInput,
  Image,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";

import theme from "../theme/index";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

export default function DropDown(props) {
  let isSearchBar = props.search || false;
  let c = props.c;
  let absolute = props.absolute || false;

  let Message =
    c == "timeslots" ? "No any time slot available" : "No record found";

  const [data, setData] = useState(props.data);
  const [search, setsearch] = useState("");

  useEffect(() => {
    if (search != "") {
      let Search = search.toLowerCase();
      let searchLength = Search.length;

      let d = [];
      props.data.map((item, i, a) => {
        let n =
          c == "travelcity"
            ? item.name
            : c == "make"
            ? item.name
            : c == "name"
            ? item.name
            : c == "city"
            ? item.city_name
            : c == "modal"
            ? item.title
            : c == "type"
            ? item.type
            : "";
        var Name = n.toLowerCase();
        let s = Name.substr(0, searchLength);

        if (s == Search) {
          d.push(item);
        }

        if (a.length - 1 == i) {
          setData(d);
          return;
        }
      });
    } else {
      setData(props.data);
    }
  }, [search]);

  const renderSearchBar = () => {
    return (
      <View style={styles.searchBarContainer}>
        <AntDesign name="search1" color={theme.colors.primary} size={20} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"gray"}
          style={[
            styles.Text,
            {
              width: "92%",
              paddingHorizontal: 5,
            },
          ]}
          onChangeText={(t) => {
            setsearch(t);
          }}
        />
      </View>
    );
  };

  const rendershowMessage = () => {
    return (
      <View style={styles.emptyMessageConatiner}>
        <Text style={styles.emptyText}>{Message}</Text>
      </View>
    );
  };

  const onClickItem = (item) => {
    props.onSelectItem(item);
    props.setVisible(false);
  };

  const renderItems = ({ item, index }) => {
    let title =
      c == "bookingreason"
        ? item.reason
        : c == "travelcity"
        ? item.name
        : c == "days"
        ? item.title
        : c == "timeslots"
        ? item.title
        : c == "timeslot"
        ? item.title
        : c == "make"
        ? item.name
        : c == "name"
        ? item.name
        : c == "city"
        ? item.city_name
        : c == "modal"
        ? item.title
        : c == "cancelreason"
        ? item.title
        : c == "type"
        ? item.type
        : "";

    return (
      <TouchableOpacity
        onPress={() => {
          onClickItem(item);
        }}
      >
        <View
          style={[
            styles.rowContainer,
            { borderBottomWidth: index < data.length - 1 ? 0.7 : 0 },
          ]}
        >
          <Text style={styles.Text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let abs = 0.3;

  const style =
    data.length > 6
      ? {
          height: responsiveHeight(27),
          marginTop: responsiveHeight(
            c == "timeslots" ? abs : absolute ? 6.3 : 0.3
          ),
          position: absolute ? "absolute" : "relative",
        }
      : {
          marginTop: responsiveHeight(
            c == "timeslots" ? abs : absolute ? 6.3 : 0.3
          ),
          position: absolute ? "absolute" : "relative",
        };

  return (
    <SafeAreaView style={[styles.Container, style]}>
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        {isSearchBar && renderSearchBar()}
        {data.length <= 0 && rendershowMessage()}
        <FlatList
          initialNumToRender={24}
          maxToRenderPerBatch={10}
          data={data}
          nestedScrollEnabled
          renderItem={renderItems}
          keyExtractor={(item, index) => index}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const windowHeight = Dimensions.get("window").height;
let fontSize = 2;
let bordercolor = theme.colors.textSubtitleColor;
const styles = StyleSheet.create({
  Container: {
    width: "100%",
    borderColor: bordercolor,
    borderWidth: 0.6,
    alignSelf: "center",
    borderRadius: 6,
    backgroundColor: "#E5E5E5",
    zIndex: 999,
    marginBottom: 5,
    elevation: 4,
  },
  searchBarContainer: {
    width: "100%",
    borderBottomWidth: 0.7,
    borderColor: bordercolor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  rowContainer: {
    width: "100%",
    paddingVertical: 10,
    borderColor: bordercolor,
    paddingHorizontal: 15,
  },
  Text: {
    color: "black",
    fontSize: responsiveFontSize(fontSize),
    fontFamily: "Inter-Regular",
  },
  emptyMessageConatiner: {
    width: "100%",
    paddingVertical: 15,
    borderColor: bordercolor,
    paddingHorizontal: 15,
  },
  emptyText: {
    color: "grey",
    fontSize: responsiveFontSize(fontSize - 0.2),
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
});
