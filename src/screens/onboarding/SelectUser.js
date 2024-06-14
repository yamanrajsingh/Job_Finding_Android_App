import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { BG_COLOR,Text_COLOR } from '../../utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function SelectUser() {
    const navigation=useNavigation();

  return (
    <View style={style.container}>
      <Image source={require('../../images/logo.png')}  style={style.logo}></Image>
      <Text style={style.title}>What you are looking for?</Text>

      <TouchableOpacity style={style.hirebtn} onPress={()=>{
        navigation.navigate("JobPostingNavigator")
      }}>
        <Text style={style.btntext1}>Want to Hire Candidate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.jobbtn} onPress={()=>{
        navigation.navigate("JobSearchingNavigator")
      }}>
        <Text style={style.btntext2}>Want to Get Job</Text>
      </TouchableOpacity>
    </View>
  )
}

const style=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:BG_COLOR
  },
  title:{
    fontSize:20,
    fontWeight:'600'
  },
  hirebtn:{
    width:300,
    height:45,
    backgroundColor:Text_COLOR,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  jobbtn:{
    width:300,
    height:45,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderWidth:1,

  },
  btntext1:{
    color:BG_COLOR,
    fontSize:16,
    fontWeight:'500'
  },
  btntext2:{
    color:Text_COLOR,
    fontSize:16,
    fontWeight:'500'
  },
  logo:{
    width:140,
    height:140,
    marginBottom:10
  }
})