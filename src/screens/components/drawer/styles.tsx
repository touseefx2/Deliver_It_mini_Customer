import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
	mainContainer: {
		marginLeft: 20,
		height: '100%',
		alignItems:'center'
	},
	Separator:{ 
		width: '100%', 
		alignSelf: 'flex-end', 
		height: 2, 
		backgroundColor: '#0E47A1', 
		opacity: 0.2,
		marginTop:30,
		marginBottom:10 
	},
	Box:{
		width:'100%',
		alignSelf:'center',
		flexDirection:'row',
		alignItems:'center',
	},
	Icon:{ 
		height: 70,
		width:50,
		alignItems:'center',
		justifyContent:'center' 
	},
	IconRight:{ 
		height: 70,
		width:60,
		alignItems:'center',
		justifyContent:'center',
		position:'absolute',
		right:0 
	},
	RightBox:{
		height:70,
		marginLeft:10,
		justifyContent:'center',
		width:'75%'
	},
	Title:{
		fontFamily:'Inter-Regular',
		fontSize:16
	},
	SubTitle:{
		fontFamily:'Inter-Regular',
		color:'grey',
		fontSize:14
	},
})

export default styles;