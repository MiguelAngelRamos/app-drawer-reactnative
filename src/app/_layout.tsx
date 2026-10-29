
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {colors} from "@/constants/colors";
import {Provider} from "react-redux";
import {store, persistor} from '@/store/store'
import {PersistGate} from "redux-persist/integration/react";
import {ActivityIndicator} from "react-native";
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
    <Provider store={store}>
      <PersistGate
          loading={<ActivityIndicator size="large" color={colors.primary}  style={{flex: 1, backgroundColor:colors.background}}/>}
          persistor={persistor}/>

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
          <Stack.Screen
              //* 'Personaje' es el título que se ve arriba mientras cargan los datos;
              //* después [id].tsx lo cambia por el nombre real. A la izquierda aparece
              //* la flecha para volver atrás (en iOS también se vuelve deslizando desde el borde)
              name="character/[id]"
              options={{ title: 'Personaje' }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </Provider>
    
  </GestureHandlerRootView>
  )

}


export default RootLayout;