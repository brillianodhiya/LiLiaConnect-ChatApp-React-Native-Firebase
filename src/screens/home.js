import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Text
} from "native-base";
import User from "./auth/userdata";
import Chat from "../components/chat";
import Friends from "../components/friends";
import Geolocation from 'react-native-geolocation-service';
import firebase from "firebase";
import Menu, { MenuItem } from "react-native-material-menu";
import Maps from "../components/maps";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: ''
    }
    this.getLocation();
    this.updateLocation();
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  showMenu = () => {
    this._menu.show();
  };

  async componentDidMount() {
    const myuid = await AsyncStorage.getItem('uid')
    let dbRef = firebase.database().ref('user/' + myuid)
    dbRef.ref.once('value')
      .then( (snapshot) => {
        const name = snapshot.child('name').val()
        const image = snapshot.child('image').val()
        User.name = name
        User.image = image
        // console.warn(User.name)
        // console.warn(name)
      })
  }

  hideLogout = async () => {
    let keys = ['uid','name','image']
    await AsyncStorage.multiRemove(keys, (error)=>{
        this.props.navigation.navigate('Login')
        console.log(error)
    });
    
  };

  getLocation = async () => {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      });
    });
  };
  
  updateLocation = async () => {
    AsyncStorage.getItem("uid", (error, result) => {
      console.warn(result)
      if (result) {
        if (this.state.latitude) {
          console.log("this", this.state.latitude);
          firebase
            .database()
            .ref("user/" + result)
            .update({
              latitude: this.state.latitude,
              longitude: this.state.longitude
            });
        }
      }
    });
  };

  render() {
    return (
      <Container>
        <Header hasTabs style={styles.bgcolorheader}>
          <Left />
          <Body>
            <Title style={styles.titlecolor}>LiLia Connect</Title>
          </Body>
          <Right>
          <Menu ref={this.setMenuRef}
          button={
            <Button transparent onPress={this.showMenu}>
              <Icon style={styles.iconcolor} name="more" />
            </Button>
          }
          >
            <MenuItem onPress={() => this.props.navigation.navigate('Profile')}>My Profile</MenuItem>
            <MenuItem onPress={this.hideLogout}>Log Out</MenuItem>
          </Menu>
          </Right>
        </Header>
        <Tabs
          tabContainerStyle={{
            elevation: 0
          }}
        >
          <Tab
            heading={
              <TabHeading style={styles.bgcolorheader}>
                <Icon style={styles.iconcolor} name="map" type="Foundation" />
                <Text style={styles.titlecolor}>Map</Text>
              </TabHeading>
            }
          >
            <Maps />
            {/* <Text>MAPS</Text> */}
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.bgcolorheader}>
                <Icon
                  style={styles.iconcolor}
                  name="contacts"
                  type="MaterialCommunityIcons"
                />
                <Text style={styles.titlecolor}>Friends</Text>
              </TabHeading>
            }
          >
            <Friends />
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.bgcolorheader}>
                <Icon style={styles.iconcolor} name="chat" type="Entypo" />
                <Text style={styles.titlecolor}>Chats</Text>
              </TabHeading>
            }
          >
            <Chat />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bgcolorheader: {
    backgroundColor: "#0098DB"
  },
  titlecolor: {
    color: "white",
  },
  iconcolor: {
    color: "white",
  }
});

export default Home;
