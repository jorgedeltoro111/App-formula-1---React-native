import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import { ImageBackground } from 'react-native';
import background from './img/perfil.jpg';
import { Alert } from 'react-native';
export default class Tab2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
      oldPass: '',
      newPass: '',
      checkNewPass: '',
      bool: false,
      cancelar: 'Cambiar Contraseña'
    };
  }

  render() {
    const btnClick = () => {
      this.props.navigation.navigate('Ingresar');
    }
    const updatePass = () => {
      
      fetch(
        'https://dichogamous-foregro.000webhostapp.com/updatePass.php?oldPass=' +
          this.state.oldPass +
          '&newPass=' +
          this.state.newPass +
          '&checkNewPass=' + this.state.checkNewPass
        )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if(data == 1){
            alert('Contraseña cambiada correctamente !');
            btnClick();
          }else if(data == 0){
            alert('la contraseña actual es incorrecta !');
          }else{
            alert('La nueva contraseña no coincide !');
          }
        })
        .catch((error) => console.error(error));
    }
    const btnContrasena = () => {
      const formPass = 
      <View style={styles.formContainer}>
        <Text style={styles.pass}>Contraseña actual: </Text>
        <TextInput style={styles.input}
        keyboardType="text" placeholder="ej. pass123" placeholderTextColor='black' secureTextEntry={true}
        onChangeText={oldPass => this.setState({oldPass})}
        />
        <Text style={styles.pass}>Nueva Contraseña: </Text>
        <TextInput style={styles.input}
        keyboardType="text" placeholder="ej. pass123" placeholderTextColor='black' secureTextEntry={true}
        onChangeText={newPass => this.setState({newPass})}
        />
        <Text style={styles.pass}>Repetir Contraseña nueva: </Text>
        <TextInput style={styles.input}
        keyboardType="text" placeholder="ej. pass123" placeholderTextColor='black' secureTextEntry={true}
        onChangeText={checkNewPass => this.setState({checkNewPass})}
        />
        <Pressable style={styles.botonA} onPress={updatePass}>
          <Text style={styles.actualizar}>Actualizar</Text>
        </Pressable>
        </View>;
        this.setState({ form: formPass });
        if(this.state.bool === false){
          this.setState({ bool: true });
          this.setState({cancelar: 'Cancelar'});
        }else{
          this.setState({ bool: false });
          this.setState({cancelar: 'Cambiar Contraseña'});
        }
    }
    const { data } = this.props.route.params;
    return (
      <ImageBackground source={background} style={{ flex: 1 }}>
        <Text style={styles.titulo}>Bienvenido {data.name}</Text>
        <Text style={styles.info}>Información de usuario</Text>
        <Text style={styles.nombre}>Nombre: {data.name}</Text>
        <Text style={styles.correo}>Correo: {data.email}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5,}}>
        <Pressable style={styles.boton} onPress={btnClick}>
          <Text style={styles.text}>Cerrar sesión</Text>
        </Pressable>
        <Pressable style={styles.boton} onPress={btnContrasena}>
          <Text style={styles.text}>{this.state.cancelar}</Text>
        </Pressable>
        </View>
        
        {this.state.bool && this.state.form}
      </ImageBackground>
    );
  }
}
const styles=StyleSheet.create({
   botonA:{
    marginTop: 10,
    borderWidth: 2,
    padding: 5,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    borderColor: 'black'
  },
  actualizar:{
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 10,
    paddingLeft: 10,
    color: 'white'
  },
  formContainer:{
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15,
    borderColor: 'red',
    padding: 10
  },
  pass:{
    fontSize: 20,
    color: 'white',
    marginTop:5,
  },
  input:{
    backgroundColor: 'white',
    marginRight: 200,
    borderRadius: 5,
    margin: 5
  },
  titulo:{
    marginTop: 50,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  info:{
    textAlign: "center",
    marginTop: 15,
    fontSize: 25,
    textFont: "bold"
  },
  nombre:{
    fontSize: 20,
    padding: 10,
    color: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  correo:{
    fontSize: 20,
    padding: 10,
    color: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  boton: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white'
  },
  text:{
    padding: 20,
    color: "red"
  }
});