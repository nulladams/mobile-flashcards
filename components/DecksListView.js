import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, gray } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { receiveFlashcards } from '../actions'

class DecksListView extends Component {
    componentDidMount() {
        const { decks, dispatch } = this.props

        if (decks.length === 0) {
            getDecks()
                .then((flashcards) => {
                    return dispatch(receiveFlashcards(flashcards))
                })
        }

        this.scrollToTheTop()
    }
    scrollToTheTop = () => {
        this.flatListRef.scrollToOffset({ offset: 0 })
    }
    keyExtractor = (item, index) => {
        return item.title
    }
    renderItem = ({ item }) => {
        return (
            <View key={item.title} style={styles.item}>
                <TouchableOpacity
                    style={{ alignItems: 'center', width: '100%' }}
                    onPress={() => this.props.navigation.navigate(
                        'DeckView',
                        { deck: item.title }
                    )}
                >
                    <Text style={{ fontSize: 20 }}>{item.title}</Text>
                    <Text>{item.questions.length}  cards</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { flashcards } = this.props
        return (
            <View style={styles.container}>
                <FlatList 
                    data={flashcards}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    ref={(ref) => this.flatListRef = ref}
                    onLayout={this.scrollToTheTop}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    item: {
        height: 100,
        backgroundColor: white,
        borderColor: gray,
        borderWidth: 0.5,
        borderRadius: 2,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.25)',
        shadowOffset: {
            width: 0,
            height: 3
        }
        
    }    
})

function mapStateToProps (state) {
    const decks = Object.keys(state)
    const flashcards = Object.values(state).reverse()

    console.log('flashcards', flashcards)

    return {
        decks,
        flashcards
    }
}

export default connect(mapStateToProps)(DecksListView)
