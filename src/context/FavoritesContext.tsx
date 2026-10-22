import { Character } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// clave con la que vamos a guardar los favoritos en el almacenamiento del movil

const STORAGE_KEY = 'favorites';
// Los datos son los mismos que devuelve la API en /character/1


interface IFavoritesContextType {
  favorites: Character[]; 
  isFavorite: (id: number) => boolean,
  toggleFavorite: (character: Character) => void;
}

//* Creamos el contexto ( esto no es mas que una "caja" global de datos)
const FavoritesContext = createContext<IFavoritesContextType | null>(null);

//* El provider envuelve la app y le da acceso al contexto de favoritos

export const FavoritesProvider = ({children}: {children: ReactNode}) => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  // Necesitamos evitar guardar una lista vacia inicial antes de haber leido lo guardado
  const [loaded, setLoaded] = useState(false);
  // Al abrir la app, leemos los favoritos guardados (AsyncStorage es asincrono)
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if(saved) setFavorites(JSON.parse(saved));
    }).catch((err) => console.error('Error loading favorites:', err))
    .finally(() => setLoaded(true)); // Indicamos que la carga ha finalizado (marcamos que ya termino la lectura del AsyncStorage)
  }, [])

  // Cada vez que cambian los favoritos, los guardamos en el movil (AsyncStorage es asincrono)
  useEffect(() => {
    if(loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch((err) => console.error('Error saving favorites:', err));
    }
  }, [favorites, loaded]);

  // Este personaje esta favoritos?
  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  // Corazon del detalle toogle favorito
  // Esta funcion añade al personaje a favoritos sino estaba y lo quita si ya estaba (como un interruptor)
  const toggleFavorite = (character: Character) => {
    setFavorites((prev) => prev.some((fav) => fav.id === character.id) ? prev.filter((fav) => fav.id !== character.id) : [...prev, character]);
  }

  return (
    <FavoritesContext.Provider value ={{favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
};

// Hook para usar los favoritos en cualquier panalla
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if(!context) {
    throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>');
  }
  return context;
}