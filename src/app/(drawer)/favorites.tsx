import { useFavorites } from '@/context/FavoritesContext';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CharacterCard from "@/components/CharacterCard";
import {colors} from "@/constants/colors";
const FavoritesScreen = () => {

  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  return (
    <View style={styles.container}>
     <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <CharacterCard character={item}/>
      )}
      // la primera tarjeta de la barra de titulo
      contentContainerStyle={styles.content}
      ListEmptyComponent={<Text>No hay favoritos</Text>}
     />
    </View>
  )
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: colors.background,
  },
    content: {
      paddingTop: 12,
    }
});