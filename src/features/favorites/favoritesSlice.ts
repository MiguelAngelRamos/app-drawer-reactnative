import {Character} from "@/types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface FavoritesState {
    items: Character[];
}

const initialState: FavoritesState = {
    items: [],
}

const favoritesSlice = createSlice({
    // 'favorites' este sera el prefijo de las actiones y nuestra acción tendra por nombre "favorites/toggleFavorite'
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorites: (state, action: PayloadAction<Character>) => {
            const index = state.items.findIndex((favorito) => favorito.id === action.payload.id);
            if (index >= 0) {
                state.items.splice(index,1);
            } else {
                state.items.push(action.payload);
            }
        }
    }
})
// QUE ACTION SE DISPARA
export const {toggleFavorites} = favoritesSlice.actions;

// el reducer que registra en el store
export default favoritesSlice.reducer;