// @flow

import React from 'react'
import { Dimensions } from 'react-native'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { Divider, Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserRedux from '../../Redux/UserRedux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from '../Styles/DrawerDashboardStyle'

class DrawerDashboard extends React.Component {
  render () {
    const {width,height} = Dimensions.get('screen')
    const { UserSuccess, navigation } = this.props
    return (
      <ScrollView style={styles.container, { marginTop: 24}}>
        <KeyboardAvoidingView behavior='position'>
          <View style={{padding: 12, flexDirection: 'row', height: 75}}>
            <Image
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png'
              }}
              style={{width: 40, height: 40}}
            />
            <View style={{paddingHorizontal: 12}}>
              <Text style={{fontWeight: 'bold'}}>AturPOS</Text>
              <Text style={{fontSize: 10}}>Version 0.0.0</Text>
            </View>
          </View>
          <Divider style={{ backgroundColor: '#A9A9A9', height: 1 }} />
          <View style={{padding: 12, flexDirection: 'row', justifyContent: 'space-between', width: '65%'}}>
            <Image
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png'
              }}
              style={{width: 20, height: 20}}
            />
            <Text style={{fontWeight: '600'}}>AturPOS Container</Text>
          </View>
          <Divider style={{ backgroundColor: '#A9A9A9', height: 1 }} />
          <TouchableOpacity onPress={()=> navigation.push('DetailProfile')}>
            <View style={{padding: 12, flexDirection: 'row', justifyContent: 'flex-start', width: '65%'}}>
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
                style={{width: 20, height: 20}}
              />
              <Text style={{fontWeight: '600', marginLeft:width*0.05}}>Profile</Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ backgroundColor: '#A9A9A9', height: 1 }} />
          <TouchableOpacity onPress={()=> navigation.push('HistoryOrder')}>
            <View style={{padding: 12, flexDirection: 'row', justifyContent: 'flex-start', width: '65%'}}>
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
                style={{width: 20, height: 20}}
              />
              <Text style={{fontWeight: '600', marginLeft:width*0.05}}>History Order</Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ backgroundColor: '#A9A9A9', height: 1 }} />
          <TouchableOpacity onPress={()=> navigation.push('ListCustomer')}>
            <View style={{padding: 12, flexDirection: 'row', justifyContent: 'flex-start', width: '65%'}}>
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
                style={{width: 20, height: 20}}
              />
              <Text style={{fontWeight: '600', marginLeft:width*0.05}}>Customer</Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ backgroundColor: '#A9A9A9', height: 1 }} />
          <TouchableOpacity onPress={()=> UserSuccess({})}>
            <View style={{padding: 12, flexDirection: 'row', justifyContent: 'flex-start', width: '65%'}}>
                <Image
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
                style={{width: 20, height: 20}}
                />
                <Text style={{fontWeight: '600', marginLeft:width*0.05}}>Logout</Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ backgroundColor: '#A9A9A9', height: 1 }} />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(UserRedux), dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(DrawerDashboard)
