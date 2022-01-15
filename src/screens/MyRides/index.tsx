import React, { useState, useRef,useEffect } from 'react';
import { Text, View, Linking, Image, StatusBar, Dimensions, TouchableOpacity, SafeAreaView,ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { AUTH_NAV_ID, ROOT_NAV_ID } from '../../navigation/navs'
import db from "../../database/index" 
import { generalmanager } from '../../managers/generalManager';
import { usermanager } from '../../managers/UserManager';
import utils from '../../utils';
import { goToLogin } from '../../navigation';
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
interface Props { }
const MyRides = observer((props: Props) => {
 
	let trnsctn=usermanager.trnsctn;
	
	const [trip,settrip]=useState(false);
	const [gettripOnce,setgettripOnce]=useState(false);
	const [isserverErr,setisserverErr]=useState(false);
	const [refresh,setrefresh]=useState(false);
	const [loader,setloader]=useState(false);

	
  
	const [tabIndex, setTabIndex] = useState(0);
 
	useEffect(() => {
		if(refresh){
		  setloader(false);setgettripOnce(false);setisserverErr(false);
		  settrip(false); 
		  setrefresh(false);
		}
	   }, [refresh])
		
		 useEffect(() => {
			 if(generalmanager.internet&&!refresh){
			  if(!gettripOnce){
				 getTrips()
			  }
			}
		  
		 },[generalmanager.internet,refresh,gettripOnce])
	  
		  const getTrips=()=>{
       
			setloader(true);
			setisserverErr(false);
			settrip(false)
			setgettripOnce(false);

			const bodyData=false
			const header= usermanager.authToken
			const uid=usermanager.user._id
 
			// method, path, body, header
			db.api.apiCall("get",db.link.getallTripsbyuid+uid,bodyData,header)
			.then((response) => {
				  setloader(false);
				 setisserverErr(false);
	  
				 console.log("getallTripsbyuid response : " , response);
			  
				   if(response.msg=="Invalid Token"){
					 utils.AlertMessage("",response.msg) ;
					 usermanager.attemptToLogout();
					 goToLogin();
					return;
				   }
	  
				 if(!response.data){
				  utils.AlertMessage("", response.message ) ;
				  settrip(false);
				  setgettripOnce(false)
				  return;
				 }
			
			
				 if(response.data){
				  usermanager.getmyWalletinfo()
				  setgettripOnce(true)
				  
				  if(response.data=="No record found"){
					settrip([]);
					return;
				  }
	  
				  if(response.data.length>0){

					let arr=[];

					response.data.map((e,i,a)=>{

				 let status=e.status[e.status.length-1].status
 
				 if(status=="ended" || status=="cancelled"){
					
					let c= e.status.filter(obj => {
						return (obj.status === "accepted") ? true :false
						})
				  
						console.log("C ",c)
				 
						if(c.length>0){
							arr.push(e)
						 }
				 }
			       
				

					})

					let tr=[];

					if(arr.length>0){
						tr =arr.sort((a, b) => {
							var timeA = b.createdAt;
							var timeB = a.createdAt;             
							return (moment(timeA)).diff(moment(timeB)) 
						  });
					}else{
                       tr=arr
					}
 					

				  settrip(tr);
				  return;
				  }
				 
				
				 }
			  
			   
				 return;
			 
			}).catch((e) => {
				setloader(false);
				setisserverErr(true);
				setgettripOnce(false);
				settrip(false);
			   console.error("getallTripsbyuid catch error : ", e)
			  return;
			})
	  }		  

	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}

	const GoToDetails=(trns,trp)=>{
  
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'RideDetail',
				passProps:{
					trnsctn:trns,
					trip:trp
					},
				options: {
					topBar: {
						visible: false,

					}

				},
			}
		})
	}

	const onclickDetails = (trp) => {
 
if(trip[0].cancelled_by=="captain"){
	GoToDetails("false",trp);
	return;
}

if(trnsctn.length>0){
 
let c=false;

trnsctn.map((e,i,a)=>{
	if(trp._id==e.trip[0]._id){	
      c=e;
	  return
	}
})
 
if(c){
	GoToDetails(c,trp)
}

  }
	}

	const renderServerErr=()=>{
		return  (
		  <View style={{marginTop:"60%"}}>
		  <Text style={{color:"grey",fontSize:15,alignSelf:"center",marginBottom:5}}>Server not respond !</Text>
		  <TouchableOpacity   onPress={()=>{ if(generalmanager.internet){setrefresh(true)}else{utils.AlertMessage("","Please connect internet !")} }}>
		  <Text  style={{color:"red",fontSize:15,textDecorationLine:"underline",alignSelf:"center"}}>Retry</Text>
		  </TouchableOpacity>
		  </View>
		)
	  }

	  const renderDataLoadeErr=()=>{
		return  (
			<View style={{marginTop:"60%"}}>
			<Text style={{color:"grey",fontSize:15,alignSelf:"center",marginBottom:5}}>Data not load !</Text>
			<TouchableOpacity   onPress={()=>{ if(generalmanager.internet){setrefresh(true)}else{utils.AlertMessage("","Please connect internet !")} }}>
			<Text  style={{color:"red",fontSize:15,textDecorationLine:"underline",alignSelf:"center"}}>Retry</Text>
			</TouchableOpacity>
			</View>
		)
	  }

	const renderInternetErr=()=>{
		return <Text style={{position:"absolute",top:"50%",color:"grey",fontSize:15,alignSelf:"center"}}>No internet connection !</Text>
	  }

	  const renderNoDataErr=()=>{
		return  (
		  <View style={{flexDirection:"row",marginTop:110,alignItems:"center",alignSelf:"center"}}>
		  <utils.vectorIcon.Foundation name="page-doc"  size={20} color={"grey"} />
		  <Text style={{color:"grey",fontSize:15,alignSelf:"center",marginLeft:15,top:2.5}}>No Record Found !</Text>
		   </View>
		)
	  }

	  const renderShowTrips=()=>{
	 
		const  t=trip.map((e,i,a)=>{
		
		 let status=e.status[e.status.length-1].status

		 let sc=status=="ended"?"#0E47A1":"red"

		 let statuss=status;
		 if(statuss=="ended"){
			statuss="complete"
		 }
		 
		 var  t =  moment(e.createdAt).format('hh:mm a')  
		 var date =  moment(e.createdAt).format("ddd D MMM");   //9 july 2021
		 let createdAt= date+", "+t
		 let tid=e.t_id   //trip id
		 let rent=e.rent //total amount in trip ride fare
		
	 
	  
		 return(
		
				  <View style={[styles.Body,{marginTop:i==0?20:0}]}>

						<TouchableOpacity onPress={()=>onclickDetails(e)} style={styles.RideBox}>
						<View style={{ flexDirection: 'row', marginTop: 0, width: '90%', alignSelf: 'center', height: 30 }}>
								<Text style={{ fontFamily: 'Inter-Regular', width: '50%', fontSize: 16,textTransform:"uppercase"}}>Trip</Text>
								<Text style={{ fontFamily: 'Inter-Regular', width: '50%', fontSize: 16, textAlign: 'right' }}>{tid}</Text>
							</View>
							<View style={{ flexDirection: 'row', marginTop:0, width: '90%', alignSelf: 'center', height: 30 }}>
								<Text style={{ fontFamily: 'Inter-Regular', width: '50%', fontSize: 14 }}>{createdAt}</Text>
								<Text style={{ fontFamily: 'Inter-Regular', width: '50%', fontSize: 14, textAlign: 'right' }}>PKR {rent}</Text>
							</View>
							<View style={{ flexDirection: 'row', marginTop:0, width: '90%', alignSelf: 'center', height: 30 }}>
								<Text style={{ fontFamily: 'Inter-Regular', width: '50%', fontSize: 14 }}>Status</Text>
								<Text style={{ fontFamily: 'Inter-Regular', width: '50%', fontSize: 14, textAlign: 'right',textTransform:"capitalize",color:sc}}>{statuss}</Text>
							</View>
							<View style={{ flexDirection: 'row', marginTop: 10, width: '90%', alignSelf: 'center' }}>
								<Text style={{ color: 'grey', width: '100%', lineHeight: 20 }} numberOfLines={1}><FontAwesome name='circle-o' color='#0E47A1' size={10} /> {e.pickup.name}</Text>
							</View>
							<View style={styles.VerticalLine}></View>
							<View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', }}>
								<Text style={{ color: 'grey', width: '100%', lineHeight: 20 }} numberOfLines={1}><Icon name='circle' color='#0E47A1' size={10} />  {e.dropoff.name}</Text>
							</View>
						</TouchableOpacity>

				    <View style={{backgroundColor:"silver",width:"90%",alignSelf:"center",marginVertical:20,height:0.5}} />

					</View>  
		 )
		 
		   })
	 
		   return t;
	  }
	 
 
	//   console.log("trip : ",trip )
	//  console.log("trnctn : ",trnsctn)

	return (

		<SafeAreaView style={styles.Container}>
			<StatusBar backgroundColor={'#0E47A1'} barStyle='light-content' />
			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.MenuButton}>
					<Icon name={'arrow-back-ios'} size={16} color={'#fff'} style={{ marginTop: 9, marginLeft: 10 }} />
				</TouchableOpacity>
				<Text style={styles.Title}>YOUR RIDES</Text>
			</View>
 {!generalmanager.internet && tabIndex==1  && !isserverErr && !loader  && trip && <utils.TopMessage msg="No internet connection ! "/> } 
 {!generalmanager.internet &&tabIndex==1  && !isserverErr && (!trip) && !loader && renderInternetErr()} 

			<View style={styles.Tabs}>
				<TouchableOpacity onPress={() => setTabIndex(0)} style={tabIndex == 0 ? (styles.TabActive) : (styles.Tab)}>
					<Text style={tabIndex == 0 ? (styles.TabTextActive) : (styles.TabText)}>SCHEDULED</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setTabIndex(1)} style={tabIndex == 1 ? (styles.TabActive) : (styles.Tab)}>
					<Text style={tabIndex == 1 ? (styles.TabTextActive) : (styles.TabText)}>HISTORY</Text>
				</TouchableOpacity>
			</View>


			<ScrollView>
	 
 

				{tabIndex == 0 ? (
					<View style={[styles.Body, { justifyContent: 'center', alignItems: 'center', height: windowHeight - 200 }]}>
						<View style={{backgroundColor:'#e5e5e5',height:120,justifyContent:'center',alignItems:'center',width:120,borderRadius:120}}>
							<Image source={require('../../assets/images/calendar.png')} style={{ height: 80, width: 80 }} />
						</View>
						<Text style={{ marginTop: 30, fontFamily: 'Inter-Regular', fontSize: 18 }}>You don't have any rides planned.</Text>
						<Text style={{ marginTop: 50, fontFamily: 'Inter-Regular', fontSize: 12 }}>Let's do something about that.</Text>
						<Text style={{ marginTop: 10, fontFamily: 'Inter-Bold', fontSize: 12, color: '#0E47A1' }} onPress={goBack}>BOOK A VEHICLE</Text>
					</View>
				) : (
					<View>
{isserverErr  && !loader && renderServerErr()}
{!loader  &&  !trip && !isserverErr && generalmanager.internet && renderDataLoadeErr()}
{!loader && trip  && trip.length<=0  && !isserverErr &&renderNoDataErr()}
{loader  && <ActivityIndicator style={{marginTop:"60%",alignSelf:"center"}} size={25} color={"#0E47A1"} />}
{!loader && trip && trip.length>0 && !isserverErr &&(renderShowTrips() )}

  
					</View>
					
				)}
			</ScrollView >

		</SafeAreaView >
	);
})
export default MyRides;

