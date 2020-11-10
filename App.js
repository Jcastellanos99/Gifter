import React from 'react';
import {Image, Dimensions} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/Screens/HomeScreen";
import SearchResults from "./src/Screens/SearchResults";
import ShowImageScreen from "./src/Screens/ShowImageScreen";
import { Form } from 'native-base';

const { width, height} = Dimensions.get("window");

//Crear nuestra navegacion.
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("./assets/Logo.png")}
    />
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homeScreen">
        <Stack.Screen name="homeScreen" component={HomeScreen} options={{headerStyle: {backgroundColor: "#EDE9E6"}, 
      headerTitle: props => <LogoTitle {...props} />}} />
        <Stack.Screen name="searchResults" component={SearchResults} options={{headerStyle: {backgroundColor: "#EDE9E6"}}}/>
        <Stack.Screen name="Image" component={ShowImageScreen} options={{headerStyle: {backgroundColor: "#EDE9E6"}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



