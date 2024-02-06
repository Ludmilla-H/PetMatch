import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import Categories from '../component/Categories';
import StylesHome from '../Styles/StylesHome';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import PetList from '../component/PetList';

const logo = require('../assets/images/petmatch.png')
const GreenBig = require('../assets/images/Ellipse18.png');
const orangeLittle = require('../assets/images/Ellipse19.png');
const orangeBig = require('../assets/images/OrangeBig.png');
const GreenLittle = require('../assets/images/GreenLittle.png');


const HomePage = ({ navigation }) => {

// const categorieKey = useSelector(state => state.categorie)



  // const goToSignIn = () => {
  //   navigation.navigate('signin');
  // }
  // const goToSignUp = () => {
  //   navigation.navigate("signup");
  // }
  // const goToProfile = () => {
  //   navigation.navigate("profile");
  // }

  return (
    <View style={StylesHome.container}>
      <Image source={GreenBig} style={{ height: 276, width: 176, position: "absolute", top: 100, right: -20}} />
      <Image source={orangeLittle} style={{ height: 156, width: 103, position: "absolute", right: 0, bottom: 140, }} />
      <Image source={orangeBig} style={{ height: 198, width: 215, position: "absolute", bottom: -30, }} />
      <Image source={GreenLittle} style={{ height: 156, width: 107, position: "absolute", bottom: 100, }} />



      <View style={StylesHome.bells}>
        <Icon name="bells" size={30} color="#000" />
      </View>

      <View style={StylesHome.logoView}>
        <Image source={logo} style={StylesHome.logo} />
      </View>

      <Text style={StylesHome.categorieText}>Catégories</Text>

      <View style={StylesHome.categorieView}>
        <Categories />
      </View>

      <PetList/>

      {/* <Button onPress={goToSignUp}>S'inscrire</Button>
      <Button onPress={goToSignIn}>connectez-vous</Button>
      <Button onPress={goToProfile}>Mon profil</Button> */}

    </View>
  )
}

export default HomePage