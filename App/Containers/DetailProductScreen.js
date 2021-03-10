/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Images, Metrics} from '../Themes';
import { currencyFormat } from '../Transforms/curency'

import ProductDetailRedux from '../Redux/ProductDetailRedux';
import CartRedux from '../Redux/CartRedux';
// Styles
import styles from './Styles/LaunchScreenStyles';

function DetailProductScreen(props) {
  const {detail, cart, navigation} = props;
  const [qty, setQty] = useState(0);
  // console.log(detail.data.image1)
  useEffect(() => {
    // alert(JSON.stringify(cart))
    console.log(cart);
  }, [cart]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <Image
          source={{uri: detail.data.image1}}
          style={{
            width: Metrics.screenWidth,
            height: Metrics.screenHeight * 0.3,
            marginTop: Metrics.screenHeight * 0.025,
          }}
          resizeMethod={'resize'}
          resizeMode={'center'}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrics.screenWidth * 0.1,
            padding: 10,
          }}>
          {detail.data.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            minHeight: 50,
            paddingHorizontal: 12,
          }}>
          <Text>Stock: {detail.data.stock - qty}</Text>
          <Text>{currencyFormat(detail.data.price)}</Text>
        </View>
        <View style={{width: Metrics.screenWidth, paddingHorizontal: 12}}>
          <Text style={{fontWeight: '700', paddingVertical: 12}}>
            Desctiption:
          </Text>
          <Text>{detail.data.description}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 12,
            marginBottom: 12,
            alignItems: 'center',
          }}>
          <Text>Qty:</Text>
          <TouchableOpacity 
           onPress={()=> {
            if (qty > 0) {
              setQty(qty-1);
            }
           }}
           style={{ backgroundColor:qty > 0?'red':'grey', padding:8, borderRadius:24, height:24, justifyContent:'space-around', marginLeft:12}}>
            <Text style={{fontSize:Metrics.screenWidth*0.075, color:'#fff', marginBottom:4}}>-</Text>
          </TouchableOpacity>
          <TextInput
            value={qty.toLocaleString()}
            placeholder={'0'}
            keyboardType={'number-pad'}
            style={{
              borderBottomWidth: 0.5,
              width: Metrics.screenWidth * 0.1,
              marginHorizontal: 12,
              textAlign: 'center',
            }}
            type
            onChangeText={(qty1) => {
              if (qty1 <= detail.data.stock) {
                setQty(qty1);
              } else {
                alert('minimal pembelian produk ini adalah 1');
              }
            }}
          />
          <TouchableOpacity
            onPress={()=>{
              if (qty < detail.data.stock) {
                setQty(parseInt(qty)+1);
              } else {
                alert('out of stock');
              }
            }}
            style={{ backgroundColor:'green', padding:8, borderRadius:24, height:24, justifyContent:'space-around', marginRight:12}}>
            <Text style={{fontSize:Metrics.screenWidth*0.05, color:'#fff', marginBottom:4}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if(qty<1){
                Alert.alert('Gagal', 'minimal pembelian produk ini adalah 1')
              }else{
                props.CartSuccess([
                  ...cart,
                  [
                    detail.data,
                    {
                      product_id: detail.data.id,
                      qty: qty,
                      disc: detail.data.discount,
                      tax: detail.data.tax,
                    },
                  ],
                ]);
                Alert.alert(
                  'Berhasil',
                  'Behasil menambahkan item ke keranjang/cart',
                );
              }
             
            }}
            style={{
              backgroundColor: 'green',
              padding: Metrics.screenWidth * 0.04,
              borderRadius: 20,
            }}>
            <Text style={{fontWeight: '700', fontSize: 12, color: 'white'}}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
        <View>

        </View>
        <TouchableOpacity
          onPress={() => {
            if (qty > 0) {
              navigation.navigate('CheckoutScreen', {
                data :[
                  detail.data,
                  {
                    product_id: detail.data.id,
                    qty: qty,
                    disc: detail.data.discount,
                    tax: detail.data.tax,
                  },
                ],
                from:'detail'
              });
            } else {
              Alert.alert(' ', 'Amount/Qty cannot 0');
            }
          }}
          style={{
            backgroundColor: 'blue',
            padding: Metrics.screenWidth * 0.04,
            borderRadius: 20,
            marginHorizontal: Metrics.screenWidth * 0.05,
            marginTop: Metrics.screenHeight * 0.05,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 12,
              color: 'white',
              textAlign: 'center',
            }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    detail: state.productDetail.payload,
    cart: state.cart.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(ProductDetailRedux, CartRedux),
    dispatch,
  );
};
// export default (mapStateToProps, mapDispatchToProps)(Template)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailProductScreen);
