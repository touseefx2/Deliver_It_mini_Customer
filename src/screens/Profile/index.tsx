import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Keyboard,
  Platform,
  Modal as MModal,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

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
import utils from "../../utils/index";
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker";
import { Image as ImageCompressor } from "react-native-compressor";
import Modal from "react-native-modal";
import { RadioButton } from "react-native-paper";
import utilsS from "../../utilsS";
import { generalmanager } from "../../managers/generalManager";
import db from "../../database/index";

interface Props {}
const Profile = observer((props: Props) => {
  const [lang, setLang] = React.useState("English");
  const [isModalVisible, setModalVisible] = useState(false);
  const [imgLoad, setimgLoad] = useState(false);
  const [showfullimagLoader, setshowfullimagLoader] = useState(false);
  const [pvm, setpvm] = useState(false); //show fulll image modal
  const [pv, setpv] = useState(""); //photo view
  const [load, setLoad] = useState(false);
  const [image, setImage] = useState("");

  const [isMessage, setisMessage] = useState(false);

  useEffect(() => {
    if (usermanager.user) {
      setImage(usermanager.user.profile_image || "");
    }
  }, [usermanager.user]);

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

  const MultipleImage = async (button) => {
    Keyboard.dismiss();

    // if (button == 'CNICFront' || button == 'CNICBack') {
    //   setcnicFrontUploaded(true);
    //   setcnicBackUploaded(true);
    // }
    // if (button == 'licenseFront' || button == 'licenseBack') {
    //   setlicenseFrontUploaded(true);
    //   setlicenseBackUploaded(true);
    // }

    let apiLevel = generalmanager.apiLevel;
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
        if (Platform.OS == "android" && apiLevel < 29) {
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
              // setCnicFrontImage(imageObject);
            } else if (button == "CNICBack") {
              // setCnicBackImage(imageObject);
            } else if (button == "licenseFront") {
              // setlicenseFrontImage(imageObject);
            } else if (button == "licenseBack") {
              // setlicenseBackImage(imageObject);
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

  const onclickImage = (c) => {
    Keyboard.dismiss();

    if (c == "ProfileV") {
      setpv(image.uri || image);
      setpvm(true);
      return;
    }

    MultipleImage(c);
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
            onLoadStart={() => setshowfullimagLoader(false)}
            onLoad={() => {
              setshowfullimagLoader(true);
            }}
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

          {!showfullimagLoader && (
            <ActivityIndicator
              size={40}
              color={"blue"}
              style={{
                top: "50%",
                left: "50%",
                right: "50%",
                bottom: "50%",
                position: "absolute",
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              setpvm(!pvm);
              setpv("");
            }}
            style={styles.fullImageModalCross}
          >
            <utils.vectorIcon.Entypo name="cross" color="white" size={35} />
          </TouchableOpacity>
        </View>
      </MModal>
    );
  };

  const uploadImage = () => {
    const data = new FormData();
    const newFile = {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    };
    data.append("files", newFile);
    setLoad(true);
    fetch(db.link.links + db.link.uploadFile, {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        UpdateUser(responseData.locationArray[0].fileLocation);
      })
      .catch((err) => {
        console.log("Error in Upload Images arr", err);
        setLoad(false);
      });
  };

  const UpdateUser = (img) => {
    //update user
    let uid = usermanager.user._id;
    const bodyData = {
      profile_image: img,
    };
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("put", db.link.updateUser + uid, bodyData, header)
      .then((response) => {
        setLoad(false);
        console.log("Update user response : ", response);

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

  return (
    <SafeAreaView style={styles.Container}>
      {pvm && renderFullImage()}
      <utils.Loader p={true} loader={load} />
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

        {image.uri && (
          <TouchableOpacity
            disabled={load}
            onPress={() => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  uploadImage();
                } else {
                  utilsS.AlertMessage("", "Please connect internet !");
                }
              });
            }}
            style={styles.saveButton}
          >
            <Text style={styles.HeaderText2}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 30,
            marginBottom: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              borderColor: "silver",
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image == "" && (
              <utils.vectorIcon.FontAwesome
                name="user-circle"
                color="#0E47A1"
                size={86}
              />
            )}

            {image !== "" && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    onclickImage("ProfileV");
                  }}
                >
                  <Image
                    onLoad={() => {
                      setimgLoad(true);
                    }}
                    style={{ width: 89, height: 89, borderRadius: 44.5 }}
                    source={{ uri: image.uri ? image.uri : image }}
                  />
                  {imgLoad == false && (
                    <ActivityIndicator
                      size={20}
                      color="#0E47A1"
                      style={{ top: 40, position: "absolute" }}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    onclickImage("Profile");
                  }}
                  style={styles.ImageUploadConatiner}
                >
                  <Ionicons name="ios-camera" color={"black"} size={19} />
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={{ width: "64%" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 24,
                textTransform: "capitalize",
                lineHeight: 26,
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
                  lineHeight: 26,
                  color: "grey",
                }}
              >
                {usermanager.user.email}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.Separator}></View>
        <TouchableOpacity onPress={gotoSettings} style={styles.Box}>
          <View style={styles.Icon}>
            <utils.vectorIcon.Feather name="phone" size={18} color={"grey"} />
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
      </ScrollView>
    </SafeAreaView>
  );
});
export default Profile;
