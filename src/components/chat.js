import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import User from "../screens/auth/userdata";
import firebase from "firebase";
import { withNavigation } from "react-navigation";

console.ignoredYellowBox = ['Setting a timer']

class FlatListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("detailChat", this.props.item);
          }}
          style={styles.button}
        >
          <View style={styles.parenImage}>
            <Image
              source={{ uri: this.props.item.image }}
              style={styles.image}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.TextName}>{this.props.item.name}</Text>
            <Text style={styles.TexContent}>{this.props.item.content}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class Chat extends Component {
  state = {
    user: []
  };
  async componentDidMount() {
    AsyncStorage.getItem("uid", (error, result) => {
      if (result) {
        firebase
          .database()
          .ref("user")
          .on("child_added", val => {
            const person = val.val();
            person.uid = val.key;
            if (person.uid === result) {
              User.name = person;
            } else {
              this.setState(prevState => {
                console.log("pevstae", prevState);
                return {
                  user: [...prevState.user, person]
                };
              });
            }
          });
      }
    });
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.user}
          numColumns={1}
          renderItem={({ item, index }) => {
            return (
              <FlatListItem
                navigation={this.props.navigation}
                item={item}
                index={index}
              ></FlatListItem>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "#c4c4c4",
    margin: 4
  },
  container: {
    flex: 1
  },
  parenImage: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  content: {
    flex: 4,
    paddingLeft: 17
  },
  TexContent: {
    fontSize: 13
  },
  TextName: {
    fontSize: 17,
    color: "#1c1c1c"
  }
});

export default withNavigation(Chat);
