import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigator from './src/navigation/mainNavigator'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <MainNavigator/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})