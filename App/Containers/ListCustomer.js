import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, ActivityIndicator, Dimensions , FlatList, TouchableOpacity} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Images } from '../Themes'
import UserRedux from '../Redux/UserRedux';

// Styles
import styles from './Styles/LaunchScreenStyles'
import axios from 'axios'

function ListCustomer (props) {
  const { user, navigation } = props
  const [listCustomer, setlistCustomer] = useState([])
  const { width , height } = Dimensions.get('screen')
  useEffect(()=>{
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/customer',{
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      timeout: 10000,
    },)
    .then(sucess =>{
      console.log('sucess list customer', sucess.data.data)
      setTimeout(() => {
        setlistCustomer(sucess.data.data)
      }, 2000);
    }).catch(err =>{
      console.log('error ', err)
    })
  },[])

  const keyExtractor = (item, index) => index.toString()
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>  navigation.push('DetailCustomer',{param : item.id})}>
      <ListItem bottomDivider >
        <Avatar 
            size="medium"
            titleStyle={{fontSize:12}}
            title={item.name} 
            source={{ uri: item.avatar_url?item.avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}/>
        <ListItem.Content>
          <ListItem.Title>Name: {item.name}</ListItem.Title>
          <ListItem.Subtitle>Phone : {item.phone}</ListItem.Subtitle>
          <ListItem.Subtitle>Email : {item.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  )
  if(listCustomer.length<1){
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
            <Text style={{fontSize:width*0.1, color:'white'}}>List Customer</Text>
            <FlatList
              keyExtractor={keyExtractor}
              data={listCustomer}
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
export default connect(mapStateToProps,mapDispatchToProps)(ListCustomer)