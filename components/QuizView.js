import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { green, red } from '../utils/colors'

/**
 * @description Button to submit the correct option to a given answer
 */
const CorrectBtn = (props) => {
    return (
        <TouchableOpacity
            style={styles.androidCorrectBtn}
            onPress={() => props.onPress(true)}
        >
            <Text style={{ textAlign: 'center' }}>Correct</Text>
        </TouchableOpacity>
    )
}

/**
 * @description Button to submit the incorrect option to a given answer
 */
const IncorrectBtn = (props) => {
    return (
        <TouchableOpacity
            style={styles.androidIncorrectBtn}
            onPress={() => props.onPress(false)}
        >
            <Text style={{ textAlign: 'center' }}>Incorrect</Text>
        </TouchableOpacity>
    )
}

/**
 * @description View where the user play the game
 */
class QuizView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }
    state = {
        count: 0,
        toggle: false,
        correctAnswers: 0
    }
    toggleCard = (answerGiven) => {
        this.setState((currState) => ({
            toggle: !currState.toggle    
        }))
    }
    checkAnswer = (answerGiven) => {
        const { count } = this.state
        const { isAnswerCorrect } = this.props.deck.questions[count]

        this.setState((currState) => ({
            count: currState.count + 1,
            toggle: false,
            correctAnswers: (answerGiven === isAnswerCorrect) 
                ? currState.correctAnswers + 1
                : currState.correctAnswers
        }))
    }
    render() {
        const { count, toggle, correctAnswers } = this.state
        const { deck } = this.props
        if (deck.questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 20 }}>No questions in this deck</Text>
                </View>
            )
        }
        if (deck.questions.length > 0 && count < deck.questions.length) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 10, fontSize: 20 }}>
                        <Text style={{ padding: 10, fontSize: 15 }}>{count + 1} of {deck.questions.length}</Text>
                    </View>
                    {toggle
                        ? (
                            <View style={styles.questionsContainer}>
                                <Text style={{ fontSize: 30 }}>{deck.questions[count].answer}</Text>
                                <TouchableOpacity
                                    style={{ height: 45 }}
                                    onPress={this.toggleCard}
                                >
                                    <Text style={{ fontSize: 20, color: red }}>Question</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        : (
                            <View style={styles.questionsContainer}>
                                <Text style={{ fontSize: 30 }}>{deck.questions[count].question}</Text>
                                <TouchableOpacity
                                    style={{ height: 45 }}
                                    onPress={this.toggleCard}
                                >
                                    <Text style={{ fontSize: 20, color: red }}>Answer</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    
                    <View style={styles.btnsContainer}>
                        <CorrectBtn onPress={this.checkAnswer} />
                        <IncorrectBtn onPress={this.checkAnswer} />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 25, textAlign: 'center' }}>Number of correct answers: {correctAnswers} of {deck.questions.length}</Text>
                </View>
            )
        }

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