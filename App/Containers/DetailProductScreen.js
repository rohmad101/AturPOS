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
  const [qty, setQty] = useState(1);
  const [LocalCart, setLocalCart] = useState()
  const [Status ,setStatus]= useState(false)
  // console.log(detail.data.image1)
  useEffect(() => {
    // alert(JSON.stringify(cart))
    // console.log(cart);
    setStatus(false)
    setLocalCart(cart)
  }, [cart]);

  function AddToCart(params) {
    let WillRepaced = []
    let finding = LocalCart.filter(data => data[1].product_id !== detail.data.id)
    let missing = LocalCart.filter((i => a => a !== finding[i] || !++i)(0));
    // console.log(missing);
    if(missing.length>0){
      // let x =qty+parseInt(missing[0][1].qty)
      // // console.log(x)
      // WillRepaced.push([
      //   detail.data,
      //   {
      //     product_id: detail.data.id,
      //     qty: x,
      //     disc: detail.data.discount,
      //     tax: detail.data.tax,
      // }])
      // finding.map((data,index)=>{
      //   WillRepaced.push(data)
      // })
      // // console.log(WillRepaced)
      // props.CartSuccess(WillRepaced);
      Alert.alert(
        'Gagal',
        'Product sudah ada didalam cart',
      );
      setStatus(true)
    }else{
      props.CartSuccess([
        ...LocalCart,
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
    
    
  }
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
            if (qty > 1) {
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
                setQty(parseInt(qty1));
              } else {
                Alert.alert('Gagal','minimal pembelian produk ini adalah 1');
              }
            }}
          />
          <TouchableOpacity
            onPress={()=>{
              if (qty < detail.data.stock) {
                setQty(parseInt(qty)+1);
              } else {
                Alert.alert('Gagal','out of stock');
              }
            }}
            style={{ backgroundColor:'green', padding:8, borderRadius:24, height:24, justifyContent:'space-around', marginRight:12}}>
            <Text style={{fontSize:Metrics.screenWidth*0.05, color:'#fff', marginBottom:4}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {

            if(!Status){
              if(qty<1 || !qty){
                Alert.alert('Gagal', 'minimal pembelian produk ini adalah 1')
              }else{
               AddToCart()
              }
            }
            }}
            style={{
              backgroundColor:  Status?'grey':'green',
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
            }
          }
          style={{
            backgroundColor:'blue',
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
        <View style={{height:Metrics.screenHeight*0.05}}/>
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
