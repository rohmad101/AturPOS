import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, ActivityIndicator, Dimensions } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { Images } from '../Themes'
import UserRedux from '../Redux/UserRedux';

// Styles
import styles from './Styles/LaunchScreenStyles'

function DetailProfile (props) {
  const { user } = props
  const [detailUser, setdetailUser] = useState([])
  const { width , height } = Dimensions.get('screen')

  useEffect(()=>{
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/profile',{
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      timeout: 10000,
    },)
    .then(sucess =>{
      console.log('sucess list order', sucess.data.user)
      setTimeout(() => {
        setdetailUser(sucess.data.user)
      }, 2000);
    }).catch(err =>{
      console.log('error ', err)
    })
  },[])

  const Content = ({name , value}) => {
    return(
    <ListItem bottomDivider containerStyle={{marginHorizontal:24}}>
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{value} </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    )
  }

  if(detailUser.length<1){
    return(
      <View style={styles.mainContainer}>
        <ActivityIndicator style={styles.backgroundImage} color={'purple'} size={width*0.2}/>
      </View>
    )
  }
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={[styles.container]}>
          <View style={[styles.centered,{marginBottom:12}]}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <Content name={'Nama'} value={detailUser.NAME}/>
          <Content name={'Email'} value={detailUser.EMAIL}/>
          <Content name={'Nomor Hp'} value={detailUser.PHONE}/>
          <Content name={'Verified'} value={detailUser.verified===0?'False':'True'}/>
          <Content name={'ROlE'} value={detailUser.ROLE_ID}/>
          <Content name={'Active'} value={detailUser.ISACTIVE}/>
          <Content name={'Create'} value={detailUser.CREATED_DATE}/>
          <Content name={'Update'} value={detailUser.UPDATED_DATE}/>
          <View style={{height:height*0.05}}/>
        </ScrollView>
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.payload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(UserRedux), dispatch)
}
// export default connect(mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(DetailProfile)