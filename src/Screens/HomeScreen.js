//Importar librerias y modulos necesarios.
import React, { useState } from "react";
import {StyleSheet, 
        Text, 
        Dimensions, 
        Image
        } from "react-native";

import {Container,
        Item,
        Input,
        Header,
        Icon,
        Right,
        Button,
        Segment
        } from "native-base";
//import backend from "../api/backend";
//import getEnvVars from "../../enviroment";

const { width, height} = Dimensions.get("window");


//const {apiKey} = getEnvVars();



//Variable que contiene la pantalla
const HomeScreen = () => {
    /*//Maneja el estado de los stickers.
    const [stickers, setStickers] = useState(null);

    const getStickers = async () => {
        //Se consulta la api
        const response = await backend.get(`stickers/trending?api_key=${apiKey}&limit=25&rating=g`);

        console.log(response.data);
    }

    getStickers();*/


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
            <Image source={require("../../assets/Letras_gifter.png")} styles={styles.gifterImage}/>
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gifterImage: 
    {
        width: width,
        height: height * 0.33,
        resizeMode: "contain",
    },
    search: {
        backgroundColor:"white",
        marginTop:5,
        
    },
    segment:
    {
        backgroundColor: "white",
    },
    button:
    {
        borderBottomColor: "black",
        marginLeft: 55,
        marginRight: 55,
    },
});

export default HomeScreen;