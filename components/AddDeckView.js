import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, orange, gray } from '../utils/colors'


const CreateDeckBtn = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.androidCreateDeckBtn}
        >
            <Text style={{ color: white, textAlign: 'center' }}>Create Deck</Text>
        </TouchableOpacity>
    )
}

class AddDeckView extends Component {
    state = {
        text: ''
    }
    handleTextChange = (input) => {
        this.setState(() => ({
            text: input
        }))
    }
    createDeck = () => {

    }
    render() {
        const { text } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={{ fontSize: 20 }}>What is the title of your deck?</Text>
                <TextInput
                    style={styles.deckNameInput}
                    value={text}
                    onChangeText={this.handleTextChange}
                    placeholder='Deck name'
                />
                <CreateDeckBtn 
                    onPress={this.createDeck}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    androidCreateDeckBtn: {
       backgroundColor: orange,
       color: white,
       padding: 10,
       paddingLeft: 30,
       paddingRight: 30,
       borderRadius: 2,
       height: 45,
       marginTop: 60,
       width: '60%' 
    },
    deckNameInput: {
        marginTop: 30,
        marginBottom: 30,
        borderColor: gray,
        borderWidth: 0.5,
        paddingTop: 20,
        paddingBottom: 20,
        width: '90%',
        paddingLeft: 10,
        fontSize: 15
    }
})

export default AddDeckView