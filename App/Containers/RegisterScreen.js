import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import { Images, Metrics } from '../Themes'
import UserRedux from '../Redux/UserRedux';

// Styles
import styles from './Styles/LaunchScreenStyles'

function RegisterScreen (props) {
  const { user , navigation } = props
  const [username, setusername] = useState('')
  const [validationUsername, setvalidationUsername] = useState(false)
  const [email, setemail] = useState('')
  const [validationEmail, setvalidationEmail] = useState(false)
  const [phone, setphone] = useState('')
  const [validationPhone, setvalidationPhone] = useState(false)
  const [password, setpassword] = useState('')
  const [rePassword, setrePassword] = useState('')
  const [validationPassword, setvalidationPassword] = useState(false)
  const [valid, setValid] = useState(false)
  function submit() {

    const param = {
      "USERNAME": username,
      "NAME": username,
      "EMAIL": email,
      "PHONE": phone,
      "ROLE_ID": 1,
      "PASSWORD": password,
      "c_password": rePassword,
      "ISACTIVE": true
    }
    
    if(valid){
      axios
      .post(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/register',param,
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          timeout: 10000,
        },
      ).then(
         success =>{
           console.warn(success)
          Alert.alert('Success', "Register Success")
          navigation.pop()
        }
      ).catch(err =>
        // console.log(JSON.stringify(err))
         Alert.alert('Failed', JSON.stringify(err))
      )
    }
  }
  function onChangeName(params) {
    let reg =/[a-z]/
    setusername(params)
    if (reg.test(params) === false) {
      setvalidationUsername(false)
    }else{
      setvalidationUsername(true)
    }
  } 

  function onChangeEmail(params) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(params) === false) {
    console.log("Email is Not Correct");
    setemail(params)
    setvalidationEmail(false)
  }
  else {
    setemail(params)
    setvalidationEmail(true)
    console.log("Email is Correct");
  }
  }
  function onChangePhone(params) {
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im;
    if(params === '0'){

      setphone('')
    }else{
      
    setphone(params)
    }
    if (reg.test(params) === false) {
      setvalidationPhone(false)
    } else {
      setvalidationPhone(true)
    }
  }
  function onChangePassword(params) {
    setpassword(params)
  }
  function onChangeRePassword(params) {
    setrePassword(params)
    console.log(password + '---' +params)
    if(password === params){
      setvalidationPassword(true)
    }else{
      setvalidationPassword(false)
    }
  }
  useEffect(()=>{
    if(validationUsername && validationEmail && validationPhone && validationPassword){
      setValid(true)
    }else{
      setValid(false)
    }
  },[validationUsername,validationEmail,validationPhone,validationPassword])
    return (
      <View style={[styles.mainContainer, {flexDirection:'column',padding:Metrics.baseMargin}]}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start', paddingVertical:Metrics.screenHeight*0.025}}>
            <TouchableOpacity onPress={()=> props.navigation.pop()}>
                <Image source={Images.backButton} style={{tintColor:'black', width:Metrics.screenWidth*0.125, height:Metrics.screenWidth*0.125}} />
            </TouchableOpacity>
            <View style={{paddingLeft:Metrics.screenHeight*0.025}}>
              <Text style={{color:'black', fontWeight:'700', fontSize:Metrics.screenWidth*0.05}}>Daftar</Text>
              <Text style={{color:'black', fontWeight:'normal', fontSize:Metrics.screenWidth*0.04}}>Lengkapi data dirimu dibawah ini, ya</Text>
            </View>
          </View>

         

          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
          <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Nama Lengkap</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TextInput
                value={username} 
                placeholder={'Cth: Name'}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.9}}
                onChangeText={text => onChangeName(text)}
              />
            </View>
            {
              username.length>0 && !validationUsername?<Text style={{color:'red'}}>nama tidak valid</Text> :null
            }
          
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
          <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Nomor HP</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{padding:Metrics.screenWidth*0.025, borderWidth:0.5,borderRadius:20,flexDirection:'row',alignItems:'center',backgroundColor:'white',borderColor:'grey'}}>
                <Image source={{uri:'https://indonesia.nl/en/images/basic/indonesia/background-bendera-merah-putih-berkibar.png'}} style={{ width:Metrics.screenWidth*0.065, height:Metrics.screenWidth*0.055}} />
                <Text style={{color:'grey', fontWeight:'700', paddingLeft:4}}>+62</Text>
              </View>
              <TextInput 
                value={phone}
                placeholder={'81231241'}
                keyboardType={'number-pad'}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginLeft:12}}
                onChangeText={value => onChangePhone(value)}
              />
            </View>
            {
              phone.length>0 && !validationPhone?<Text style={{color:'red'}}>phone number tidak valid</Text> :null
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
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Re-Password</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TextInput 
                value={rePassword}
                placeholder={'Re-Password'}
                secureTextEntry={true}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.9}}
                onChangeText={value => onChangeRePassword(value)}
              />
            </View>
            {
              rePassword.length>0 && !validationPassword?<Text style={{color:'red'}}>password salah</Text> :null
            }
          </View>
          <View style={{height:20}}>
          </View>
        </ScrollView>
        {
          valid?
          <TouchableOpacity 
            onPress={submit.bind(this)}
            style={{ position:'absolute',bottom:25,right:25, borderWidth:0.5, padding:20, borderRadius:60}}>
            <Image source={Images.chevronRight} style={{tintColor:'grey', width:Metrics.screenWidth*0.07, height:Metrics.screenWidth*0.07 }}/>
          </TouchableOpacity>:
          null
        }
      </View>
    )
}
const mapStateToProps = (state) => {
  return {
    user: state.user.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(UserRedux),
    dispatch,
  );
};
export default connect(mapStateToProps,mapDispatchToProps)(RegisterScreen)