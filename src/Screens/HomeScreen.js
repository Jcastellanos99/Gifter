//Importar librerias y modulos necesarios.
import React, { Component } from "react";
import {requireNativeComponent, StyleSheet, Text, Image, Dimensions} from "react-native";
import {Input,Container, Item} from "native-base";

const { width, height} = Dimensions.get("window");

//Variable que contiene la pantalla
const HomeScreen = () => {
    return (
        <Container>
            <Image source={require("../../assets/Letras.png")} styles={styles.gifterImage}/>
            <Text>Pantalla Principal</Text>
        </Container>
        
    );
};

//Variable para la hoja de estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gifterImage: {
    width: width,
    height: height * 0.30,
    resizeMode: "contain",
    }  

});

export default HomeScreen;