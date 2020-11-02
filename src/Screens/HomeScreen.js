//Importar librerias y modulos necesarios.
import React, { useState } from "react";
import {StyleSheet, Text, View} from "react-native";
import {Container,
        Item,
        Input,
        Header,
        Icon,
        Right,
        Button,
        Segment
        } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";


const {apiKey} = getEnvVars();



//Variable que contiene la pantalla
const HomeScreen = () => {
    //Maneja el estado de los stickers.
    const [stickers, setStickers] = useState(null);

    const getStickers = async () => {
        //Se consulta la api
        const response = await backend.get(`stickers/trending?api_key=${apiKey}&limit=25&rating=g`);

        console.log(response.data);
    }

    getStickers();


    return (
        <Container>
            <Header searchBar noShadow style={styles.search}>
                <Item rounded>
                    <Input placeholder="Buscar"/>
                    <Right>
                        <Button transparent>
                            <Icon name="search"/>
                        </Button>
                    </Right>
                </Item>
            </Header>  
            <Segment style={styles.segment}>
                <Button rounded style={styles.button}>
                    <Text>Stickers</Text>
                </Button>
                <Button rounded style={styles.button}>
                    <Text>
                        Gifs
                    </Text>
                </Button>
            </Segment>          
        </Container>
    );
};

//Variable para la hoja de estilos
const styles = StyleSheet.create({
    search:
    {
        backgroundColor:"white",
        marginTop:5,
        
    },
    segment:
    {
        backgroundColor: "white",
    },
    button:
    {
        borderBottomColor: "gray",
        marginLeft: 55,
        marginRight: 55,
    },

});

export default HomeScreen;