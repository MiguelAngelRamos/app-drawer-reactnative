import {Text} from "react-native";
import {Character} from "@/types";

const CharacterCard = ({character}: {character: Character}) => {
    return(
        <Text>{character.name}</Text>
    )
}

export default CharacterCard;