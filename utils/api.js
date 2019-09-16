import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:game'

export const getDecks = () => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => JSON.parse(results))
}

export const saveDeckTitle = (deck) => {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deck]: {
            title: deck,
            questions: []
        }
    }))
}

export const addCardToDeck = ({ deck, question, answer, isAnswerCorrect }) => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            const _data = JSON.parse(results)
            const data = _data

            data[deck].questions.concat({
                question,
                answer,
                isAnswerCorrect    
            })

            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))

        })
}


export const rmDeck = (deck) => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[deck] = 'undefined'
            delete data[deck]

            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
        })
}