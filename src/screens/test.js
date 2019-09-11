import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, AsyncStorage } from 'react-native'
import Header from '../components/header';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import Chat from './tab/chat'
import Friend from './tab/friend'
import Maps from './tab/maps'
import User from './auth/user';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase'

export default class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			index: 0,
			routes: [
				{ key: 'Chat', title: 'Chat' },
				{ key: 'Friend', title: 'Friend' },
				{ key: 'Maps', title: 'Maps' },
			],
		}
		this.getLocation()
	}
	getLocation = async () => {
		Geolocation.getCurrentPosition(info =>{
			this.setState({
				latitude:info.coords.latitude,
				longitude: info.coords.longitude
			})
		});
		console.log('masuk')
	}
	updateLocation = async() =>{
		AsyncStorage.getItem('uid',(error,result) => {
			if(result) {
				// console.log('result id',result)
				if (this.state.latitude) {
					console.log('this',this.state.latitude)
					 firebase.database().ref('user/'+ result).update({
						latitude: this.state.latitude,
						longitude: this.state.longitude
					})
		
				}
			}
		}
	)
}
	render() {
		this.updateLocation()
		return (
			<React.Fragment>
				<Header />
				<TabView
					navigationState={this.state}
					labelStyle={{ backgroundColor: 'red' }}
					renderScene={SceneMap({
						Chat: Chat,
						Friend: Friend,
						Maps: Maps

					})}
					onIndexChange={index => this.setState({ index })}
					initialLayout={{ width: Dimensions.get('window').width, height: 100 }}
					renderTabBar={props =>
						<TabBar
							{...props}
							indicatorStyle={{ backgroundColor: 'white' }}
							style={styles.tabNav}
							labelStyle={styles.labelStyle}
						/>
					}
				/>
			</React.Fragment>
		)
	}
}

const styles = StyleSheet.create({
	tabNav: {
		backgroundColor: '#6ea0f0'
	},
	labelStyle: {
		fontSize: 12
	}
})