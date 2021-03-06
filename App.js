import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator }from 'react-navigation-stack'
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import Constants from 'expo-constants'
import { FontAwesome } from '@expo/vector-icons'
import AddDeckView from './components/AddDeckView'
import DecksListView from './components/DecksListView'
import DeckView from './components/DeckView'
import AddCardView from './components/AddCardView'
import QuizView from './components/QuizView'
import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

/**
 * @description Bottom navigator to select the list of decks or create a new deck
 */
const Tabs = createBottomTabNavigator({
  DecksListView: {
    screen: DecksListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='th-list' size={30} color={tintColor}  />
    }
  },
  AddDeckView: {
    screen: AddDeckView,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

/**
 * @description Main navigator for navigating through the app
 */
const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView
  },
  AddCardView: {
    screen: AddCardView
  },
  QuizView: {
    screen: QuizView
  }
}))

/**
 * @description Status bar
 */
function AppStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

/**
 * @description Starts the app's main functions
 */
export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
