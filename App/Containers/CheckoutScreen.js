import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TextInput, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import DropDownPicker from 'react-native-dropdown-picker';

import CartRedux from '../Redux/CartRedux';
import UserRedux from '../Redux/UserRedux';
import CalculateRedux from '../Redux/CalculateRedux';
// Styles
import styles from './Styles/LaunchScreenStyles'
import { Overlay, PricingCard } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import axios from 'axios';

function CheckoutScreen (props) {
  const { cart, user, navigation } =  props
  const [item,setitem]= useState([])
  const [item2, setitem2]= useState([])
  const [expedisi, setexpedisi]=useState()
  const [expedisiDetail, setexpedisiDetail]=useState()
  const [openLogistic, setopenLogistic]=useState(false)
  const [openLogisticDetail, setopenLogisticDetail]=useState(false)
  const [catatan, setCatatan] = useState('')
  const [address, setaddress] = useState({})
  const [nameLocation, setnameLocation] = useState('')
  const [alamat1, setalamat1] = useState('')
  const [alamat2, setalamat2] = useState('')
  const [noHP, setnoHP] = useState('')
  const [email, setemail] = useState('')
  const [notes, setnotes] = useState('')
  const [visible, setVisible] = useState(false);
  const [useid, setuseid] = useState()
  const [listProvinsi,setlistProvinsi] =useState([])
  const [listCKota,setlistCKota] =useState([])
  const [listDistrict,setlistDistrict] =useState([])
  const [listSubDistric,setlistSubDistric] =useState([])
  const [provinsi, setprovinsi] = useState()
  const [kota, setkota] = useState()
  const [district, setdistrict] = useState()
  const [subdistrict, setsubdistrict] = useState()
  const [zip, setzip] =useState()

  
  useEffect(()=>{
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/address/province',
    {
      headers: {
        Authorization: 'Bearer ' + user.token
      },
      timeout:10000
    }).then(res => {
      let list = []
        res.data.data.map(map =>{
          list.push( {label: map.nama, value: map.id})
        })
        setlistProvinsi(list)
    })
    .catch(err => console.log(err))
    fetch('https://hercules.aturtoko.id/aturorder/public/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user.token
      }
      }).then(res => res.json())
      .then(data =>{ 
        // console.log(data.user.USER_ID)
        setuseid(data.user.USER_ID)
      })
      .catch(err =>{
      alert(err)
      })
    setitem([])
    fetch('https://hercules.aturtoko.id/aturorder/public//api/v1/logistic', {
  method: 'GET',
  headers: { 
    Authorization: 'Bearer ' + user.token
  }}).then(res => res.json())
  .then(data =>{ 
    let item =[]
    // console.log(data.data)
    data.data.map(logistic =>
      item.push({label: logistic.logistic_name, value: logistic.id, icon: () => <Image source={{ uri: logistic.logo_url }}style={{ width: 100, height: 40 }} resizeMethod={'resize'}/>})
      )
    setitem([item,data.data])
  })
  .catch(err =>{
  alert(err)
})
},[])

useEffect(()=>{
  if(expedisi){
    setitem2([])
    fetch('https://hercules.aturtoko.id/aturorder/public/api/v1/logistic/'+expedisi, {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + user.token
  }
  }).then(res => res.json())
  .then(data =>{ 
    let item =[]
    // console.log(data.data)
    data.data.map(logistic =>
      item.push({label: logistic.service_name +" ("+logistic.type+")", value: logistic.id, icon: () => <Image source={{ uri: logistic.logo_url }}style={{ width: 100, height: 40 }} resizeMethod={'resize'}/>})
      )
    setitem2([item,data.data])
  })
  .catch(err =>{
  alert(err)
  })
  }
  
},[expedisi])

useEffect(()=>{
  if(provinsi){
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/address/city/'+provinsi,
    {
      headers: {
        Authorization: 'Bearer ' + user.token
      },
      timeout:10000
    }).then(res => {
      let list = []
        // console.log(res.data.data)
        res.data.data.map(map =>{
          list.push({label: map.nama, value: map.id})
        })
        // console.log(list)
        setlistCKota(list)
    })
    .catch(err => console.log(err))
  }
},[provinsi])

useEffect(()=>{
  if(kota){
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/address/district/'+kota,
    {
      headers: {
        Authorization: 'Bearer ' + user.token
      },
      timeout:10000
    }).then(res => {
      let list = []
        // console.log(res.data.data)
        res.data.data.map(map =>{
          list.push( {label: map.nama, value: map.id})
        })
        // console.log(list)
        setlistDistrict(list)
    })
    .catch(err => console.log(err))
  }
},[kota])

