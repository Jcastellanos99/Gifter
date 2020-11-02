//Importar librerias y modulos necesarios.
import {StyleSheet, Text, Image, Dimensions,View} from "react-native";
import React from "react";
import {Container,
    Item,
    Input,
    Header,
    Icon,
    Right,
    Button
} from "native-base";

const { width, height} = Dimensions.get("window");

//Variable que contiene la pantalla
const HomeScreen = () => {
    return (
        <Container>
            <Header searchBar style={styles.search}>
                <Item>
                    <Input placeholder="Buscar"/>
                    <Right>
                        <Button transparent><Icon name="search"/></Button>
                    </Right>
                </Item>
            </Header>        
            <Image source={require("../../assets/Letras_gifter.png")} styles={styles.gifterImage}/>
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
    height: height * 0.100,
    resizeMode: "contain",
    },
    search: {
        backgroundColor:"white",
        borderRadius: 160/2,
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        height: 40,
    },
});

export default HomeScreen;