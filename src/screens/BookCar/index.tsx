import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, StatusBar, Platform, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'

import { Picker } from '@react-native-picker/picker';
import { SideMenuView, RNNDrawer } from 'react-native-navigation-drawer-extension';
import { usermanager } from '../../managers/UserManager';
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fantisto from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler';
import { ROOT_NAV_ID } from '../../navigation/navs'
import DateTimePicker from '@react-native-community/datetimepicker'
import LinearGradient from 'react-native-linear-gradient'
import { goToRequestPending } from '../../navigation';
import { CheckBox } from 'react-native-elements'


interface Props { }
const BookCar = observer((props: Props) => {
	
	const [checked, setChecked] = useState(false);

	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}

	const [puTime, setPUTime] = useState(new Date());
	const [doTime, setDOTime] = useState(new Date());

	const [selectedPickup, setSelectedPickup] = useState('');

	const gotoRequestPending = () => {
		goToRequestPending()
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
				{/* <Text style={styles.Title}>Search Car</Text> */}
			</LinearGradient>
			<ScrollView>
				<View style={styles.Body}>

					<TouchableOpacity style={styles.Card}>
						<Image source={require('../../assets/images/civic.jpg')} resizeMode='stretch' style={styles.Image} />
						<View style={styles.Description}>
							<Text style={styles.CarTitle}>Honda Civic</Text>
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


					<View style={styles.Button}>
						<Text style={styles.ButtonText}>Pickup</Text>
					</View>
					<View style={styles.PickUp}>
						<View style={styles.Date}>
							<Fantisto name='date' size={16} color={'#000'} style={{ marginLeft: 10 }} />
							<Text style={styles.DateText}>{puTime.getDate() + "-" + parseInt(puTime.getMonth() + 1) + "-" + puTime.getFullYear()}</Text>

						</View>

						<View style={styles.Time}>
							<Fantisto name='clock' size={16} color={'#000'} style={{ marginLeft: 10 }} />
							<Text style={styles.DateText}>{puTime.getHours() + ':' + puTime.getMinutes()}</Text>

						</View>



					</View>
					<View style={styles.Button}>
						<Text style={styles.ButtonText}>Dropoff</Text>
					</View>
					<View style={styles.PickUp}>
						<View style={styles.Date}>
							<Fantisto name='date' size={16} color={'#000'} style={{ marginLeft: 10 }} />
							<Text style={styles.DateText}>{doTime.getDate() + "-" + parseInt(doTime.getMonth() + 1) + "-" + doTime.getFullYear()}</Text>

						</View>


						<View style={styles.Time}>
							<Fantisto name='clock' size={16} color={'#000'} style={{ marginLeft: 10 }} />
							<Text style={styles.DateText}>{doTime.getHours() + ':' + doTime.getMinutes()}</Text>
						</View>

					</View>
					<View style={styles.Button}>
						<Text style={styles.ButtonText}>Pickup Point</Text>
					</View>
					<View style={styles.CarInput}>
						<Text style={styles.DateText}>PSO, Kashmir Highway</Text>
					</View>
					
					<CheckBox
								title='Need Driver?'
								checked={checked}
								onPress={() => setChecked(!checked)}
								checkedColor='#0e47a1'
								containerStyle={styles.Checkbox}
							/>
					<TouchableOpacity onPress={gotoRequestPending}>
						<LinearGradient colors={['#0e47a1', '#002171']} style={styles.FindButton}>
							<Text style={styles.FindText}>Book Car</Text>
						</LinearGradient>
					</TouchableOpacity>

				</View>
			</ScrollView>
			{/* <TouchableOpacity style={styles.FloatingButton} >
					<Icon name='car-sport-outline' size={40} color={'#0E47A1'} /> */}
			{/* <Image source={require('../../assets/images/carLogo.png')} style={{ height: 15, width: 39, resizeMode: 'contain' }} /> */}
			{/* </TouchableOpacity>
				<View style={styles.BottomView}></View> */}

		</SafeAreaView>
	);
})
export default BookCar;
