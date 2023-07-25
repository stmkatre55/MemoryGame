import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('InGameScreen')}
            >
                <Text style={styles.btnText}>Play</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    button:{
        width:Dimensions.get('screen').width/3,
        height:Dimensions.get('screen').width/3,
        borderRadius:100,
        backgroundColor:'#777fff',
        justifyContent:'center',
        alignItems:'center',
        elevation:5
    },
    btnText:{
        color:'#000',
        fontSize:24,
        fontWeight:'bold'
    }
})