//Importar librerias y modulos necesarios.
import React, { useEffect, useState } from "react";
import {StyleSheet, 
        Text, 
        Dimensions, 
        Image,
        FlatList,
        View
        } from "react-native";

import {Container,
        Item,
        Input,
        Header,
        Icon,
        Right,
        Button,
        Segment,
        H3,
        Card,
        CardItem,
        Spinner,
        Body
        } from "native-base";
//import backend from "../api/backend";
//import getEnvVars from "../../enviroment";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";


const {apiKey} = getEnvVars();


const { width, height} = Dimensions.get("window");



//const {apiKey} = getEnvVars();





//Variable que contiene la pantalla
const HomeScreen = () => {
    /*//Maneja el estado de los stickers.
    const [stickers, setStickers] = useState(null);
    const [error, setError] = useState(false);

    

    const getStickers = async () => {
       try {

         //Se consulta la api
         const response = await backend.get(`stickers/search?api_key=${apiKey}&q=new&limit=25&offset=0&rating=g&lang=es`);

         setStickers(response.data);

       } catch (error) {

            setError(true);

       }
    }
    getStickers();*/

    useEffect(() => {
        getStickers();
    }, [])


    if (!stickers)
    {
        return(
            <View style={{flex: 1}}>
                <Spinner/>
            </View>
        )
    }

    return (
        <Container style={styles.container}>
            <Header noShadow style={styles.header}>
                <Image source={require("../../assets/1.png")} styles={styles.gifterImage}/>  
            </Header>  
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
                    <Text><H3>Stickers</H3></Text>
                </Button>
                <Button rounded style={styles.button}>
                    <Text><H3>Gifs</H3></Text>
                </Button>
            </Segment> 
            <FlatList
            data={stickers.data}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No se encontraron Stickers</Text>}
            renderItem={({ item }) => {
                return (
                    <View>
                    <Card>
                    <CardItem>
                        <Body>
                        <Image source={(item.image)} alt={item.images}></Image>
                        <Text>{item.title}</Text>
                        </Body>
                    </CardItem>
                </Card>
                </View>
                )
            }}
            />
        </Container>
    );
};

//Variable para la hoja de estilos
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EDE9E6",
    },
    header: 
    {
        backgroundColor:"#EDE9E6",        
    },
    gifterImage: 
    {
        width: width,
        height: height * 0.5,
        resizeMode: "contain",
    },
    search: {
        backgroundColor:"#EDE9E6",
        marginTop:-15,
        
    },
    segment:
    {
        backgroundColor: "#EDE9E6",
    },
    button:
    {
        borderBottomColor: "black",
        marginLeft: 55,
        marginRight: 55,
        flex: 1,
        width: width * 0.5,
        fontFamily: "FontAwesome",
        fontSize: 20,
        borderBottomColor: "black",
        marginLeft: 15,
        marginHorizontal: 15,
    },
});

export default HomeScreen;