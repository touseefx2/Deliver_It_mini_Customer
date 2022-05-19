// import React, { useState, useEffect } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   StatusBar,
//   TouchableOpacity,
//   SafeAreaView,
//   Platform,
// } from "react-native";
// import { observer } from "mobx-react";
// import { Navigation } from "react-native-navigation";
// import styles from "./styles";
// import { usermanager } from "../../managers/UserManager";
// import { generalmanager } from "../../managers/generalManager";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import utils from "../../utils";
// import CountDown from "react-native-countdown-component";
// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from "react-native-confirmation-code-field";
// import { AUTH_NAV_ID, gotoHome } from "../../navigation";
// import auth from "@react-native-firebase/auth";
// import { fcmService } from "../../services/Notification/FCMService"; //firebase cloud mesaging
// import db from "../../database/index";
// import utilsS from "../../utilsS/index";

// const CELL_COUNT = 6;
// const OTP = observer(() => {
//   const [loader, setloader] = useState(false);

//   const [isFinish, setFinish] = useState(false);

//   const [confirm, setConfirm] = useState(null);

//   const [value, setValue] = useState("");
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });
//   const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

//   async function signInWithPhoneNumber(phoneNumber) {
//     try {
//       setloader(true);
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       setConfirm(confirmation);
//       setloader(false);
//       console.log("cnfrm : ", confirmation);
//     } catch (error) {
//       console.log("signInWithPhoneNumber error : ", error);
//       setValue("");
//       setConfirm(null);
//       setloader(false);
//       var errorMessage = error.message;
//       var si = errorMessage.indexOf("]") + 1;
//       var ei = errorMessage.length - 1;
//       const msg = errorMessage.substr(si, ei);
//       utils.AlertMessage("", msg);
//     }
//   }

//   async function confirmCode() {
//     //   if(confirm!=null){
//     // 	try {
//     // 		 setloader(true)
//     // 		 await confirm.confirm(value);
//     // 		  Continue();
//     // 	  } catch (error) {
//     // 		console.log('Invalid  code : ',error);
//     // 		setloader(false)
//     // 		setValue("");
//     // 		let errorMessage=""

//     // 		if(error.code =='auth/invalid-verification-code'){
//     //           errorMessage="Invalid verification code, Please enter correct confirmation code !"
//     // 		  }else
//     // 		if(error.code =='auth/session-expired'){
//     // 			errorMessage="The sms code has expired or to many invalid code attempt. Please re-send the verification code to try again"
//     // 		  }else
//     // 		if(error.code =='auth/network-request-failed'){
//     // 			errorMessage="Please connect internet and renter confirmation code ! "
//     // 		  }else{
//     // 			var em = error.message;
//     // 			var si  = em.indexOf("]")+1
//     // 			var  ei  = em.length -1
//     // 			errorMessage = em.substr(si,ei)
//     // 		  }

//     // 	 	utils.AlertMessage("",errorMessage)

//     // 		// var errorMessage = error.message;
//     // 		// var si  = errorMessage.indexOf("]")+1
//     // 		// var  ei  = errorMessage.length -1
//     // 		// const msg = errorMessage.substr(si,ei)

//     // 	  }
//     //   }else{
//     // 	//   utils.AlertMessage("","Please wait for sending authentication code through sms .. ");
//     // 	  setValue("")
//     //   }

//     setloader(true);
//     Continue();
//   }

//   const goBack = () => {
//     Navigation.pop(AUTH_NAV_ID);
//   };

//   const checkIsUserRegister = (token) => {
//     usermanager.addnt(token);

//     const bodyData = {
//       mobile_number: usermanager.mobile,
//       registration_token: token, //ntfctn token
//     };
//     const header = "";

//     // method, path, body, header
//     db.api
//       .apiCall("post", db.link.login, bodyData, header)
//       .then((response) => {
//         console.log("checkIsUserRegister response : ", response);

//         if (!response.token) {
//           setloader(false);

//           if (response.message == "User Not Registered") {
//             auth().currentUser?.delete();
//             auth().signOut();
//             gotoRegisterProfile();
//             return;
//           }

//           utils.AlertMessage("", response.message);
//           return;
//         }

//         if (response.token) {
//           auth().currentUser?.delete();
//           auth().signOut();
//           usermanager.setUser(response.data);
//           usermanager.addnotificationToken(token);
//           usermanager.addauthToken(response.token);
//           setloader(false);
//           utilsS.ToastAndroid.ToastAndroid_SB("Login Success");
//           gotoHome();

//           return;
//         }

//         setloader(false);
//         return;
//       })
//       .catch((e) => {
//         setloader(false);
//         setValue("");
//         utils.AlertMessage("", "Network request failed");
//         console.error("checkIsUserRegister catch error : ", e);
//         return;
//       });
//   };

//   const onRegister = (token) => {
//     console.log("[App] onRegister :", token);
//     if (token != null) {
//       checkIsUserRegister(token);
//     } else {
//       setloader(false);
//       utils.AlertMessage("", "Notification token not genereated !");
//     }
//   };

//   const gotoRegisterProfile = () => {
//     Navigation.push(AUTH_NAV_ID, {
//       component: {
//         name: "RegisterProfile",
//         options: {
//           topBar: {
//             visible: false,
//           },
//         },
//       },
//     });
//   };

//   const Continue = () => {
//     if (Platform.OS == "ios") {
//       // fcmService.registerAppwithFCM();//forios
//     } else {
//       fcmService.register(onRegister);
//     }
//   };

//   const reSend = () => {
//     setFinish(false);
//     setValue("");
//     setConfirm(null);
//     setloader(false);
//     signInWithPhoneNumber(usermanager.mobile);
//   };

//   useEffect(() => {
//     //  signInWithPhoneNumber(usermanager.mobile);
//     //   const Subscribe =  auth().onAuthStateChanged( async (user)=> {
//     // 			if (user)  {
//     // 			setloader(true);
//     // 			setTimeout(() => {
//     // 			 Continue()
//     // 			}, 500);
//     // 				}
//     // 		});
//     //  	return()=>{
//     // 				Subscribe(); //remove listener
//     // 			}
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <utils.Loader l={true} loader={loader} />
//       <StatusBar
//         animated={true}
//         barStyle="dark-content"
//         backgroundColor={"#fff"}
//       />
//       {!generalmanager.internet && (
//         <utils.TopMessage msg={"Please Connect internet !"} />
//       )}
//       <View style={styles.Header}>
//         <TouchableOpacity onPress={goBack} style={styles.BackButton}>
//           {/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
//           <Icon name={"arrow-back-ios"} size={16} color={"#000"} />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.title}>Enter your code</Text>
//       <Text style={styles.subtitle}>
//         You will recieve a sms with verification pin on
//       </Text>
//       <Text style={styles.subtitle}>
//         +92 3*****{usermanager.mobile.substring(9, 13)}.
//       </Text>
//       <View style={{ width: "90%", alignSelf: "center" }}>
//         <CodeField
//           ref={ref}
//           {...props}
//           value={value}
//           onChangeText={setValue}
//           onEndEditing={() => confirmCode()}
//           cellCount={CELL_COUNT}
//           rootStyle={styles.codeFieldRoot}
//           keyboardType="number-pad"
//           textContentType="oneTimeCode"
//           renderCell={({ index, symbol, isFocused }) => (
//             <Text
//               key={index}
//               style={[styles.cell, isFocused && styles.focusCell]}
//               onLayout={getCellOnLayoutHandler(index)}
//             >
//               {symbol || (isFocused ? <Cursor /> : null)}
//             </Text>
//           )}
//         />
//       </View>

