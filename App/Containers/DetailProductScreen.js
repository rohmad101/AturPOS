import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Images, Metrics } from '../Themes'

import ProductDetailRedux from '../Redux/ProductDetailRedux';
// Styles
import styles from './Styles/LaunchScreenStyles'

function DetailProductScreen (props) {
  const { detail } = props
  console.log(detail.data.image1)
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
        <Tile
          imageSrc={{uri: detail.data.image1}}
          title={detail.data.name}
          // icon={{ name: 'play-circle', type: 'font-awesome' }} // optional
          contentContainerStyle={{ height: 70 }}
        >
        </Tile>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', minHeight:50, paddingHorizontal:12}}
          >
            <Text>Stock: {detail.data.stock}</Text>
            <Text>Rp.{detail.data.price}</Text>
          </View>
          <View  style={{width:Metrics.screenWidth, paddingHorizontal:12}}>
            <Text style={{fontWeight:'700',paddingVertical:12}}>Desctiption:</Text>
            <Text >{detail.data.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal:12, marginBottom:12}}>
            <TouchableOpacity style={{backgroundColor:'blue', padding:Metrics.screenWidth*0.05, borderRadius:20}}>
              <Text style={{fontWeight:'700', fontSize:20, color:'white'}}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    detail: state.productDetail.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(ProductDetailRedux), dispatch)
}
// export default (mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(DetailProductScreen)