useEffect(()=>{
  if(district){
    axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/address/subdistrict/'+district,
    {
      headers: {
        Authorization: 'Bearer ' + user.token
      },
      timeout:10000
    }).then(res => {
      let list = []
        // console.log(res.data.data)
        res.data.data.map(map =>{
          list.push( {label: map.nama, value: map.id})
        })
        // console.log(list)
        setlistSubDistric(list)
    })
    .catch(err => console.log(err))
  }
},[district])


const postOrder = ()=>{
    let logis =  item[1].filter(fil => fil.id === expedisi)[0].logistic_name.toString()
    let type =  item2[1].filter(fil => fil.id === expedisiDetail)[0].type.toString()
    const  data = {
      "order_datetime": new Date().toString(),
      "items": [cart[1]],
      "customer": {
          "id": useid,
          "notes": catatan
      },
      "shipment": {
          "logistic": logis,
          "type": type,
          "shipment_cost": 9000
      },
      "payment": {
          "channel": "TRF-BCA",
          "service_fee": 0,
          "payment_verification": {}
      },
      "total_payment": cart[0].price*cart[1].qty
    }
    console.log(data)
  axios.post('https://hercules.aturtoko.id/aturorder/public/api/v1/order',data,
  {
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    timeout:10000
  }).then(res => {
    console.log(res.data)
    Alert.alert(
      "Selamat Pesanan Anda Berhasil di Proses",
      "mohon di tunggu ya pesanan anda sampai di rumah",
      [
        { text: "OK", onPress: () => {
          navigation.popToTop()
          props.CartSuccess([])
        }}
      ],
      { cancelable: false }
    )
  })
  .catch(err => console.log(err)) 
}

const checkAddress =() =>{
  axios.get('https://hercules.aturtoko.id/aturorder/public/api/v1/address?customer_id='+useid,
  {
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    timeout:10000
  }).then(res => {
    // console.log(res.data.data)
      if(res.data.data.length>0){
        postOrder()
      }else{
        Alert.alert('Mohon tambahkan/isi alamat pengiriman terlebih dahulu')
      }
  })
  .catch(err => console.log(err))
}

