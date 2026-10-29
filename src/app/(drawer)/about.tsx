
import { FlatList, StyleSheet, Text, View } from 'react-native';
const AboutScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Acerca de</Text>
     <FlatList
      data={[]}
      renderItem={({item}) => (
        <Text>{item.name}</Text>
      )}
      ListEmptyComponent={<Text>No hay favoritos</Text>}
     />
    </View>
  )
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});