import { View, Text, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignUpStyles from '../Styles/SignUpStyles';


const SignUpScreen = ({ navigation }) => {


  const ConditionGenerale = () => {
    navigation.navigate('ConditionGenerale')
  }

  //initialisation de mes states
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);

  // Ajoutez des états pour suivre l'état de validation de chaque champ de saisie
  const [userNameValid, setUserNameValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);


  // Fonction de validation pour le nom d'utilisateur
  const validateUserName = (text) => {
    setUserName(text);
    setUserNameValid(text.trim() !== ''); // Vérifiez si le champ n'est pas vide
  };

  // Ajoutez des fonctions de validation pour chaque champ de saisie
  // Validez que les champs ne sont pas vides
  const validateName = (text) => {
    setName(text);
    setNameValid(text.trim() !== '');
  };

  const validatePassword = (text) => {
    setPassword(text);
    setPasswordValid(text.trim() !== '');
  };

  const validateEmail = (text) => {
    setEmail(text);
    // Ajoutez une validation d'email si nécessaire
    setEmailValid(text.trim() !== '');
  };

  // //fonction pour incrementer les étapes de l'inscription
  // const next = () => {
  //   // si step est egal à la 3eme étape appeler la fonction (done) 
  //   if (step == 4) {
  //             done();
  //     //sinon aller à létape suivante
  //   } else {
  //     setStep(step + 1)
  //   } if (step === 4) {
  //     navigation.navigate('Home');
  //   }
  // }

  // Fonction pour passer à l'étape suivante
  const next = () => {
    if (step === 4) {
      // Vérifiez si tous les champs obligatoires sont valides avant d'appeler la fonction done()
      if (userNameValid && nameValid && passwordValid && emailValid) {
        done();
      } else {
        // Affichez un message d'erreur ou empêchez la transition si tous les champs obligatoires ne sont pas remplis
        console.log("Veuillez remplir tous les champs obligatoires.");
      }
    } else {
      setStep(step + 1);
    }
  };

  const done = async () => {
    try {
      // si email et password vide alors creer et enregistrer dans firebase auth 
      if (email != "" && password != "") {

        console.log("pas vide")
        const userAuth = await auth().createUserWithEmailAndPassword(email, password)
        console.log("userAuth", userAuth)

        const uid = userAuth.user.uid
        //enregistrement de l'utilisateur en base de donnée à l'aide de son uid (user:id)
        await firestore().collection("user").doc(uid).set({ email: email.trim() })

      }
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <>
      <View style={SignUpStyles.container}>

        {/* switch case pour incrémenter mes étapes d'inscription */}
        {(step === 1 &&
          <>
            <Text style={SignUpStyles.signUpTitle}> Inscription </Text>
            <Text style={SignUpStyles.signUpSentence}> Merci de remplir ce formulaire avec vos informations afin de continuer </Text>

            <TextInput
              style={SignUpStyles.inputs}
              placeholder="Nom d'utilisateur"
              value={userName}
              onChangeText={validateUserName}
            />
            <TextInput
              style={SignUpStyles.inputs}
              placeholder="Prénom"
              value={name}
              onChangeText={validateName}
            />
          </>
        )
          || (step === 2 &&
            <>
              <Text style={SignUpStyles.signUpSentence2}> Avant dernière étape pour votre inscription  </Text>
              <TextInput
                style={SignUpStyles.inputs}
                placeholder="Email"
                value={email}
                onChangeText={validateEmail}
              />

              <TextInput
                style={SignUpStyles.inputs}
                placeholder="Mot de passe "
                value={password}
                onChangeText={validatePassword}
              />
            </>
          )
          || (step === 3 &&
            <>
              <Text style={SignUpStyles.signUpSentence3}>Voici les conditions générales de l’application , veuillez les lires avant de passez a la suite </Text>
              <Text style={SignUpStyles.signUpSentence}
                onPress={ConditionGenerale}>Conditions générales d’utilisations </Text>
            </>
          )
          || (step === 4 &&
            <>
              <Text style={SignUpStyles.signUpTitle}>Félicitations</Text>
              <Text style={SignUpStyles.signUpSentence}>Vous êtes inscrits </Text>
            </>
          )}

        <Button style={SignUpStyles.SignUpButton}
          labelStyle={{ color: "black", fontSize: 17 }}
          onPress={next}>Continuer</Button>

      </View>
    </>
  )
}

export default SignUpScreen