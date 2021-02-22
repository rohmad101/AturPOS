
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics, ApplicationStyles  } from '../Themes'
import Slideshow from 'react-native-image-slider-show';
// Styles
import styles from './Styles/LaunchScreenStyles'

function AuthScreen(props) {
    const [position, setPosition] = useState(1)
    const  dataSource= [
        {
          url: Images.launch,
        }, {
          url: Images.clearLogo,
        }, {
          url: Images.logo,
        },
      ]
    const caption = [
        {
            title: 'Selamat Datang di AturPOS',
            caption: 'Aplikasi yang bikin hidupmu lebih nyaman, Siap bantuin semua kebutuhanmu, kapanpun dan dimanapun',
        },
        {
            title: 'Selamat Datang di AturPOS',
            caption: 'Aplikasi yang bikin hidupmu lebih nyaman, Siap bantuin semua kebutuhanmu, kapanpun dan dimanapun',
        },
        {
            title: 'Selamat Datang di AturPOS',
            caption: 'Aplikasi yang bikin hidupmu lebih nyaman, Siap bantuin semua kebutuhanmu, kapanpun dan dimanapun',
        }
    ]
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={{width:Metrics.screenWidth,padding:Metrics.baseMargin*1.5, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', maxWidth:Metrics.screenWidth*0.4}}>
                <Image source={Images.launch} style={styles.icon} />
                <Text style={{fontSize:Metrics.screenWidth*0.05, fontWeight:'700'}}>AturPOS</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:Metrics.baseMargin,backgroundColor:'green',borderRadius:20,maxHeight:Metrics.images.medium*0.9,maxWidth:Metrics.images.medium*1.1}}>
                <Text>ID</Text>
            </View>
          </View>
          <View style={[styles.centered,{marginTop:Metrics.screenHeight*0.05, width:Metrics.screenWidth, padding:Metrics.baseMargin}]}>
            <Slideshow 
                dataSource={dataSource} 
                position={position} 
                onPositionChanged={position =>setPosition( position )}
                height={Metrics.screenHeight*0.4}
                />
                <Text style={{fontWeight:'700', fontSize:Metrics.screenWidth*0.05,marginTop:Metrics.screenHeight*0.05}}>{caption[position].title}</Text>
                <Text>{caption[position].caption}</Text>
          </View>
          <View style={{width:Metrics.screenWidth, flexDirection:'row', justifyContent:'space-around', marginTop:Metrics.screenHeight*0.03}}>
            <TouchableOpacity 
                onPress={()=> props.navigation.push('LoginScreen')}
                style={{backgroundColor:'green', width:Metrics.screenWidth*0.35,alignItems:'center', padding:Metrics.baseMargin*1.5, borderRadius:20}}>
                <Text style={{color:'white'}}>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=> props.navigation.push('RegisterScreen')}
                style={{backgroundColor:'green', width:Metrics.screenWidth*0.35,alignItems:'center', padding:Metrics.baseMargin*1.5, borderRadius:20}}>
                <Text style={{color:'white'}}>Daftar</Text>
            </TouchableOpacity>
          </View>
        <Text style={{textAlign:'center', marginTop:Metrics.screenHeight*0.03}}>Dengan masuk dan mendaftar, kamu menyetujui Ketentuan Layanan dan Kebijakan Privacy</Text>
        </ScrollView>
      </View>
    )
}

const mapStateToProps = (state) => {
    return null
}
  
const mapDispatchToProps = (dispatch) => {
    return null
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
