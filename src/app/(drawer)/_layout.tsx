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
         headerTintColor: colors.text,
         // Fondo oscuro del panel lateral (que se desliza desde la izquierda)
         drawerStyle: {backgroundColor: colors.background},
         // Opción en la que estas se marcara de color verde
         drawerActiveTintColor: colors.primary,
         drawerInactiveTintColor: colors.textMuted
     }}
    >
        <Drawer.Screen
            name="(tabs)"
            options={{
                title: 'Rick and Morty',
                drawerLabel: 'Inicio',
                drawerIcon: ({color, size}) => (
                    <Ionicons name="home" size={size} color={color as string} />
                ),
            }}
        />
      <Drawer.Screen 
        name="favorites" 
        options={{
          title: 'Favoritos',
          drawerIcon: ({color, size}) => (
            <Ionicons name="heart" size={size} color={color as string} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="about" 
        options={{
          title: 'Acerca de',
          drawerIcon: ({color, size}) => (
            <Ionicons name="information-circle" size={size} color={color as string} />
          ),
        }} 
      />

    </Drawer>
  )
}

export default DrawerLayout;