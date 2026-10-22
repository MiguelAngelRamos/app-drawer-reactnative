// Tipos de TypeScript que describen los datos que devuelve la API.
// Así el editor nos avisa si escribimos mal el nombre de una propiedad.

// Un personaje de la serie
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  image: string; // URL de la foto
  origin: { name: string };
  location: { name: string };
  episode: string[]; // lista de URLs de los episodios donde sale
}

// Un episodio de la serie
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // código, por ejemplo "S01E01"
}

// Una ubicación (planeta, dimensión, etc.)
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // URLs de los personajes que viven ahí
}

// Forma de la respuesta paginada de la API
export interface ApiResponse<T> {
  info: { pages: number; next: string | null };
  results: T[];
}
