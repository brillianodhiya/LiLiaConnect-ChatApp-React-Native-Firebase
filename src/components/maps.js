import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Modal,
  Button
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import firebase from "firebase";
import User from "../screens/auth/userdata";
import { withNavigation } from "react-navigation";

console.ignoredYellowBox = ["Setting a timer"];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 8;
const CARD_WIDTH = CARD_HEIGHT - 5;

class Maps extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      longitude: "",
      latitude: "",
      data: [],
      modalVisible: false
    }),
      this.getLocation();
  }

  getLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  // updateLocation = async() =>{
  //     if (this.state.latitude) {
  //         await firebase.database().ref('user/'+ User.uid).update({
  //             latitude: this.state.latitude,
  //             longitude: this.state.longitude
  //         })
  //     }
  // }

  componentDidMount() {
    this.animation = new Animated.Value(0);
    firebase
      .database()
      .ref("user")
      .on("value", data => {
        let values = data.val();
        console.log(values);
        if (values) {
          const messageList = Object.keys(values).map(key => ({
            ...values[key],
            uid: key
          }));
          this.setState({
            data: messageList
          });
        }
      });
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= this.state.data.length) {
        index = this.state.data.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const coordinate = this.state.data[index];
          this.map.animateToRegion(
            {
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.02864195044303443,
              longitudeDelta: 0.020142817690068
            },
            350
          );
        }
      }, 10);
      // getLocation = async () => {
      //   Geolocation.getCurrentPosition(info => {
      //     this.setState({
      //       latitude: info.coords.latitude,
      //       longitude: info.coords.longitude
      //     });
      //   });
      // };

      updateLocation = async () => {
        AsyncStorage.getItem("uid", (error, result) => {
          if (result) {
            if (this.state.latitude) {
              console.log("this", this.state.latitude);
              firebase
                .database()
                .ref("user/" + result)
                .update({
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  status: "online"
                });
            }
          }
        });
      };
    });
  }

  render() {
    if (this.state.latitude) {
      this.updateLocation();
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <MapView
              ref={map => (this.map = map)}
              style={styles.map}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.02864195044303443,
                longitudeDelta: 0.020142817690068
              }}
            >
              {this.state.data.map(item => {
                if (item.longitude == "" || item.uid == User.uid) {
                } else {
                  return (
                    <Marker
                      coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                      }}
                      title={item.name}
                      description={item.status}
                      onCalloutPress={() =>
                        this.props.navigation.navigate("DetailFriend", item)
                      }
                    />
                  );
                }
              })}
            </MapView>
            <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.animation
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}
            >
              {this.state.data.map((item, index) => {
                if (item.uid !== User.uid) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("DetailChat", item)
                      }
                    >
                      <View style={styles.card} key={index}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.cardImage}
                          resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                          <Text numberOfLines={1} style={styles.cardtitle}>
                            {item.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.cardDescription}
                          >
                            {item.email}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </Animated.ScrollView>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: -7.7613167,
            longitude: 110.3589596,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        ></MapView>
      </View>
    );
  }
}
export default withNavigation(Maps);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  view: {
    position: "absolute"
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 100,
    borderColor: "#d6d4d4",
    borderWidth: 1
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  }
});
