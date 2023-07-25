import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2000);
    })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Memory Game
      </Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    text:{
        fontSize:24,
        fontWeight:'bold',
        color:'#000'
    }
})