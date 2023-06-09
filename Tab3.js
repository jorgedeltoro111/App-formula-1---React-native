import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { ImageBackground } from 'react-native';
import background from './img/formula1.jpg';
export default class Tab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }
  componentDidMount() {
    fetch('https://dichogamous-foregro.000webhostapp.com/teams.php')
    .then(response => response.json())
    .then(data => {
      // hacer algo con los datos obtenidos del archivo PHP
      console.log('entre');
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
            /></View> : data.map((teams, index) => (
      <View style={styles.teamsContainer}>
        <Text style={styles.teamsName} key={index}>{teams.name}</Text>
        <Image style={styles.teamsImage} source={{ uri: teams.logo }}/>
        <Text style={styles.teamsInfo}>
          Presidente: {teams.president ? teams.president : 'No registrado'}{"\n"}
          Base: {teams.base ? teams.base : 'No registrado'}{"\n"}
          Motor: {teams.engine ? teams.engine : 'No registrado'}{"\n"}
          Campeonatos mundiales: {teams.world_championships ? teams.world_championships : 'No registrado'}
        </Text>
      </View>
    ));
    return (
      <ImageBackground source={background} style={{ flex: 1 }}>
      <Text style={styles.titulo}>Equipos</Text>
        <View style={styles.swiperContainer}>
          <Swiper showsButtons={false} showsPagination={false}>
            {content}
          </Swiper>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
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
  containerLoading:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  loading:{
    width: 150, 
    height: 150,
  },  
  teamsName:{
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: 'white'
  },
  teamsInfo:{
    margin: 5,
    fontSize: 20,
    color: 'white'
  },
  teamsContainer:{
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30
  },
  swiperContainer:{
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  teamsImage:{
    marginTop: 10,
    marginLeft: 80,
    margin: 5,
    width: 200,
    height: 100
  }
});
