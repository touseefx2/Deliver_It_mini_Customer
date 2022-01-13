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
		color: '#fff',
		fontSize: 18,
		fontFamily: 'Inter-Regular',
		marginLeft: 30
	},
	Header: {
		backgroundColor: '#0E47A1',
		height: 60,
		alignItems:'center',
		flexDirection:'row',
		elevation:5,
		alignContent:'center',
	},
	Body: {
		width: '100%',
		alignSelf: 'center',
	 
	},
	Tabs:{
		width:'100%',
		height:50,
		flexDirection:'row',
	},
	Tab:{
		height:'100%',
		width:'50%',
		justifyContent:'center',
		alignItems:'center'
	},
	TabActive:{
		height:'100%',
		width:'50%',
		borderBottomWidth:2,
		borderBottomColor:'#0E47A1',
		justifyContent:'center',
		alignItems:'center'
	},
	TabText:{
		color:'#000',
		fontFamily:'Inter-Regular',
		fontSize:14
	},
	TabTextActive:{
		color:'#0E47A1',
		fontFamily:'Inter-Regular',
		fontSize:14
	},
	RideBox:{
		width:'100%',
	},
	VerticalLine:{
		height:10,
		width:2,
		backgroundColor:'#0E47A1',
		marginLeft:'5.9%'
	}
})

export default styles;