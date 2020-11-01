//Importar librerias y modulos necesarios.
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Container,
        Item,
        Input,
        Header,
        Icon,
        Right,
        Button
        } from "native-base";


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
        </Container>
    );
};

//Variable para la hoja de estilos
const styles = StyleSheet.create({
    search:
    {
        backgroundColor:"white",
        borderRadius: 160/2,
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        height: 40,
    },

});

export default HomeScreen;