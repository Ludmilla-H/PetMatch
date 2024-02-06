import firestore from '@react-native-firebase/firestore';

//chargement des données d'une collection a partie de son name
export const loadData = async collectionName => {
  const snapShot = await firestore().collection(collectionName).get();

  // Vérification des données
  if (!snapShot.empty) {
    const data = snapShot.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    });
    return data;
  } else {
    return [];
  }
}; //end loadData

//chargement des données d'une collection a partie de son name
export const insertData = async (collectionName, data) => {
  // Vérification des données
  try {
    const snapShot = await firestore().collection(collectionName).add(data);
    return snapShot;
  } catch (error) {
    return error;
  }
}; //end loadData

//fonction pour recupérer l'id par rapport a la catégorie de l'animal
export const loadDataPets = async categorieId => {
  const snapShot = await firestore()
    .collection('animal')
    .where('categorie', '==', categorieId)
    .get();

  // Vérification des données
  if (!snapShot.empty) {
    const data = snapShot.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    });
    return data;
  } else {
    return [];
  }
}; //end loadData

export const animalsBySubCat = async id => {
  //console.log("animals", id )
  const snapShot = await firestore()
    .collection('animal')
    .where('race', '==', id)
    .get();
  //console.log("snapShot" , snapShot)

  // Vérification des données
  if (!snapShot.empty) {
    const data = snapShot.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    });
    return data;
  } else {
    return [];
  }
};

// Fonction pour obtenir le nom de la race à partir de l'ID
// function obtenirNomRaceParId(id) {
//   // Base de données fictive des races avec des ID correspondants aux noms de race
//   const racesDB = {
//     t99djJjFVBcO0fhBeelo: 'Bengal',
//     ABC123XYZ456: 'Maine Coon',
//     1234567890: 'Persan',
//     // Ajoutez d'autres correspondances ici...
//   };

//   // Recherche de l'ID dans la base de données des races
//   const nomRace = racesDB[id];

//   // Vérification si l'ID correspond à une race existante
//   if (nomRace) {
//     return nomRace; // Retourne le nom de la race correspondante
//   } else {
//     return 'Race inconnue'; // Si l'ID ne correspond à aucune race répertoriée
//   }
// }

// // Utilisation de la fonction pour obtenir le nom de la race à partir de l'ID
// const idRace = 't99djJjFVBcO0fhBeelo';
// const nomRace = obtenirNomRaceParId(idRace);
// console.log('Nom de la race :', nomRace); // Affichera "Bengal"
