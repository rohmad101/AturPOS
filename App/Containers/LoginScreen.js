import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import UserRedux from '../Redux/UserRedux';

// Styles
import styles from './Styles/LaunchScreenStyles'
import { bindActionCreators } from 'redux';

function LoginScreen (props) {
  const [email, setEmail] = useState('')//maman@gmail.com
  const [validationEmail, setvalidationEmail] = useState(false)
  const [password, setPassword]= useState('')//112233
  const { navigation, data, UserRequest, UserSuccess} = props

  useEffect(()=>{
    if( data && data.token ){
      Alert.alert('Login Success', data.message)
      // console.log(data)
       navigation.navigate('Main', {
        screen: 'HomeScreen',
        initial: true,
      })
    }else if(data &&!data.success && data.message){
      Alert.alert('Login Failed', data.message)
      UserSuccess(null)
    }
  },[ data])

  const  Login = (params)=> {
    UserRequest({
      "EMAIL": email,
      "PASSWORD":password
  })
  }

  function onChangePassword(params) {
    setPassword(params)
  }

  function onChangeEmail(params) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(params) === false) {
    console.log("Email is Not Correct");
    setEmail(params)
    setvalidationEmail(false)
  }
  else {
    setEmail(params)
    setvalidationEmail(true)
    console.log("Email is Correct");
  }
  }

    return (
      <View style={[styles.mainContainer, {flexDirection:'column',padding:Metrics.baseMargin}]}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>  navigation.pop()}>
                <Image source={Images.backButton} style={{tintColor:'black', width:Metrics.screenWidth*0.125, height:Metrics.screenWidth*0.125}} />
            </TouchableOpacity>

            {/* <TouchableOpacity>
                <Image source={Images.faq} style={{tintColor:'black', width:Metrics.screenWidth*0.085, height:Metrics.screenWidth*0.075}} />
            </TouchableOpacity> */}
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.05}}>
            <Text style={{color:'black', fontWeight:'700', fontSize:Metrics.screenWidth*0.05}}>Masuk</Text>
            <Text style={{color:'black', fontWeight:'normal', fontSize:Metrics.screenWidth*0.04}}>Silahkan masuk dengan nomor HP-mu yang terdaftar</Text>
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
          <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Email</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TextInput 
                value={email}
                placeholder={'Cth: name@mail.com'}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.9}}
                onChangeText={value => onChangeEmail(value)}
              />
            </View>
            {
              email.length>0 && !validationEmail?<Text style={{color:'red'}}>email tidak valid</Text> :null
            }
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Password</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TextInput 
                value={password}
                placeholder={'Password'}
                secureTextEntry={true}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.9}}
                onChangeText={value => onChangePassword(value)}
              />
            </View>
          </View>
        </ScrollView>
        {
          validationEmail?
          <TouchableOpacity 
            onPress={()=> {
                //  navigation.dispatch(resetAction);
                Login()
                
            }}
            style={{ position:'absolute',bottom:25,right:25, borderWidth:0.5, padding:20, borderRadius:60}}
            >
            <Image source={Images.chevronRight} style={{tintColor:'grey', width:Metrics.screenWidth*0.07, height:Metrics.screenWidth*0.07 }}/>
          </TouchableOpacity>:null
        }
       
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    data: state.user.payload,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(UserRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
// export default connect(null,null)(LoginScreen)