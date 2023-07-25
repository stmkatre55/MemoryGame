import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import InGameScreen from '../screens/inGameScreen';
import SplashScreen from '../screens/splashScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="InGameScreen" component={InGameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})