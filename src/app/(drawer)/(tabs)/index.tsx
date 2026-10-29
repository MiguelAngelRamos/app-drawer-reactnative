import {useEffect, useState} from "react";
import { ActivityIndicator, Text, FlatList, View, StyleSheet} from "react-native";
import ResourceList from "@/components/ResourceList";
import {Character} from "@/types";
import CharacterCard from "@/components/CharacterCard";
import {getCharacters} from "@/services/api";
import {colors} from "@/constants/colors";
import SearchBar from "@/components/SearchBar";

const CharactersScreen = () => {
    const [character, setCharacter] = useState<Character[]>([]); // los datos que vamos a recibir del api
    const [loading, setLoading] = useState(true); // Estamos esperando una respuesta?
    const [error, setError] = useState<string | null> (null);

    // Estado para la busqueda
    const [text, setText] = useState(''); // Lo que el usuario escribe letra a letra
    const [search, setSearch] = useState(''); // lo que realmente buscamos

    // Efecto (useEffect) se ejecuta al abrir la pantalla
    useEffect(() => {
     setLoading(true);
     setError(null);
     getCharacters(search)
         .then((data) => setCharacter(data)) // todo bien: guardamos los personajes
         .catch((err) => setError(err)) // algo fallo: guardamos el mensaje de error
         .finally(() => setLoading(false)); // pase lo que pase, ya no mostramos el loading
    }, [search]);

    const renderContent = () => {
        if(loading) {
            return <ActivityIndicator size={30} color={colors.primary}/>;
        }
        if(error){
            return <Text>{error}</Text>
        }
        return(
            <FlatList
                data={character}
                // le da un identificador unico a cada elemento
                keyExtractor={(item) => String(item.id)}
                renderItem = {({item}) => <CharacterCard character={item}/>}
                ListEmptyComponent={<Text>No se encontraron personajes </Text>}
            />
        )
    }
    return (
        <View style = {styles.container}>
            <SearchBar
                value={text}
                onChangeText={setText}
                onSubmit={() => setSearch(text)}
                placeholder="Buscar Personaje"
            />
            {renderContent()}
        </View>
    )
}

export default CharactersScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background}
})