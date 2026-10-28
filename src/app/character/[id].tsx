import {Text, StyleSheet} from "react-native";
import {colors} from "@/constants/colors";
import {useLocalSearchParams} from "expo-router";

const CharacterDetailScreen = () => {
    const { id } = useLocalSearchParams<{id: string}>()
    return (
        <Text style={styles.name}>Detalle del Personaje : {id} </Text>
    )
}

export default CharacterDetailScreen;

const styles = StyleSheet.create({
    name: { color: colors.text}
})