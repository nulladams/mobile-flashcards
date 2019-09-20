import React, { Component } from 'react'
import { View, Text, TextInput, Picker, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white, gray } from '../utils/colors'


const SubmitBtn = (props) => {
    return (
        <TouchableOpacity
            style={styles.androidSubmitBtn}
        >
            <Text style={{ textAlign: 'center', color: white }}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddCardView extends Component {
    submit = () => {

    }
    render() {
        return (
            <View style={styles.container}>
               <View style={styles.inputsContainer}>
                   <View style={styles.inputsBox}>
                        <TextInput 
                            placeholder='Question'
                        />
                   </View>
                   <View style={styles.inputsBox}>
                       <TextInput 
                            placeholder='Answer'    
                       />
                   </View>
                   <View style={styles.inputsBox}>
                       <Text>Given answer is: </Text>
                        <Picker
                            mode='dialog'
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
    }
})


export default AddCardView