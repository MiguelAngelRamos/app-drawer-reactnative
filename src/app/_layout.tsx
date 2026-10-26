import { FavoritesProvider } from '@/context/FavoritesContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {colors} from "@/constants/colors";
//* Este es el contenedor de toda la app
//* Quienes viven aqui?
//* Resp: 
//*.     - (drawer)
//*.      - character/[id]
//*.     - modal: pantalla sube desde abajo
const RootLayout = () => {

  // El Drawer necesito un componente para detectar gestos al deslizar
  return(
  <GestureHandlerRootView
  style={{flex: 1}}
  >
    <FavoritesProvider>
      <StatusBar style="light" />
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            // barra de titulos se pintar oscuro en todas las pantallas del stack
            headerStyle: { backgroundColor: colors.card},
            headerTintColor: colors.text,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(drawer)" options={{headerShown: false}} />
        </Stack>
      </BottomSheetModalProvider>
    </FavoritesProvider>
    
  </GestureHandlerRootView>
  )

}


export default RootLayout;