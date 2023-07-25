import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const initialArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const pairs = [...initialArray, ...initialArray];
const { width, height } = Dimensions.get("screen");

const InGameScreen = () => {
    const navigation = useNavigation();
    const [shuffledArray, setShuffledArray] = useState([]);
    const [matchedPairCount, setMatchedPairCount] = useState(0);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [turnCount, setTurnCount] = useState(0);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    useEffect(() => {
        const tempShuffledArray = shuffleArray(pairs);
        setShuffledArray(tempShuffledArray)
    }, [])

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            if (shuffledArray[firstIndex] === shuffledArray[secondIndex]) {
                setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
                setMatchedPairCount(matchedPairCount + 1)
            }
            setTimeout(() => {
                setFlippedIndices([]);
            }, 1000); // Delay for 1 second to show the cards before flipping back
        }
    }, [flippedIndices]);

    useEffect(() => {
        if (matchedPairCount === 8) {
            Alert.alert('Matched!', 'You have matched all charecters successfully!', [

                { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);

        }
    }, [matchedPairCount])

    const restart = () => {
        const tempShuffledArray = shuffleArray(shuffledArray);
        setShuffledArray(tempShuffledArray)
        setMatchedPairs([])
        setMatchedPairCount(0)
    }

    const handleCardClick = (index) => {
        setTurnCount(turnCount + 1);
        if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(index)) {
            setFlippedIndices([...flippedIndices, index]);
        }
    };

    const renderItem = ({ item, index }) => {
        const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(index);
        return (
            <TouchableOpacity
                key={index} onPress={() => handleCardClick(index)}
                style={[styles.card, isFlipped && styles.flippedCard]}
            >
                {isFlipped && <Text style={styles.cardText}>{item}</Text>}
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Memory Game</Text>
            </View>
            <FlatList
                numColumns={4}
                data={shuffledArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.cardContainer}
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.counterContainer}>
                            <View style={styles.counterView}>
                                <Text style={styles.counterText}>Matches: {matchedPairCount}</Text>
                            </View>
                            <View style={styles.counterView}>
                                <Text style={styles.counterText}>Turns: {turnCount}</Text>
                            </View>
                        </View>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => restart()}
                        >
                            <Text style={styles.text}>Restart</Text>
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    )
}

export default InGameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        padding: '3%',
        width: width,
        elevation: 5,
        backgroundColor: '#fff'
    },
    cardContainer: {
        paddingHorizontal: '3%',
        paddingTop: '5%'
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 7,
        backgroundColor: '#888fff',
        margin: '1%',
        borderRadius: 8
    },
    flippedCard: {
        backgroundColor: 'white',
        elevation: 5
    },
    cardText: {
        fontSize: 24,
        color: 'black',
    },
    text: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        marginVertical: '5%',
        width: width / 1.1,
        alignSelf: 'center',
        height: 40,
        backgroundColor: '#11ff52',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: '3%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    counterView: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#33ffff',
        marginHorizontal: '3%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600'
    }
})