import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { green, red } from '../utils/colors'

class QuizView extends Component {
    render() {
        const { deck } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 10, fontSize: 20 }}>
                    <Text>Quiz View</Text>
                </View>
                <View style={styles.questionsContainer}>
                    <Text style={{ fontSize: 30 }}>Question</Text>
                    <TouchableOpacity
                        style={{ height: 45 }}
                    >
                        <Text style={{ fontSize: 20, color: red }}>Answer</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnsContainer}>
                    <TouchableOpacity
                        style={styles.androidCorrectBtn}
                    >
                        <Text style={{ textAlign: 'center' }}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.androidIncorrectBtn}
                    >
                        <Text style={{ textAlign: 'center' }}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    questionsContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btnsContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 30
    },
    androidCorrectBtn: {
        backgroundColor: green,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        width: '60%'
    },
    androidIncorrectBtn: {
        backgroundColor: red,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        width: '60%'
    }
})

function mapStateToProps (state, { navigation }) {
    const { deckTitle } = navigation.state.params
    return {
        deck: state[deckTitle]
    }
}

export default connect(mapStateToProps)(QuizView)