import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {colors} from "@/constants/colors";

const TabsLayout = () => {
    return(
        <Tabs
            screenOptions={{
                headerShown: false,
                // barra de pestaños color oscuro de la paleta personalizada
                tabBarStyle: {backgroundColor: colors.card},
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Personajes',
                    tabBarIcon: ({color, size}) => <Ionicons name="people"  size={size} color={color as string}/>
                }}
            />
            <Tabs.Screen
                name='episodes'
                options={{
                    title: 'Episodios',
                    tabBarIcon: ({color, size}) => <Ionicons name="tv" size={size} color={color as string}/>
                }}/>
            <Tabs.Screen
                name='locations'
                options={{
                    title: 'Lugares',
                    tabBarIcon: ({color, size}) => <Ionicons  name="planet" size={size} color={color as string}/>
                }}/>
        </Tabs>
    )
}

export default TabsLayout;