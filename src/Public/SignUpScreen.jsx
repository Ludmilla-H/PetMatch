import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const SignUpScreen = () => {

  //initialisation de mes states
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);


  //fonction pour incrementer les étapes de l'inscription
  const next = () => {

    // si step est egal à la quatrieme étape appele la fonction (done) 
    if (step == 3) {
      done();
      //sinon aller à létape suivante
    } else {
      setStep(step + 1)

    }
  }

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

      {/* switch case pour incrémenter mes étapes d'inscription */}
      {(step === 1 &&
        <>
          <TextInput
            placeholder="Nom d'utilisateur"
            value={userName}
            onChangeText={setUserName}
          />
          <TextInput
            placeholder="Prénom"
            value={name}
            onChangeText={setName}
          />
        </>

      )

        || (step === 2 &&
          <>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Mot de passe "
              value={password}
              onChangeText={setPassword}
            />
            </> 
            )
          || (step === 3 &&
            <Text>Vous êtes incrit</Text>
          ) }

      <Button onPress={next}>Commencez</Button>


    </>
  )
}

export default SignUpScreen