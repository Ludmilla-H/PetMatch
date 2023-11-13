import { configureStore } from '@reduxjs/toolkit'
import category from './categorie'
import user from './user'

export const store = configureStore ({
    reducer : {
        user: user, 
        categorie: category,
    },
})