import {Tabs} from "expo-router";

const TabsLayout = () => {
    return(
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Personajes'
                }}
            />
            <Tabs.Screen
                name='episodes'
                options={{
                    title: 'Episodios',
                }}/>
            <Tabs.Screen
                name='locations'
                options={{
                    title: 'Lugares',
                }}/>
        </Tabs>
    )
}

export default TabsLayout;