import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'
import AuthScreen from '../Containers/AuthScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import HomeScreen from '../Containers/HomeScreen' 
import DetailProductScreen from '../Containers/DetailProductScreen'
import CheckoutScreen from '../Containers/CheckoutScreen'
import CartScreen from '../Containers/CartScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const AuthNavigator = createStackNavigator({
  AuthScreen: { screen : AuthScreen },
  RegisterScreen: { screen: RegisterScreen },
  LoginScreen: { screen: LoginScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const Resgitered = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  DetailProductScreen: { screen: DetailProductScreen },
  CheckoutScreen: { screen: CheckoutScreen },
  CartScreen: { screen: CartScreen }
},{
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimaryNav = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  Auth: AuthNavigator,
  Main: Resgitered
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
