import { configureStore } from '@reduxjs/toolkit'
import categorie from './categorie'
import user from './user'

export const store = configureStore ({
    reducer : {
        user: user, 
        categorie: categorie,
    },
})