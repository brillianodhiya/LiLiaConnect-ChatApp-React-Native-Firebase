import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import {
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Icon
} from "native-base";
import firebaseServ from "./auth/firebaseService";
import firebase from "firebase";
import User from "./auth/userdata";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: ""
    };
  }
  onPressLogin = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async result => {
        console.log("result", result);

        await AsyncStorage.setItem("uid", result.user.uid)
        AsyncStorage.getItem("uid", (err, result) => {
          console.log("result2", result);
          if (result) {
            this.setState({
              email: "",
              password: "",
              isLoading: false
            });
            console.log("result2,2", result);
            this.props.navigation.navigate("Home");
          }
        });
      });
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
        <Content padder>
          <Form style={styles.fromplace}>
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
                editable={true}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </Item>
            <Text
              style={styles.forgotpass}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              Dont Have Account..?
            </Text>
            {this.state.isLoading ? (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignSelf: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white"
                }}
              >
                <ActivityIndicator size="large" color="#0FA391" />
              </View>
            ) : (
              <View />
            )}
            <Button rounded iconLeft style={styles.buttonlogin} dark onPress={this.onPressLogin}>
              <Icon name="login" type="AntDesign" />
              <Text>Login</Text>
            </Button>
          </Form>
          <Button iconRight transparent style={{ width: 180 }}>
            <Icon name="google" type="AntDesign" style={{ color: "red" }} />
            <Text style={{ color: "black" }}>Login With Google</Text>
          </Button>
          <Button iconRight transparent style={{ width: 180 }}>
            <Icon name="facebook-square" type="AntDesign" />
            <Text style={{ color: "black" }}>Login With Facebook</Text>
          </Button>
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
    height: 370,
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
    marginLeft: 90,
    marginBottom: 10
  }
});

export default Login;
