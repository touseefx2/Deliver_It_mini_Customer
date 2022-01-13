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
		marginLeft: 30
	},
	Header: {
		backgroundColor: '#fff',
		height: 60,
		alignItems:'center',
		flexDirection:'row',
		elevation:5,
		alignContent:'center',
	},
	Body: {
		width: '100%',
		alignSelf: 'center',
		marginBottom:10
	},
	Message:{ 
		width: '90%', 
		fontFamily: 'Inter-Regular', 
		alignSelf: 'center', 
		marginTop: 10,
		marginBottom:10, 
		fontSize: 16, 
		color: '#000',
		lineHeight:30 
	},
	Button:{
		height:60,
		width:'90%',
		borderRadius:48,
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		bottom:20,
		backgroundColor:'#0E47A1',
		alignSelf:'center'
	},
	ButtonText:{
		color:'#fff',
		fontFamily:'Inter-Regular',
		fontSize:18
	}
})

export default styles;