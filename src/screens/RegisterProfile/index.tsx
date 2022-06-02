import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Keyboard,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal as MModal,
} from "react-native";

import styles from "./styles";
import Modal from "react-native-modal";

import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

import { CheckBox } from "react-native-elements";
import theme from "../../theme";
import NetInfo from "@react-native-community/netinfo";
import { WebView } from "react-native-webview";
import Message from "../../theme/message";

import MultipleImagePicker from "@baronha/react-native-multiple-image-picker";
import { Image as ImageCompressor } from "react-native-compressor";
import Feather from "react-native-vector-icons/Feather";
import DropDown from "../../theme/DropDown";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { usermanager } from "../../managers/UserManager";
import { generalmanager } from "../../managers/generalManager";
import { observer } from "mobx-react";

interface Props {}
const RegisterProfile = observer((props: Props) => {
  const city = usermanager.city;
  const phone = usermanager.mobile;

  const mobileReg = /^[0][3]\d{9}$/;
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const cnicReg = /\d{5}\d{8}\d/;

  const [isDropDownCity, setisDropDownCity] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState(city[0]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCNIC] = useState("");
  const [mobile, setmobile] = useState(phone);
  const [dob, setDOB] = useState("");
  const [cnicFrontImage, setCnicFrontImage] = useState(null);
  const [cnicBackImage, setCnicBackImage] = useState(null);
  const [licenseFrontImage, setlicenseFrontImage] = useState(null);
  const [licenseBackImage, setlicenseBackImage] = useState(null);
  const [gender, setGender] = useState("male");

  const [terms, setTerms] = useState(false);
  const [isTermsLoad, setIsTermsLoad] = useState(false);
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const [putshow, setPUTShow] = useState(false);
  const [pvm, setpvm] = useState(false); //show fulll image modal
  const [pv, setpv] = useState(""); //photo view

  const [isEmptyMobile, setIsEmptyMobile] = useState(false);
  const [invalidMobile, setInValidMobile] = useState(false);
  const [invalidCNIC, setInValidCNIC] = useState(false);
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [invalidName, setInValidName] = useState(false);
  const [isEmptyCity, setIsEmptyCity] = useState(false);
  const [isEmptyImage, setIsEmptyImage] = useState(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptyCnic, setIsEmptyCnic] = useState(false);
  const [isEmptydob, setIsEmptydob] = useState(false);
  const [isEmptyAddress, setIsEmptyAddress] = useState(false);
  const [invalidAddress, setInValidAddress] = useState(false);
  const [invalidEmail, setInValidEmail] = useState(false);
  const [cnicFrontUploaded, setcnicFrontUploaded] = useState(true);
  const [cnicBackUploaded, setcnicBackUploaded] = useState(true);
  const [licenseFrontUploaded, setlicenseFrontUploaded] = useState(true);
  const [licenseBackUploaded, setlicenseBackUploaded] = useState(true);

  const [cnicOffSet, setcnicOffSet] = useState(null);
  const [cnicImgOffSet, setcnicImgOffSet] = useState(null);
  const [licenseImgOffSet, setlicenseImgOffSet] = useState(null);

  const [edit, setEdit] = useState(true);
  const [imgDisable, setimgDisable] = useState(false);
  const [mobileDisable, setmobileDisable] = useState(true);
  const [fnDisable, setfnDisable] = useState(false);
  const [cityDisable, setcityDisable] = useState(false);
  const [emailDisable, setemailDisable] = useState(false);
  const [addressDisable, setaddressDisable] = useState(false);
  const [cnicDisable, setcnicDisable] = useState(false);
  const [dobDisable, setdobDisable] = useState(false);
  const [cnicImgDisable, setcnicImgDisable] = useState(false);
  const [licenseImgDisable, setlicenseImgDisable] = useState(false);
  const [genderDisable, setgenderDisable] = useState(false);

  const scrollRef = useRef(null);
  const toast = useRef(null);
  const dpRef = useRef(null);
  const mobileRef = useRef(null);
  const nameRef = useRef(null);
  const cityRef = useRef(null);
  const emailRef = useRef(null);
  const adrsRef = useRef(null);
  const cnicRef = useRef(null);
  const dobRef = useRef(null);
  const cnicImgRef = useRef(null);
  const licenseImgRef = useRef(null);
  const gendetRef = useRef(null);

  let requireField = edit ? "*" : "";
  let msg = "is required.";
  let msg2 = "is invalid.";
  let profileError = `Profile image ${msg}`;
  let nameError = `Full name ${msg}`;
  let invalidNameError = `Full name ${msg2}`;
  let cityError = `Select city ${msg}`;
  let emailError = `Email ${msg}`;
  let invalidEmailError = `Email ${msg2}`;
  let addressError = `Address ${msg}`;
  let invalidAddressError = `Address ${msg2}`;
  let cnicError = `Cnic ${msg}`;
  let invalidCnicError = `Cnic ${msg2}`;
  let mobileError = `Mobile num ${msg}`;
  let invalidMobileError = `Mobile num ${msg2}`;
  let dobError = `Date of birth ${msg}`;
  let cnincInvalidMessage = !cnicFrontUploaded
    ? `CNIC Front Image ${msg}`
    : `CNIC Back Image ${msg}`;
  let licenseInvalidMessage = !licenseFrontUploaded
    ? `License Front Image ${msg}`
    : `License Back Image ${msg}`;

  const MultipleImage = async (button) => {
    Keyboard.dismiss();
    closeAllDropDown();
    if (button == "CNICFront" || button == "CNICBack") {
      setcnicFrontUploaded(true);
      setcnicBackUploaded(true);
    }
    if (button == "licenseFront" || button == "licenseBack") {
      setlicenseFrontUploaded(true);
      setlicenseBackUploaded(true);
    }

    try {
      let options = {
        mediaType: "image",
        isPreview: false,
        singleSelectedMode: true,
      };
      const res = await MultipleImagePicker.openPicker(options);
      if (res) {
        console.log("mutipicker image res true  ");
        const { path, fileName, mime } = res;
        let uri = path;
        if (Platform.OS == "android" && generalmanager.apiLevel < 29) {
          uri = "file://" + uri;
        }

        ImageCompressor.compress(uri, {
          compressionMethod: "auto",
        })
          .then(async (res) => {
            let imageObject = {
              uri: res,
              type: mime,
              fileName: fileName,
            };
            console.log("Compress image  : ", imageObject);
            if (button == "Profile") {
              setImage(imageObject);
            } else if (button == "CNICFront") {
              setCnicFrontImage(imageObject);
            } else if (button == "CNICBack") {
              setCnicBackImage(imageObject);
            } else if (button == "licenseFront") {
              setlicenseFrontImage(imageObject);
            } else if (button == "licenseBack") {
              setlicenseBackImage(imageObject);
            } else {
              return;
            }
          })
          .catch((err) => {
            console.log("Image compress error : ", err);
          });
      }
    } catch (error) {
      console.log("multi photo picker error : ", error);
    }
  };

  const focus = (c) => {
    if (
      c == "image" ||
      c == "name" ||
      c == "city" ||
      c == "email" ||
      c == "address"
    ) {
      scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
    }

    if (c == "cnic" || c == "mobile") {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: cnicOffSet.y + 60,
        animated: true,
      });
    }

    if (c == "cnicImg") {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: cnicImgOffSet.y + 150,
        animated: true,
      });
    }

    if (c == "licesneImg") {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: licenseImgOffSet.y + 150,
        animated: true,
      });
    }
  };

  const closeAllDropDown = () => {
    setisDropDownCity(false);
    clearAllError();
  };

  const clearAllError = () => {
    setIsEmptyImage(false);
    setIsEmptyName(false);
    setInValidName(false);
    setIsEmptyCity(false);
    setIsEmptyEmail(false);
    setInValidEmail(false);
    setIsEmptyAddress(false);
    setInValidAddress(false);
    setInValidCNIC(false);
    setInValidMobile(false);
    setIsEmptyMobile(false);
    setIsEmptydob(false);
    setcnicFrontUploaded(true);
    setcnicBackUploaded(true);
    setlicenseFrontUploaded(true);
    setlicenseBackUploaded(true);
    setIsEmptyCnic(false);
  };

  const Continue = () => {
    console.log("Continue");
    closeAllDropDown();
    Keyboard.dismiss();

    if (image === "") {
      console.log("image");
      focus("image");
      setIsEmptyImage(true);
      return;
    }

    if (name.trim().length == 0) {
      console.log("Name");
      focus("name");
      setIsEmptyName(true);
      return;
    }

    if (selectedCity == "") {
      console.log("City");
      focus("city");
      setIsEmptyCity(true);
      return;
    }

    if (email != "" && email.trim().length != 0) {
      if (emailReg.test(email.trim()) === false) {
        console.log("Invalid Email");
        focus("email");
        setInValidEmail(true);
        return;
      }
    }

    // if (cnic == "") {
    //   console.log("CNIC");
    //   focus("cnic");
    //   setIsEmptyCnic(true);
    //   return;
    // }

    // if (cnic.trim().length < 13) {
    //   console.log("CNIC");
    //   focus("cnic");
    //   setInValidCNIC(true);
    //   return;
    // }

    // if (cnicFrontImage === null) {
    //   console.log("CNIC Front");
    //   focus("cnicImg");
    //   setcnicFrontUploaded(false);
    //   return;
    // }

    // if (cnicBackImage === null) {
    //   console.log("CNIC Back");
    //   focus("cnicImg");
    //   setcnicBackUploaded(false);
    //   return;
    // }

    // if (licenseFrontImage === null) {
    //   console.log("license Front");
    //   focus("licenseImg");
    //   setlicenseFrontUploaded(false);
    //   return;
    // }

    // if (licenseBackImage === null) {
    //   console.log("license Back");
    //   focus("licenseImg");
    //   setlicenseBackUploaded(false);
    //   return;
    // }

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        usermanager.attemptToRegister(
          name,
          selectedCity._id,
          email.toLowerCase(),
          gender,
          // address,
          // cnic,
          image,
          // cnicFrontImage,
          // cnicBackImage,
          // licenseFrontImage,
          // licenseBackImage,
          phone
        );
      } else {
        Alert.alert("Network Error", "Please connect internet.");
      }
    });
  };

  const openTerms = () => {
    closeAllDropDown();
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setOpenTermsAndConditions(true);
      } else {
        Alert.alert("Network Error", "Please connect internet.");
      }
    });
  };

  const renderOpenTermsAndCondition = () => {
    return (
      <Modal
        isVisible={openTermsAndConditions}
        backdropOpacity={0.5}
        animationInTiming={1000}
        backdropTransitionInTiming={1000}
        animationOutTiming={500}
        style={{ margin: 0, padding: 0 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={700}
        onRequestClose={() => {
          setOpenTermsAndConditions(false);
          setIsTermsLoad(false);
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            source={{
              uri: "http://deliver-it-mini-website.s3-website.ap-south-1.amazonaws.com/privacy-policy-app",
            }}
            javaScriptEnabled={true}
            onLoad={() => {
              setIsTermsLoad(true);
            }}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setOpenTermsAndConditions(false);
              setIsTermsLoad(false);
            }}
            style={styles.BottomButtonwebview}
          >
            <LinearGradient
              colors={["#f25526", "#f25526"]}
              style={styles.LinearGradientwebview}
            >
              <Text style={styles.buttonTextBottomwebview}>Close</Text>
            </LinearGradient>
          </TouchableOpacity>

          {!isTermsLoad && (
            <View style={styles.loaderwebview}>
              <ActivityIndicator color={theme.colors.primary} size={40} />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    );
  };

  const renderDropDown = (c) => {
    let data = [];

    if (c == "city") {
      data = city;
    }

    const onclickSelect = (d) => {
      if (c == "city") {
        setSelectedCity(d);
      }
    };

    console.log("drop down data : ", data);
    let abs = Platform.OS == "ios" ? false : true;
    return (
      <DropDown
        data={data}
        onSelectItem={(d) => {
          onclickSelect(d);
        }}
        setVisible={(d) => {
          closeAllDropDown();
        }}
        search={true}
        c={c}
        absolute={abs}
      />
    );
  };

  const renderFullImage = () => {
    return (
      <MModal
        visible={pvm}
        transparent
        onRequestClose={() => {
          setpvm(false);
          setpv("");
        }}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            resizeMode="contain"
            source={{ uri: pv }}
          />

          <TouchableOpacity
            onPress={() => {
              setpvm(!pvm);
              setpv("");
            }}
            style={styles.fullImageModalCross}
          >
            <Entypo name="cross" color="white" size={35} />
          </TouchableOpacity>
        </View>
      </MModal>
    );
  };

  const onclickImage = (c) => {
    Keyboard.dismiss();
    closeAllDropDown();

    if (c == "cnicFV") {
      setpv(cnicFrontImage.uri);
      setpvm(true);
      return;
    }

    if (c == "cnicBV") {
      setpv(cnicBackImage.uri);
      setpvm(true);
      return;
    }

    if (c == "licenseFV") {
      setpv(licenseFrontImage.uri);
      setpvm(true);
      return;
    }

    if (c == "licenseBV") {
      setpv(licenseBackImage.uri);
      setpvm(true);
      return;
    }

    if (c == "profileV") {
      setpv(image.uri);
      setpvm(true);
      return;
    }

    MultipleImage(c);
  };

  const renderBottonButton = () => {
    let disable = usermanager.regloading || !terms ? true : false;
    let text = "Continue";

    return (
      <TouchableOpacity
        onPress={Continue}
        disabled={disable}
        style={styles.Button}
      >
        {!disable ? (
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primary_light]}
            style={styles.LinearGradient}
          >
            <Text style={styles.ButtonText}>{text}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.ButtonText}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  };

  console.log("reg load : ", usermanager.regloading);

  const renderUploadImageModal = () => {
    return (
      <Message
        load={usermanager.regloading}
        fast={true}
        title={
          usermanager.isAllImageUploadDone
            ? "Registering Profile"
            : "Uploading images (" +
              usermanager.done +
              "/" +
              usermanager.total +
              ")"
        }
      />
    );
  };

  const renderShowError = (v) => {
    let text = isEmptyImage
      ? profileError
      : isEmptyName
      ? nameError
      : invalidName
      ? invalidNameError
      : isEmptyCity
      ? cityError
      : isEmptyEmail
      ? emailError
      : invalidEmail
      ? invalidEmailError
      : isEmptyAddress
      ? addressError
      : invalidAddress
      ? invalidAddressError
      : isEmptyCnic
      ? cnicError
      : invalidCNIC
      ? invalidCnicError
      : isEmptydob
      ? dobError
      : v == "cnicImages"
      ? cnincInvalidMessage
      : v == "licenseImages"
      ? licenseInvalidMessage
      : "";

    return (
      <Text style={[styles.ErrorMessage, { marginTop: v == "image" ? 10 : 0 }]}>
        {text}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={theme.colors.containerBackground}
      />
      <theme.StackHeader
        nav={props.navigation}
        title={"Complete Profile"}
        screen="completeprofile"
      />
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={styles.Body}>
            <View ref={dpRef} style={styles.Profile}>
              <View style={styles.ProfileImageContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Keyboard.dismiss();
                    if (image != "") {
                      onclickImage("profileV");
                    }
                  }}
                >
                  <Image
                    style={styles.ProfileImage}
                    source={
                      image != ""
                        ? { uri: image.uri }
                        : require("../../assets/images/profileimage.png")
                    }
                  />
                </TouchableOpacity>
                {!imgDisable && edit && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      onclickImage("Profile");
                    }}
                    style={styles.ImageUploadConatiner}
                  >
                    <Ionicons name="ios-camera" color={"black"} size={19} />
                  </TouchableOpacity>
                )}
              </View>
              {isEmptyImage && renderShowError("image")}
            </View>

            <View ref={nameRef} style={[styles.Form, { marginTop: 30 }]}>
              <View style={styles.FormTitle}>
                <Text style={styles.FormTextLeft}>Full Name{requireField}</Text>
                <Text style={styles.FormTextRight}>City{requireField}</Text>
              </View>
              <View style={styles.FormTitle1}>
                <View style={{ width: "47%" }}>
                  <View style={!fnDisable ? styles.Input : styles.InputD}>
                    <TextInput
                      editable={!fnDisable}
                      onFocus={() => closeAllDropDown()}
                      style={styles.TextInput}
                      onChangeText={(val) => {
                        setName(val);
                        setIsEmptyName(false);
                      }}
                    />
                  </View>
                  {isEmptyName && renderShowError("name")}
                  {invalidName && renderShowError("name")}
                </View>

                <View style={{ width: "47%" }}>
                  <TouchableOpacity
                    disabled={cityDisable}
                    onPress={() => {
                      closeAllDropDown();
                      setisDropDownCity(!isDropDownCity);
                    }}
                    activeOpacity={0.4}
                    style={!cityDisable ? styles.Box : styles.BoxD}
                  >
                    <View style={{ width: "90%" }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          styles.ChargesTextloc,
                          {
                            color: selectedCity.city_name
                              ? "black"
                              : theme.colors.primary,
                          },
                        ]}
                      >
                        {selectedCity.city_name ? selectedCity.city_name : ""}
                      </Text>
                    </View>
                    <AntDesign
                      name="down"
                      style={{ opacity: 0.7 }}
                      color={theme.colors.textSubtitleColor}
                      size={12}
                    />
                  </TouchableOpacity>
                  {isEmptyCity && renderShowError("city")}
                  {isDropDownCity && renderDropDown("city")}
                </View>
              </View>
            </View>

            <View ref={emailRef} style={styles.Form}>
              <View style={styles.FormTitle}>
                <Text style={styles.FormTextEmail}>Email</Text>
              </View>
              <View style={styles.FormTitle1}>
                <View
                  style={!emailDisable ? styles.EmailInput : styles.EmailInputD}
                >
                  <TextInput
                    editable={!emailDisable}
                    onFocus={() => closeAllDropDown()}
                    style={styles.TextInput}
                    onChangeText={(val) => {
                      setEmail(val);
                      setInValidEmail(false);
                    }}
                  />
                </View>
              </View>
              {isEmptyEmail && renderShowError("email")}
              {invalidEmail && renderShowError("email")}
            </View>

            <View style={styles.Form}>
              <View style={styles.FormTitle}>
                <Text style={styles.FormTextEmail}>Mobile{requireField}</Text>
              </View>
              <View style={styles.FormTitle1}>
                <TouchableOpacity
                  disabled={mobileDisable}
                  style={
                    !mobileDisable ? styles.EmailInput : styles.EmailInputD
                  }
                >
                  <Text> {mobile}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.Form}>
              <View style={styles.FormTitle}>
                <Text style={styles.FormTextEmail}>Gender{requireField}</Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10,
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
                        ? [theme.colors.primary, theme.colors.primary_light]
                        : ["white", "white"]
                    }
                    style={styles.LinearGradientGender}
                  >
                    <Text
                      style={[
                        styles.genterTitle,
                        {
                          color: gender == "male" ? "white" : "black",
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
                        ? [theme.colors.primary, theme.colors.primary_light]
                        : ["white", "white"]
                    }
                    style={styles.LinearGradientGender}
                  >
                    <Text
                      style={[
                        styles.genterTitle,
                        {
                          color: gender == "female" ? "white" : "black",
                        },
                      ]}
                    >
                      Female
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View ref={adrsRef} style={styles.Form}>
              <View style={styles.FormTitle}>
                <Text style={styles.FormTextEmail}>Address</Text>
              </View>
              <View style={styles.FormTitle1}>
                <View
                  style={
                    !addressDisable ? styles.EmailInput : styles.EmailInputD
                  }
                >
                  <TextInput
                    editable={!addressDisable}
                    onFocus={() => closeAllDropDown()}
                    style={styles.TextInput}
                    onChangeText={(val) => {
                      setAddress(val);
                      setIsEmptyAddress(false);
                    }}
                  />
                </View>
                {isEmptyAddress && renderShowError("address")}
                {invalidAddress && renderShowError("address")}
              </View>
            </View>

            <View style={styles.Form}>
              <View style={styles.FormTitle}>
                <Text style={styles.FormTextLeft}>CNIC{requireField}</Text>
                <Text style={styles.FormTextRight}>Mobile{requireField}</Text>
              </View>
              <View style={styles.FormTitle1}>
                <View
                  ref={cnicRef}
                  onLayout={({ nativeEvent }) => {
                    setcnicOffSet(nativeEvent.layout);
                  }}
                  style={{ width: "47%" }}
                >
                  <View style={!cnicDisable ? styles.Input : styles.InputD}>
                    <TextInput
                      editable={!cnicDisable}
                      onFocus={() => closeAllDropDown()}
                      style={styles.TextInput}
                      maxLength={13}
                      value={cnic}
                      keyboardType="numeric"
                      onChangeText={(val) => {
                        setCNIC(val.replace(/[^0-9]/, ""));
                        setInValidCNIC(false);
                      }}
                    />
                  </View>
                  {isEmptyCnic && renderShowError("cnic")}
                  {invalidCNIC && renderShowError("cnic")}
                </View>

                <View style={{ width: "47%" }}>
                  <TouchableOpacity
                    disabled={mobileDisable}
                    style={
                      !mobileDisable ? styles.EmailInput : styles.EmailInputD
                    }
                  >
                    <Text> {mobile}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.cnicForm}>
              <View style={styles.cnicImgConatiner}>
                <View
                  style={{ width: "47%" }}
                  ref={cnicImgRef}
                  onLayout={({ nativeEvent }) => {
                    setcnicImgOffSet(nativeEvent.layout);
                  }}
                >
                  <View style={styles.cnicImageBoxContainer}>
                    <View style={styles.cnicImageTextBox}>
                      <Text style={styles.cnicImageBoxText}>
                        CNIC Front{requireField}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        cnicFrontImage == null
                          ? onclickImage("CNICFront")
                          : onclickImage("cnicFV")
                      }
                      activeOpacity={0.5}
                      style={styles.cnicImageBox}
                    >
                      {cnicFrontImage == null && (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Feather name="upload" color={"grey"} size={18} />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "grey",
                              marginLeft: 5,
                            }}
                          >
                            Upload Image
                          </Text>
                        </View>
                      )}
                      {cnicFrontImage != null && (
                        <Image
                          style={styles.cnicImage}
                          source={{ uri: cnicFrontImage.uri }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  {cnicFrontImage != null && !cnicImgDisable && (
                    <TouchableOpacity
                      onPress={() => {
                        setCnicFrontImage(null);
                      }}
                      activeOpacity={0.4}
                      style={styles.cnicCross}
                    >
                      <Entypo name="cross" color={"white"} size={15} />
                    </TouchableOpacity>
                  )}

                  {!cnicFrontUploaded && renderShowError("cnicImages")}
                </View>

                <View style={{ width: "47%" }}>
                  <View style={styles.cnicImageBoxContainer}>
                    <View style={styles.cnicImageTextBox}>
                      <Text style={styles.cnicImageBoxText}>
                        CNIC Back{requireField}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        cnicBackImage == null
                          ? onclickImage("CNICBack")
                          : onclickImage("cnicBV")
                      }
                      activeOpacity={0.5}
                      style={styles.cnicImageBox}
                    >
                      {cnicBackImage == null && (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Feather name="upload" color={"grey"} size={18} />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "grey",
                              marginLeft: 5,
                            }}
                          >
                            Upload Image
                          </Text>
                        </View>
                      )}
                      {cnicBackImage != null && (
                        <Image
                          style={styles.cnicImage}
                          source={{ uri: cnicBackImage.uri }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {cnicBackImage != null && !cnicImgDisable && (
                    <TouchableOpacity
                      onPress={() => {
                        setCnicBackImage(null);
                      }}
                      activeOpacity={0.4}
                      style={styles.cnicCross}
                    >
                      <Entypo name="cross" color={"white"} size={15} />
                    </TouchableOpacity>
                  )}
                  {!cnicBackUploaded && renderShowError("cnicImages")}
                </View>
              </View>
            </View>

            <View style={styles.cnicForm}>
              <View style={styles.cnicImgConatiner}>
                <View
                  style={{ width: "47%" }}
                  ref={licenseImgRef}
                  onLayout={({ nativeEvent }) => {
                    setlicenseImgOffSet(nativeEvent.layout);
                  }}
                >
                  <View style={styles.cnicImageBoxContainer}>
                    <View style={styles.cnicImageTextBox}>
                      <Text style={styles.cnicImageBoxText}>
                        License Front{requireField}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        licenseFrontImage == null
                          ? onclickImage("licenseFront")
                          : onclickImage("licenseFV")
                      }
                      activeOpacity={0.5}
                      style={styles.cnicImageBox}
                    >
                      {licenseFrontImage == null && (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Feather name="upload" color={"grey"} size={18} />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "grey",
                              marginLeft: 5,
                            }}
                          >
                            Upload Image
                          </Text>
                        </View>
                      )}
                      {licenseFrontImage != null && (
                        <Image
                          style={styles.cnicImage}
                          source={{ uri: licenseFrontImage.uri }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  {licenseFrontImage != null && !licenseImgDisable && (
                    <TouchableOpacity
                      onPress={() => {
                        setlicenseFrontImage(null);
                      }}
                      activeOpacity={0.4}
                      style={styles.cnicCross}
                    >
                      <Entypo name="cross" color={"white"} size={15} />
                    </TouchableOpacity>
                  )}

                  {!licenseFrontUploaded && renderShowError("licenseImages")}
                </View>

                <View style={{ width: "47%" }}>
                  <View style={styles.cnicImageBoxContainer}>
                    <View style={styles.cnicImageTextBox}>
                      <Text style={styles.cnicImageBoxText}>
                        License Back{requireField}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        licenseBackImage == null
                          ? onclickImage("licenseBack")
                          : onclickImage("licenseBV")
                      }
                      activeOpacity={0.5}
                      style={styles.cnicImageBox}
                    >
                      {licenseBackImage == null && (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Feather name="upload" color={"grey"} size={18} />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "grey",
                              marginLeft: 5,
                            }}
                          >
                            Upload Image
                          </Text>
                        </View>
                      )}
                      {licenseBackImage != null && (
                        <Image
                          style={styles.cnicImage}
                          source={{ uri: licenseBackImage.uri }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {licenseBackImage != null && !licenseImgDisable && (
                    <TouchableOpacity
                      onPress={() => {
                        setlicenseBackImage(null);
                      }}
                      activeOpacity={0.4}
                      style={styles.cnicCross}
                    >
                      <Entypo name="cross" color={"white"} size={15} />
                    </TouchableOpacity>
                  )}
                  {!licenseBackUploaded && renderShowError("licenseImages")}
                </View>
              </View>
            </View> */}

            <View style={{ marginTop: 25 }}>
              <TouchableOpacity
                onPress={() => {
                  openTerms();
                }}
              >
                <Text style={styles.Terms}>Terms and conditions</Text>
              </TouchableOpacity>
              <CheckBox
                title="I agree to terms and conditions"
                checked={terms}
                onPress={() => setTerms(!terms)}
                checkedColor={theme.colors.primary}
                containerStyle={styles.Checkbox}
              />
            </View>

            {renderBottonButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {pvm && renderFullImage()}
      {renderOpenTermsAndCondition()}

      {renderUploadImageModal()}
    </SafeAreaView>
  );
});

export default RegisterProfile;
