import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
	
	Status: {
		backgroundColor: '#0e47a1'
	},
	Picker:{
		width: '100%',
		color:'#000',
		marginLeft:-5,
	},
	Header:{
		height:70,
		width:'100%',
		backgroundColor:'#002171',
	},
	HeaderText:{
		color:'#fff',
		fontSize:32,
		marginLeft:20,
		fontFamily:'Inter-Bold',
		position:'absolute',
		bottom:5
	},
	Body:{
		alignSelf:'center',
		width:'85%',
		height:'100%',
	},
	Heading:{
		fontSize:16,
		fontFamily:'Inter-Bold',
		marginTop:10
	},
	Price:{
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		height:48
	},
	AddedFeatures:{ 
		color: '#000', 
		padding: 5, 
		fontFamily:'Inter-Regular',
	
	},
	FeaturesView:{ 
		borderColor: '#005FF4', 
		borderWidth: 1, 
		borderRadius: 4, 
		marginRight: 10 ,
		marginTop:10
	
	},
	AddedFeaturesView:{ 
		borderColor: '#2AD100', 
		borderWidth: 1, 
		borderRadius: 4, 
		marginRight: 10 ,
		marginTop:10,
		backgroundColor:'#2AD100'
	
	},
	MinMax:{
		width:'40%',
		textAlign:'center',
		backgroundColor:'#F2F2F2',
		borderRadius:3,
		height:40,
		marginTop:5,
		fontFamily:'Inter-Regular',
	},
	MidText:{
		width:'20%',
		textAlign:'center'
	},
	ButtonLeft:{
		width:'45%',
		borderRadius:3,
		textAlign:'center',
		backgroundColor:'#F2F2F2',
		padding:10,
		fontFamily:'Inter-Regular',
		color:'grey',
	},
	ButtonRight:{
		position:'absolute',
		right:0,
		width:'45%',
		borderRadius:3,
		textAlign:'center',
		backgroundColor:'#F2F2F2',
		padding:10,
		fontFamily:'Inter-Regular',
		color:'grey',
	},
	Search:{
		width:'100%',
		height:48,
		backgroundColor:'#F2F2F2',
		borderRadius:4
	},
	Features:{
		color:'#000',
		padding:5,
	},
    Button:{
		backgroundColor:'#0E47A1',
		width:'100%',
		borderRadius:4,
		height:48,
		justifyContent:'center',
		alignItems:'center',
        marginTop:20,
		marginBottom:50
	},
	buttonText:{
		color:'#fff',
		fontSize:16,
		lineHeight:19.36,
		fontFamily:'Inter-Bold'
	},
})

export default styles;