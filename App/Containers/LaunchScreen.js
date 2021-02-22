import React, { Component } from 'react'
import { ScrollView, Text, Image, View, ActivityIndicator, Dimensions } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import UserRedux from '../Redux/UserRedux';
// Styles
import styles from './Styles/LaunchScreenStyles'
import { bindActionCreators } from 'redux'

class LaunchScreen extends Component {
  componentDidMount() {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'AuthScreen' })],
    // });

      console.log(this.props.data)
    setTimeout(() => {
      if(this.props.data && this.props.data.token){
        this.props.navigation.navigate('Main', {
          screen: 'HomeScreen',
          initial: true,
        })
      }else{
        this.props.navigation.navigate('AuthScreen');
      }
    }, 3000);
  }
  render () {
    const {width, height } = Dimensions.get('screen')
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <ActivityIndicator color={'#fff'} size={width*0.1} style={{marginTop:24}}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.user.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(UserRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
