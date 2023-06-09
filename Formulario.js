import React, { Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Pressable, Alert} from 'react-native';
import { ImageBackground } from 'react-native';
import background from './img/portada.jpg';
export default class Formulario extends Component {
  constructor(props){
    super(props);
    this.state={
      nombre:"",
      correo:"",
      pass:"",
    };
  }

  render() {
   
    const btnClick = () => {
      if(this.state.correo == ""){
        alert("Campos vacios !");
      }else{
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          _this.setState({resultado: xhttp.responseText});
          console.log(xhttp.responseText);
        }
      };
      xhttp.open("GET",
        'https://dichogamous-foregro.000webhostapp.com/registro.php?name=' + this.state.nombre + '&email='+ this.state.correo +'&password='+ this.state.pass,
        true);
      Alert.alert(
        'Registro exitoso', 
        'Informacion enviada correctamente', 
        [
          {
            text: 'Aceptar',
          },
        ],
      );
      xhttp.send();
      }
    };
    return (
     <ImageBackground source={background} style={{ flex: 1 }}>
        <Text style={styles.titulo}>Registro</Text>
        <Text style={styles.nombre}>Nombre </Text>
        <TextInput
          style={styles.input1}
          keyboardType="text"
          placeholder="ej. Jorge Enrique"
          placeholderTextColor='#424949'
          onChangeText={nombre => this.setState({nombre})}
        />
        <Text style={styles.correo} >Correo </Text>
        <TextInput
          style={styles.input1}
          keyboardType="text"
          placeholder="ej. usuario@gmail.com"
          placeholderTextColor='#424949'
          onChangeText={correo => this.setState({correo})}
        />
        <Text style={styles.pass} >Contraseña </Text>
        <TextInput
          style={styles.input1}
          placeholder="ej. Pasword_2023"
          placeholderTextColor='#424949'
          secureTextEntry={true}
          onChangeText={pass => this.setState({pass})}
        />
        <Pressable style={styles.boton} onPress={btnClick}>
          <Text style={styles.text}>Enviar</Text>
        </Pressable>
        
      </ImageBackground>
    );
  }
}

const styles=StyleSheet.create({
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
  borderWidth:2,
  borderColor:"black",
  marginTop: 5,
  marginLeft: 80,
  marginRight: 80,
  borderRadius: 10,
  padding: 5,
  backgroundColor:'white'
},
nombre:{
  fontWeight: 'bold',
  textAlign: "center",
  marginTop: 30,
  color: 'white',
  textShadowColor: '#000',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 2,
},
correo:{
  fontWeight: 'bold',
  marginTop: 10,
  textAlign: "center",
  color: 'white',
  textShadowColor: '#000',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 2,
},
pass:{
  fontWeight: 'bold',
  marginTop: 10,
  textAlign: "center",
  color: 'white',
  textShadowColor: '#000',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 2,
},
boton: {
    marginTop: 30,
    marginLeft: 150,
    marginRight: 150,
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
    fontSize: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});