//       {isFinish ? (
//         <View>
//           <View style={styles.Timer}>
//             <Text style={styles.TimerText}>
//               Did't recieve code? Resend code
//             </Text>
//           </View>
//           {/* <View style={{ flexDirection: 'row', height: 48, width: '90%', alignSelf: 'center', marginTop: 10 }}> */}
//           <TouchableOpacity
//             onPress={reSend}
//             style={{
//               width: "90%",
//               height: 40,
//               backgroundColor: "#0E47A1",
//               borderRadius: 4,
//               alignItems: "center",
//               justifyContent: "center",
//               alignSelf: "center",
//               marginTop: 10,
//             }}
//           >
//             <Text
//               style={{
//                 color: "#fff",
//                 fontSize: 16,
//                 fontFamily: "Inter-Regular",
//               }}
//             >
//               Resend Code
//             </Text>
//           </TouchableOpacity>
//           {/* <TouchableOpacity style={{ width: '47%', position: 'absolute', right: 0, opacity: 0.6, height: '100%', backgroundColor: '#0E47A1', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
// 							<Text style={{ color: '#fff', fontSize: 16,fontFamily:'Inter-Regular' }}><FontAwesome name={'whatsapp'} size={16} color={'#fff'} /> Whatsapp</Text>
// 						</TouchableOpacity> */}
//           {/* </View> */}
//         </View>
//       ) : (
//         <View style={styles.Timer}>
//           {/* <AntDesign name='clockcircleo' size={24} style={styles.TimerText} /> */}
//           <Text style={styles.TimerText}>Resend code:</Text>
//           <CountDown
//             size={14}
//             until={60}
//             onFinish={() => setFinish(true)}
//             digitStyle={{ backgroundColor: "transparent" }}
//             digitTxtStyle={{ color: "grey" }}
//             timeToShow={["S"]}
//             timeLabels={{ s: null }}
//             showSeparator
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// });
// export default OTP;

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import CountDown from "react-native-countdown-component";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import auth from "@react-native-firebase/auth";
import NetInfo from "@react-native-community/netinfo";
import theme from "../../theme";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from "react-native-linear-gradient";
import { inject, observer } from "mobx-react";
import { usermanager } from "../../managers/UserManager";
import { generalmanager } from "../../managers/generalManager";
import { Navigation } from "react-native-navigation";
import { AUTH_NAV_ID } from "../../navigation";

import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";

const getToken = async () => {
  let tok = await messaging().getToken();
  console.log("Token found to update : ", tok);
  usermanager.addnotificationToken(tok);
};

Platform.OS === "android"
  ? PushNotification.configure({
      onRegister: function (token) {
        usermanager.addnotificationToken(token.token);
        console.log("Token found to update : ", token);
      },
    })
  : getToken();

