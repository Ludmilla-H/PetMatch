import { createSlice } from "@reduxjs/toolkit"

export const categorie = createSlice({

    name: "categorie",
    initialState: null,
    reducers:{
        setCategories : (state, action) => {
            // console.log(action.payload)
            return action.payload ;
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

