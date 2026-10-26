import { ApiResponse } from '@/types';

// URL base de la API pública de Rick and Morty (no necesita API key)
const BASE_URL = 'https://rickandmortyapi.com/api';

// Pide una página de un recurso: 'character', 'episode' o 'location'.
// <T> es un tipo genérico: cambia según el recurso que pidamos.
export const fetchPage = async <T>(
    resource: string,
    page: number,
    search = '',
    filters: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
    // URLSearchParams arma y codifica los parámetros por nosotros.
    // "filters" trae filtros opcionales, por ejemplo { status: 'Alive' }.
    const params = new URLSearchParams({ page: String(page), name: search, ...filters });
    const url = `${BASE_URL}/${resource}?${params.toString()}`;
    const response = await fetch(url);

    // La API responde 404 cuando la búsqueda no encuentra nada.
    // Lo tratamos como una lista vacía, no como un error.
    if (response.status === 404) {
        return { info: { pages: 0, next: null }, results: [] };
    }
    if (!response.ok) {
        throw new Error(`Error del servidor (${response.status})`);
    }
    return response.json();
};

// Pide un solo elemento por su id (por ejemplo, un personaje)
export const fetchById = async <T>(resource: string, id: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}/${resource}/${id}`);
    if (!response.ok) {
        throw new Error(`No se pudo cargar (${response.status})`);
    }
    return response.json();
};
