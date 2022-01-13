import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Image, StatusBar, PermissionsAndroid, TouchableOpacity, SafeAreaView, Platform, Keyboard, TouchableWithoutFeedback,ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Material from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import { AUTH_NAV_ID, gotoHome, ROOT_NAV_ID } from '../../navigation';
import moment from 'moment';
import utils from '../../utils';
// import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker'
  import { usermanager } from '../../managers/UserManager';
// import { RadioButton } from 'react-native-paper';
// import db from "../../database/index" 


const RideDetail = observer((props) => {


	const [visible, setVisible] = useState(false)

	const [imgLoad, setimgLoad] = useState(false);

	const e=props.trip;  //selected trip
    const trnsctn=props.trnsctn;   //trnsctn of this trip
 

	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}

	const onClickRate=()=>{
		
	}



	console.log("trs : ",trnsctn)
	console.log("trp : ",e)

	var  t =  moment(e.createdAt).format('hh:mm a')  
	var date =  moment(e.createdAt).format("DD MMM Y");   //9 july 2021
	let createdAt= date+", "+t
	let tid=e.t_id   //trip id
	let rent=e.rent //total amount in trip ride fare
    let pm=e.payment_mode

	let distance=e.distance.toFixed(1)

	let status=e.status[e.status.length-1].status

	let totaltime=0;

	let ratetrip=true;
	
	
	if(status=="ended"){

		if(e.rating.customer=="No feedback given"){
			ratetrip=false
		}


		let startridetime= e.status.filter(obj => {   
		  return obj.status === "started" ?  obj.date  :""
		})
	
	   let endridetime= e.status.filter(obj => {   
		  return obj.status === "ended" ?  obj.date  :""
		})
 
		var  t =  moment(startridetime[0].date).format('hh:mm:ss a')  
		startridetime= t
		var  tt =  moment(endridetime[0].date).format('hh:mm:ss a')  
		endridetime=  tt
		var st = moment(startridetime, "HH:mm:ss a");
		var et = moment(endridetime, "HH:mm:ss a");
  
		var duration = moment.duration(et.diff(st));
		totaltime = parseInt(duration.asSeconds());
         
	 
	   }


	let cc=0;  //colect cash
	if(pm=="cash"&& status=="ended" && trnsctn){
	 if(trnsctn.debit==0 && trnsctn.credit==0){
	   cc=e.rent;
	 }
	 if(trnsctn.debit>0){
	   cc=e.rent+trnsctn.debit;
	 }
	 if(trnsctn.credit>0){
	   cc=e.rent-trnsctn.credit;
	 }
	}

	let msg=""
	if(trnsctn){
		msg= trnsctn.debit>0?"PKR "+trnsctn.debit.toFixed()+" has added your wallet":trnsctn.credit>0?"PKR "+trnsctn.credit.toFixed()+" has cut your wallet":""
	}
 


 
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
  return hDisplay + mDisplay + sDisplay; 
}

	const renderCaptain=()=>{
		return(
 <View style={{paddingVertical:20,borderBottomWidth: 0.5, borderBottomColor: 'grey', width: '100%', flexDirection: 'row'  ,paddingHorizontal:20,justifyContent:"space-between"}}>						
 {(!e.captain.profile_image)&&(<utils.vectorIcon.FontAwesome  name="user-circle" color="#0E47A1" size={60} />)}
 {(e.captain.profile_image&&e.captain.profile_image!=="")&&(
 <View style={{width:60,height:60,borderColor:"#0E47A1",borderRadius:30,borderWidth:1,alignItems:"center",justifyContent:"center"}}>
 <Image onLoad={()=>{setimgLoad(true)}}  style={{width:59,height:59,borderRadius:29.5}}  source={{uri:e.captain.profile_image}} />
 {imgLoad==false && <ActivityIndicator size={10} color="#0E47A1" style={{top:25,position:"absolute"}} />}
  </View>
 )}
						<View style={{ height: '100%',width:"80%",left:5 }}>

							<Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Inter-Bold', fontSize: 16, color: '#000',textTransform:"capitalize",lineHeight:20}}>{e.captain.fullname}</Text>
							<Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: 'grey',textTransform:"capitalize" ,lineHeight:20}}>{e.type.type} - {e.vehicle.color} {e.vehicle.car_name.name}</Text>
							<Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: 'grey',textTransform:"capitalize" ,lineHeight:20}}>{e.vehicle.registration_number}</Text>

	 {ratetrip==false&&(
	<TouchableOpacity onPress={()=>onClickRate()} activeOpacity={0.7} style={{width:"100%",flexDirection:"row",justifyContent:"space-between",marginTop:10,alignItems:"center"}}>
						
	<View style={{width:"40%" }}>
	<Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: "#0E47A1",textTransform:"capitalize" ,lineHeight:20}}>Rate this ride</Text>
	</View>

	<View style={{width:"50%" ,alignItems:"flex-end"}}>
	<View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"90%"}}>
	 <utils.vectorIcon.AntDesign name="staro" size={17} color={"grey"}/>
	 <utils.vectorIcon.AntDesign name="staro" size={17} color={"grey"}/>
	 <utils.vectorIcon.AntDesign name="staro" size={17} color={"grey"}/>
	 <utils.vectorIcon.AntDesign name="staro" size={17} color={"grey"}/>
	 <utils.vectorIcon.AntDesign name="staro" size={17} color={"grey"}/>
	 </View>
	</View>

	</TouchableOpacity>
					)}

					 
						
						</View>
	 </View>
		)
	}

	return (

		<SafeAreaView style={styles.Container} >


			<StatusBar animated={true}
				barStyle="light-content"
				backgroundColor={'#0E47A1'} />
			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.BackButton}>
					<Ionicons name={'arrow-back'} size={25} color={'#fff'} />
				</TouchableOpacity>
				<Text style={styles.HeaderText}>TRIP  {tid}</Text>
			</View>
			<ScrollView>
				<Image source={require('../../assets/images/map.jpg')}   blurRadius={2}  style={{ height: 200, width: '100%', resizeMode: 'contain' ,marginTop :-10}} />
				<Text numberOfLines={1} ellipsizeMode='tail' style={{ marginLeft: 20,   fontSize: 12,marginTop:-5,color:"black"}}>{createdAt}</Text>
				<View style={styles.Body}>
					<View style={{ height: 80, borderBottomWidth: 0.5, borderBottomColor: 'grey', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ marginLeft: 20, fontFamily: 'Inter-Regular', fontSize: 18 }}>Ride fare</Text>
						<Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, position: 'absolute', right: 40, color: 'grey' }}>PKR <Text style={{ fontFamily: 'Inter-Bold', fontSize: 24, color: '#000' }}>{rent}</Text></Text>
						<Material  style={{  position: 'absolute', right: 10,  }} name={visible?('keyboard-arrow-up'):('keyboard-arrow-down')} size={26} color='grey' onPress={()=>setVisible(!visible)}/>
					</View>
					{visible &&  (
						<View style={{ width: '100%', backgroundColor: '#e5e5e5', justifyContent: 'center',paddingVertical:20 }}>
						
							{status=="ended" &&(
								<View>	
								<Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: 'grey', marginLeft: 20 }}>You travelled {distance} km in {secondsToHms(totaltime)}</Text>
							<View style={{ flexDirection: 'row' ,width:'100%',marginTop:10}}>
								<Text style={{ fontFamily: 'Inter-Regular', marginLeft: 20,color:'#000' }}>Distance</Text>
								<Text style={{ fontFamily: 'Inter-Regular', position: 'absolute', right: 20, color: 'grey' }}>{distance}</Text>
							</View>
							<View style={{ flexDirection: 'row' ,width:'100%',marginTop:10}}>
								<Text style={{ fontFamily: 'Inter-Regular', marginLeft: 20,color:'#000' }}>Time</Text>
								<Text style={{ fontFamily: 'Inter-Regular', position: 'absolute', right: 20, color: 'grey' }}>{totaltime}</Text>
							</View>
							<View style={{height:1,width:'100%',backgroundColor:'silver',marginTop:10}}></View>
							
							<View style={{ flexDirection: 'row' ,width:'100%',marginTop:10}}>
								<Text style={{ fontFamily: 'Inter-Bold', marginLeft: 20,color:'#000' }}>Payment Mode</Text>
								<Text style={{ fontFamily: 'Inter-Bold', position: 'absolute', right: 20, color: '#000',textTransform:"capitalize"}}>{pm}</Text>
							</View>
								</View>
							)}

							{status=="cancelled" &&(
								<View>	
							<View style={{ flexDirection: 'row' ,width:'100%' }}>
								<Text style={{ fontFamily: 'Inter-Regular', marginLeft: 20,color:'#000' }}>Distance</Text>
								<Text style={{ fontFamily: 'Inter-Regular', position: 'absolute', right: 20, color: 'grey' }}>{distance} Km</Text>
							</View>
							<View style={{ flexDirection: 'row' ,width:'100%',marginTop:10 }}>
								<Text style={{ fontFamily: 'Inter-Regular', marginLeft: 20,color:'#000' }}>Cancelled By</Text>
								<Text style={{ fontFamily: 'Inter-Regular', position: 'absolute', right: 20, color: 'grey',textTransform:"capitalize" }}>{e.cancelled_by}</Text>
							</View>
							 
							<View style={{height:1,width:'100%',backgroundColor:'silver',marginTop:10}}></View>
							
							<View style={{ flexDirection: 'row' ,width:'100%',marginTop:10}}>
								<Text style={{ fontFamily: 'Inter-Bold', marginLeft: 20,color:'#000' }}>Payment Mode</Text>
								<Text style={{ fontFamily: 'Inter-Bold', position: 'absolute', right: 20, color: '#000',textTransform:"capitalize"}}>{pm}</Text>
							</View>
								</View>
							)}
							
						</View>
					)}
					
					{status=="ended"&&(
					<View>
						<View style={{ height: 80, borderBottomWidth: 0.5, borderBottomColor: 'grey', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
						<Image source={require('../../assets/images/money.png')} style={{ marginLeft: 10, height: 20, width: 40, resizeMode: 'contain' }} />
						<Text style={{ fontFamily: 'Inter-Regular', color: '#000' }}>{pm=="cash"?"Cash Paid":"Amount charged"}</Text>
						<Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, position: 'absolute', right: 20, color: '#000' }}>PKR {pm=="cash"?cc:rent}</Text>
					</View>
					{(trnsctn.debit>0 || trnsctn.credit>0)&&(
					<View style={{ height: 50, width: '100%', backgroundColor: '#eafaff', justifyContent: 'center' }}>
					<Text style={{ fontFamily: 'Inter-Regular', color: '#0E47A1', width: '90%', alignSelf: 'center' }}>{msg}</Text>
					</View> )}	
					</View>
					)}
				
				{status=="cancelled" && e.cancelled_by=="customer" &&(
					<View>
						<View style={{ height: 80, borderBottomWidth: 0.5, borderBottomColor: 'grey', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
						<Image source={require('../../assets/images/money.png')} style={{ marginLeft: 10, height: 20, width: 40, resizeMode: 'contain' }} />
						<Text style={{ fontFamily: 'Inter-Regular', color: '#000' }}>Cancellation charged</Text>
						<Text numberOfLines={1} style={{ fontFamily: 'Inter-Regular', fontSize: 14, position: 'absolute', right: 20, color: '#000' }}>PKR {e.amt_paid}</Text>
					</View>
					{(trnsctn.debit>0 || trnsctn.credit>0)&&(
					<View style={{ height: 50, width: '100%', backgroundColor: '#eafaff', justifyContent: 'center' }}>
					<Text style={{ fontFamily: 'Inter-Regular', color: '#0E47A1', width: '90%', alignSelf: 'center' }}>{msg}</Text>
					</View> )}	
					</View>
					)}
				
					
  				
				  {renderCaptain()}
 					

				</View>
			</ScrollView>
		</SafeAreaView >
	);
})
export default RideDetail;


