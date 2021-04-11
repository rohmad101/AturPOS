import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'
import AuthScreen from '../Containers/AuthScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import {HomeScreenDrawer} from './Drawer' 
import DetailProductScreen from '../Containers/DetailProductScreen'
import CheckoutScreen from '../Containers/CheckoutScreen'
import CartScreen from '../Containers/CartScreen'
import HistoryOrder from '../Containers/HistoryOrder'
import DetailProfile from '../Containers/DetailProfile'
import DetailHistoryOrder from '../Containers/DetailHistoryOrder'

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
  HomeScreen: { screen: HomeScreenDrawer },
  DetailProductScreen: { screen: DetailProductScreen },
  CartScreen: { screen: CartScreen },
  HistoryOrder: { screen: HistoryOrder },
  DetailProfile: { screen: DetailProfile },
  DetailHistoryOrder : { screen: DetailHistoryOrder }
},{
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const Checkout = createStackNavigator({
  CheckoutScreen: { screen: CheckoutScreen }
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
  Main: Resgitered,
  Checkout: Checkout
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
