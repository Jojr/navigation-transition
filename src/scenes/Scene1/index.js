import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const Scene1 = props => {
  const {navigation} = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      //onPress={() => navigation.navigate('screen2')}
      onPress={() => navigation.push('screen2', {item: 'shoe'})}
      style={StylesLocal.container}>
      <SharedElement id="paper">
        <View style={StylesLocal.paper} />
      </SharedElement>
      <View style={StylesLocal.headerContainer}>
        <Text style={StylesLocal.header}>TESTE</Text>
        <Text style={StylesLocal.subheader}>TRANSIÇÃO</Text>
      </View>
      <SharedElement id="shoe">
        <Image
          style={StylesLocal.shoe}
          source={require('../../assets/images/air-jordan-1.png')}
        />
      </SharedElement>
    </TouchableOpacity>
  );
};

const StylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C14534',
  },
  headerContainer: {
    padding: 20,
    paddingTop: Dimensions.get('window').height * 0.1,
  },
  header: {
    color: '#FFF',
    fontSize: 80,
    marginBottom: -14,
    fontFamily: 'Bebas Neue',
  },
  subheader: {
    color: '#FFF',
    fontSize: 34,
    paddingTop: 10,
    fontFamily: 'Bebas Neue',
  },
  paper: {
    backgroundColor: '#EC806E',
    position: 'absolute',
    left: 10,
    top: Dimensions.get('window').height * 0.5 - 150,
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').height * 0.45,
    //transform: [{ rotate: '-20deg' }],
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
  },
  shoe: {
    width: 400,
    height: 270,
    position: 'absolute',
    left: Dimensions.get('window').width * 0.2,
    top: Dimensions.get('window').height * 0.5 - 400,
    //transform: [{rotate: '35deg'}],
    zIndex: 1000,
  },
});

Scene1.sharedElements = () => {
  return [
    {
      id: 'paper',
      animation: 'move',
      resize: 'clip',
      //align: 'left-top',
    },
    {
      id: 'shoe',
      animation: 'move',
      resize: 'clip',
      //align: 'left-top',
    },
  ];
};

export default Scene1;
