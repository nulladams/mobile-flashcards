import { 
    ADD_CARD,
    ADD_DECK,
    REMOVE_DECK,
    RECEIVE_FLASHCARDS
} from '../actions'


function flashcards (state={}, action) {
    switch (action.type) {
        case RECEIVE_FLASHCARDS:
            return {
                ...state,
                ...action.flashcards
            }
        case ADD_CARD:
            const { title, question, answer, isAnswerCorrect } = action
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: state[title].questions.concat([{
                        question,
                        answer,
                        isAnswerCorrect
                    }])
                }
            }
        case ADD_DECK:
            const { deck } = action
            return {
                ...state,
                [deck]: {
                    title: deck,
                    questions: []        
                }
            }
        case REMOVE_DECK:
            return {
                ...Object.entries(state)
                    .filter((deck) => action.deck.title !== deck[0])
                    .map((deck) => ({
                        [deck[0]]: deck[1]        
                    }))
                    .reduce((obj, deck) => Object.assign(obj, deck), {})
            }
        default:
            return state
    }
}