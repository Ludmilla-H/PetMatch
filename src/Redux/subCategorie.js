import { createSlice } from "@reduxjs/toolkit"

export const subCategorie = createSlice({

    name: "subCategoryKey",
    initialState: "lll",
    reducers : {

        setSubCategoryKey : ( state, action ) => {
            console.log("action " , action)
            return action.payload
        },
    }


})

    //exporter le setCategories d'actions
    export const {setSubCategoryKey} = subCategorie.actions

    //rend disponible par default sans le store 
    export default subCategorie.reducer ;

