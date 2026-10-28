import {Text, StyleSheet, Pressable} from "react-native";
import {colors} from "@/constants/colors";
import {Stack, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {Character} from "@/types";
import {getCharacter} from "@/services/api";
import {ScrollView} from "@expo/ui";
import {Ionicons} from "@expo/vector-icons";

const CharacterDetailScreen = () => {
    const { id } = useLocalSearchParams<{id: string}>()
    const [character, setCharacter] = useState<Character | null>(null);
    const [error, setError] = useState<string | null>(null);

    // al abrir la pantalla del detalle del personaje se ejecuta el useEffect
    useEffect(() => {
        getCharacter(id)
            .then(characterDetail => setCharacter(characterDetail))
            .catch(error => setError(error));
    }, [id])
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: character ? character.name : "",
                    headerRight: () => (
                        <Pressable onPress={() => console.log('Es mi personaje favorito')}>
                            <Ionicons name='heart'  size={26} color={colors.text}/>
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