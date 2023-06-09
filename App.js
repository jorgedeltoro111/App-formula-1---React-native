import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FORMULARIO from './Formulario';
import INGRESAR from './Ingresar';
import USUARIO from './Usuario';
const Stack = createStackNavigator();

export default function App() {
  return(
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ingresar" component={INGRESAR} options={{ headerShown: false }}/>
        <Stack.Screen name="Registro" component={FORMULARIO} options={{ headerShown: false }}/>
        <Stack.Screen name="Bienvenido" component={USUARIO} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );  
}

