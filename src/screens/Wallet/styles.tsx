import theme from '../../theme'
import { StyleSheet, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Status: {
		backgroundColor: '#fff'
	},
	Body:{
		width:'100%',
		alignSelf:'center',
	},
	Header:{
		height:50,
		width:'90%',
		flexDirection:'row',
		alignItems:'center',
		marginTop:20,
		alignSelf:'center',
	},
	RightHeader:{
		height:'100%',
		alignItems:'center',
		position:'absolute',
		right:0
	},
	CreditCard:{
		width:'90%',
		alignSelf:'center',
		height:150,
		borderRadius:10,
		backgroundColor:'#0E47A1',
		justifyContent:'center',
		marginTop:10,
		alignContent:'center'
	},
	CreditCardTitle:{
		color:'#fff',
		fontFamily:'Inter-Bold',
		fontSize:17,
		marginLeft:20,
		alignSelf:'center'
	},
	LeftButton:{
		backgroundColor:'#fff',
		width:'48%',
		height:48,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:48,
	},
	RightButton:{
		backgroundColor:'#fff',
		width:'48%',
		height:48,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:48,
		position:'absolute',
		right:0
	},
	Card:{
		backgroundColor:'#fff',
		height:200,
		width:'90%',
		alignSelf:'center',
		borderRadius:10,
		marginTop:20,
		elevation:5,
		marginBottom:10,
		justifyContent:'center'
	},
	CardBody:{
		width:'90%',
		alignSelf:'center',
		height:'90%'
	},
	CreditButtonView:{ 
		flexDirection: 'row', 
		width: '90%', 
		alignSelf: 'center', 
		alignContent: 'center', 
		marginTop: 30 
	},
	CardIcon:{ 
		backgroundColor: '#E5E5E5',
		justifyContent:'center',
		alignItems:'center', 
		height: 35, 
		width: 40, 
		borderRadius: 4 
	},
	GreyText:{
		width:'90%',
		color:'grey',
		fontFamily:'Inter-Regular',
		marginLeft:20
	},
	AddButton:{
		height:48,
		width:'100%',
		alignSelf:'center',
		marginTop:30,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'#0E47A1',
		borderRadius:48
	}
	

})

export default styles;