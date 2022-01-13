import React, { useState, useRef } from 'react';
import { Text, View, Linking, Image, StatusBar, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import AntDesgin from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/Ionicons'
import { ROOT_NAV_ID } from '../../navigation';
const CarScreen = observer(() => {
	const [images, setImage] = useState([
		// require('../../assets/images/car.png'),          // Local image
		// require('../../assets/images/car2.png'),
		// require('../../assets/images/car3.png'),
		// require('../../assets/images/car4.png'),
		// require('../../assets/images/car5.png'),
		// require('../../assets/images/car6.png'),
		// require('../../assets/images/car7.png'),
		// require('../../assets/images/car8.png'),
		// require('../../assets/images/car9.png'),
		"https://s3-prod.autonews.com/s3fs-public/OEM04_312239984_AR_-1_CCTWHFBKNJIS.jpg",
		"https://i.pinimg.com/originals/e9/dc/1a/e9dc1a08e01d61bca5d6cc241b4bd4d2.jpg", // Network image
	]);
	const [show, setShow] = useState(false);
	const refRBSheet = useRef();
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	const gotoBookCar=()=>{
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'BookCar',
				options: {
					topBar: {
						visible: false
					}
				}
			}
		})
	}
	return (
		<SafeAreaView style={styles.Container}>

			<StatusBar
				animated={true}
				barStyle="dark-content"
				backgroundColor={styles.Status.backgroundColor} />
			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.BackButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back'} size={26} color={'#0E47A1'} />
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1 }}>


				<ScrollView>
					<SliderBox
						images={images}
						dotColor="#0E47A1"
						inactiveDotColor="#87A3D0"
						dotStyle={{
							width: 15,
							height: 15,
							borderRadius: 15,
						}}
						imageLoadingColor="#0E47A1"
						ImageComponentStyle={{ height: 300 }}
					/>
					<View style={styles.Body}>

						<Text style={{ fontSize: 20, marginTop: 20, fontFamily: 'Inter-Regular',textAlign:'center' }}>Honda Vezel 2014 Hybrid - Automatic</Text>
						{/* <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
							<View style={{ width: '50%' }}>
								<Text style={{ fontSize: 24, color: '#0E47A1', fontFamily: 'Inter-Regular' }}>9.8/10</Text>
								<Text style={{ fontSize: 12, fontFamily: 'Inter-Regular' }}>CONDITION</Text>
							</View>
							<View style={{ alignItems: 'flex-end', width: '50%' }}>
								<Text style={{ color: '#27B94C', fontSize: 24, fontFamily: 'Inter-Regular' }}>Rs 5000</Text>
								<Text style={{ fontSize: 12, fontFamily: 'Inter-Regular' }}>PER 10 HOURS</Text>
							</View>
						</View> */}
						{/* <Text style={{marginTop:20,fontFamily:'Inter-Bold',fontSize:16}}>Details</Text> */}
						<View style={styles.DescriptionBox}>
							<View style={styles.Row}>
								<Text style={styles.InfoLeft}>Make</Text>
								<Text style={styles.InfoRight}>Honda</Text>
							</View><View style={styles.Row}>
								<Text style={styles.InfoLeft}>Model</Text>
								<Text style={styles.InfoRight}>2018</Text>
							</View>
							<View style={styles.Row}>
								<Text style={styles.InfoLeft}>Engine (CC)</Text>
								<Text style={styles.InfoRight}>1500</Text>
							</View>
							<View style={styles.Row}>
								<Text style={styles.InfoLeft}>Seating Capacity</Text>
								<Text style={styles.InfoRight}>4</Text>
							</View>
							<View style={styles.Row}>
								<Text style={styles.InfoLeft}>Carges per 10 hours</Text>
								<Text style={styles.InfoRight}>PKR 12000</Text>
							</View>
						</View>
						<TouchableOpacity onPress={() => setShow(!show)}>
							<LinearGradient colors={['#0e47a1', '#002171']} style={[styles.Input, { marginTop: 20, height: 55, flexDirection: 'row' }]}>
								<Text style={[styles.BodyTitle, { marginTop: 0 }]}>Features</Text>
								<AntDesgin name={show ? ('up') : ('down')} style={{ right: 10, position: 'absolute' }} size={20} color='#fff' />
							</LinearGradient>
						</TouchableOpacity>
						{show ? (
							<View style={styles.ModalBody}>

								<View style={styles.ModalView}>
									<Text style={styles.Features}>ABS</Text>
									<Text style={styles.Features}>Air Bags</Text>
									<Text style={styles.Features}>Air Conditioning</Text>
								</View>
								<View style={styles.ModalView}>
									<Text style={styles.Features}>Cruise Control</Text>
									<Text style={styles.Features}>Keyless Entry</Text>

								</View>
								<View style={styles.ModalView}>
									<Text style={styles.Features}>Moon Roof</Text>
									<Text style={styles.Features}>Sun Roof</Text>

								</View>
								<View style={styles.ModalView}>
									<Text style={styles.Features}>Power Steering</Text>
									<Text style={styles.Features}>Power Windows</Text>

								</View>
								<View style={styles.ModalView}>
									<Text style={styles.Features}>Music System</Text>
									<Text style={styles.Features}>Power Mirrors</Text>

								</View>
								<View style={styles.ModalView}>
									<Text style={styles.Features}>Manual Transmission</Text>

								</View>
								<View style={styles.ModalView}>
									<Text style={styles.Features}>Automatic Transmission</Text>

								</View>
								<View style={styles.ModalView}>
									<Text style={styles.Features}>Navigation System</Text>

								</View>
							</View>
						) : (
							null
						)}
						{/* <View style={styles.Info}>
							<View style={styles.LeftBox}>
								<Image source={require('../../assets/images/profileimage.png')} resizeMode='contain' style={styles.Image} />
							</View>
							<View style={styles.RightBox}>
								<Text style={{ color: '#000', fontSize: 24, fontFamily: 'Inter-Regular' }}>Furqan Qureshi</Text>
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name={'star'} size={16} color={'#FDD400'} />

									<Text style={styles.RatingText}>4.5/5 (Owner Rating)</Text>
								</View>
							</View>
						</View> */}


						<TouchableOpacity onPress={gotoBookCar}>
							<LinearGradient colors={['#0e47a1', '#002171']} style={styles.BookNowButton}>
								<Text style={styles.ButtonText}>Request Booking</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>

		</SafeAreaView>
	);
})
export default CarScreen;
