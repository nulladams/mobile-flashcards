export const RECEIVE_FLASHCARDS = 'RECEIVE_FLASHCARDS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

/**
 * @description Actions functions to manage flashcards data stored in the redux store
 */
export function receiveFlashcards (flashcards) {
    return {
        type: RECEIVE_FLASHCARDS,
        flashcards
    }
}

export function addCard (flashcard) {
    return {
        type: ADD_CARD,
        ...flashcard
    }
}

export function addDeck ({ deck }) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function removeDeck ({ deck }) {
    return {
        type: REMOVE_DECK,
        deck
    }
}