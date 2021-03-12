/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {ScrollView, Text, Image, View, FlatList, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Images, Metrics} from '../Themes';
import { currencyFormat } from '../Transforms/curency'

// Styles
import styles from './Styles/LaunchScreenStyles';
import CartRedux from '../Redux/CartRedux';
import {bindActionCreators} from 'redux';
import {ListItem, Avatar} from 'react-native-elements';
import { TextInput } from 'react-native';

const RenderItem = ({item, index, deleteItem, increaseQty, decreaseeQty}) =>(
  <ListItem bottomDivider>
    <Avatar
      title={item[0].name}
      source={{uri: item[0].image1}}
    />
    <ListItem.Content>
      <ListItem.Title>{item[0].name}</ListItem.Title>
      <ListItem.Subtitle>{item[0].description}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Content>
      <View style={{flexDirection:'row',alignItems:'center'}}> 
      <TouchableOpacity 
          onPress={()=> decreaseeQty(index)}
           style={{ backgroundColor:'red', padding:8, borderRadius:24, height:24, justifyContent:'space-around', marginLeft:12}}>
            <Text style={{fontSize:Metrics.screenWidth*0.075, color:'#fff', marginBottom:4}}>-</Text>
      </TouchableOpacity>
      <TextInput
            value={item[1].qty.toString()}
            placeholder={'0'}
            keyboardType={'number-pad'}
            style={{
              borderBottomWidth: 0.5,
              width: Metrics.screenWidth * 0.075,
              marginHorizontal: 4,
              textAlign: 'center',
            }}
            onChangeText={(qty1) => {
              console.log(qty1)
            }}
          />
      <TouchableOpacity
            onPress={()=> increaseQty(index)}
            style={{ backgroundColor:'green', padding:8, borderRadius:24, height:24, justifyContent:'space-around', marginRight:12}}>
            <Text style={{fontSize:Metrics.screenWidth*0.05, color:'#fff', marginBottom:4}}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=> deleteItem(index)}
      style={{ backgroundColor:'red', padding:8, borderRadius:24, height:24, justifyContent:'space-around'}}>
      <Text
        style={{
          color:'white'
        }}>
        X
      </Text>
      </TouchableOpacity>
      </View>
    </ListItem.Content>
  </ListItem>
)

function CartScreen(props) {
  const {data, navigation, CartSuccess} = props;
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(data);
    // console.log('CART', data)
  }, []);

  useEffect(() => {
    CartSuccess(list);
  }, [list]);

  const increaseQty = (index) =>{
    let willAdd = [...list];
    let data1 = [...willAdd[index]]
    data1[1] = {
      "disc":  data1[1].disc, 
      "product_id":  data1[1].product_id,
      "qty":  data1[1].qty+1, 
      "tax":  data1[1].tax
    }
    willAdd[index] = data1;
    setList(willAdd);
    // console.log('data1', willAdd)
  }
  const decreaseeQty = (index) =>{
    let willAdd = [...list];
    let data1 = [...willAdd[index]]
    data1[1] = {
      "disc":  data1[1].disc, 
      "product_id":  data1[1].product_id,
      "qty":  data1[1].qty<2?1 :data1[1].qty-1, 
      "tax":  data1[1].tax
    }
    willAdd[index] = data1;
    setList(willAdd);
  }
  const deleteItem = (index) =>{
    let willDelete = list.filter((item,ix) => ix !== index)
    // console.log('willDelete',willDelete)
    setList(willDelete)
  }
  let totalharga = 0
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {list.length > 0 ? (
          <View style={styles.section}>
            {
                list.map((dataItem, index) =>(
                  // console.log('dataItem',dataItem )
                   <RenderItem item={dataItem} index={index} deleteItem={deleteItem} increaseQty={increaseQty} decreaseeQty={decreaseeQty}/>
                )
                )
            }
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: Metrics.screenWidth,
              height: Metrics.screenHeight,
            }}>
            <Text>Cart Still Empty</Text>
          </View>
        )}
        {data.length>0?
      <View style={{marginBottom:12}}>
        <View style={{marginHorizontal:Metrics.screenWidth*0.1, flexDirection:'column'}}>
          <Text style={{fontWeight:'700'}}>Ringkasan Belanja</Text>
          {
                list.map((dataItem, index) =>{ 
                  totalharga += dataItem[0].price * dataItem[1].qty;
                  return (
                  <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{color:'grey'}}>Total Harga ({dataItem[1].qty} Barang)</Text>
                    <Text style={{color:'grey'}}>{currencyFormat(dataItem[0].price)}</Text>
                  </View>
                )
                }
                )
            }
          <View style={{ flexDirection:'row', justifyContent:'space-between', borderTopWidth:0.5, marginTop:Metrics.screenHeight*0.025, paddingTop:Metrics.screenHeight*0.025}}>
            <Text  style={{fontWeight:'700'}}>Total Harga</Text>
            <Text>{currencyFormat(totalharga)}</Text>
          </View>
        </View>
      <TouchableOpacity
          onPress={() => {
              navigation.navigate('CheckoutScreen',{
                from: 'cart',
              })
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
        </View>
        :null}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.cart.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(CartRedux), dispatch);
};
// export default connect(mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