const addAddress = ()=>{
  const body = {
    "customer_id": useid,
    "address": {
        "address_label": nameLocation,
        "address_line_1": alamat1,
        "address_line_2": alamat2,
        "province_id": provinsi,
        "city_id": kota,
        "district_id": district,
        "subdistrict_id": subdistrict,
        "phone_no": noHP,
        "email": email,
        "notes": notes,
        "zip_code":zip,
    }
}
   axios.post('https://hercules.aturtoko.id/aturorder/public/api/v1/address',body,
  {
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    timeout:10000
  }).then(res => {
    console.log(res.data)
    setVisible(false)
  })
  .catch(err => console.log(err))
}
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text>Alamat :</Text>
            <TextInput 
                value={nameLocation}
                placeholder={'Alamat Pemesan'}
                multiline={true}
                maxLength={100}
                style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.8, marginHorizontal:12, textAlign:'center'}}
                onTouchStart={()=>setVisible(true)}
              />
            <Text style={{paddingVertical:12}}>Pengiriman :</Text>
            {
              item.length>0&&item[0].length>0?
              <DropDownPicker
              items={item[0]}
              placeholder={"pilih pengiriman"}
              defaultValue={expedisi}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent:'flex-start',alignItems:'center'
              }}
              onOpen={()=>{
                setopenLogistic(true)
                setopenLogisticDetail(false)
              }}
              onClose={()=>setopenLogistic(false)}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => setexpedisi(item.value)}
          />:null
            }
          <View style={{height:12}}/>
          {
            item2.length>0 && item2[0].length>0?
            <DropDownPicker
              items={item2[0]}
              defaultValue={expedisiDetail}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'center'
              }}
              onOpen={()=>{
                setopenLogisticDetail(true)
                setopenLogistic(false)
              }}
              onClose={()=>setopenLogisticDetail(false)}
              dropDownStyle={{setopenLogisticDetail: '#fafafa'}}
              onChangeItem={item => setexpedisiDetail(item.value)}
          />:null
          }
          
          <Text style={{paddingVertical:12}}>Catatan :</Text>
          <TextInput 
                value={catatan}
                placeholder={'Catatan'}
                multiline={true}
                maxLength={100}
                style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.8, marginHorizontal:12, textAlign:'center'}}
                onChangeText={ text => {
                  setCatatan(text)
                }
                }
              />
          {
            cart &&cart.length>0?
            <PricingCard
              color="#4f9deb"
              title={cart[0].name}
              price={"Rp."+(cart[0].price*cart[1].qty)}
              info={[cart[1].qty+' pcs', 'tax '+cart[1].tax, 'Disc '+cart[1].disc+'%']}
              button={{ title: 'CHECKOUT', icon: 'flight-takeoff' }}
              onButtonPress={()=> checkAddress()}
              containerStyle={{marginTop:openLogistic?Metrics.screenHeight*0.1:openLogisticDetail?Metrics.screenHeight*0.25:12}}
            />
            :null
          }
          
          </View>
        </ScrollView>
        <Overlay isVisible={visible} onBackdropPress={()=> setVisible(false)} overlayStyle={{width:Metrics.screenWidth*0.9, padding:'5%',borderRadius:12}}>
          <ScrollView>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text >Nama Lokasi</Text>
            <TextInput 
                  value={nameLocation}
                  placeholder={'Nama Lokasi'}
                  multiline={true}
                  maxLength={100}
                  style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginHorizontal:12, textAlign:'center'}}
                  onChangeText={ text => {
                    // setCatatan(cat)
                    setnameLocation(text)
                  }
                  }
                />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
          <Text style={{paddingTop:12}}>Alamat 1</Text>
          <TextInput 
                value={alamat1}
                placeholder={'Alamat 1'}
                multiline={true}
                maxLength={100}
                style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginHorizontal:12, textAlign:'center'}}
                onChangeText={ text => {
                  // setCatatan(cat)
                  setalamat1(text)
                }
                }
              />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text style={{paddingVertical:12}}>Alamat 2</Text>
            <TextInput 
                  value={alamat2}
                  placeholder={'Alamat 2'}
                  multiline={true}
                  maxLength={100}
                  style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginHorizontal:12, textAlign:'center'}}
                  onChangeText={ text => {
                    // setCatatan(cat)
                    setalamat2(text)
                  }
                  }
                />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Nomor Hp</Text>
            <TextInput 
                  value={noHP}
                  placeholder={'Nomor HP'}
                  keyboardType='number-pad'
                  multiline={true}
                  maxLength={100}
                  style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginHorizontal:12, textAlign:'center'}}
                  onChangeText={ text => {
                    // setCatatan(cat)
                    setnoHP(text)
                  }
                  }
                />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Email</Text>
            <TextInput 
                  value={email}
                  placeholder={'Email'}
                  multiline={true}
                  maxLength={100}
                  style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginHorizontal:12, textAlign:'center'}}
                  onChangeText={ text => {
                    // setCatatan(cat)
                    setemail(text)
                  }
                  }
                />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Notes</Text>
            <TextInput 
                  value={notes}
                  placeholder={'Notes'}
                  multiline={true}
                  maxLength={100}
                  style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginHorizontal:12, textAlign:'center'}}
                  onChangeText={ text => {
                    // setCatatan(cat)
                    setnotes(text)
                  }
                  }
                />  
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Provinsi</Text>
            <DropDownPicker
              items={listProvinsi}
              placeholder={"Pilih Provinsi"}
              defaultValue={provinsi}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent:'flex-start',alignItems:'center'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => setprovinsi(item.value)}
            />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Kota/Kabupaten</Text>
            <DropDownPicker
              items={listCKota}
              placeholder={"Pilih Kota"}
              defaultValue={kota}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent:'flex-start',alignItems:'center'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => setkota(item.value)}
            />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Kecamatan</Text>
            <DropDownPicker
              items={listDistrict}
              placeholder={"Pilih Kota"}
              defaultValue={district}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent:'flex-start',alignItems:'center'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => setdistrict(item.value)}
            />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Ds/Komplek/Daerah</Text>
            <DropDownPicker
              items={listSubDistric}
              placeholder={"Pilih Daerah"}
              defaultValue={subdistrict}
              containerStyle={{height: undefined}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent:'flex-start',alignItems:'center'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => setsubdistrict(item.value)}
            />
          </View>
          <View style={{paddingTop:Metrics.screenHeight*0.025}}>
            <Text>Zip Code</Text>
            <TextInput 
                  value={zip}
                  placeholder={'Notes'}
                  multiline={true}
                  maxLength={100}
                  style={{borderBottomWidth:0.5, width:Metrics.screenWidth*0.7, marginHorizontal:12, textAlign:'center'}}
                  onChangeText={ text => {
                    // setCatatan(cat)
                    setzip(text)
                  }
                  }
                />  
          </View>
          <TouchableOpacity 
            onPress={()=> addAddress()}
            style={{width:Metrics.screenWidth*0.8, backgroundColor:'blue', height:50, borderRadius:12,marginTop:Metrics.screenHeight*0.025,alignItems:'center',justifyContent:"center"}}>
            <Text style={{color:'#fff', fontWeight:'700', fontSize:20}}> Submit</Text>
          </TouchableOpacity>
          </ScrollView>
        </Overlay>
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.payload,
    user: state.user.payload,
    calculate: state.calculate.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(CartRedux,UserRedux,CalculateRedux), dispatch)
}
// export default connect(mapStateToProps, mapDispatchToProps)(Template)
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)