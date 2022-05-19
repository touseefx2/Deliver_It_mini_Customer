import React, { useEffect, useState } from "react";
// import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';

// import {
//   responsiveFontSize,
//   responsiveHeight,
// } from 'react-native-responsive-dimensions';
// import {carmanager} from '../managers/CarManager';
// import {notificationmanager} from '../managers/NotificationManager';
// import theme from './index';
// import {bookingsmanager} from '../managers/BookingsManager';
// import {usermanager} from '../managers/UserManager';

export default function NotificationMessage(props) {
  // let title = notificationmanager.title;
  // let message = notificationmanager.message;
  // let load = props.load;
  // let data = notificationmanager.data;
  // let topic = data.topic || '';
  // let textColor = 'black';
  // let backgroundColorWhite = ['white', 'white'];

  // useEffect(() => {
  //   notificationmanager.attemptToGetNotifications();
  //   console.log('show notification call');
  //   console.log('topic : ', topic);
  //   console.log('title : ', title);

  //   if (topic == 'users' || topic == 'Review') {
  //     usermanager.getUser();
  //     return;
  //   }

  //   if (topic == 'car') {
  //     carmanager.attemptToGetCarById();
  //     return;
  //   }

  //   if (topic == 'booking' || topic == 'booking approved') {
  //     bookingsmanager.attemptToGetBookings();
  //     carmanager.attemptToGetCarById();
  //     bookingsmanager.attemptToGetHistory();

  //     return;
  //   }
  // }, []);

  // const clickButton = c => {
  //   if (c == 'ok') {
  //     notificationmanager.clearNotification();
  //     // notificationmanager.attemptToGetNotifications();
  //     // console.log('show notification call');
  //     // console.log('topic : ', topic);
  //     // console.log('title : ', title);

  //     // if (topic == 'users') {
  //     //   usermanager.getUser();
  //     //   return;
  //     // }

  //     // if (topic == 'car') {
  //     //   carmanager.attemptToGetCarById();
  //     //   return;
  //     // }

  //     // if (topic == 'booking' || topic == 'booking approved') {
  //     //   bookingsmanager.attemptToGetBookings();
  //     //   carmanager.attemptToGetCarById();
  //     //   bookingsmanager.attemptToGetHistory();
  //     //   return;
  //     // }
  //   }
  // };

  // const renderHeader = () => {
  //   return (
  //     <View style={{width: '100%', alignItems: 'center'}}>
  //       <Text
  //         numberOfLines={1}
  //         ellipsizeMode="tail"
  //         style={[
  //           styles.title,
  //           {
  //             color: textColor,
  //           },
  //         ]}>
  //         {title}
  //       </Text>
  //     </View>
  //   );
  // };

  // const renderBookingApproveDetailsInstruction = () => {
  //   return (
  //     <View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           marginTop: 10,
  //         }}>
  //         <Entypo name="dot-single" color={theme.colors.primary} size={20} />
  //         <View style={{width: '95%'}}>
  //           <Text style={[styles.message, {color: textColor}]}>
  //             Please reach on time
  //           </Text>
  //         </View>
  //       </View>

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Entypo name="dot-single" color={theme.colors.primary} size={20} />
  //         <View style={{width: '95%'}}>
  //           <Text style={[styles.message, {color: textColor}]}>
  //             Coordinate well with the renter
  //           </Text>
  //         </View>
  //       </View>

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Entypo name="dot-single" color={theme.colors.primary} size={20} />
  //         <View style={{width: '95%'}}>
  //           <Text style={[styles.message, {color: textColor}]}>
  //             Keep your car tank full before starting the ride
  //           </Text>
  //         </View>
  //       </View>

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Entypo name="dot-single" color={theme.colors.primary} size={20} />
  //         <View style={{width: '95%'}}>
  //           <Text style={[styles.message, {color: textColor}]}>
  //             Take care of yourself
  //           </Text>
  //         </View>
  //       </View>

  //       <View style={{width: '95%', marginTop: 10}}>
  //         <Text style={[styles.message, {color: textColor}]}>
  //           Please feel free to
  //         </Text>
  //       </View>

  //       <View style={{width: '95%'}}>
  //         <Text style={[styles.message, {color: textColor, marginBottom: 10}]}>
  //           contact customer support for any help
  //         </Text>
  //       </View>

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Entypo name="dot-single" color={theme.colors.primary} size={20} />
  //         <View style={{width: '95%'}}>
  //           <Text style={[styles.message, {color: textColor}]}>
  //             +92-51-8772524
  //           </Text>
  //         </View>
  //       </View>

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Entypo name="dot-single" color={theme.colors.primary} size={20} />
  //         <View style={{width: '95%'}}>
  //           <Text style={[styles.message, {color: textColor}]}>
  //             support@karblock.com
  //           </Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  // const renderBookingApprovedCheck = () => {
  //   return (
  //     <View
  //       style={{
  //         alignSelf: 'center',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         marginBottom: 10,
  //       }}>
  //       <AntDesign name="checkcircle" color={'green'} size={35} />
  //     </View>
  //   );
  // };

  // const renderMessage = () => {
  //   return (
  //     <View style={{marginTop: 15}}>
  //       <Text style={[styles.message, {color: textColor}]}>{message}</Text>
  //       {topic == 'booking approved' &&
  //         renderBookingApproveDetailsInstruction()}
  //     </View>
  //   );
  // };

  // const renderFooter = () => {
  //   return (
  //     <View style={{marginTop: 25, alignItems: 'flex-end'}}>
  //       <TouchableOpacity
  //         style={{width: '20%', alignItems: 'flex-end'}}
  //         onPress={() => {
  //           clickButton('ok');
  //         }}>
  //         <Text style={[styles.buttonText, {color: textColor}]}>ok</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return nulll;
  // <Modal visible={load} onRequestClose={() => {}} transparent={true}>
  //   <View
  //     style={{
  //       flex: 1,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       backgroundColor: 'rgba(0, 0, 0, 0.6)',
  //     }}>
  //     <LinearGradient
  //       colors={backgroundColorWhite}
  //       style={styles.LinearGradientnl}>
  //       {topic == 'booking approved' && renderBookingApprovedCheck()}
  //       {renderHeader()}
  //       {renderMessage()}
  //       {renderFooter()}
  //     </LinearGradient>
  //   </View>
  // </Modal>
}

// const styles = StyleSheet.create({
//   LinearGradientnl: {
//     width: '90%',
//     alignSelf: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 25,
//     borderRadius: 5,
//   },
//   title: {
//     fontSize: responsiveFontSize(2.4),
//     lineHeight: 22,
//     fontFamily: 'Inter-Bold',
//     textAlign: 'left',
//     textTransform: 'capitalize',
//   },
//   message: {
//     fontSize: responsiveFontSize(2.1),
//     color: 'white',
//     lineHeight: 22,
//     textAlign: 'left',
//   },
//   buttonText: {
//     fontSize: responsiveFontSize(2),
//     fontFamily: 'Inter-Bold',
//     lineHeight: 20,
//     textTransform: 'uppercase',
//   },
// });
