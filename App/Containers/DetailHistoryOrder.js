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

function DetailHistoryOrder (props) {
  const  { navigation, user } = props
  const  { getParam } = navigation
  const { width , height } = Dimensions.get('screen')
  const  [ HistoryDetail, setHistoryDetail ] = useState([])

  useEffect(()=>{
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/order/'+getParam('param'),{
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      timeout: 10000,
    },)
    .then(sucess =>{
      console.log('sucess list order', sucess.data.data)
      setTimeout(() => {
      setHistoryDetail(sucess.data.data)
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
  if(HistoryDetail.length<1){
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
            <Text style={{fontSize:width*0.1, color:'white'}}>Informasi Transaksi/Order</Text>
            <Content name={'Nomor Transaksi'} value={HistoryDetail.order_id} />
            <Content name={'Status Pesanan'} value={HistoryDetail.order_status} />
            <Content name={'Payment Method'} value={HistoryDetail.payment_method} />
            <Content name={'Status Payment'} value={HistoryDetail.paytime} />
            <Content name={'Tracking'} value={HistoryDetail.tracking_no} />
            <Content name={'Shipping Cost'} value={currencyFormat(parseInt(HistoryDetail.shipping_cost))} />
            <Content name={'Total Payment'} value={currencyFormat(parseInt(HistoryDetail.total_payment))} />
            <Content name={'Customer Note'} value={HistoryDetail.customer_notes} />
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
// export default connect(mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(DetailHistoryOrder)