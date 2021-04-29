/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { DrawerActions } from 'react-navigation-drawer'
import {Images, Metrics} from '../Themes';
import {SearchBar, Icon, ListItem, Avatar, Header} from 'react-native-elements';
import ProductRedux from '../Redux/ProductRedux';
import ProductDetailRedux from '../Redux/ProductDetailRedux';
import UserRedux from '../Redux/UserRedux';
// Styles
import styles from './Styles/LaunchScreenStyles';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

function HomeScreen(props) {
  const [updateSearch, setupdateSearch] = useState();
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data, token, ProductRequest, navigation, detail} = props;

  const renderItem = ({item}) => (
    <ListItem bottomDivider onPress={() => goDetail(item)}>
      <Avatar source={{uri: item.image1}} size={Metrics.screenWidth * 0.3} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{textAlign: 'justify'}}>
          {item.description}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
  const goDetail = (param) => {
    ProductRequest({token: token, id: param.id, detail: true});
    setLoading(true);
  };
  useEffect(() => {
    ProductRequest({token: token, detail: false});
    
  }, []);

  useEffect(() => {
    if (data && data.data) {
      setListData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (detail && detail.success && loading) {
      navigation.push('DetailProductScreen');
      setLoading(false);
    }
  }, [detail]);

  useEffect(() => {
    
    if (data && data.data && updateSearch) {
      axios.post('https://hercules.aturtoko.id/aturorder/public/api/v1/product',{
        "page": 1,
        "order": "desc",
        "order_by": "store_id",
        "query": updateSearch
    },{
        headers: {
          Authorization: 'Bearer ' + token,
        },
        timeout: 10000,
      }).then(
        res => {
          // console.log("success", res.data.data)
          setListData(res.data.data);
        }
      ).catch(
        err =>{
          // console.log('error', err)
        }
      )
      // const find = data.data.filter(
      //   (data) =>
      //     data.name.toLowerCase().match(updateSearch.toLowerCase()) ||
      //     data.sku.toLowerCase().match(updateSearch.toLowerCase()),
      // );
      // setListData(find);
    } else {
      if (data && data.data) {
        setListData(data.data);
      } else {
        setListData([]);
        ProductRequest({token: token, detail: false});
      }
    }
  }, [updateSearch]);

  useEffect(()=>{
    if(!token){
      Alert.alert(
        "Logout",
        "Berhasil",
        [
          {
            text: "OK",
            onPress: () => {
            AsyncStorage.removeItem('Customer')
            navigation.navigate('Auth', {
              screen: 'AuthScreen',
              initial: true,
            })
          }
            ,
            style: "cancel",
          },
        ],
        {
          cancelable: false
        }
      );
    }
  },[token])
  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <ActivityIndicator
            color={'#fff'}
            size={Metrics.screenWidth * 0.1}
            style={{marginTop: 24}}
          />
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <Header
          placement="left"
          leftComponent={
            <Icon
              name="menu"
              color="#fff"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
            />
          }
          centerComponent={{
            text: 'Hi , Selamat Datang',
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon
              name="shopping-cart"
              color="#fff"
              onPress={() => navigation.push('CartScreen')}
            />
          }
          containerStyle={{
            height: Metrics.screenHeight * 0.125,
            paddingTop: Metrics.screenHeight * 0.05,
          }}
        />
        <SearchBar
          placeholder="Yuk cari disini "
          onChangeText={(search) => setupdateSearch(search)}
          value={updateSearch}
          lightTheme={true}
          
        />
        <View>
          <FlatList data={listData.length>0?listData:[]} renderItem={renderItem} />
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.product.payload,
    token: state.user.payload.token,
    user: state.user.payload.name,
    detail: state.productDetail.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(ProductRedux, UserRedux, ProductDetailRedux),
    dispatch,
  );
};
// export default (mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
