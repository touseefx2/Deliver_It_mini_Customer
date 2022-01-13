import theme from '../../theme'
import { StyleSheet, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Status: {
		backgroundColor: '#0E47A1'
	},
	MenuButton: {
		height: 30,
		width: 30,
		left: 15
	},
	Title: {
		color: '#000',
		fontSize: 18,
		fontFamily: 'Inter-Bold',
		marginLeft: 30
	},
	Header: {
		backgroundColor: '#fff',
		height: 60,
		alignItems:'center',
		flexDirection:'row',
		alignContent:'center',
	},
	Body: {
		width: '100%',
		alignSelf: 'center',
	},
	Lock:{
		backgroundColor:'#0E47A1',
		height:25,
		width:25,
		borderRadius:8,
		justifyContent:'center',
		alignItems:'center',
 
	},
	CardIcon:{ 
		backgroundColor: '#E5E5E5',
		justifyContent:'center',
		alignItems:'center', 
		height: 35, 
		width: 40, 
		borderRadius: 4 
	},
	BottomView:{
		padding:10,
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		alignSelf:'center',
		marginVertical:20
	},
	CardIconBG:{ 
		 alignItems:"center",
		 elevation:2,
		 justifyContent:"center",
		backgroundColor:'#e5e5e5',
		borderRadius:6 
	},
	BottomButton:{
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
		backgroundColor:'#0E47A1',
		height:48,
		alignSelf:"center",
		borderRadius:48,
	    bottom:15,
	 
	},
	buttonTextBottom:{
		color:'#fff',
		fontSize:16,
		lineHeight:19.36,
		fontFamily:'Inter-Bold'
	},
	LinearGradient:{
		height:'100%',
		width:'100%',
		borderRadius:48,
		justifyContent:'center',
		alignItems:'center',
	}
})

export default styles;