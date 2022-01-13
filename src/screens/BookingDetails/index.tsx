import React, { useState, useRef } from 'react';
import { Text, View, Linking, Image, StatusBar, PermissionsAndroid, TouchableOpacity, SafeAreaView, } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler';
import { AUTH_NAV_ID, BOOKINGS_NAV_ID, ROOT_NAV_ID, WALLET_NAV_ID } from '../../navigation/navs'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal';
import styles from './styles'
import { gotoHome } from '../../navigation';
import StarRating from 'react-native-star-rating';
interface Props { }
const BookingDetails = observer((props: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [starCount, setStarCount] = useState(0);
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	const gotoRating = () => {

		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'Rating',
				options: {
					topBar: {
						visible: false

					},
					bottomTabs: {
						visible: false
					}
				},
				passProps: {
					stack: 'Wallet'
				}
			}
		})
	}
	return (

		<SafeAreaView style={styles.Container}>

			<StatusBar
				animated={true}
				barStyle="light-content"
				backgroundColor={styles.Status.backgroundColor} />
			<LinearGradient colors={['#0e47a1', '#002171']} style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.MenuButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back'} size={26} color={'#fff'} />
				</TouchableOpacity>
				<Text style={styles.Title}>Booking Details</Text>
			</LinearGradient>


			<View style={{ flex: 1 }}>
				<ScrollView>
					<Text style={[styles.ProfileName, { marginTop: 30, marginLeft: 20, marginBottom: 10,fontSize:16 }]}>Booked From</Text>
					<View style={styles.Profile}>
						<Image source={require('../../assets/images/profileimage.png')} style={styles.ProfileImage} />
						<View>
							<Text style={styles.ProfileName}>Waleed Iqbal</Text>
							<View style={styles.Rating}>
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#D0D0D0'} />
							</View>
							<Text style={styles.TextRating}> 4/5 (Rental Ratings)</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.Card}>
						<Image source={require('../../assets/images/car.jpg')} resizeMode='stretch' style={styles.Image} />
						<View style={styles.Description}>
							<Text style={styles.title}>Honda Vezel Hybrid -2014</Text>
							<Text style={styles.Price}>Rs 12,000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
							<View style={styles.CarRating}>
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#FFA800'} />
								<Icon name={'star'} size={14} color={'#D0D0D0'} />
								<Text style={styles.TextRating}> (16 Rentals)</Text>
							</View>
						</View>
					</TouchableOpacity>
					<View style={styles.Top}>
						<View style={styles.ButtonInvoice}>
							<Text style={styles.ButtonInvoiceText}>Invoice</Text>
						</View>
						<View style={styles.Button}>
							<Text style={styles.ButtonText}>Pickup Date</Text>
							<Text style={styles.DateText}>June 10, 2020 17:00 AM</Text>
						</View>
						<View style={styles.Button}>
							<Text style={styles.ButtonText}>Dropoff Date</Text>
							<Text style={styles.DateText}>June 12, 2020 04:00 PM</Text>
						</View>
						<View style={styles.Button}>
							<Text style={styles.ButtonText}>Charges Per 10 Hours</Text>
							<Text style={styles.DateText}>PKR 12,000</Text>
						</View>
						<View style={styles.Button}>
							<Text style={styles.ButtonText}>Number of Hours</Text>
							<Text style={styles.DateText}>10</Text>
						</View>

						<View style={styles.Button}>
							<Text style={styles.ButtonText}>Pickup Point</Text>
							<Text style={styles.DateText}>PSO Pump, I-10 Markaz, Islamabad</Text>
						</View>
						{/* <View style={styles.PickUp}>
							<View style={styles.Location} >
								<Icon name='location-outline' size={20} color={'#0E47A1'} style={{ marginLeft: 10 }} />
								<Text style={styles.DateText}>PSO Pump, I-10 Markaz, Islamabad</Text>
							</View>
						</View> */}
						{/* <View style={styles.Button}>
							<Text style={styles.ButtonText}>Dropoff Point</Text>
							<Text style={styles.DateText}>PSO Pump, I-10 Markaz, Islamabad</Text>
						</View> */}

						<View style={styles.ButtonEnd}>
							<Text style={[styles.ButtonText, { fontFamily: 'Inter-Bold' }]}>Total</Text>
							<Text style={[styles.DateText, { fontFamily: 'Inter-Bold', color: '#000' }]}>PKR 12,000</Text>
						</View>
						{props.status == 'Completed' ? (
							<View style={{ width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
								<View style={styles.Rating}>
									<StarRating
										disabled={false}
										maxStars={5}
										fullStarColor={'#FFD600'}
										rating={starCount}
										selectedStar={(rating) => setStarCount(rating)}
									/>
								</View>
							</View>
						) : (
							<TouchableOpacity style={styles.ContinueButton} onPress={gotoHome}>
								<LinearGradient colors={['#0e47a1', '#002171']} style={styles.LinearGradient}>

									<Text style={styles.ContinueButtonText}>Start Ride</Text>
								</LinearGradient>
							</TouchableOpacity>
						)}
					</View>
				</ScrollView>
			</View>

		</SafeAreaView >
	);
})
export default BookingDetails;

