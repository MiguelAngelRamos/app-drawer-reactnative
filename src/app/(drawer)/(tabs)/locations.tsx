import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { colors } from '@/constants/colors';
import { getLocations } from '@/services/api';
import { Location } from '@/types';

// Pantalla de Lugares.
// Otra vez la MISMA receta que Personajes y Episodios.
// ¿Notan cuánto código se repite? Eso lo resolveremos creando un custom hook.
const LocationsScreen = () => {
    // ---------- 1. ESTADO ----------
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState('');     // lo que se escribe
    const [search, setSearch] = useState(''); // lo que se busca al pulsar "Buscar"

    // ---------- 2. EFECTO ----------
    useEffect(() => {
        setLoading(true);
        setError(null);

        getLocations(search)
            .then((data) => setLocations(data))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [search]);

    // ---------- 3. PANTALLA ----------
    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />;
        }
        if (error) {
            return <Text style={styles.message}>{error}</Text>;
        }
        return (
            <FlatList
                data={locations}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    //* Cada fila se ve como: nombre en grande, "Planet · Dimension C-137" y cuántos viven ahí
                    <View style={styles.row}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.muted}>{item.type} · {item.dimension}</Text>
                        {/* residents es una lista de URLs; con .length sabemos cuántos son */}
                        <Text style={styles.muted}>{item.residents.length} residentes</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.message}>No se encontraron lugares</Text>}
            />
        );
    };

    return (
        <View style={styles.container}>
            <SearchBar
                value={text}
                onChangeText={setText}
                onSubmit={() => setSearch(text)}
                placeholder="Buscar un lugar"
            />
            {renderContent()}
        </View>
    );
};

export default LocationsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    loader: { marginTop: 40 },
    message: { color: colors.textMuted, textAlign: 'center', marginTop: 40 },
    row: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 12,
        marginBottom: 12,
        gap: 4,
    },
    name: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
    muted: { color: colors.textMuted },
});
