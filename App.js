import React from 'react';
import {Image, Dimensions, StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/Screens/HomeScreen";
import SearchResults from "./src/Screens/SearchResults";
import ShowImageScreen from "./src/Screens/ShowImageScreen";
import HomeScreenGif from "./src/Screens/HomeScreenGif"
import SearchResultsGif from "./src/Screens/SearchResultsGif"
import { Form } from 'native-base';

const { width, height} = Dimensions.get("window");

//Crear nuestra navegacion.
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      source={require("./assets/Logo1.png")}
      style={styles.LogoImage}  
    />
  );
}


function LogoTitleGif() {
  return (
    <Image
      source={require("./assets/Logo1.png")}
      style={styles.LogoImageGif}  
    />
  );
}

function ImageTitle() {
  return (
    <Image
      source={require("./assets/Logo1.png")}
      style={styles.gifterImage}  
    />
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homeScreen">
        <Stack.Screen name="homeScreen" component={HomeScreen} 
        options={{headerTitle: props=> <LogoTitle {...props}/>, headerStyle: {backgroundColor: "#610B5E",}}} />
         <Stack.Screen name="homeScreenGif" component={HomeScreenGif} 
        options={{headerTitle: props=> <LogoTitleGif {...props}/>, headerStyle: {backgroundColor: "#610B5E",}}} />
        <Stack.Screen name="searchResults" component={SearchResults} 
        options={{headerTitle: props=> <ImageTitle {...props}/>, headerStyle: {backgroundColor: "#610B5E"}, headerTintColor: "#fff"}}/>
        <Stack.Screen name="searchResultsGif" component={SearchResultsGif} 
        options={{headerTitle: props=> <ImageTitle {...props}/>, headerStyle: {backgroundColor: "#610B5E"}, headerTintColor: "#fff"}}/>
        <Stack.Screen name="Image" component={ShowImageScreen} 
        options={{headerTitle: props=> <ImageTitle {...props}/>, headerStyle: {backgroundColor: "#610B5E"}, headerTintColor: "#fff"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  
  LogoImage: 
    {
        width: width,
        height: height * 0.05,
        marginLeft: width*-0.045,
        resizeMode: "contain",
        flex : 1,
        backgroundColor: "#610B5E",
    },
    LogoImageGif: 
    {
        width: width,
        height: height * 0.05,
        marginLeft: width*-0.18,
        resizeMode: "contain",
        flex : 1,
        backgroundColor: "#610B5E",
    },
    gifterImage: 
    {
        width: width*0.68,
        height: height * 0.05,
        
        resizeMode: "contain",
        flex : 1,
        backgroundColor: "#610B5E",
    },
})


