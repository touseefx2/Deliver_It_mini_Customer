import React, { useState, useRef } from 'react';
import { Text, View, Linking, Image, StatusBar, PermissionsAndroid, TouchableOpacity, SafeAreaView, } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AUTH_NAV_ID, BOOKINGS_NAV_ID, ROOT_NAV_ID } from '../../navigation/navs'
import LinearGradient from 'react-native-linear-gradient'
import { SideMenuView, RNNDrawer } from 'react-native-navigation-drawer-extension';
import Modal from 'react-native-modal';
interface Props { }
const History = observer((props: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	const gotoBookingDetails = (status) => {
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'BookingDetails',
				options: {
					topBar: {
						visible: false,

					},
					bottomTabs: {
						visible: false
					}

				},
				passProps:{
					status:status
				}
			}
		})
	}
	
	const onMenuPressed = () => {
		RNNDrawer.showDrawer({
			component: {
				name: 'customDrawer',
				passProps: {
					animationOpenTime: 300,
					animationCloseTime: 300,
					direction: 'left',
					dismissWhenTouchOutside: true,
					fadeOpacity: 0.6,
					drawerScreenWidth: '75%' || 445,
					drawerScreenHeight: '100%' || 700,
					parentComponentId: props.componentId,
					style: {
						backgroundColor: 'white',
					},
				},
				options: {
					layout: {
						componentBackgroundColor: 'rgba(0,0,0,0.4)',
					},
				},
			},
		});
	};
	return (
		<SideMenuView style={{ flex: 1 }} drawerName={'customDrawer'}>

		<SafeAreaView style={styles.Container}>

			<StatusBar
				animated={true}
				barStyle="light-content"
				backgroundColor={styles.Status.backgroundColor} />
			<LinearGradient colors={['#0e47a1', '#002171']} style={styles.Header}>
			<TouchableOpacity style={styles.MenuButton} onPress={onMenuPressed}>
						<Icon name={'menu'} size={30} color={'#fff'} />
					</TouchableOpacity>
				<Text style={styles.Title}>Booking History</Text>
			</LinearGradient>


			<View style={{ marginTop: 10, flex: 1 }}>
				<ScrollView>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Honda Vezel Hybrid - 2014</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>15 Jan 2021 - 20 Jan 2021</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>30,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Kia Sportage - 2021</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>22 June 2021 - 26 June 2021</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>28,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Corolla GLI - 2009</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>8 Dec 2020 - 9 Dec 2020</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>7,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Honda Vezel Hybrid - 2014</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>15 Jan 2021 - 20 Jan 2021</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>30,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Kia Sportage - 2021</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>22 June 2021 - 26 June 2021</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>28,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Corolla GLI - 2009</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>8 Dec 2020 - 9 Dec 2020</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>7,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Honda Vezel Hybrid - 2014</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>15 Jan 2021 - 20 Jan 2021</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>30,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Kia Sportage - 2021</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>22 June 2021 - 26 June 2021</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>28,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>gotoBookingDetails('Completed')}>
						<View style={styles.Card}>

							<Text style={styles.MailTitle}>Corolla GLI - 2009</Text>
							<Text style={styles.MailText}>Booking Days: <Text style={{ color: '#686868' }}>8 Dec 2020 - 9 Dec 2020</Text></Text>
							<Text style={styles.MailText}>Billed: <Text style={{ color: '#686868' }}>7,000 PKR</Text></Text>
							<View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
								<Text style={styles.BillTextLeft}>ID:  <Text style={{ color: '#686868' }}>0000000000</Text></Text>

								<Text style={styles.BillTextRight}>Status:  <Text style={{ color: '#686868' }}>Completed</Text></Text>
							</View>
						</View>

					</TouchableOpacity>
				</ScrollView >
			</View>

		</SafeAreaView >
		</SideMenuView>
	);
})
export default History;

