import React, { useEffect }  from "react";
import { View,StyleSheet,Text} from "react-native";
import theme from "../themes/index";



export default function TopMessage(props){
  
   const style=
   props.p=="abs"
   ?
   {backgroundColor:"black",paddingVertical:3,paddingHorizontal:10,borderRadius:5,alignSelf:"center",position:"absolute",top:0,opacity:0.8}
   :
   {backgroundColor:"black",paddingVertical:3,paddingHorizontal:10}

   return(
      <View style={style}>
       <Text style={{alignSelf:"center",fontWeight:"bold",color:"white",fontSize:14}}>{props.msg}</Text>
       </View>
   )
}