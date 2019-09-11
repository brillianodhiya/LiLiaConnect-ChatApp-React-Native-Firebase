import React, { Component } from "react"
import { View, Dimensions, StyleSheet, AsyncStorage } from 'react-native'
import { Container, Header, Left, Body, Title, Right, Button, Icon, Tabs, Tab, TabHeading, Text } from "native-base";
import User from './auth/userdata'
import Chat from '../components/chat'
import Friends from '../components/friends'
import Geolocation from '@react-native-community/geolocation'
import firebase from 'firebase'
import Menu, { MenuItem } from 'react-native-material-menu'

class Home extends Component {
	constructor(props){
		super(props)
		// this.getLocation()
  }

  _menu = null

  setMenuRef = ref => {
    this._menu = ref
  }

  showMenu = () => {
    this._menu.show();
  }
  
  getLocation = async () => {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      })
    })
  }

  updateLocation = async () => {
    AsyncStorage.getItem('uid', (err, result) => {
      if (result) {
        if (this.state.latitude) {
          console.log(this.state.latitude)
          firebase.database().ref('user/'+ result).update({
            latitude: this.state.latitude,
            longitude: this.state.longitude
          })
        }
      }
    })
  }

  render() {
    return (
      <Container>
        <Header hasTabs style={styles.bgcolorheader}>
          <Left/>
          <Body>
            <Title style={styles.titlecolor}>
              LiLia Connect
            </Title>
          </Body>
          <Right>

            <Button transparent>
              <Icon style={styles.iconcolor} name="more" />
            </Button>

          </Right>
        </Header>
        <Tabs tabContainerStyle={{
          elevation: 0
        }}>
          <Tab heading={<TabHeading style={styles.bgcolorheader}><Icon style={styles.iconcolor} name='map' type='Foundation' /><Text style={styles.titlecolor}>Map</Text></TabHeading>}>
            <Text>Maps</Text>
          </Tab>
          <Tab heading={<TabHeading style={styles.bgcolorheader}><Icon style={styles.iconcolor} name='contacts' type='MaterialCommunityIcons' /><Text style={styles.titlecolor}>Friends</Text></TabHeading>}>
            <Friends />
          </Tab>
          <Tab heading={<TabHeading style={styles.bgcolorheader}><Icon style={styles.iconcolor} name='chat' type='Entypo' /><Text style={styles.titlecolor}>Chats</Text></TabHeading>}>
            <Chat />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bgcolorheader: {
    backgroundColor: '#87CEFA'
  },
  titlecolor: {
    color: 'black',
    textShadowColor: 'white',
    textShadowRadius: 10
  },
  iconcolor: {
    color: 'black',
    textShadowColor: 'white',
    textShadowRadius: 10
  }
});

export default Home;
