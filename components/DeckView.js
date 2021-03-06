import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { blue, white, orange, red, gray } from '../utils/colors'
import { StackActions, NavigationActions } from 'react-navigation'
import { removeDeck } from '../actions'
import { rmDeck } from '../utils/api'

const width = Dimensions.get('window').width


/**
 * @description Button to open a view to add new cards
 */
const AddCardBtn = (props) => {
    return (
        <TouchableOpacity
            style={[styles.deckBtn, { backgroundColor: blue }]}
            onPress={() => props.navigation.navigate(
                'AddCardView',
                { deck: props.deck.title }
            )}
        >
            <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

/**
 * @description Button to open a view and start a quiz
 */
const StartQuizBtn = (props) => {
    return (
        <TouchableOpacity
            style={[styles.deckBtn, { backgroundColor: orange }]}
            onPress={() => props.navigation.navigate(
                'QuizView',
                { deckTitle: props.deckTitle }
            )}
        >
            <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
    )
}

/**
 * @description Button to delete a deck from local storage
 */
const DeleteDeckBtn = (props) => {
    return (
        <TouchableOpacity
            style={[styles.deckBtn, { backgroundColor: red }]}
            onPress={props.onPress}
        >
            <Text style={styles.btnText}>Delete Deck</Text>
        </TouchableOpacity>
    )
}


/**
 * @description Button to open a view that list the existing decks (home view)
 */
const DecksListBtn = (props) => {
    return (
        <TouchableOpacity
            style={[styles.deckBtn, { backgroundColor: gray }]}
            onPress={() => props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            }))}
        >
            <Text style={styles.btnText}>Decks List</Text>
        </TouchableOpacity>
    )
}

/**
 * @description View where is possible to manage a specific deck
 */
class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params
        return {
            title: deck
        }
    }
    deleteDeck = () => {
        const { deck } = this.props

        console.log('remove deck', deck)

        rmDeck(deck.title)
            .then(() => this.props.dispatch(removeDeck({
                deck
            })))

        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })]        
        }))
    }
    render() {
        const { deck } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 20 }}>{deck.title}</Text>
                    <Text>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.btnContainer}>
                    <AddCardBtn navigation={this.props.navigation} deck={deck} />
                    <StartQuizBtn deckTitle={deck.title} navigation={this.props.navigation} />
                    <DeleteDeckBtn onPress={this.deleteDeck} />
                    <DecksListBtn deckTitle={deck.title} navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 50,
    },
    deckBtn: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        width: width * .6
    },
    btnText: {
        color: white,
        textAlign: 'center'
    }
})

function mapStateToProps (state, { navigation } ) {

    const { deck } = navigation.state.params

    return {
        deck: state[deck],
        state
    }
}

export default connect(mapStateToProps)(DeckView)