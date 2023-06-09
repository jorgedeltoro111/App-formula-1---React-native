import React, { Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Pressable, Image} from 'react-native';
import { ImageBackground } from 'react-native';
import background from './img/portada.jpg';
export default class Ingresar extends Component {
  constructor(props){
    super(props);
    this.state={
      correo:"",
      pass:"",
    };
  }

  render() {
     const btnClick = () => {
       if(this.state.correo == ""){
          alert('Campos vacios ! ');
       }else{
        //Recibir variables de php
        fetch(
        'https://dichogamous-foregro.000webhostapp.com/login.php?email=' +
          this.state.correo +
          '&password=' +
          this.state.pass
        )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Aquí puedes trabajar con la variable "data" devuelta por PHP
          //verificamos que todos los valores esten correctos: email, password y status y damos acceso RETURN 1
          console.log(data);
          if (data.validacion == 1) {
            this.props.navigation.navigate('Bienvenido', {data: data});
          } else if (data.validacion == 2) {
            alert('Contraseña incorrecta ! ');
          } else if (data.validacion == 3) {
            alert('Verifique su cuenta !');
          } else {
            alert('Email no registrado !');
          } 
        })
        .catch((error) => console.error(error));
        }

      };
    return(
      <ImageBackground source={background} style={{ flex: 1 }}>
        <Text style={styles.titulo}>Iniciar sesión</Text>
        <View style={styles.container}>
            <Image
              source={{ uri: 'https://cdn.icon-icons.com/icons2/1221/PNG/512/1492608052-16-gmail-email-mail-communication-message-service_83380.png' }}
              style={styles.email}
            />
          <Text style={styles.correo} >Correo</Text>
        </View>
        <TextInput style={styles.input1}
        keyboardType="text" placeholder="ej. usuario@gmail.com" placeholderTextColor='#424949'
        onChangeText={correo => this.setState({correo})}
        />
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://cdn.icon-icons.com/icons2/2120/PNG/512/lock_padlock_locked_protected_security_icon_131240.png' }}
            style={styles.candado}
          />
          <Text style={styles.pass} >Contraseña</Text>
        </View>
        <TextInput style={styles.input1}
        placeholder="ej. Password_2023" secureTextEntry={true}
        placeholderTextColor='#424949'
        onChangeText={pass => this.setState({pass})}
        />
        <Pressable style={styles.boton} onPress={btnClick}>
          <Text style={styles.text}>Ingresar</Text>
        </Pressable>
        <Text style={styles.o}> o </Text>
        <Pressable style={styles.botonIngresar} onPress={() => this.props.navigation.navigate('Registro')}>
          <Text style={styles.text}>Registrarse</Text>
        </Pressable>
      </ImageBackground>
    );
  }
}
const styles=StyleSheet.create({
container:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
},
email:{
  width: 30, 
  height: 30,
  marginTop: 24,
  marginRight: 5,
  marginLeft: -20
},
candado:{
  width: 30, 
  height: 30,
},  
titulo:{
  marginTop: 80,
  textAlign: 'center',
  fontSize: 35,
  fontWeight: 'bold',
  textShadowColor: '#000',
  color: 'white',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 2,
},
input1:{
  backgroundColor: 'white',
  borderWidth:2,
  borderColor:"black",
  marginTop: 5,
  marginLeft: 80,
  marginRight: 80,
  borderRadius: 10,
  padding: 5,
},
correo:{
  color: 'white',
  fontWeight: 'bold',
  marginTop: 30,
  textAlign: "center",
  textShadowColor: '#000',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 2,
},
pass:{
  color: 'white',
  fontWeight: 'bold',
  marginTop: 10,
  textAlign: "center",
  textShadowColor: '#000',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 2,
}, 
boton: {
    marginTop: 30,
    marginRight: 140,
    marginLeft: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
    borderWidth:2,
  },
   text: {
    fontSize: 9,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textShadowColor: '#000',
  },
   botonIngresar: {
    borderColor: 'black',
    borderWidth:2,
    marginTop: 2,
    marginRight: 140,
    marginLeft: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
  },
  o:{
  textAlign: "center",
  fontSize: 20,
  color: 'white'
  },
});
