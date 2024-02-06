import { configureStore } from '@reduxjs/toolkit'
import animals from './animals'
import category from './categorie'
import subCategorie from './subCategorie'
import user from './user'

export const store = configureStore ({
    reducer : {
        user: user, 
        categorie: category,
        subCategorie: subCategorie,
        animals: animals,
    },
})