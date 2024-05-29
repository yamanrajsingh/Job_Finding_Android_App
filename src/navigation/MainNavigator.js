import { View, Text } from 'react-native'
import React from 'react'
import Splash from '../screens/onboarding/Splash'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
const STACK=createStackNavigator
export default function MainNavigator() {
  return (
//   <Splash/>
    <NavigationContainer>
        <STACK.Navigator>
            <STACK.screen name='' components={} options={{}}/>
        </STACK.Navigator>
    </NavigationContainer>
  )
}