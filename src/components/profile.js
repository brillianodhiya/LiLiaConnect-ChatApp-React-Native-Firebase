import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Icon, ListItem, Left, Body, Text } from 'native-base'
import User from '../screens/auth/userdata'

export default class Profile extends Component {
    render() {
        // console.warn(this.props.navigation.state.params)
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Icon name='arrowleft' type='AntDesign' />
                </TouchableOpacity>
                <ImageBackground source={require("../assets/images/backgrounds.png")} style={styles.bacImage}>
                    <Image
                        source={{ uri: User.image }}
                        style={styles.image} />
                </ImageBackground>
                <View style={styles.parentText}>
                    <ListItem icon> 
                        <Left>
                            <Icon name='contacts' type='AntDesign' />
                        </Left>
                        <Body>
                            <Text>{User.name}</Text>
                        </Body>
                    </ListItem>
                </View>

                <View>
                    <Image source={require("../assets/images/logoconnect.png")} style={styles.logo} />
                </View>
                <View>
                <Image source={require("../assets/images/teksconnect_(2).png")} style={styles.textconnect} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignItems: 'center',
        alignContent: 'center'
    },
    Text: {
        fontSize: 22,
        color: '#2b2b2b'
    },
    parentText: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 17,
    },
    bacImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back: {
        marginLeft: 7,
        marginTop: 7,
        padding: 10,
        position: 'absolute',
        zIndex: 999,
    },
    logo: {
        width: 150,
        resizeMode: 'contain',
        position: 'absolute',
        top: -739,
        left: 110
    },
    textconnect: {
        height: 70,
        resizeMode: 'contain',
        position: 'absolute',
        top: -399,
        left: -260
    }
})