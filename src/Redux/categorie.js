import { createSlice } from "@reduxjs/toolkit"

export const categorie = createSlice({

    name: "categorie",
    initialState: [],
    reducers:{
        setCategories : (state, action) => {
            console.log("redux state" ,state,"redux categorie" , action.payload)
            return action.payload.flat(); // Aplatir le tableau
        },

        resetCategories : (state, action) => {
            return null;
        },
    }

    

})

    //exporter le setCategories d'actions
    export const {setCategories , resetCategories} = categorie.actions

    //rend disponible par default sans le store 
    export default categorie.reducer ;

