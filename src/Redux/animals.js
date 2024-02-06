import { createSlice } from "@reduxjs/toolkit"

export const animals = createSlice({

    name: "animals",
    initialState: [],
    reducers : {
        setAnimals : ( state , action ) => {
            console.log("action " , action)
            return action.payload
        },
    }
})
    //exporter le setCategories d'actions
    export const {setAnimals} = animals.actions

    //rend disponible par default sans le store 
    export default animals.reducer ;

