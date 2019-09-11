import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import AuthLoadingScreen from "../screens/auth/authLoading";
import DetailFriend from "../components/detailfriend"

const stackAfterLogin = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    DetailFriend: {
        screen: DetailFriend
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const stackAuth = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const detectAuth = createSwitchNavigator(
  {
    authLoading: {
      screen: AuthLoadingScreen
    },
    App: stackAfterLogin,
    Auth: stackAuth
  },
  {
    initialRouteName: "authLoading"
  }
);

// const AppNavigator = createStackNavigator({
//     Login: {
//         screen: Login,
//         navigationOptions: {
//             title: 'LOGIN',
//             header: null
//         }
//     },
//     Register: {
//         screen: Register,
//         navigationOptions: {
//             header: null
//         }
//     },
//     Home: {
//         screen: Home,
//         navigationOptions: {
//             title: 'This is Home'
//         }
//     }
// })

export default Navigations = createAppContainer(detectAuth);