const CELL_COUNT = 6;
const OTP = observer(() => {
  const { internet } = generalmanager;
  const { setLoadingTrue, attemptToLogin, setLoadingFalse, loading } =
    usermanager;

  const mobile = usermanager.mobile;

  let resendTime = 60; //second

  const [loader, setLoader] = useState(false);
  // const [loader, setLoader] = useState(true);
  const [seconds, setSeconds] = useState(resendTime);
  const [isFinish, setFinish] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);
  const [value, setValue] = useState("");
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  useEffect(() => {
    // SendOtpCode();
    // const Subscribe = auth().onAuthStateChanged(async (user) => {
    //   if (user) {
    //     console.log("user");
    //     setLoadingTrue();
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     usermanager.addnotificationToken(token.token);
    //     console.log("Token found to update : ", token);
    //     attemptToLogin(mobile, token.token);
    //   },
    // });
    //   }
    // });
    // return () => {
    //   Subscribe(); //remove listener
    // };
  }, []);

  async function SendOtpCode() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setLoader(true);
        auth()
          .signInWithPhoneNumber(mobile)
          .then((res) => {
            console.log("confirmation : ", res);
            setConfirmResult(res);
            setFinish(false);
            setSeconds(resendTime);
            setLoader(false);
          })
          .catch((error) => {
            console.log("signInWithPhoneNumber  error : ", error);
            setLoader(false);
            setValue("");
            setConfirmResult(null);
            var errorMessage = error.message;
            var si = errorMessage.indexOf("]") + 1;
            var ei = errorMessage.length - 1;
            const message = errorMessage.substr(si, ei);
            Alert.alert("Failed", message);
          });

        return;
      } else {
        Alert.alert("Network Error", "Please check your internet connection");
      }
    });
  }

  const resend = () => {
    setValue("");
    setConfirmResult(null);
    // SendOtpCode();
  };

  async function verfyCode() {
    // try {
    //   Keyboard.dismiss();
    //   setLoadingTrue();
    //   await confirmResult.confirm(value);
    // } catch (error) {
    //   console.log("Verifyication Code  error: ", error);
    //   setLoadingFalse();
    //   setValue("");
    //   let errorMessage = "";
    //   if (error.code == "auth/unknown") {
    //     errorMessage =
    //       "Cannot create PhoneAuthCredential without either verificationProof, sessionInfo, temporary proof, or enrollment ID !";
    //     return;
    //   } else if (error.code == "auth/invalid-verification-code") {
    //     errorMessage =
    //       "Invalid verification code, Please enter correct confirmation code !";
    //   } else if (error.code == "auth/session-expired") {
    //     errorMessage =
    //       "The sms code has expired or to many invalid code attempt. Please re-send the verification code to try again";
    //   } else if (error.code == "auth/network-request-failed") {
    //     errorMessage = "Network request failed , Please connect internet ! ";
    //   } else {
    //     var msg = error.message;
    //     var si = msg.indexOf("]") + 1;
    //     var ei = msg.length - 1;
    //     errorMessage = msg.substr(si, ei);
    //   }
    //   Alert.alert("Failed", errorMessage);
    // }

    setLoadingTrue();
    PushNotification.configure({
      onRegister: function (token) {
        usermanager.addnotificationToken(token.token);
        console.log("Token found to update : ", token);
        attemptToLogin(mobile, token.token);
      },
    });
  }

  const goBack = () => {
    Navigation.pop(AUTH_NAV_ID);
  };

  const onClickButton = (t) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (t == "Verify") {
          verfyCode();
          return;
        }
      } else {
        Alert.alert("Network Error", "Please check your internet connection");
      }
    });
  };

  const renderLoader = () => {
    return (
      <View style={styles.Timer}>
        <ActivityIndicator color={theme.colors.primary} size={25} />
      </View>
    );
  };

  const renderBottonButton = () => {
    let disable = value.length < 6 ? true : false;
    let text = "Verify";

    return (
      <TouchableOpacity
        onPress={() => onClickButton(text)}
        disabled={disable || loading || loader}
        style={styles.Button}
      >
        {!disable ? (
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primary_light]}
            style={styles.LinearGradient}
          >
            {loading && <ActivityIndicator color={"white"} size={22} />}
            {!loading && <Text style={styles.ButtonText}>{text}</Text>}
          </LinearGradient>
        ) : (
          <Text style={styles.ButtonText}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderCodeInputFields = () => {
    return (
      <View style={styles.codeContainer}>
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          onEndEditing={() => {}}
          editable={loader || loading ? false : true}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
    );
  };

  const renderTimer = () => {
    return (
      <TouchableOpacity
        disabled={!isFinish}
        onPress={resend}
        style={styles.Timer}
      >
        <Text style={isFinish ? styles.TimerText : styles.TimerTextdisable}>
          Resend code
        </Text>
        {!isFinish && (
          <>
            <Text style={[styles.TimerTextr, { color: "#ed5045", left: 5 }]}>
              (
            </Text>
            <CountDown
              size={14}
              until={resendTime}
              onFinish={() => setFinish(true)}
              digitStyle={{ backgroundColor: "transparent" }}
              digitTxtStyle={{
                color: "#ed5045",
                fontSize: responsiveFontSize(1.8),
                fontFamily: "Inter-Regular",
                fontWeight: "500",
              }}
              timeToShow={["S"]}
              timeLabels={{ s: null }}
              showSeparator
            />
            <Text style={[styles.TimerTextr, { color: "#ed5045", left: -5 }]}>
              Sec )
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={theme.colors.containerBackground}
      />
      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack} style={styles.BackButton}>
          <AntDesign name={"left"} size={20} color={theme.colors.backIcon} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 15 }}>
            <Text style={styles.title}>Verify your mobile number</Text>
            <Text style={styles.subtitle}>
              You will receive an OTP on your provided number {mobile}
            </Text>
            {renderCodeInputFields()}
            {!loader && renderTimer()}
            {loader && renderLoader()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {renderBottonButton()}
    </SafeAreaView>
  );
});
export default OTP;
