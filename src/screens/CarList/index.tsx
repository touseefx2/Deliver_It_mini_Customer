import React, { useState, useEffect } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, SafeAreaView, } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import DatePicker from 'react-native-datepicker';

import { SideMenuView, RNNDrawer } from 'react-native-navigation-drawer-extension';
import { usermanager } from '../../managers/UserManager';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler';
import { AUTH_NAV_ID, ROOT_NAV_ID } from '../../navigation/navs'
import DateTimePicker from '@react-native-community/datetimepicker'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal';
interface Props { }
const CarList = observer((props: Props) => {
	const onFilterPressed = () => {
		RNNDrawer.showDrawer({
			component: {
				name: 'customFilter',
				passProps: {
					animationOpenTime: 300,
					animationCloseTime: 300,
					direction: 'right',
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
	let date = new Date()
	const [putshow, setPUTShow] = useState(false);
	const [dotshow, setDOTShow] = useState(false);
	const [pudshow, setPUdShow] = useState(false);
	const [dodshow, setDOdShow] = useState(false);
	const [puTime, setPUTime] = useState(props.pudate);
	const [doTime, setDOTime] = useState(props.dodate);

	const [search, setSearch] = useState(props.search)
	const [isModalVisible, setModalVisible] = useState(false);

	const onPUTChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setPUTShow(false);
		setPUTime(currentDate);
	};

	;
	const showPUTimepicker = () => {
		setPUTShow(true)
	};
	const onDOTChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDOTShow(false);
		setDOTime(currentDate);
	};

	;
	const showDOTimepicker = () => {
		setDOTShow(true)
	};

	const onPUDChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setPUdShow(false);
		setPUTime(currentDate);
	};

	;
	const showPUDatepicker = () => {
		setPUdShow(true)
	};
	const onDODChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDOdShow(false);
		setDOTime(currentDate);
	};

	;
	const showDODatepicker = () => {
		setDOdShow(true)
	};

	const gotoSearch = () => {
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'Search',
				options: {
					topBar: {
						visible: false
					}
				},
				passProps: {
					pudate: puTime,
					dodate: doTime
				}
			}
		})
	}
	return (
		<SideMenuView style={{ flex: 1 }} drawerName={'customFilter'}>

			<SafeAreaView style={styles.Container}>
				<Modal isVisible={isModalVisible}
					backdropOpacity={0.6}
					animationIn="fadeInUp"
					animationOut="fadeOutDown"
					animationInTiming={600}
					animationOutTiming={600}
					onRequestClose={() => { setModalVisible(!isModalVisible) }}
					backdropTransitionInTiming={600}
					backdropTransitionOutTiming={600}
					onBackdropPress={() => setModalVisible(!isModalVisible)}>
					<View style={styles.SortModal}>
						<LinearGradient colors={['#0e47a1', '#002171']} style={styles.SortHeader}>
							<Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Inter-Bold' }}>Sort By</Text>
						</LinearGradient>
						<TouchableOpacity style={styles.SortModalButton} onPress={() => setModalVisible(!isModalVisible)}>
							<Text style={{ textAlign: 'center' }}>Price Low to High</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.SortModalButton} onPress={() => setModalVisible(!isModalVisible)}>
							<Text style={{ textAlign: 'center' }}>Price High to Low</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.SortModalButton} onPress={() => setModalVisible(!isModalVisible)}>
							<Text style={{ textAlign: 'center' }}>Model Low to High</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.SortModalButton} onPress={() => setModalVisible(!isModalVisible)}>
							<Text style={{ textAlign: 'center' }}>Model High to Low</Text>
						</TouchableOpacity>
					</View>
				</Modal>
				<StatusBar
					animated={true}
					barStyle="light-content"
					backgroundColor={styles.Status.backgroundColor} />
				<LinearGradient colors={['#0e47a1', '#002171']} style={styles.Header}>
					<TouchableOpacity onPress={goBack} style={styles.BackButton}>
						{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
						<Icon name={'arrow-back'} size={26} color={'#fff'} />


					</TouchableOpacity>
					{/* <Icon name={'search-outline'} size={26} color={'#fff'} style={{ position: 'absolute', right: 32 }} onPress={gotoSearch} /> */}
				</LinearGradient>

				 {/* <LinearGradient colors={['#0e47a1', '#002171']} style={styles.Top}>
						<View style={styles.Body}>
							<View style={styles.CarInput}>
								<MaterialCommunityIcons name='car-sports' size={24} color={'#0E47A1'} style={{ marginLeft: 10 }} />
								<TextInput placeholder='Honda Vezel' defaultValue={search} placeholderTextColor='grey' style={{ paddingLeft: 10, width: '85%' }} />
							</View>
							<View style={styles.Button}>
								<Text style={styles.ButtonText}>Pickup</Text>
							</View>
							<View style={styles.PickUp}>
								<TouchableOpacity style={styles.Date} onPress={showPUDatepicker}>
									<Fantisto name='date' size={16} color={'#0E47A1'} style={{ marginLeft: 10 }} />
									<Text style={styles.DateText}>{puTime.getDate() + "-" + parseInt(puTime.getMonth() + 1) + "-" + puTime.getFullYear()}</Text>

								</TouchableOpacity>
								{pudshow && (
									<DateTimePicker
										testID="dateTimePicker"
										value={puTime}
										mode={'date'}
										minimumDate={date}
										display="default"
										onChange={onPUDChange}
									/>
								)}
								<TouchableOpacity style={styles.Time} onPress={showPUTimepicker}>
									<Fantisto name='clock' size={16} color={'#0E47A1'} style={{ marginLeft: 10 }} />
									<Text style={styles.DateText}>{puTime.getHours() + ':' + puTime.getMinutes()}</Text>

								</TouchableOpacity>
								{putshow && (
									<DateTimePicker
										testID="dateTimePicker"
										value={puTime}
										mode={'time'}
										is24Hour={true}
										display="default"
										onChange={onPUTChange}
									/>
								)}

							</View>
							<View style={styles.Button}>
								<Text style={styles.ButtonText}>Dropoff</Text>
							</View>
							<View style={styles.PickUp}>
								<TouchableOpacity style={styles.Date} onPress={showDODatepicker}>
									<Fantisto name='date' size={16} color={'#0E47A1'} style={{ marginLeft: 10 }} />
									<Text style={styles.DateText}>{doTime.getDate() + "-" + parseInt(doTime.getMonth() + 1) + "-" + doTime.getFullYear()}</Text>

								</TouchableOpacity>
								{dodshow && (
									<DateTimePicker
										testID="dateTimePicker"
										value={doTime}
										mode={'date'}
										minimumDate={puTime}
										display="default"
										onChange={onDODChange}
									/>
								)}

								<TouchableOpacity style={styles.Time} onPress={showDOTimepicker}>
									<Fantisto name='clock' size={16} color={'#0E47A1'} style={{ marginLeft: 10 }} />
									<Text style={styles.DateText}>{doTime.getHours() + ':' + doTime.getMinutes()}</Text>
								</TouchableOpacity>
								{dotshow && (
									<DateTimePicker
										testID="dateTimePicker"
										value={doTime}
										mode={'time'}
										is24Hour={true}
										display="default"
										onChange={onDOTChange}
									/>
								)}

							</View>
							<TouchableOpacity >
							<LinearGradient colors={['#5572d3', '#0E47A1']} style={styles.FindButton}>
								<Text style={styles.FindText}>Search Car</Text>
							</LinearGradient>
						</TouchableOpacity>
						</View>
					</LinearGradient>  */}
				<View style={styles.Body}>
					<View style={styles.FilterView}>
						<Text style={{ width: '50%' }}>400 Results</Text>
						<MaterialIcons name='sort' size={16} color={'#0E47A1'} />
						<Text style={styles.TextRight} onPress={() => { setModalVisible(!isModalVisible) }}>Sort</Text>

						<MaterialCommunityIcons name='filter-outline' size={16} color={'#0E47A1'} style={{ position: 'absolute', right: 30 }} />
						<Text style={styles.TextRightFilter} onPress={onFilterPressed}>Filter</Text>
					</View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<TouchableOpacity style={styles.Card}>
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
						<TouchableOpacity style={styles.Card} onPress={gotoCarScreen}>
							<Image source={require('../../assets/images/car.jpg')} resizeMode='stretch' style={styles.Image} />
							<View style={styles.Description}>
								<Text style={styles.title}>Honda Vezel Hybrid -2014</Text>
								<Text style={styles.Price}>Rs 12,000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
								<View style={styles.Rating}>
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Text style={styles.TextRating}> (16 Rentals)</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Card}>
							<Image source={require('../../assets/images/gli.jpg')} resizeMode='stretch' style={styles.Image} />
							<View style={styles.Description}>
								<Text style={styles.title}>Toyota Corolla Gli</Text>
								<Text style={styles.Price}>Rs. 5000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
								<View style={styles.Rating}>
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Text style={styles.TextRating}> (23 Rentals)</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Card} onPress={gotoCarScreen}>
							<Image source={require('../../assets/images/car.jpg')} resizeMode='stretch' style={styles.Image} />
							<View style={styles.Description}>
								<Text style={styles.title}>Honda Vezel Hybrid -2014</Text>
								<Text style={styles.Price}>Rs 12,000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
								<View style={styles.Rating}>
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Text style={styles.TextRating}> (16 Rentals)</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Card}>
							<Image source={require('../../assets/images/gli.jpg')} resizeMode='stretch' style={styles.Image} />
							<View style={styles.Description}>
								<Text style={styles.title}>Toyota Corolla Gli</Text>
								<Text style={styles.Price}>Rs. 5000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
								<View style={styles.Rating}>
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Text style={styles.TextRating}> (23 Rentals)</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Card} onPress={gotoCarScreen}>
							<Image source={require('../../assets/images/car.jpg')} resizeMode='stretch' style={styles.Image} />
							<View style={styles.Description}>
								<Text style={styles.title}>Honda Vezel Hybrid -2014</Text>
								<Text style={styles.Price}>Rs 12,000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
								<View style={styles.Rating}>
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Text style={styles.TextRating}> (16 Rentals)</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Card}>
							<Image source={require('../../assets/images/gli.jpg')} resizeMode='stretch' style={styles.Image} />
							<View style={styles.Description}>
								<Text style={styles.title}>Toyota Corolla Gli</Text>
								<Text style={styles.Price}>Rs. 5000 <Text style={styles.Hour}>/ 10 hr</Text></Text>
								<View style={styles.Rating}>
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#FFA800'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Icon name={'star'} size={14} color={'#D0D0D0'} />
									<Text style={styles.TextRating}> (23 Rentals)</Text>
								</View>
							</View>
						</TouchableOpacity>
					</ScrollView>
				</View>

			</SafeAreaView>
		</SideMenuView>
	);
})
export default CarList;

