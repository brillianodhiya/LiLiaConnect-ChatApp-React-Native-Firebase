import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import User from "./userdata";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    User.uid = await AsyncStorage.getItem("uid");
    this.props.navigation.navigate(User.uid ? "App" : "Auth");
  };

  UNSAFE_componentWillMount() {
    const config = {
      apiKey: "AIzaSyBTmreHCULJtvpTC8Y2sqeyCcAiWac-BIg",
      authDomain: "lilia-connection.firebaseapp.com",
      databaseURL: "https://lilia-connection.firebaseio.com",
      projectId: "lilia-connection",
      storageBucket: "",
      messagingSenderId: "191491876389",
      appId: "1:191491876389:web:b29a2a9a424fe6e50f81cc"
    };
  }
  //rendering all
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
