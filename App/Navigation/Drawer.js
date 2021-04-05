

import HomeScreen from '../Containers/HomeScreen'
import { createDrawerNavigator } from 'react-navigation-drawer'
import DrawerDashboard from './Component/DrawerDashboard'

export const HomeScreenDrawer = createDrawerNavigator({
    HomeScreen: { screen: HomeScreen },
}, {
  contentComponent: DrawerDashboard, // Pass here
    // others props
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: 'rgba(0,0,0,0.5)',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae'
  }
})
