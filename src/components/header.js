import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Text, View, StyleSheet , TouchableOpacity,AsyncStorage } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu';

class Header extends Component {
    _menu = null

    setMenuRef = ref => {
        this._menu = ref
    }

    showMenu = () => {
        this._menu.show();
    }

    handlelogout = async () => {
        let keys = ['uid', 'name', 'image']
        await AsyncStorage.multiRemove(keys, (err) => {
            this.props.navigation.navigate('Login')
            console.log(err)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>LiLia Connect</Text>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#87CEFA',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titlecontainer: {
        justifyContent: 'center'
    },
    title: {
        color: 'black',
        alignItems: 'center',
        fontSize: 21,
        paddingLeft: 8
    }
})

export default withNavigation(Header)