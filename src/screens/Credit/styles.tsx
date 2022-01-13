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
		fontFamily: 'Inter-Regular',
		textAlign:'center',
		width:'87%'
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
		marginBottom:10,
		justifyContent:'center',
		flex:1
	},
	Card:{
		width:'90%',
		alignSelf:'center',
		elevation:3,
		borderRadius:10,
		justifyContent:'center',
		alignItems:'center'
	},
	CardTitle:{
		fontSize:16,
		color:'grey',
		fontFamily:'Inter-Regular',
		marginTop:30
	},
	CardRow:{ 
		flexDirection: 'row',
		width:'90%',
		alignSelf:'center',
		height:50,
		justifyContent:'center',
		alignItems:'center' 
	},
	PKR:{
		fontSize:30,
		fontFamily:'Inter-Regular',
		height:'100%',
		color:'grey',
		marginTop:20,
	},
	PKRInput:{
		fontSize:30,
		fontFamily:'Inter-Regular',
		marginLeft:10,
		height:'100%',
	},
	BottomButton:{
        width:'90%',
		position:'absolute',
		bottom:20,
        alignItems:'center',
        justifyContent:'center',
		backgroundColor:'#0E47A1',
		height:48,
		borderRadius:48,
		alignSelf:'center'

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
	},
	LeftCircle:{
		height:100,
		width:100,
		backgroundColor:'#e5e5e5',
		borderRadius:100,
		marginRight:20,
		justifyContent:'center',
		alignItems:'center'
	},
	RightCircle:{
		height:100,
		width:100,
		backgroundColor:'#e5e5e5',
		borderRadius:100,
		marginLeft:20
	}
})

export default styles;