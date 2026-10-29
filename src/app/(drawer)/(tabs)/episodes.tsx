import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { colors } from '@/constants/colors';
import { getEpisodes } from '@/services/api';
import { Episode } from '@/types';

// Pantalla de Episodios.
// Es la MISMA receta que la pantalla de Personajes (index.tsx).
// Compárenlas: solo cambian la función de la API, el tipo y cómo se dibuja cada fila.
const EpisodesScreen = () => {
    // ---------- 1. ESTADO ----------
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState('');     // lo que se escribe
    const [search, setSearch] = useState(''); // lo que se busca al pulsar "Buscar"

    // ---------- 2. EFECTO ----------
    useEffect(() => {
        setLoading(true);
        setError(null);

        getEpisodes(search)
            .then((data) => setEpisodes(data))
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
                data={episodes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    //* Cada fila se ve como: "S01E01" en verde, debajo el nombre y la fecha en gris
                    <View style={styles.row}>
                        <Text style={styles.code}>{item.episode}</Text>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.muted}>{item.air_date}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.message}>No se encontraron episodios</Text>}
            />
        );
    };

    return (
        <View style={styles.container}>
            <SearchBar
                value={text}
                onChangeText={setText}
                onSubmit={() => setSearch(text)}
                placeholder="Buscar un episodio"
            />
            {renderContent()}
        </View>
    );
};

export default EpisodesScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    loader: { marginTop: 40 },
    message: { color: colors.textMuted, textAlign: 'center', marginTop: 40 },
    //* Tarjeta oscura con esquinas redondeadas, separada de los bordes y de la siguiente
    row: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 12,
        marginBottom: 12,
        gap: 4,
    },
    code: { color: colors.primary, fontWeight: 'bold' },
    name: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
    muted: { color: colors.textMuted },
});
