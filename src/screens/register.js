import React, { Component } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import {
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Icon,
  Header,
  Left,
  Body
} from "native-base";
import firebase from "firebase";
import User from "./auth/userdata";
import firebaseServ from "./auth/firebaseService";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      id_user: "",
      name: "",
      image: ""
    };
  }

  handleSubmit = async () => {
    if (this.state.email.length < 4) {
      Alert.alert("Email must be more than 4 character and have @ symbol");
    } else if (this.state.password.length < 2) {
      Alert.alert("Password must be have more than 2 characters");
    } else if (this.state.name.length < 3) {
      Alert.alert("Name must be more than 3 characters");
    } else if (this.state.image.length < 4) {
      Alert.alert("Url Image must be more than 4 characters");
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(({ user }) => {
          console.log("user", user);
          let userf = firebase.auth().currentUser;
          userf.updateProfile({
            displayName: this.state.name,
            photoURL: this.state.image
          });
          firebase
            .database()
            .ref("user/" + user.uid)
            .set({
              name: this.state.name,
              image: this.state.image
            });
        });
      this.props.navigation.navigate("Login");
    }
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.group}>
          <View style={styles.group2}>
            <Image
              source={require("../assets/images/backgrounds.png")}
              resizeMode={"contain"}
              style={styles.image4}
            />
          </View>
        </View>
        <Image
          source={require("../assets/images/logoconnect.png")}
          resizeMode={"contain"}
          style={styles.image}
        />
        <Image
          source={require("../assets/images/teksconnect_(2).png")}
          resizeMode={"contain"}
          style={styles.image3}
        />
        <View style={styles.rect} />
        <Header transparent style={{ position: "absolute" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: "black" }} name="arrow-back" />
            </Button>
          </Left>
          <Body />
        </Header>
        <Content padder>
          <Form style={styles.fromplace}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                editable={true}
                maxLength={40}
                autoCorrect={false}
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Image (Url)</Label>
              <Input
                editable={true}
                maxLength={200}
                autoCorrect={false}
                onChangeText={text => this.setState({ image: text })}
                value={this.state.image}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                editable={true}
                maxLength={40}
                keyboardType={"email-address"}
                autoCorrect={false}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </Item>
            <Text
              onPress={() => this.props.navigation.goBack()}
              style={styles.forgotpass}
            >
              Forgot Password..?
            </Text>
            <Button
              rounded
              iconLeft
              style={styles.buttonlogin}
              dark
              onPress={this.handleSubmit}
            >
              <Icon name="login" type="AntDesign" />
              <Text>Register</Text>
            </Button>
          </Form>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "column"
  },
  group: {
    top: -184.43,
    left: -652.57,
    width: 1409.54,
    height: 1119.87,
    position: "absolute"
  },
  group2: {
    top: 0,
    left: 0,
    width: 1413.54,
    height: 1163.87,
    position: "absolute"
  },
  image4: {
    top: 0,
    left: 0,
    width: 1413.54,
    height: 1163.87,
    position: "absolute"
  },
  image2: {
    top: -137.9,
    left: -261.82,
    width: 1473.5,
    height: 935.34,
    position: "absolute"
  },
  image: {
    top: 24.28,
    left: 0,
    width: 254.68,
    height: 141.41,
    position: "absolute"
  },
  image3: {
    top: 67.85,
    left: 0,
    width: 319.21,
    height: 195.69,
    position: "absolute"
  },
  rect: {
    top: 226,
    left: 0,
    position: "absolute",
    width: 360,
    height: 400,
    backgroundColor: "rgba(255,255,255,1)",
    opacity: 0.6,
    shadowOpacity: 1,
    borderRadius: 30
  },
  fromplace: {
    marginTop: 220,
    color: "black"
  },
  forgotpass: {
    marginTop: 35,
    marginLeft: 200,
    marginBottom: 20
  },
  buttonlogin: {
    width: 130,
    marginLeft: 90
  }
});

export default Register;
