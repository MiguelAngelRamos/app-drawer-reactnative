import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    
  </GestureHandlerRootView>
  )

}


export default RootLayout;