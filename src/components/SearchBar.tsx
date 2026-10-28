import {StyleSheet, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {colors} from "@/constants/colors";


interface Props {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void; // se llama al pulsar "Buscar/Enter" en el teclado
    placeholder: string;
}
const SearchBar = ({value, onChangeText, onSubmit, placeholder}:Props) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                // onSubmitEditing se dispara al pulsar la tecla enter
                onSubmitEditing={onSubmit}
                // returnKeyType cambia la tecla enter del teclado por una que dice "Buscar"
                returnKeyType="search"
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                autoCorrect={false}
            />
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingHorizontal: 12,
        margin: 12,
    },
    input: {
        flex: 1,
        color: colors.text,
        paddingVertical: 12,
        paddingLeft: 8
    }
})