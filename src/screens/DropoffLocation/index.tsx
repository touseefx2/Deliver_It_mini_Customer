import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Image, StatusBar, TouchableOpacity, SafeAreaView, PermissionsAndroid } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import Fantisto from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler';
import { ROOT_NAV_ID } from '../../navigation/navs'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SideMenuView, RNNDrawer } from 'react-native-navigation-drawer-extension';
import { Picker } from '@react-native-picker/picker';
interface Props { }
const DropoffLocation = observer((props: Props) => {
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}

	const [selectedCity, setSelectedCity] = useState('Islamabad');


	return (
		<SideMenuView style={{ flex: 1 }} drawerName={'customDrawer'}>
			<SafeAreaView style={styles.Container}>
				<StatusBar
					barStyle="dark-content"
					translucent={true} backgroundColor={'transparent'} />
				<View style={styles.Header}>
					<TouchableOpacity onPress={goBack} style={styles.MenuButton}>
						{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
						<Icon name={'arrowleft'} size={22} color={'#000'} style={{ marginTop: 6, }} />
					</TouchableOpacity>
					<Text style={styles.Title}>DROPOFF LOCATION</Text>
				</View>
				<View style={styles.Body}>
					<View style={{ width: '100%', height: 50, borderRadius: 5, backgroundColor: '#e5e5e5', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
						<Icon name={'search1'} size={18} color={'grey'} style={{ marginLeft: 10 }} />
						{/* <TextInput style={{ width: '55%', height: '100%', marginLeft: 10, fontSize: 16, borderRightWidth: 1, borderColor: 'grey' }} placeholder='Search for a location' /> */}
						<View style={{ width: '60%', justifyContent: 'center' }}>
							<GooglePlacesAutocomplete
								placeholder='Search for a location'
								minLength={2}
								fetchDetails={true}
								query={{
									key: 'AIzaSyCEiRU7rgDbu2wlxkmC7xiiCp0NbutrsB8',
									language: 'en',
								}}
								styles={{
									textInputContainer: {
										backgroundColor: '#e5e5e5',
									},
									textInput: {
										height: 38,
										color: '#5d5d5d',
										fontSize: 16,
										marginTop: 6,
										marginLeft: 5,
									},
									predefinedPlacesDescription: {
										color: '#000',
									},
								}}
							/>
						</View>
						<Text style={{ fontFamily: 'Inter-Regular', fontSize: 16, marginLeft: 10 }}>Islamabad</Text>
						<View style={styles.DropDownArrow}>
							<Image source={require('../../assets/images/dropdown.png')} style={styles.DropDownLogo} />
						</View>
						
					</View>
				</View>



			</SafeAreaView>
		</SideMenuView>
	);
})
export default DropoffLocation;
