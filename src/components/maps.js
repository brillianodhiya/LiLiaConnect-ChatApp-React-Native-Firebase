import React, { Component } from 'react'
import {View, Text,TouchableOpacity, StyleSheet, Animated, Dimensions, Image, Modal, AsyncStorage, Button}from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import firebase from 'firebase'
import User from '../screens/auth/userdata'
import { withNavigation } from 'react-navigation'

console.ignoredYellowBox = ['Setting a timer']

const { width, height } = Dimensions.get('window')

const CARD_HEIGHT = height / 4
const CARD_WIDTH = CARD_HEIGHT - 5

class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            longitude: '',
            latitude: '',
            data: [],
            modalVisible: false
        },
        this.getLocation()
    }

    getLocation = async () => {
        await Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (err) => this.setState({ error: err.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
        )
    }

    UNSAFE_componentWillMount() {
        this.animation = new Animated.Value(0)
    }

    componentDidMount() {
        firebase.database().ref('user').on('value', (data) => {
            let values = data.val()
            if (values) {
                const messageList = Object.keys(values).map(key => ({
                    ...values[key],
                    uid: key
                }))
                this.setState({
                    data: messageList
                })
            }
        })
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3)
            if (index >= this.state.data.length) {
                index = this.state.data.length - 1
            }
            if (index <= 0) {
                index = 0
            }

            clearTimeout(this.regionTimeout)
            this.regionTimeout = setTimeout(() => {
                if (this.index != index) {
                    this.index = index
                    const coordinate = this.state.data[index]
                    this.map.animateToRegion({
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                        latitudeDelta: 0.02864195044303443,
                        longitudeDelta: 0.020142817690068,
                    },
                    350)
                }
            },
            10)
        })
    }

    render() {

    }
}