import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { BG_COLOR, Text_COLOR } from '../../utils/Colors'

const  Splash =()=> {
  return (
    <View style={styles.container}>
     <Image source={require('../../images/logo.png')} style={styles.logo}/>
     {/* <Text style={styles.name}>Find My Job</Text> */}
     <Text style={styles.slogan}>Post & Find in One Tap</Text>
    </View>
  )
}

export default Splash
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:BG_COLOR
    },
    logo:{
          height:200,
          width:200,
    },
    name:{
        fontWeight:'400',
        fontSize: 30,
        color:Text_COLOR
    },
    slogan:{
        fontWeight:'600',
        fontSize: 19,
        color:Text_COLOR,
        fontStyle:'italic',
        position:'absolute',
        bottom:80
    }

})