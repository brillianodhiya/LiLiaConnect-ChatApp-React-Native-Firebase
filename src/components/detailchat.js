import React, { Component } from "react";
// import { StyleSheet, AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";
import User from "../screens/auth/userdata";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Text,
  Thumbnail,
  View
} from "native-base";

export default class DetailChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.state.params.email,
      name: this.props.navigation.state.params.name,
      uid: this.props.navigation.state.params.uid,
      image: this.props.navigation.state.params.image,
      text: "",
      messagesList: [],
      myname: User.name,
      avatar: User.image,
      myuid: User.uid
    };
  }
  async componentDidMount() {
    await firebase
      .database()
      .ref("messages")
      .child(this.state.myuid)
      .child(this.state.uid)
      .on("child_added", value => {
        // console.log('value ',value)
        // console.log('value dan val',value.val())
        this.setState(previousState => {
          return {
            messagesList: GiftedChat.append(
              previousState.messagesList,
              value.val()
            )
          };
        });
        // console.warn(this.state.messagesList)
      });
  }
  sendMessage = async () => {
    if (this.state.text.length > 0) {
      let msgId = firebase
        .database()
        .ref("messages")
        .child(this.state.myuid)
        .child(this.state.uid)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.myuid,
          name: this.state.myname,
          avatar: this.state.avatar
        }
      };
      updates[
        "messages/" + this.state.myuid + "/" + this.state.uid + "/" + msgId
      ] = message;
      updates[
        "messages/" + this.state.uid + "/" + this.state.myuid + "/" + msgId
      ] = message;
      // console.warn(updates)
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ text: "" });
    }
  };
  render() {
    // console.warn(this.state.avatar)
    return (
      <Container>
        <Header style={{ backgroundColor: "#0098DB" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: "white" }}>{this.state.name}</Text>
          </Body>
        </Header>
        <GiftedChat
          text={this.state.text}
          messages={this.state.messagesList}
          onSend={this.sendMessage}
          user={{
            _id: this.state.myuid,
            name: this.state.myname
          }}
          onInputTextChanged={value => this.setState({ text: value })}
        />
      </Container>
    );
  }
}
