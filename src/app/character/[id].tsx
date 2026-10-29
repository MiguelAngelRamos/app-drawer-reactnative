import {Text, StyleSheet, Pressable, ActivityIndicator, ScrollView, View, Image} from "react-native";
import {colors} from "@/constants/colors";
import {Stack, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {Character} from "@/types";
import { selectIsFavorite} from "@/features/favorites/selectors";
import {getCharacter} from "@/services/api";
import {Ionicons} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector} from "@/store/hooks";
import { toggleFavorites } from "@/features/favorites/favoritesSlice";
// favorites/toggleFavorites

const CharacterDetailScreen = () => {
    const { id } = useLocalSearchParams<{id: string}>()
    const [character, setCharacter] = useState<Character | null>(null);
    const [error, setError] = useState<string | null>(null);
    // dispatch es la unica forma de pedir un cambio de estado
    const dispatch = useAppDispatch();
    // Si se aplica un cambio con dispatch lo que viene a continuación que es selector se vuelve a ejecutar con la misión de obtener el estado nuevo
    const isFavorite = useAppSelector((state) => selectIsFavorite(state, Number(id)) );
    // al abrir la pantalla del detalle del personaje se ejecuta el useEffect
    useEffect(() => {
        getCharacter(id)
            .then(characterDetail => setCharacter(characterDetail))
            .catch(error => setError(error));
    }, [id])

    if(!character) return <ActivityIndicator />;
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: character ? character.name : "",
                    headerRight: () => (
                        <Pressable onPress={() => dispatch(toggleFavorites(character))}>
                            <Ionicons name='heart' size={26} color={isFavorite ? colors.danger: colors.text}/>
                        </Pressable>
                    )
                }}
            />
            <Image
                //* Foto grande que ocupa todo el ancho de la pantalla, justo debajo del header
                source={{ uri: character.image }}
                style={styles.image}
            />
            <View style={styles.body}>
                <Text style={styles.name}>{character.name}</Text>
                {/* Cada Row es una fila "Etiqueta ...... valor" debajo del nombre */}
                <Row label="Estado" value={character.status} />
                <Row label="Especie" value={character.species} />
                <Row label="Género" value={character.gender} />
                <Row label="Origen" value={character.origin.name} />
                <Row label="Ubicación" value={character.location.name} />
                <Row label="Episodios" value={String(character.episode.length)} />
            </View>
        </ScrollView>
    )
}

export default CharacterDetailScreen;

// Componente pequeño para mostrar "Etiqueta: valor"
//* Se ve como "Estado ............ Alive": etiqueta gris a la izquierda y valor blanco a la derecha
const Row = ({ label, value }: { label: string; value: string }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    //* width '100%' estira la foto al ancho del móvil; height fija la altura en 320
    image: { width: '100%', height: 320 },
    //* padding separa el texto de los bordes; gap deja 12 de espacio entre cada fila
    body: { padding: 20, gap: 12 },
    name: { color: colors.text, fontSize: 28, fontWeight: 'bold' },
    //* space-between empuja la etiqueta al borde izquierdo y el valor al borde derecho
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    label: { color: colors.textMuted, fontSize: 16 },
    //* flexShrink: si el valor es muy largo (ej. un origen largo) baja de línea en vez de salirse de la pantalla
    value: { color: colors.text, fontSize: 16, flexShrink: 1, textAlign: 'right' },
    error: { color: colors.danger, textAlign: 'center', marginTop: 40 },
});
