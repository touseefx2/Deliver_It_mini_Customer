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
		color: 'grey',
		fontSize: 16,
		fontFamily: 'Inter-Regular',
		position:'absolute',
		right:20
	},
	BodyTitle:{
		fontSize:30,
		fontFamily: 'Inter-Bold',
		marginTop:10,
		marginLeft:20
	},
	Header: {
		backgroundColor: '#fff',
		height: 60,
		alignItems:'center',
		flexDirection:'row',
		alignContent:'center',
	},
	Body: {
		width: '90%',
		alignSelf: 'center',
		marginBottom:10,
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	Circle:{height:135,width:135,borderRadius:135,justifyContent:'center',alignItems:'center',backgroundColor:'#eafaff'},
	BackSoonView:{position:'absolute',height:30,width:110,borderRadius:10,transform: [{ rotate: '-10deg'}],top:90,left:20,backgroundColor:'#ccd6d6',justifyContent:'center',alignItems:'center'},
	BSText:{color:'#fff',fontFamily:'Inter-Bold',fontSize:16},
	SubTitle:{fontFamily:'Inter-Bold',fontSize:18,width:200,textAlign:'center',marginTop:20},
	MsgText:{fontFamily:'Inter-Regular',color:'grey',width:250,textAlign:'center',marginTop:20},
	
	BottomButton:{
        width:'30%',
		marginTop:20,
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
})

export default styles;