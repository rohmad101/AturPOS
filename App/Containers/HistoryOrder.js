import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, ActivityIndicator, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import { Images } from '../Themes'
import UserRedux from '../Redux/UserRedux';

// Styles
import styles from './Styles/LaunchScreenStyles'
import { bindActionCreators } from 'redux'
import { currencyFormat } from '../Transforms/curency'

function HistoryOrder (props) {
  const { user, navigation } = props
  const [listHistoryOrder, setlistHistoryOrder] = useState([])
  const { width , height } = Dimensions.get('screen')
  useEffect(()=>{
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/order',{
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      timeout: 10000,
    },)
    .then(sucess =>{
      // console.log('sucess list order', sucess.data.data)
      setTimeout(() => {
      setlistHistoryOrder(sucess.data.data)
      }, 2000);
    }).catch(err =>{
      console.log('error ', err)
    })
  },[])

  if(listHistoryOrder.length<1){
    return(
      <View style={styles.mainContainer}>
        <ActivityIndicator style={styles.backgroundImage} color={'purple'} size={width*0.2}/>
      </View>
    )
  }
  const keyExtractor = (item, index) => index.toString()
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>  navigation.push('DetailHistoryOrder',{param : item.id})}>
      <ListItem bottomDivider >
        <Avatar 
            size="medium"
            titleStyle={{fontSize:12}}
            title={item.order_id} 
            source={{ uri: item.avatar_url?item.avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}/>
        <ListItem.Content>
          <ListItem.Title>Order ID : {item.order_id}</ListItem.Title>
          <ListItem.Subtitle>Statuss : {item.order_status}</ListItem.Subtitle>
          <ListItem.Subtitle>Price : {currencyFormat(item.total_payment)}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  )
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={{fontSize:width*0.1, color:'white'}}>List History Order</Text>
            <FlatList
              keyExtractor={keyExtractor}
              data={listHistoryOrder}
              renderItem={renderItem}
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrder)