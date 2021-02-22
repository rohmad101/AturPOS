import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

function RegisterScreen (props) {
    return (
      <View style={[styles.mainContainer, {flexDirection:'column',padding:Metrics.baseMargin}]}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={()=> props.navigation.pop()}>
                <Image source={Images.backButton} style={{tintColor:'black', width:Metrics.screenWidth*0.125, height:Metrics.screenWidth*0.125}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={Images.faq} style={{tintColor:'black', width:Metrics.screenWidth*0.085, height:Metrics.screenWidth*0.075}} />
            </TouchableOpacity>
          </View>

          <View style={{paddingTop:Metrics.screenHeight*0.05}}>
            <Text style={{color:'black', fontWeight:'700', fontSize:Metrics.screenWidth*0.05}}>Daftar</Text>
            <Text style={{color:'black', fontWeight:'normal', fontSize:Metrics.screenWidth*0.04}}>Lengkapi data dirimu dibawah ini, ya</Text>
          </View>

          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
          <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Nama Lengkap</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TextInput 
                placeholder={'Cth: Name'}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.9}}
              />
            </View>
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
          <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Email</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TextInput 
                placeholder={'Cth: name@mail.com'}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.9}}
              />
            </View>
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
          <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Nomor HP</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{padding:Metrics.screenWidth*0.025, borderWidth:0.5,borderRadius:20,flexDirection:'row',alignItems:'center',backgroundColor:'white',borderColor:'grey'}}>
                <Image source={{uri:'https://indonesia.nl/en/images/basic/indonesia/background-bendera-merah-putih-berkibar.png'}} style={{ width:Metrics.screenWidth*0.065, height:Metrics.screenWidth*0.055}} />
                <Text style={{color:'grey', fontWeight:'700', paddingLeft:4}}>+62</Text>
              </View>
              <TextInput 
                placeholder={'123123'}
                keyboardType={'number-pad'}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginLeft:12}}
              />
            </View>
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text style={{color:'grey', fontWeight:'700', fontSize:Metrics.screenWidth*0.04}}>Kode Referal (Optional)</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <TextInput 
                placeholder={'Belum ada ? Bisa masukin nanti'}
                keyboardType={'number-pad'}
                style={{color:'grey', fontWeight:'700',borderBottomWidth:0.5, width:Metrics.screenWidth*0.9}}
              />
            </View>
          </View>
          <View>
          </View>
        </ScrollView>

        <TouchableOpacity 
          onPress={()=> props.navigation.pop()}
          style={{ position:'absolute',bottom:25,right:25, borderWidth:0.5, padding:20, borderRadius:60}}>
          <Image source={Images.chevronRight} style={{tintColor:'grey', width:Metrics.screenWidth*0.07, height:Metrics.screenWidth*0.07 }}/>
        </TouchableOpacity>
      </View>
    )
}

// const mapStateToProps = (state) => {
//   return {
//     data: state.local.payload
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Object.assign(DataLocalRedux), dispatch)
// }
// export default (mapStateToProps, mapDispatchToProps)(Template)
export default connect(null,null)(RegisterScreen)