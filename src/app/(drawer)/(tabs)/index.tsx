import {Text} from "react-native";
import {useState} from "react";
import ResourceList from "@/components/ResourceList";
import {Character} from "@/types";
import CharacterCard from "@/components/CharacterCard";
const CharactersScreen = () => {
    const [status, setStatus] = useState('');
    const filters: Record<string, string> = status ? { status } : {};
    return (
        <>
            <ResourceList<Character>
                resource="character"
                placeholder="Buscar un personaje"
                filters={filters}
                renderItem={(character) => <CharacterCard character={character}/>}

            />
        </>
    )
}

export default CharactersScreen;