import {Pressable, Text, Image, View, StyleSheet} from "react-native";
import {Character} from "@/types";
import {colors} from "@/constants/colors";
import { router } from 'expo-router';
const statusColor = (status: Character['status']) => {
    return status === 'Alive' ? colors.alive: status === 'Dead' ? colors.dead: colors.unknown;
}
const CharacterCard = ({character}: {character: Character}) => {
    return(
        <Pressable
            style={styles.card}
            onPress={() => router.push({pathname: '/character/[id]', params: {id: character.id}})}
        >
            <Image
                source={{ uri: character.image }}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{character.name}</Text>

                <View style={styles.row}>
                    <View style={[styles.dot, {backgroundColor: statusColor(character.status)}]}/>
                    <Text style={styles.muted}>{character.status} - {character.species}</Text>
                </View>
                <Text style={styles.muted}>
                    {character.location.name}
                </Text>

            </View>
        </Pressable>
    )
}

export default CharacterCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: colors.card,
        borderRadius: 12, // esquinas redondeadas para la tarjeta
        marginHorizontal: 12, // para que la tarjeta no toque los bordes laterales del pantalla
        marginBottom: 12,// espacio entre tarjetas
        overflow: "hidden", // recorta la imagen con las equinas redondeadas
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: "center",
        gap: 4
    },
    name: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    muted: {
        color: colors.textMuted,
        fontSize: 14,
    }

});