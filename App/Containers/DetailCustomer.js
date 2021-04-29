import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, Dimensions, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UserRedux from '../Redux/UserRedux';
import { Images } from '../Themes'
import { currencyFormat } from '../Transforms/curency';

// Styles
import styles from './Styles/LaunchScreenStyles'

function DetailCustomer (props) {
  const  { navigation, user } = props
  const  { getParam } = navigation
  const { width , height } = Dimensions.get('screen')
  const  [ CustomerDetail, setCustomerDetail ] = useState([])

  useEffect(()=>{
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/customer/'+getParam('param'),{
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      timeout: 10000,
    },)
    .then(sucess =>{
      // console.log('sucess detail customer', sucess.data.data)
      setTimeout(() => {
      setCustomerDetail(sucess.data.data)
      }, 2000);
    }).catch(err =>{
      console.log('error ', err)
    })
  },[])

  const Content = ({name , value}) => {
    return(
      <ListItem bottomDivider >
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{value} </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    )
  }
  if(CustomerDetail.length<1){
    return(
      <View style={styles.mainContainer}>
        <ActivityIndicator style={styles.backgroundImage} color={'purple'} size={width*0.2}/>
      </View>
    )
  }
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={{fontSize:width*0.1, color:'white'}}>Detail Customer</Text>
            <Content name={'Name'} value={CustomerDetail.name} />
            <Content name={'Phone Number'} value={CustomerDetail.phone} />
            <Content name={'Email'} value={CustomerDetail.email} />
            <Content name={'Average Spend'} value={currencyFormat(parseInt(CustomerDetail.avg_spend))} />
            <Content name={'Total Spend'} value={currencyFormat(parseInt(CustomerDetail.total_spent))} />
            <Content name={'Total Order'} value={CustomerDetail.total_order} />
            <Content name={'Total Item Purchase'} value={CustomerDetail.total_item_purchased} />
            <Content name={'Total Address Registered'} value={CustomerDetail.address.length} />
          </View>
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
export default connect(mapStateToProps,mapDispatchToProps)(DetailCustomer)