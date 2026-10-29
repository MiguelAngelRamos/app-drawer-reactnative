
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppSelector} from "@/store/hooks";
import CharacterCard from "@/components/CharacterCard";
import {colors} from "@/constants/colors";
import {selectFavorites} from "@/features/favorites/selectors";
const FavoritesScreen = () => {

const favorites = useAppSelector(selectFavorites);
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