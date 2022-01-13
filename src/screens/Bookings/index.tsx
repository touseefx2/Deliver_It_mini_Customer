import React, { useState, useRef } from 'react';
import { Text, View, Linking, Image, StatusBar, PermissionsAndroid, TouchableOpacity, SafeAreaView, Animated } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AUTH_NAV_ID, ROOT_NAV_ID } from '../../navigation/navs'
import LinearGradient from 'react-native-linear-gradient'
import { SideMenuView, RNNDrawer } from 'react-native-navigation-drawer-extension';
interface Props { }
const Bookings = observer((props: Props) => {
	const [invoiceVisible, setInvoiceVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [image, setImage] = useState('')
	const refRBSheet = useRef();
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	const gotoCarScreen = () => {
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'CarScreen',
				options: {
					topBar: {
						visible: false,

					}

				},
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
	const gotoNotifications = () => {
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'Notifications',
				options: {
					topBar: {
						visible: false
					}
				}
			}
		})
	}
	const gotoBookingDetails = () => {
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

				}
			}
		})
	}
	const gotoInvoice = (s) => {
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'Invoice',
				options: {
					topBar: {
						visible: false,

					},
					bottomTabs: {
						visible: false
					}

				},
				passProps:{
					status:s
				}
			}
		})
	}
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
					<Text style={styles.HeaderText}>Bookings</Text>
					<TouchableOpacity style={styles.BellButton} onPress={gotoNotifications}>
						<FontAwesome name={'bell'} size={22} color={'#fff'} />
					</TouchableOpacity>

				</LinearGradient>
				<ScrollView>
					<View style={styles.Body}>
						<View style={styles.CardRed}>
							<TouchableOpacity style={styles.TopCard} onPress={gotoCarScreen}>
								<Image source={require('../../assets/images/civic.jpg')} resizeMode='stretch' style={styles.Image} />
								<View style={styles.Description}>
									<Text style={styles.title}>Honda Civic</Text>
									<Text style={styles.Price}>Rs. 10,000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
									<View style={styles.Rating}>
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#D0D0D0'} />
										<Text style={styles.TextRating}> (8 Rentals)</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text style={styles.CardBottomText}>Customer Support will confirm your booking shortly.</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.CardBlue}>
							<TouchableOpacity style={styles.TopCard} onPress={gotoCarScreen}>
								<Image source={require('../../assets/images/gli.jpg')} resizeMode='stretch' style={styles.Image} />
								<View style={styles.Description}>
									<Text style={styles.title}>Toyota Corolla Gli</Text>
									<Text style={styles.Price}>Rs. 6,000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
									<View style={styles.Rating}>
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Text style={styles.TextRating}> (12 Rentals)</Text>
									</View>
								</View>
							</TouchableOpacity>


							<View style={styles.InvoiceBody} >
								<Text style={{ marginTop: 20, fontFamily: 'Inter-Bold', fontSize: 16 }}>Checkout</Text>
								<Text style={{ fontFamily: 'Inter-Regulat', fontSize: 12, color: '#797979' }}>Please confirm your booking by paying your bill amount within next 5 hours.</Text>
								<TouchableOpacity onPress={()=>gotoInvoice('Pending')}>
									<LinearGradient colors={['#0e47a1', '#002171']} style={styles.FindButton} >
										<Text style={styles.FindText}>Invoice</Text>
									</LinearGradient>
								</TouchableOpacity>
								{/* <LinearGradient colors={['#0e47a1', '#002171']} style={{ height: 20, width: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, backgroundColor: '#000' }}>

								</LinearGradient>
								<Animated.View style={[styles.Invoice, { height }]}>

									<View style={styles.InvoiceBodySmall}>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Booking #</Text>
											<Text style={styles.HeadingRight}>Invoice Date</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.DescLeft}>00000</Text>
											<Text style={styles.DescRight}>Jun 15, 2021 09:33 AM</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Car</Text>
											<Text style={styles.HeadingRight}>Hours</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.DescLeft}>Honda Vezel 2021</Text>
											<Text style={styles.DescRight}>10</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>From</Text>
											<Text style={styles.HeadingRight}>To</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.DescLeft}>June 17, 2021</Text>
											<Text style={styles.DescRight}>June 17, 2021</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Pickup Point</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.Desc}>PSO Pump, G-10 Markaz, Islamabad</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Owner</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.Desc}>Waleed Iqbal</Text>
										</View>
										<Text style={styles.TitleCenter}>Total Amount</Text>
										<Text style={styles.DescCenter}>PKR 8000</Text>
									</View>
								</Animated.View> */}
								
							</View>
						</View>
						<View style={styles.CardBlue}>
							<TouchableOpacity style={styles.TopCard}  onPress={gotoCarScreen}>
								<Image source={require('../../assets/images/vezel.jpg')} resizeMode='stretch' style={styles.Image} />
								<View style={styles.Description}>
									<Text style={styles.title}>Honda Vezel 2018</Text>
									<Text style={styles.Price}>Rs. 10,000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
									<View style={styles.Rating}>
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Icon name={'star'} size={14} color={'#FFA800'} />
										<Text style={styles.TextRating}> (82 Rentals)</Text>
									</View>
								</View>
							</TouchableOpacity>


							<View style={styles.InvoiceBody}>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ width: '80%' }}>
										<Text style={{ marginTop: 20, fontFamily: 'Inter-Bold', fontSize: 16 }}>Bill Paid</Text>
										<Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#797979' }}>Please be on time.</Text>
										<Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#0e47a1',lineHeight:22 }} onPress={()=>Linking.openURL(`tel:${'03123456789'}`)}><FontAwesome name='phone' size={16} color='#0e47a1' /> Contact Owner </Text>
									</View>
									<View style={{ width: '20%' }}>
										<TouchableOpacity onPress={() => Linking.openURL('https://goo.gl/maps/Ee6aoqZjgUyhZfRdA')}>
											<LinearGradient colors={['#0e47a1', '#002171']} style={styles.DirectionButton} >
												<FontAwesome name='location-arrow' size={32} color='#fff' />
											</LinearGradient>
										</TouchableOpacity>
										<Text style={styles.DirectionText}>Get Directions</Text>
									</View>
								</View>

								<TouchableOpacity onPress={()=>gotoInvoice('Approved')}>
									<LinearGradient colors={['#0e47a1', '#002171']} style={styles.FindButton} >
										<Text style={styles.FindText}>Invoice</Text>
									</LinearGradient>
								</TouchableOpacity>
								{/* <LinearGradient colors={['#0e47a1', '#002171']} style={{ height: 20, width: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, backgroundColor: '#000' }}>

								</LinearGradient>
								<Animated.View style={[styles.Invoice, { height }]}>

									<View style={styles.InvoiceBodySmall}>
										<Text style={{ position: 'absolute', fontSize: 80, alignSelf: 'center', marginTop: 50, fontFamily: 'Inter-Bold', opacity: 0.1, transform: [{ rotate: '-45deg' }] }}>Paid</Text>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Booking #</Text>
											<Text style={styles.HeadingRight}>Invoice Date</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.DescLeft}>00000</Text>
											<Text style={styles.DescRight}>Jun 15, 2021 09:33 AM</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Car</Text>
											<Text style={styles.HeadingRight}>Hours</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.DescLeft}>Honda Vezel 2021</Text>
											<Text style={styles.DescRight}>10</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>From</Text>
											<Text style={styles.HeadingRight}>To</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.DescLeft}>June 17, 2021</Text>
											<Text style={styles.DescRight}>June 17, 2021</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Pickup Point</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.Desc}>PSO Pump, G-10 Markaz, Islamabad</Text>
										</View>
										<View style={{ flexDirection: 'row', width: '100%' }}>
											<Text style={styles.HeadingLeft}>Owner</Text>
										</View>
										<View style={styles.Row}>
											<Text style={styles.Desc}>Waleed Iqbal</Text>
										</View>
										<Text style={styles.TitleCenter}>Total Amount</Text>
										<Text style={styles.DescCenter}>PKR 8000</Text>
									</View>
								</Animated.View> */}
								<TouchableOpacity onPress={gotoBookingDetails}>
									<LinearGradient colors={['#0e47a1', '#002171']} style={styles.FindButton} >
										<Text style={styles.FindText}>Start Ride</Text>
									</LinearGradient>
								</TouchableOpacity>
								<View style={{height:30}}></View>
							</View>
						</View>
					</View>
				</ScrollView >
				
			</SafeAreaView >
		</SideMenuView>
	);
})
export default Bookings;

