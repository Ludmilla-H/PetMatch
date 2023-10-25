import { createSlice } from '@reduxjs/toolkit'

// création d'un reducer avec setUser comme action créator afin d'éditer user (maj)
export const user = createSlice({
    name: "user",
    initialState: null,
    reducers:{
        setUser: (state, action) => {
            return action.payload ;
        },
        resetUser : (state, action) => {
            return null;
        }
    }
    
})

//exporter le setUser d'actions
export const {setUser , resetUser} = user.actions ;

//rend disponible par default sans le store 
export default user.reducer ;