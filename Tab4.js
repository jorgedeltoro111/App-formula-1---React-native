import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';
import background from './img/drivers.jpg';
export default class Tab4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: "lewi",
      data: [],
      loading: true
    };
  }
  render() {
    const mostrarDriver = () => {
      fetch('https://dichogamous-foregro.000webhostapp.com/drivers.php?search=' + this.state.driver)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data: data.response, loading: false });
        })
        .catch((error) => {
          console.error('Ha ocurrido un error:', error);
          this.setState({ loading: false }); 
        });
    };
    const { data, loading } = this.state;
    let content = loading ? console.log('loading') : data.map((driver, index) => (
      <View style={styles.driverContainer}>
        <Text style={styles.driverName} key={index}>{driver.name}</Text>
        <Image style={styles.driverImage} source={{ uri: driver.image }}/>
        <Text style={styles.driverInfo}>
          Nacionalidad:{driver.nationality}{'\n'}
          Campeón del mundo: {driver.world_championships ? <Text>No registrado</Text> : driver.world_championships} veces{'\n'}
          Número:{driver.number ?  driver.number : <Text>No registrado</Text>}{'\n'}
          Podio: {driver.podiums ? driver.podiums : <Text>No registrado</Text>}
        </Text>
      </View>
    ));
    return (
       <ImageBackground source={background} style={{ flex: 1 }}>
       <ScrollView>
        <Text style={styles.titulo}>Pilotos</Text>
        <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
        <Text style={{color:'white'}}>Ingresa el nombre del piloto:</Text>
        <TextInput style={styles.input1}
        placeholder="ej. Bottas" 
        placeholderTextColor='black'
        onChangeText={driver => this.setState({driver})}
        />
        </View>
        <Pressable style={styles.boton} onPress={mostrarDriver}>
          <Text style={styles.text}>Mostrar</Text>
        </Pressable>
        </View>
        <View style={styles.content}>
        {content}
        </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  titulo:{
    marginTop: 50,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    textShadowColor: '#000',
    color: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2
  },
  content:{
    marginTop:50
  },
  input1:{
    padding: 2,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: 'white',
    color: 'black'
  },
  formContainer:{
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 13,
    marginRight:13,
    marginTop: 15,
    padding: 10,
    borderColor: 'white'
  },
  boton:{
    marginTop: 10,
    marginLeft: 125,
    marginRight: 160,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  text:{
    fontWeight: "bold",
    fontSize: 10,
    textAlign: 'center'
  },
  driverContainer:{
    borderWidth:2,
    borderRadius: 10,
    margin: 15,
    backgroundColor: 'black',
    borderColor: 'white'
  },
  driverName:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  },
  driverImage:{
    width: 150,
    height: 200,
    marginLeft: 130,
    margin: 5
  },
  driverInfo:{
    fontSize: 17,
    color: 'white',
    margin: 5
  }

});
