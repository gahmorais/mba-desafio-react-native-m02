import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import MovieDetails from "./src/pages/MovieDetails";
import { useState } from "react";
import Favorites from "./src/pages/Favorites";
export default function App() {
  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Filmes" }}
        />
        <Stack.Screen
          name="Details"
          component={MovieDetails}
          options={{ title: "Detalhes" }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ title: "Favoritos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
