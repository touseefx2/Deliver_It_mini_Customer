import theme from '../../theme'
import { StyleSheet} from 'react-native'
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent:'center',
		alignItems:'center'
	},
	logo: {
		height: 96,
		width: 96,
		top: 65,
		left: 32
	},
	title: {
		color: '#fff',
		fontSize: 24,
		width: 269,
		marginTop: 100,
		left: 32,
		lineHeight: 32,
		fontFamily:'Inter-Regular'
	},
	BottomButton:{
        width:'95%',
		flexDirection:'row',
		position:'absolute',
		bottom:20,
        alignSelf:'center',
        justifyContent:'center'
	},
    ButtonRight:{
		width:'95%',
		borderRadius:4,
		height:48,
		justifyContent:'center',
		alignItems:'center',
	},
	buttonText:{
		color:'#fff',
		fontSize:16,
		lineHeight:19.36,
		fontFamily:'Inter-Bold'
	},
    status:{
        backgroundColor:theme.colors.background
    },
	LinearGradient:{
		height:'100%',
		width:'100%',
		borderRadius:4,
		justifyContent:'center',
		alignItems:'center'
	}
})

export default styles;