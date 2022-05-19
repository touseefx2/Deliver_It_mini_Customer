import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  PermissionsAndroid,
  Alert,
  Image,
} from "react-native";
import styles from "./styles";
import theme from "../../themes/index";
import utilsS from "../../utilsS/index";
import { Navigation } from "react-native-navigation";
import LinearGradient from "react-native-linear-gradient";
import { inject, observer } from "mobx-react";
import { AUTH_NAV_ID, gotoHome } from "../../navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Input } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import CardView from "react-native-cardview";
import db from "../../database/index";
import { usermanager } from "../../managers/UserManager";
import { generalmanager } from "../../managers/generalManager";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";

interface Props {}
const RegisterProfile = observer((props: Props) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const [dp, setdp] = useState("");
  //  const [dpOffset, setDpOffset] = useState(null);
  const [isEmptydp, setIsEmptydp] = useState(false);

  const [name, setName] = useState("");
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [isInvalidName, setIsInvalidName] = useState(false);
  let maxNameLength = 40;

  const [age, setAge] = useState("");
  const [isEmptyAge, setIsEmptyAge] = useState(false);

  const [gender, setGender] = useState("male");

  const [dob, setDob] = useState(new Date());
  const [isShowDob, setisShowDob] = useState(false);

  const [cnic, setCnic] = useState("");
  const [isEmptyCnic, setIsEmptyCnic] = useState(false);
  const [isInvalidCnic, setIsInvalidCnic] = useState(false);
  let maxCnicLength = 13;

  const [email, setEmail] = useState("");
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  let maxEmailLength = 50;

  const [phone, setPhone] = useState("");
  const [selectedCountryCode, setselectedCountryCode] = useState("");
  const [phoneV, setphoneV] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [cpassword, setcPassword] = useState("");
  const [showcPassword, setShowcPassword] = useState(false);
  const [isEmptycPassword, setIsEmptycPassword] = useState(false);
  const [isInvalidcPassword, setIsInvalidcPassword] = useState(false);

  const [showInternetMessage, setshowInternetMessage] = useState(false);
  const [load, setLoad] = useState(false);
  const [scrollY, setscrollY] = useState(0);

  const inputPlaceHolderColor = theme.color.subtitleColor;
  const inputborderColor = theme.color.fieldBorderColor;
  const inputErrorColor = theme.color.fieldBordererrorColor;

  const refRBSheet = useRef(null);
  const scrollRef = useRef(null);
  const dpRef = useRef(null);
  const nameRef = useRef(null);
  const nameRefi = useRef(null);
  const ageRef = useRef(null);
  const ageRefi = useRef(null);
  const dobRef = useRef(null);
  const genderRef = useRef(null);
  const cnicRef = useRef(null);
  const cnicRefi = useRef(null);
  const emailRef = useRef(null);
  const emailRefi = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRefi = useRef(null);
  const cpasswordRef = useRef(null);
  const cpasswordRefi = useRef(null);

  let isInternet = generalmanager.internet;

  //lifecycle functions

  useEffect(() => {
    const subscription2 = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    const subscription3 = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );

    return () => {
      subscription2.remove();
      subscription3.remove();
    };
  }, []);

  useEffect(() => {
    if (!isInternet) {
      // setshowInternetMessage(true)
    }
  }, [isInternet]);

  useEffect(() => {
    if (showInternetMessage) {
      setTimeout(() => {
        setshowInternetMessage(false);
      }, 1500);
    }
  }, [showInternetMessage]);

  //own functions

  const gotoNext = (screen) => {
    props.navigation.navigate(screen);
  };

  const _keyboardDidShow = (s) => {
    setIsKeyboardShow(true);
    setTimeout(() => {
      setIsKeyboardShow(false);
    }, 300);
  };

  const _keyboardDidHide = (h) => {
    setIsKeyboardShow(false);
  };

  const clearall = () => {
    setIsEmptydp(false);
    setIsEmptyName(false);
    setIsInvalidName(false);
    setIsEmptyAge(false);
    setIsEmptyCnic(false);
    setIsInvalidCnic(false);
    setIsEmptyEmail(false);
    setIsInvalidEmail(false);
    setIsEmptyPassword(false);
    setIsInvalidPassword(false);
    setIsEmptycPassword(false);
    setIsInvalidcPassword(false);
  };

  const focus = (c) => {
    //   if(c=="dp"){
    // dpRef?.current?.measure((x, y, width, height) => {
    //   scrollRef?.current?.scrollTo({ x:x, y: 0, animated: true })
    // })
    // }

    if (c == "name") {
      nameRef?.current?.measure((x, y, width, height, xx, yy) => {
        console.log("yy : ", yy);
        scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
      });
      // nameRefi?.current?.shake()
    }

    if (c == "email") {
      emailRef?.current?.measure((x, y, width, height, xx, yy) => {
        console.log("yy : ", yy);
        scrollRef?.current?.scrollTo({
          x: 0,
          y: yy < scrollY ? yy + scrollY : yy,
          animated: true,
        });
      });
      emailRefi?.current?.shake();
    }

    Keyboard.dismiss();
  };

  const onClickGallery = async () => {
    refRBSheet?.current?.close();
    let appname = "Deliverit";
    const granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: appname + " needs storage permission ",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: "images",
        },

        mediaType: "photo",
        // includeBase64: true,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          console.log(response.customButton);
        } else {
          setdp(response.assets[0]);
          setIsEmptydp(false);
        }
      });
    } else {
      console.log("Storage permission denied");
    }
  };

  const onClickCamera = async () => {
    refRBSheet?.current?.close();
    let appname = "Deliverit";
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: appname + " needs access to your camera ",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let options = {
        mediaType: "photo",
        // includeBase64: true,
        quality: 1,
      };
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          console.log(response.customButton);
        } else {
          setdp(response.assets[0]);
          setIsEmptydp(false);
        }
      });
    } else {
      console.log("Camera permission denied");
    }
  };

  const onRegisterProfile = (method, bodyData, header) => {
    console.log("Register body : ", bodyData);

    db.api
      .apiCall(method, db.link.signup, bodyData, header)
      .then((response) => {
        console.log("Register Profile response : ", response);

        if (response.success) {
          usermanager.setUser(response.data);
          usermanager.addnotificationToken(usermanager.nt);
          usermanager.addauthToken(response.token);
          usermanager.addnt("");
          usermanager.addMobile("");
          setLoad(false);
          utilsS.ToastAndroid.ToastAndroid_SB("Registeration Done");
          gotoHome("");
          return;
        }

        if (response.message) {
          setLoad(false);
          utilsS.AlertMessage("", response.message);
          return;
        }

        setLoad(false);
        return;
      })
      .catch((e) => {
        setLoad(false);
        utilsS.AlertMessage("", "Network request failed");
        console.error("Register Profile catch error : ", e);
        return;
      });
  };

  const onFileUpload = (method, bodyData, header) => {
    db.api
      .apiCall(method, db.link.uploadFile, bodyData, header)
      .then((response) => {
        console.log("uploadFile response : ", response);

        if (response) {
          PushNotification.configure({
            onRegister: function (token) {
              usermanager.addnotificationToken(token.token);
              console.log("Token found to update : ", token);
              const header = "";
              const bodyData = {
                fullname: name,
                mobile_number: usermanager.mobile,
                email: email,
                gender: gender,
                profile_image: response,
                is_active: true,
                registration_token: token.token,
              };
              onRegisterProfile("post", bodyData, header);
            },
          });

          return;
        } else {
          setLoad(false);
          utilsS.AlertMessage("", " response error");
          return;
        }
      })
      .catch((e) => {
        setLoad(false);
        utilsS.AlertMessage("", "Network request failed");
        console.error("uploadFile  catch error : ", e);
        return;
      });
  };

  const Register = () => {
    if (dp != "") {
      const bodyData = new FormData();
      const newFile = {
        uri: dp.uri,
        type: dp.type,
        name: "image" + dp + ".jpg",
        //  base64String: dp.base64
      };
      bodyData.append("files", newFile);
      const header = "upload";

      onFileUpload("post", bodyData, header);
    } else {
      PushNotification.configure({
        onRegister: function (token) {
          usermanager.addnotificationToken(token.token);
          console.log("Token found to update : ", token);

          const header = "";
          const bodyData = {
            fullname: name,
            mobile_number: usermanager.mobile,
            email: email,
            gender: gender,
            profile_image: dp,
            is_active: true,
            registration_token: token.token,
          };

          onRegisterProfile("post", bodyData, header);
        },
      });
    }
  };

  const Continue = () => {
    setLoad(true);
    setTimeout(() => {
      Register();
    }, 1000);
  };

  const setValues = (v, value) => {
    if (v == "name") {
      setName(value);
      setIsEmptyName(false);
      setIsInvalidName(false);
    }

    if (v == "age") {
      setAge(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""));
      setIsEmptyAge(false);
    }

    if (v == "cnic") {
      setCnic(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""));
      setIsEmptyCnic(false);
      setIsInvalidCnic(false);
    }

    if (v == "email") {
      setEmail(value);
      setIsEmptyEmail(false);
      setIsInvalidEmail(false);
    }

    if (v == "password") {
      setPassword(value);
      setIsEmptyPassword(false);
      setIsInvalidPassword(false);
    }

    if (v == "cpassword") {
      setcPassword(value);
      setIsEmptycPassword(false);
      setIsInvalidcPassword(false);
    }
  };

  const checking = () => {
    // if(dp==""){
    //   focus("dp")
    //   setIsEmptydp(true)
    //   return
    // }

    if (name.length <= 0) {
      focus("name");
      setIsEmptyName(true);
      return;
    }

    if (!utilsS.validation.NameValidate(name)) {
      focus("name");
      setIsInvalidName(true);
      return;
    }

    if (email !== "") {
      if (!utilsS.validation.EmailValidate(email)) {
        focus("email");
        setIsInvalidEmail(true);
        return;
      }
    }

    if (isInternet) {
      Continue();
    } else {
      setshowInternetMessage(true);
    }
  };

  const layout = (event, c) => {
    // if(c=="dp"){
    //   event.target.measure(
    //     (x, y, width, height, pageX, pageY) => {
    //       const obj={x:pageX,y:pageY};setdpOffset(obj)
    //     },
    //   );
    //  }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setisShowDob(false);
    setDob(currentDate);
  };

  const showDob = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={dob}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        maximumDate={new Date()}
        onChange={(e, sd) => {
          onDateChange(e, sd);
        }}
      />
    );
  };

  //callback functions

  const onClickButton = () => {
    clearall();
    checking();
  };

  const handleScroll = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    if (isKeyboardShow) {
      scrollRef?.current?.scrollTo({ x: 0, y: y + 10, animated: false });
    }
    setscrollY(y);
  };

  //render functions

  const renderBottomSheet = () => {
    return (
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            // backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: theme.color.mainColor,
          },
          container: {
            height: "30%",
            width: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: theme.color.bc1,
            elevation: 3,
          },
        }}
      >
        <LinearGradient
          colors={[theme.color.bc1, theme.color.bc2]}
          style={{
            height: "100%",
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={onClickGallery} activeOpacity={0.7}>
              <View
                style={{
                  marginRight: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <utilsS.vectorIcon.FontAwesome
                  name="photo"
                  size={50}
                  color={theme.color.mainColor}
                />
                <Text style={{ color: theme.color.mainColor }}>Gallery</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClickCamera} activeOpacity={0.7}>
              <View
                style={{
                  marginLeft: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <utilsS.vectorIcon.FontAwesome
                  name="camera"
                  size={50}
                  color={theme.color.mainColor}
                />
                <Text style={{ color: theme.color.mainColor }}>Camera</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </RBSheet>
    );
  };

  const Dp = () => {
    return (
      <View
        ref={dpRef}
        onLayout={(event) => {
          layout(event, "dp");
        }}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 50,
        }}
      >
        {/* <LinearGradient
          colors={[theme.color.bc1, theme.color.bc2]}
          style={[
            styles.avatar,
            { borderColor: isEmptydp ? inputErrorColor : "blue" },
          ]}
        > */}
        {dp == "" ? (
          <Image
            source={require("../../assets/images/dp.png")}
            style={{
              width: 125,
              height: 125,
              borderRadius: 62.5,
              // borderWidth: 0.5,
              // borderColor: "silver",
            }}
          />
        ) : (
          <Image
            source={{ uri: dp.uri }}
            style={{
              width: 115,
              height: 115,
              borderRadius: 57.5,
              borderWidth: 0.5,
              borderColor: "silver",
            }}
          />
        )}
        {/* </LinearGradient> */}

        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.upload, { borderColor: "silver" }]}
          onPress={() => {
            refRBSheet?.current?.open();
          }}
        >
          <utilsS.vectorIcon.MaterialIcons
            name="add-a-photo"
            color={theme.color.mainColor}
            size={20}
          />
        </TouchableOpacity>

        {isEmptydp && (
          <View style={{ width: "60%" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.errorMessage}
            >
              Profile Image is required
            </Text>
          </View>
        )}
      </View>
    );
  };

  const Fields = (props) => {
    return (
      <View style={{ marginTop: 20 }}>
        {Dp()}

        <View
          ref={nameRef}
          onLayout={(event) => {
            layout(event, "name");
          }}
        >
          <Text style={styles.titleText}>Name*</Text>
          <Input
            value={name}
            defaultValue={name}
            ref={nameRefi}
            maxLength={maxNameLength}
            placeholder="Jhon"
            placeholderTextColor={inputPlaceHolderColor}
            inputContainerStyle={[
              styles.inputContainer,
              {
                borderColor:
                  isEmptyName || isInvalidName
                    ? inputErrorColor
                    : inputborderColor,
              },
            ]}
            style={styles.input}
            errorStyle={{ color: inputErrorColor }}
            errorMessage={
              isEmptyName
                ? "Please enter your name"
                : isInvalidName
                ? "Name pattern is invalid"
                : ""
            }
            onChangeText={(value) => {
              setValues("name", value);
            }}
          />
          {name.length > 0 && (
            <Text
              style={[
                styles.showLength,
                {
                  color:
                    isEmptyName || isInvalidName
                      ? inputErrorColor
                      : theme.color.subtitleColor,
                },
              ]}
            >
              ({name.length}/{maxNameLength})
            </Text>
          )}
        </View>

        <View
          ref={emailRef}
          onLayout={(event) => {
            layout(event, "email");
          }}
        >
          <Text style={styles.titleText}>E-mail (optional)</Text>
          <Input
            value={email}
            defaultValue={email}
            maxLength={maxEmailLength}
            ref={emailRefi}
            placeholder="Jhon@gmail.com"
            placeholderTextColor={inputPlaceHolderColor}
            inputContainerStyle={[
              styles.inputContainer,
              {
                borderColor:
                  isEmptyEmail || isInvalidEmail
                    ? inputErrorColor
                    : inputborderColor,
              },
            ]}
            style={styles.input}
            errorStyle={{ color: inputErrorColor }}
            errorMessage={
              isEmptyEmail
                ? "Please enter your email"
                : isInvalidEmail
                ? "Email pattern is invalid"
                : ""
            }
            onChangeText={(value) => {
              setValues("email", value);
            }}
          />
          {email.length > 0 && (
            <Text
              style={[
                styles.showLength,
                {
                  color:
                    isEmptyEmail || isInvalidEmail
                      ? inputErrorColor
                      : theme.color.subtitleColor,
                },
              ]}
            >
              ({email.length}/{maxEmailLength})
            </Text>
          )}
        </View>

        <View ref={genderRef}>
          <Text style={styles.titleText}>Gender*</Text>
          <View
            style={{
              width: "95%",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center",
              marginTop: 5,
              marginBottom: 20,
            }}
          >
            <View style={{ width: "47%" }}>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => setGender("male")}
              >
                <LinearGradient
                  colors={
                    gender == "male"
                      ? [theme.color.bc1, theme.color.bc2]
                      : [theme.color.mainColor, theme.color.mainColor]
                  }
                  style={styles.LinearGradientGender}
                >
                  <Text
                    style={[
                      styles.genterTitle,
                      {
                        color:
                          gender == "male"
                            ? theme.color.mainColor
                            : theme.color.titleColor,
                      },
                    ]}
                  >
                    Male
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{ width: "47%" }}>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => setGender("female")}
              >
                <LinearGradient
                  colors={
                    gender == "female"
                      ? [theme.color.bc1, theme.color.bc2]
                      : [theme.color.mainColor, theme.color.mainColor]
                  }
                  style={styles.LinearGradientGender}
                >
                  <Text
                    style={[
                      styles.genterTitle,
                      {
                        color:
                          gender == "female"
                            ? theme.color.mainColor
                            : theme.color.titleColor,
                      },
                    ]}
                  >
                    Female
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  function Button(props) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.Button}
        onPress={() => onClickButton()}
      >
        <LinearGradient
          colors={[theme.color.bc1, theme.color.bc2]}
          style={styles.LinearGradient}
        >
          <Text style={styles.ButtonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function Title3(props) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", top: 5 }}>
        <Text style={styles.title3}>Already have an account ?</Text>
        <TouchableOpacity
          onPress={() => {
            gotoNext("Login");
          }}
        >
          <Text style={styles.title4}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <utilsS.stackHeader
        title="Complete Profile"
        screen="RegisterProfile"
        scrollY={scrollY}
        nav={AUTH_NAV_ID}
      />
      {showInternetMessage && (
        <utils.topMessage msg="No Internet Connection !" />
      )}
      <utilsS.Loader
        load={load}
        title="Please wait ..."
        screen="RegisterProfile"
      />

      <KeyboardAvoidingView
        keyboardShouldPersistTaps="always"
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          onScroll={(e) => handleScroll(e)}
          contentContainerStyle={styles.body}
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
        >
          {Fields()}
        </ScrollView>
      </KeyboardAvoidingView>

      <CardView cardElevation={20} cardMaxElevation={20}>
        <View
          style={{
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button />
          {/* <Title3/> */}
        </View>
      </CardView>

      {renderBottomSheet()}
      {isShowDob && showDob()}
    </SafeAreaProvider>
  );
});

export default RegisterProfile;
