import React, { Component } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import { ImageBackground } from 'react-native';
import background from './img/portada2.jpg';
export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }
  componentDidMount() {
    fetch('https://dichogamous-foregro.000webhostapp.com/circuitos.php')
    .then(response => response.json())
    .then(data => {
      // hacer algo con los datos obtenidos del archivo PHP
      this.setState({ data: data.response, loading: false });
    })
    .catch(error => {
      console.error('Ha ocurrido un error:', error);
      this.setState({ loading: false }); 
    });
  }
  render() {
    const { data, loading } = this.state;
    let content = loading ? <View style={styles.containerLoading}><Image
              source={{ uri: 'https://cdn.icon-icons.com/icons2/2854/PNG/512/clock_time_watch_icon_181567.png' }}
              style={styles.loading}
            /></View> : data.map((circuito, index) => (
      <View style={styles.circuitContainer}>
        <Text style={styles.circuitName} key={index}>{circuito.name}</Text>
        <Image style={styles.circuitImage} source={{ uri: circuito.image }}/>
        <Text style={styles.circuitInfo} key={index}>
          Vueltas: {circuito.laps}{"\n"}
          Distancia: {circuito.race_distance}{"\n"}
          Capacidad: {circuito.capacity ? circuito.capacity : 'No registrado'}
        </Text>
      </View>
    ));
    return (
      <ImageBackground source={background} style={{ flex: 1 }}>
        <Text style={styles.titulo}>Formula 1</Text>
        <Text style={styles.tituloCircuitos}>Circuitos</Text>
        <View style={styles.swiperContainer}>
          <Swiper showsButtons={false} showsPagination={false}>
            {content}
         </Swiper>
        </View>
      </ImageBackground>
    );
  }
}
const styles=StyleSheet.create({
  containerLoading:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  loading:{
    width: 150, 
    height: 150,
  },  
  titulo:{
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  circuitContainer:{
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: 'black',
  },
  circuitName:{
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    fontWeight: 'bold',
  },
  circuitImage: {
    margin: 15,
    width: 250,
    height: 150,
    alignSelf: 'center',
  },
  tituloCircuitos:{
    marginTop: 30,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    textShadowColor: '#000',
    color: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2
  }, 
  swiperContainer: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circuitInfo:{
    margin: 15,
    fontSize: 18,
    color: 'white'
  }
});
