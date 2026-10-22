import { Drawer } from 'expo-router/drawer';
// vector-icons
import { Ionicons } from '@expo/vector-icons';
// colors
import { colors } from '@/constants/colors';
const DrawerLayout = () => {
  return (
    <Drawer
     screenOptions={{
      headerStyle: {backgroundColor: colors.card},
     }}
    >
      <Drawer.Screen 
        name="favorites" 
        options={{
          title: 'Favoritos',
          drawerIcon: ({color, size}) => (
            <Ionicons name="heart" size={size} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="about" 
        options={{
          title: 'Acerca de',
          drawerIcon: ({color, size}) => (
            <Ionicons name="information-circle" size={size} />
          ),
        }} 
      />

    </Drawer>
  )
}

export default DrawerLayout;