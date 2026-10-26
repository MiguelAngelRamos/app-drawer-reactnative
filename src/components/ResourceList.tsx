import {ReactElement, useState} from "react";
import {View} from "react-native";
import SearchBar from "@/components/SearchBar";

// Restricción del Genérico
// T puede ser cualquier tipo, SIEMPRE QUE tenga al menos una propiedad id de tipo number
interface Props<T extends {id: number}> {
    resource : string;
    placeholder: string;
    renderItem: (item: T) => ReactElement;
    filters?: Record<string, string>;
    headerRight?: ReactElement
}

const ResourceList = <T extends {id: number}>({
    resource,
    placeholder,
    renderItem,
    filters,
    headerRight,}:Props<T>) => {
    const [search, setSearch] = useState('')
    return (
        <View>
            <View>
                <SearchBar value={search} onChangeText={setSearch} placeholder={placeholder} />
            </View>
        </View>
    )
}

export default ResourceList;