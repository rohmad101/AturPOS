import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import UserRedux from '../Redux/UserRedux';

// Styles
import styles from './Styles/LaunchScreenStyles'
import { bindActionCreators } from 'redux';

function LoginScreen (props) {
  const [email, setEmail] = useState('maman@gmail.com')
  const [password, setPassword]= useState('112233')
  const { navigation, data, UserRequest} = props

  useEffect(()=>{
    if( data && data.token){
      console.log(data)
       navigation.navigate('Main', {
        screen: 'HomeScreen',
        initial: true,
      })
    }
  },[ data])

    return (
      <View style={[styles.mainContainer, {flexDirection:'column',padding:Metrics.baseMargin}]}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>  navigation.pop()}>
                <Image source={Images.backButton} style={{tintColor:'black', width:Metrics.screenWidth*0.125, height:Metrics.screenWidth*0.125}} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Image source={Images.faq} style={{tintColor:'black', width:Metrics.screenWidth*0.085, height:Metrics.screenWidth*0.075}} />
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.05}}>
            <Text style={{color:'black', fontWeight:'700', fontSize:Metrics.screenWidth*0.05}}>Masuk</Text>
            <Text style={{color:'black', fontWeight:'normal', fontSize:Metrics.screenWidth*0.04}}>Silahkan masuk dengan nomor HP-mu yang terdaftar</Text>
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.05}}>
            <Text>Nomor HP</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{padding:Metrics.screenWidth*0.025, borderWidth:0.5,borderRadius:20,flexDirection:'row',alignItems:'center',backgroundColor:'white',borderColor:'grey'}}>
                <Image source={{uri:'https://indonesia.nl/en/images/basic/indonesia/background-bendera-merah-putih-berkibar.png'}} style={{ width:Metrics.screenWidth*0.065, height:Metrics.screenWidth*0.055}} />
                <Text style={{color:'grey', fontWeight:'700', paddingLeft:4}}>+62</Text>
              </View>
              <TextInput 
                placeholder={'123123'}
                keyboardType={'number-pad'}
                style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginLeft:12}}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity 
          onPress={()=> {
              //  navigation.dispatch(resetAction);
              
               UserRequest({
                "EMAIL": "maman@gmail.com",
                "PASSWORD": "112233"
            })
          }}
          style={{ position:'absolute',bottom:25,right:25, borderWidth:0.5, padding:20, borderRadius:60}}
          >
          <Image source={Images.chevronRight} style={{tintColor:'grey', width:Metrics.screenWidth*0.07, height:Metrics.screenWidth*0.07 }}/>
        </TouchableOpacity>
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    data: state.user.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(UserRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
// export default connect(null,null)(LoginScreen)