import {Text, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import {colors} from "@/constants/colors";
import {Stack, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {Character} from "@/types";
import {getCharacter} from "@/services/api";
import {ScrollView} from "@expo/ui";
import {Ionicons} from "@expo/vector-icons";
import {useFavorites} from "@/context/FavoritesContext";

const CharacterDetailScreen = () => {
    const { id } = useLocalSearchParams<{id: string}>()
    const [character, setCharacter] = useState<Character | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {isFavorite, toggleFavorite} = useFavorites();

    // al abrir la pantalla del detalle del personaje se ejecuta el useEffect
    useEffect(() => {
        getCharacter(id)
            .then(characterDetail => setCharacter(characterDetail))
            .catch(error => setError(error));
    }, [id])

    if(!character) return <ActivityIndicator />;
    const favorite = isFavorite(character.id)
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: character ? character.name : "",
                    headerRight: () => (
                        <Pressable onPress={() => toggleFavorite(character)}>
                            <Ionicons name='heart' size={26} color={favorite ? colors.danger: colors.text}/>
                        </Pressable>
                    )
                }}
            />
        </ScrollView>
    )
}

export default CharacterDetailScreen;

const styles = StyleSheet.create({
    container: {},
    name: { color: colors.text}
})