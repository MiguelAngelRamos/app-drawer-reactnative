import { Character, Episode, Location } from '@/types';

// URL base de la API pública de Rick and Morty (no necesita API key)
const BASE_URL = 'https://rickandmortyapi.com/api';

// Función de ayuda: solo se usa dentro de este archivo (no tiene "export").
// Pide una lista a la API y devuelve únicamente el arreglo "results".
// La API responde así: { info: {...}, results: [ ...los datos... ] }
const getList = async (url: string) => {
    // fetch hace la petición HTTP. "await" espera a que llegue la respuesta.
    const response = await fetch(url);

    // La API responde 404 cuando la búsqueda no encuentra nada.
    // Lo tratamos como una lista vacía, no como un error.
    if (response.status === 404) {
        return [];
    }
    // Cualquier otro problema (500, sin permisos, etc.) sí es un error.
    // "throw" hace que en la pantalla se ejecute el .catch()
    if (!response.ok) {
        throw new Error(`Error del servidor (${response.status})`);
    }

    // Convertimos el texto de la respuesta en un objeto de JavaScript
    const data = await response.json();
    return data.results;
};

// encodeURIComponent convierte espacios y tildes a un formato válido para una URL.
// Ejemplo: "rick sanchez" -> "rick%20sanchez"

// Lista de personajes filtrada por nombre. Si name es '' trae todos.
export const getCharacters = (name: string): Promise<Character[]> => {
    return getList(`${BASE_URL}/character?name=${encodeURIComponent(name)}`);
};

// Lista de episodios filtrada por nombre
export const getEpisodes = (name: string): Promise<Episode[]> => {
    return getList(`${BASE_URL}/episode?name=${encodeURIComponent(name)}`);
};

// Lista de lugares filtrada por nombre
export const getLocations = (name: string): Promise<Location[]> => {
    return getList(`${BASE_URL}/location?name=${encodeURIComponent(name)}`);
};

// Un solo personaje por su id (se usa en la pantalla de detalle)
export const getCharacter = async (id: string): Promise<Character> => {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) {
        throw new Error(`No se pudo cargar (${response.status})`);
    }
    return response.json();
};
