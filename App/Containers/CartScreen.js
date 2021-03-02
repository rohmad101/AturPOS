import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import CartRedux from '../Redux/CartRedux';
import { bindActionCreators } from 'redux'
import { ListItem, Avatar } from 'react-native-elements'

const renderItem = ({ item }) => (
  <ListItem bottomDivider >
    <Avatar title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }}/>
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Content>
        <Text style={{padding:4, backgroundColor:'red', color:'white', borderRadius:20}}>X</Text>
    </ListItem.Content>
  </ListItem>
)

function Template (props) {
  const { data }  = props
  const [list, setList] = useState([])
  useEffect(()=>{
    // console.log(data)
    let cart = []
    data.map(item =>{
        cart.push( {
          name: item[0].name,
          avatar_url: item[0].image1,
          subtitle: 'qty: '+item[1].qty,
        },)
    })
    setList(cart)
  },[])
   
  let keyExtractor = (item, index) => index.toString()
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
            {
              data.length>0?

          <View style={styles.section} >
              <FlatList
                keyExtractor={keyExtractor}
                data={list}
                renderItem={renderItem}/>

          </View>
          :<View style={{justifyContent:'center',alignItems:'center', width:Metrics.screenWidth, height:Metrics.screenHeight}}>
          <Text>Cart Still Empty</Text>
         </View>
            }
         
        </ScrollView>
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    data: state.cart.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(CartRedux), dispatch)
}
// export default connect(mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(Template)