import React, { Component } from 'react'
import { View, Text, TextInput, Picker, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { connect }  from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { purple, white, gray, red } from '../utils/colors'


const SubmitBtn = (props) => {
    return (
        <TouchableOpacity
            style={styles.androidSubmitBtn}
            onPress={props.onPress}
        >
            <Text style={{ textAlign: 'center', color: white }}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddCardView extends Component {
    state = {
        questionText: '',
        answerText: '',
        isAnswerCorrect: true,
        showAnswerEmpty: false,
        showQuestionEmpty: false,
    }
    handleQuestionChange = (input) => {
        this.setState(() => ({
            questionText: input
        }))
    }
    handleAnswerChange = (input) => {
        this.setState(() => ({
            answerText: input
        }))
    }
    checkQuestionEmpty = () => {
        const { questionText } = this.state

        if (questionText === '') {
            this.setState(() => ({
                showQuestionEmpty: true
            }))
        } else {
            this.setState(() => ({
                showQuestionEmpty: false
            }))
        }
    }
    checkAnswerEmpty = () => {
        const { answerText } = this.state

        if (answerText === '') {
            this.setState(() => ({
                showAnswerEmpty: true
            }))
        } else {
            this.setState(() => ({
                showAnswerEmpty: false
            }))
        }
    }
    submit = () => {
        const { questionText, answerText, isAnswerCorrect } = this.state
        const { deck, dispatch, navigation } = this.props

        if (questionText === '' || answerText === '') {
            Alert.alert('Question and Answer fields must have a value!')
        } else {
            dispatch(addCard({
                title: deck,
                question: questionText,
                answer: answerText,
                isAnswerCorrect
            }))

            addCardToDeck({
                deck,
                question: questionText,
                answer: answerText,
                isAnswerCorrect
            })

            navigation.goBack()
        }
    }
    render() {
        const {
            questionText,
            answerText,
            isAnswerCorrect,
            showQuestionEmpty,
            showAnswerEmpty
        } = this.state
        return (
            <View style={styles.container}>
               <View style={styles.inputsContainer}>
                   <View style={styles.inputsBox}>
                        <TextInput 
                            placeholder='Question'
                            value={questionText}
                            onChangeText={this.handleQuestionChange}
                            onEndEditing={this.checkQuestionEmpty}
                        />
                        {showQuestionEmpty && (
                            <Text style={styles.emptyInput}>Question field must have a value</Text>
                        )}
                   </View>
                   <View style={styles.inputsBox}>
                       <TextInput 
                            placeholder='Answer'
                            value={answerText}
                            onChangeText={this.handleAnswerChange}
                            onEndEditing={this.checkAnswerEmpty}
                       />
                       {showAnswerEmpty && (
                           <Text style={styles.emptyInput}>Answer field must have a value</Text>
                       )}
                   </View>
                   <View style={styles.inputsBox}>
                       <Text>Given answer is: </Text>
                        <Picker
                            mode='dialog'
                            selectedValue={isAnswerCorrect}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState(() => ({
                                    isAnswerCorrect: itemValue
                                }))
                            }}
                        >
                            <Picker.Item label='Correct' value={true} />
                            <Picker.Item label='Incorrect' value={false} />
                        </Picker>
                   </View>
               </View>
               <View style={styles.btnsContainer}>
                    <SubmitBtn onPress={this.submit} />
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputsContainer: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btnsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        width: '60%',
        borderRadius: 2,
    },
    inputsBox: {
        borderColor: gray,
        borderWidth: 0.5,
        width: '90%',
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 15
    },
    emptyInput: {
        color: red,
        fontSize: 10
    }
})

function mapStateToProps (state, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck
    }
}

export default connect(mapStateToProps)(AddCardView)