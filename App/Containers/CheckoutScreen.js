/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Images, Metrics} from '../Themes';
import DropDownPicker from 'react-native-dropdown-picker';
import { currencyFormat } from '../Transforms/curency'
import CartRedux from '../Redux/CartRedux';
import UserRedux, { success } from '../Redux/UserRedux';
import CalculateRedux from '../Redux/CalculateRedux';
// Styles
import styles from './Styles/LaunchScreenStyles';
import {Overlay, PricingCard} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

function CheckoutScreen(props) {
  const {cart, user, navigation} = props;
  const [item, setitem] = useState([]);
  const [item2, setitem2] = useState([]);
  const [expedisi, setexpedisi] = useState();
  const [expedisiDetail, setexpedisiDetail] = useState();
  const [openLogistic, setopenLogistic] = useState(false);
  const [openLogisticDetail, setopenLogisticDetail] = useState(false);
  const [catatan, setCatatan] = useState('');
  const [totalPrice, settotalPrice] = useState(0);
  const [totalBarang, settotalBarang] = useState(0);
  const [nameLocation, setnameLocation] = useState('');
  const [alamat1, setalamat1] = useState('');
  const [alamat2, setalamat2] = useState('');
  const [noHP, setnoHP] = useState('');
  const [validationPhone, setvalidationPhone] = useState(false)
  const [email, setemail] = useState('');
  const [validationEmail, setvalidationEmail] = useState(false)
  const [notes, setnotes] = useState('');
  const [visible, setVisible] = useState(false);
  const [useid, setuseid] = useState();
  const [listProvinsi, setlistProvinsi] = useState([]);
  const [listCKota, setlistCKota] = useState([]);
  const [listDistrict, setlistDistrict] = useState([]);
  const [listSubDistric, setlistSubDistric] = useState([]);
  const [provinsi, setprovinsi] = useState();
  const [kota, setkota] = useState();
  const [district, setdistrict] = useState();
  const [subdistrict, setsubdistrict] = useState();
  const [zip_code, setzip] = useState();
  const [validationzip_code, setvalidationzip_code] = useState(false)
  const [ListItem, setListItem] = useState()
  const [customer, setcustomer] = useState()
  const [validationcustomer, setvalidationcustomer] = useState(false)
  const [openAddCustomer, setopenAddCustomer] = useState(false);
  const [nameCustomer, setnameCustomer] = useState('');
  const [emailCustomer, setemailCustomer] = useState('');
  const [validationemailCustomer, setvalidationemailCustomer] = useState(false)
  const [phoneCustomer, setphoneCustomer] = useState('');
  const [validationphoneCustomer, setvalidationphoneCustomer] = useState(false)

  const addCustomer =(value)=>{
    const custmoer ={
      "name" : nameCustomer,
      "phone" : phoneCustomer,
      "email" : emailCustomer
  }
    if(phoneCustomer && nameCustomer && emailCustomer){
      axios
      .post(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/customer',custmoer,
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          timeout: 10000,
        },
      ).then(
        async success =>{
          setcustomer(success.data.data)
          await AsyncStorage.setItem('Customer', JSON.stringify(success.data.data))
          Alert.alert('Success', "add customer Success")
          setopenAddCustomer(false)
        }
      ).catch(err => Alert.alert('Fail', "add customer failed, please try again or check your connection before you submit"))
    } else {
      Alert.alert('Fail', "Please fill the form before submit")
    }
  }
  useEffect(() => {
    let list =[]
    let price =0
    let totalBarang = 0
    async function  getLocal(params) {
      const value =  await AsyncStorage.getItem('Customer')
      // console.log(value)
      if(value) {
        // value previously stored
        setcustomer(JSON.parse(value))
      }
    }
    getLocal()
    //get list provinsi
     axios.get(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/address/province',
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          timeout: 10000,
        },
      )
      .then((res) => {
        let list = [];
        res.data.data.map((map) => {
          list.push({label: map.nama, value: map.id});
        });
        setlistProvinsi(list);
      })
      .catch((err) => console.log(err));
    //get address
     axios
      .get(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/address',
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          timeout: 10000,
        },
      )
      .then((res) => {
        console.log('address', res.data.data[0].zip_code.toString().length)
        //validation phone number
        let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im;
        if (reg.test(res.data.data[0].phone_no) === false) {
          setvalidationPhone(false)
        } else {
          setvalidationPhone(true)
        }
        //validation email
        reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (reg.test(res.data.data[0].email) === false) {
          setvalidationEmail(false)
          } else {
            setvalidationEmail(true)
          }

        //validation zipcode
        if(res.data.data[0].zip_code.toString().length>4){
          setvalidationzip_code(true)
        }else{
          setvalidationzip_code(false)
        }
        //set data to state
        setnameLocation(res.data.data[0].address_label)
        setalamat1(res.data.data[0].address_line_1)
        setalamat2(res.data.data[0].address_line_2)
        setprovinsi(res.data.data[0].province_id)
        setkota(res.data.data[0].city_id)
        setdistrict(res.data.data[0].district_id)
        setsubdistrict(res.data.data[0].subdistrict_id)
        setzip(res.data.data[0].zip_code)
        setnoHP(res.data.data[0].phone_no)
        setemail(res.data.data[0].email)
      })
      .catch((err) => console.log(err));
    //get user profile fot get user id
     fetch('https://hercules.aturtoko.id/aturorder/public/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user.USER_ID)
        setuseid(data.user.USER_ID);
      })
      .catch((err) => {
        alert(err);
      });
    setitem([]);
    //get list logistic
   fetch('https://hercules.aturtoko.id/aturorder/public//api/v1/logistic', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let item = [];
        // console.log(data.data)
        data.data.map((logistic) =>
          item.push({
            label: logistic.logistic_name,
            value: logistic.id,
            icon: () => (
              <Image
                source={{uri: logistic.logo_url}}
                style={{width: 100, height: 40}}
                resizeMethod={'resize'}
              />
            ),
          }),
        );
        setitem([item, data.data]);
      })
      .catch((err) => {
        alert(err);
      })
      if(navigation.getParam('from') === 'cart'){
        // ListItem[0].price * ListItem[1].qty
         cart[0].map(dat =>{
          list.push(dat)
        })
         cart.map(dat =>{
          price += dat[0].price * dat[1].qty
          totalBarang += parseInt(dat[1].qty)

        })
        setListItem(list)
        settotalPrice(price)
        settotalBarang(totalBarang)
      }else{
        setListItem(navigation.getParam('data'))
        settotalPrice(parseInt(navigation.getParam('data')[0].price) * parseInt(navigation.getParam('data')[1].qty))
        settotalBarang(parseInt(navigation.getParam('data')[1].qty))
        // console.log(navigation.getParam('data'))
      }
  }, [])

  useEffect(() => {
    if (expedisi) {
      setitem2([]);
      fetch(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/logistic/' +
          expedisi,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          let item = [];
          // console.log(data.data)
          data.data.map((logistic) =>
            item.push({
              label: logistic.service_name + ' (' + logistic.type + ')',
              value: logistic.id,
              icon: () => (
                <Image
                  source={{uri: logistic.logo_url}}
                  style={{width: 100, height: 40}}
                  resizeMethod={'resize'}
                />
              ),
            }),
          );
          setitem2([item, data.data]);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [expedisi]);

  useEffect(() => {
    if (provinsi) {
      axios
        .get(
          'https://hercules.aturtoko.id/aturorder/public/api/v1/address/city/' +
            provinsi,
          {
            headers: {
              Authorization: 'Bearer ' + user.token,
            },
            timeout: 10000,
          },
        )
        .then((res) => {
          let list = [];
          // console.log(res.data.data)
          res.data.data.map((map) => {
            list.push({label: map.nama, value: map.id});
          });
          // console.log(list)
          setlistCKota(list);
        })
        .catch((err) => console.log(err));
    }
  }, [provinsi]);

  useEffect(() => {
    if (kota) {
      axios
        .get(
          'https://hercules.aturtoko.id/aturorder/public/api/v1/address/district/' +
            kota,
          {
            headers: {
              Authorization: 'Bearer ' + user.token,
            },
            timeout: 10000,
          },
        )
        .then((res) => {
          let list = [];
          // console.log(res.data.data)
          res.data.data.map((map) => {
            list.push({label: map.nama, value: map.id});
          });
          // console.log(list)
          setlistDistrict(list);
        })
        .catch((err) => console.log(err));
    }
  }, [kota]);

  useEffect(() => {
    if (district) {
      axios
        .get(
          'https://hercules.aturtoko.id/aturorder/public/api/v1/address/subdistrict/' +
            district,
          {
            headers: {
              Authorization: 'Bearer ' + user.token,
            },
            timeout: 10000,
          },
        )
        .then((res) => {
          let list = [];
          // console.log(res.data.data)
          res.data.data.map((map) => {
            list.push({label: map.nama, value: map.id});
          });
          // console.log(list)
          setlistSubDistric(list);
        })
        .catch((err) => console.log(err));
    }
  }, [district]);

  const postOrder = () => {
    let logis = item[1]
      .filter((fil) => fil.id === expedisi)[0]
      .logistic_name.toString();
    let type = item2[1]
      .filter((fil) => fil.id === expedisiDetail)[0]
      .type.toString();
    const data = {
      order_datetime: new Date().toString(),
      items: [ListItem[1]],
      customer: {
        id: customer.id,
        notes: catatan,
      },
      shipment: {
        logistic: logis,
        type: type,
        shipment_cost: 9000,
      },
      payment: {
        channel: 'TRF-BCA',
        service_fee: 0,
        payment_verification: {},
      },
      total_payment: ListItem[0].price * ListItem[1].qty,
      is_offline: 0
    };
    // console.log('data',data);
    axios
      .post(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/order',
        data,
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          timeout: 10000,
        },
      )
      .then((res) => {
        console.log(res.data);
        Alert.alert(
          'Selamat Pesanan Anda Berhasil di Proses',
          'mohon di tunggu ya pesanan anda sampai di rumah',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('HomeScreen');
                if(navigation.getParam('from') === 'cart'){
                props.CartSuccess([]);
                }
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch((err) => {
        console.log('err',err)
        Alert.alert('Mohon Lengkapi Form Diatas')
      });
  };

  const checkAddress = () => {
    // console.log(useid)
    axios
      .get(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/address',
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          timeout: 10000,
        },
      )
      .then((res) => {
        console.log('response',res.data.data)
        if (res.data.data.length > 0) {
          postOrder();
        } else {
          Alert.alert('Mohon tambahkan/isi alamat pengiriman terlebih dahulu');
        }
      })
      .catch((err) => console.log(err));
  };

  const addAddress = () => {
    const body = {
      customer_id: useid,
      address: {
        address_label: nameLocation,
        address_line_1: alamat1,
        address_line_2: alamat2,
        province_id: provinsi,
        city_id: kota,
        district_id: district,
        subdistrict_id: subdistrict,
        phone_no: noHP,
        email: email,
        notes: notes,
        zip_code: zip_code,
      },
    };
    axios
      .post(
        'https://hercules.aturtoko.id/aturorder/public/api/v1/address',
        body,
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          timeout: 10000,
        },
      )
      .then((res) => {
        // console.log(res.data);
        Alert.alert('Success', res.data.message)
        setVisible(false);
      })
      .catch((err) => 
      Alert.alert('Failed', err.message));
  };

  const AddAddressOverlay = () =>(
    <Overlay
    isVisible={visible}
    onBackdropPress={() => setVisible(false)}
    overlayStyle={{
      width: Metrics.screenWidth * 0.9,
      padding: '5%',
      borderRadius: 12,
    }}>
    <ScrollView>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Nama Lokasi</Text>
        <TextInput
          value={nameLocation}
          placeholder={'Nama Lokasi'}
          multiline={true}
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            setnameLocation(text);
          }}
        />
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text style={{paddingTop: 12}}>Alamat 1</Text>
        <TextInput
          value={alamat1}
          placeholder={'Alamat 1'}
          multiline={true}
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            setalamat1(text);
          }}
        />
        <Text style={{color:'red'}}>{alamat1.length<1?'Alamat 1 Tidak Boleh Kosong':null}</Text>
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text style={{paddingVertical: 12}}>Alamat 2</Text>
        <TextInput
          value={alamat2}
          placeholder={'Alamat 2'}
          multiline={true}
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            setalamat2(text);
          }}
        />
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Nomor Hp</Text>
        <TextInput
          value={noHP}
          placeholder={'Nomor HP'}
          keyboardType="number-pad"
          multiline={true}
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im;
        
            setnoHP(text);
            if (reg.test(text) === false) {
              setvalidationPhone(false)
            } else {
              setvalidationPhone(true)
            }
          }}
        />
        {
              noHP.length>0 && !validationPhone?
                <Text style={{color:'red'}}>Nomor Hp Tidak Valid</Text> :null
        }
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Email</Text>
        <TextInput
          value={email}
          placeholder={'Email'}
          multiline={true}
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text) === false) {
            // console.log("Email is Not Correct");
            setemail(text);
            setvalidationEmail(false)
            } else {
              setemail(text);
              setvalidationEmail(true)
              // console.log("Email is Correct");
            }
          }}
        />
        {
          email.length>0 && !validationEmail?<Text style={{color:'red'}}>Email Tidak Valid</Text> :null
        }
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Notes</Text>
        <TextInput
          value={notes}
          placeholder={'Notes'}
          multiline={true}
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            setnotes(text);
          }}
        />
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Provinsi</Text>
        <DropDownPicker
          items={listProvinsi}
          placeholder={'Pilih Provinsi'}
          defaultValue={provinsi}
          containerStyle={{height: undefined}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setprovinsi(item.value)}
        />
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Kota/Kabupaten</Text>
        <DropDownPicker
          items={listCKota}
          placeholder={'Pilih Kota'}
          defaultValue={kota}
          containerStyle={{height: undefined}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setkota(item.value)}
        />
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Kecamatan</Text>
        <DropDownPicker
          items={listDistrict}
          placeholder={'Pilih Kota'}
          defaultValue={district}
          containerStyle={{height: undefined}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setdistrict(item.value)}
        />
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Ds/Komplek/Daerah</Text>
        <DropDownPicker
          items={listSubDistric}
          placeholder={'Pilih Daerah'}
          defaultValue={subdistrict}
          containerStyle={{height: undefined}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setsubdistrict(item.value)}
        />
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Zip Code</Text>
        <TextInput
          value={zip_code && zip_code.toString()}
          placeholder={'Zip Code'}
          // keyboardType={'number-pad'}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            setzip(text);
            if(text>4){
              setvalidationzip_code(true)
            }else{
              setvalidationzip_code(false)
            }
          }}
        />
        <Text style={{color:'red'}}>{validationzip_code?null:'Zip Code Tidak Boleh Kosong / Zip Code Tidak Valid'}</Text>
      </View>
      <TouchableOpacity
        onPress={() => 
          {
            if(validationEmail && validationPhone && validationzip_code && alamat1.length>0) {
              addAddress()
            }
          }}
        style={{
          width: Metrics.screenWidth * 0.8,
          backgroundColor: validationEmail && validationPhone && validationzip_code && alamat1.length>0?'blue':'grey',
          height: 50,
          borderRadius: 12,
          marginTop: Metrics.screenHeight * 0.025,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', fontWeight: '700', fontSize: 20}}>
          {' '}
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </Overlay>
  )

  const CustomerOverlay = () =>(
    <Overlay
    isVisible={openAddCustomer}
    onBackdropPress={() => setopenAddCustomer(false)}
    overlayStyle={{
      width: Metrics.screenWidth * 0.9,
      padding: '5%',
      borderRadius: 12,
    }}>
       <ScrollView>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text>Nama</Text>
        <TextInput
          value={nameCustomer}
          placeholder={'Nama'}
          multiline={true}
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            let reg =/[a-z]/
            setnameCustomer(text);
            if (reg.test(text) === false) {
              setvalidationcustomer(false)
            }else{
              setvalidationcustomer(true)
            }
          }}
        />
         {
            nameCustomer.length>0 && !validationcustomer?<Text style={{color:'red'}}>nama tidak valid</Text> :null
          }
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text style={{paddingTop: 12}}>Email</Text>
        <TextInput
          value={emailCustomer}
          placeholder={'Email'}
          multiline={true}
          keyboardType='email-address'
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            // setCatatan(cat)
            setemailCustomer(text);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text) === false) {
              setvalidationemailCustomer(false)
            }
            else {
              setvalidationemailCustomer(true)
            }
          }}
        />
         {
              emailCustomer.length>0 && !validationemailCustomer?<Text style={{color:'red'}}>email tidak valid</Text> :null
            }
      </View>
      <View style={{paddingTop: Metrics.screenHeight * 0.025}}>
        <Text style={{paddingVertical: 12}}>Phone</Text>
        <TextInput
          value={phoneCustomer}
          placeholder={'Phone Number'}
          multiline={true}
          keyboardType='number-pad'
          maxLength={100}
          style={{
            borderBottomWidth: 0.5,
            width: Metrics.screenWidth * 0.7,
            marginHorizontal: 12,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            setphoneCustomer(parseInt(text));
            const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im;
            if (reg.test(text) === false) {
              setvalidationphoneCustomer(false)
            } else {
              setvalidationphoneCustomer(true)
            }
          }}
        />
        {
          phoneCustomer.length>0 && !validationphoneCustomer?<Text style={{color:'red'}}>phone number tidak valid</Text> :null
        }
      <TouchableOpacity
        onPress={() => {
          if(validationcustomer && validationemailCustomer && validationphoneCustomer){
            addCustomer()
          }
        }}
        style={{
          width: Metrics.screenWidth * 0.8,
          backgroundColor:validationcustomer && validationemailCustomer && validationphoneCustomer? 'blue':'grey',
          height: 50,
          borderRadius: 12,
          marginTop: Metrics.screenHeight * 0.025,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', fontWeight: '700', fontSize: 20}}>
          {' '}
          Submit
        </Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </Overlay>
  )
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',padding:12}}>
            <TouchableOpacity onPress={()=>  {
               if(navigation.getParam('from') === 'cart'){
                  navigation.navigate('HomeScreen')
               }else{
                  navigation.navigate('HomeScreen')
                  // props.CartSuccess([])
               }
            }}>
                <Image source={Images.backButton} style={{tintColor:'black', width:Metrics.screenWidth*0.125, height:Metrics.screenWidth*0.125}} />
            </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text>Alamat :</Text>
          <TextInput
            value={nameLocation}
            placeholder={'Alamat Pemesan'}
            multiline={true}
            maxLength={100}
            style={{
              borderBottomWidth: 0.5,
              width: Metrics.screenWidth * 0.8,
              marginHorizontal: 12,
              textAlign: 'center',
            }}
            onTouchStart={() => setVisible(true)}
          />
          <Text style={{paddingVertical: 12}}> Customer :</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>
                {customer?customer.name:'Not Avaible'}
            </Text>
            <TouchableOpacity 
              onPress={()=> setopenAddCustomer(true)}
              style={{ backgroundColor:'green', padding:8, borderRadius:16}}>
              <Text style={{color:'#fff'}}>{customer?'Replace Customer':'Add Customer'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={{paddingVertical: 12}}> Pengiriman:</Text>
          {item.length > 0 && item[0].length > 0 ? (
            <DropDownPicker
              items={item[0]}
              placeholder={'pilih pengiriman'}
              defaultValue={expedisi}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onOpen={() => {
                setopenLogistic(true);
                setopenLogisticDetail(false);
              }}
              onClose={() => setopenLogistic(false)}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setexpedisi(item.value)}
            />
          ) : null}
          <View style={{height: 12}} />
          {item2.length > 0 && item2[0].length > 0 ? (
            <DropDownPicker
              items={item2[0]}
              defaultValue={expedisiDetail}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'center',
              }}
              onOpen={() => {
                setopenLogisticDetail(true);
                setopenLogistic(false);
              }}
              onClose={() => setopenLogisticDetail(false)}
              dropDownStyle={{setopenLogisticDetail: '#fafafa'}}
              onChangeItem={(item) => setexpedisiDetail(item.value)}
            />
          ) : null}

          <Text style={{paddingVertical: 12}}>Catatan :</Text>
          <TextInput
            value={catatan}
            placeholder={'Catatan'}
            multiline={true}
            maxLength={100}
            style={{
              borderBottomWidth: 0.5,
              width: Metrics.screenWidth * 0.8,
              marginHorizontal: 12,
              textAlign: 'center',
            }}
            onChangeText={(text) => {
              setCatatan(text);
            }}
          />
          {ListItem && ListItem.length > 0 ? (
            <PricingCard
              color="#4f9deb"
              title={'Total Pembayaran'}
              price={currencyFormat(totalPrice)}
              info={[
                totalBarang+ ' pcs',
                'tax ' + ListItem[1].tax,
                'Disc ' + ListItem[1].disc + '%',
              ]}
              button={{title: 'CHECKOUT', icon: 'flight-takeoff'}}
              onButtonPress={() => checkAddress()}
              containerStyle={{
                marginTop: openLogistic
                  ? Metrics.screenHeight * 0.1
                  : openLogisticDetail
                  ? Metrics.screenHeight * 0.25
                  : 12,
              }}
            />
          ) : null}
        </View>
      </ScrollView>
      {AddAddressOverlay()}
      {CustomerOverlay()}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.payload,
    user: state.user.payload,
    calculate: state.calculate.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(CartRedux, UserRedux, CalculateRedux),
    dispatch,
  );
};
// export default connect(mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
