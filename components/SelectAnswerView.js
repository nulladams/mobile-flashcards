import React, { Component } from 'react'
import { Modal, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { white } from '../utils/colors'

const deviceWidth = Dimensions.get('window').width

class SelectAnswerView extends Component {
    state = {
        showModal: true
    }
    closeModal = () => {
        this.setState(() => ({
            showModal: false
        }))
    }
    render() {
        const { showModal } = this.state
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
            >
                <View 
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}
                >
                    <View
                        style={{
                            width: deviceWidth * .9,
                            height: 100,
                            backgroundColor: white,
                            elevation: 60,
                            padding: 10,
                        }}
                    >
                        <Text>Hello world!</Text>
                        <TouchableOpacity
                            onPress={this.closeModal}
                        >
                            <Text>Hide modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default SelectAnswerView