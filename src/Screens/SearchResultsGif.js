import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Dimensions, Image} from "react-native";
import {Container, Content, H1, Spinner, Card, CardItem, Segment, Button } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const { width, height} = Dimensions.get("window");

const {apiKey} = getEnvVars();

//Pantalla que se muestra por defecto al momento de hacer una busqueda
//Esta pantalla pertenece al boton de STICKER


//Variable que contiene la pantalla
const SearchResults = ({route, navigation}) => {
    const { search } = route.params;
    const [gifs, setGifs] = useState(null);
    const [error, setError] = useState(false);



    //Funcion encargada de consultar a la API
    const getSearchStickers = async () => {
        try {

            const response = await backend.get(`gifs/search?api_key=${apiKey}&q=${search}&limit=25&offset=0&rating=g&lang=es`);

            setGifs(response.data);

        } catch (error) {

            setError(true);

        }
    }

    //Manda a llamar a la funcion que consulto a la API
    useEffect(() => {
        getSearchStickers();
     }, []);

     //Se asegura que no sea una busqueda vacia
    if (!gifs)
    {
        return(
            <View style={styles.spinner}>
                <Spinner/>
            </View>
        )
    }


    return (
        <Container style={styles.container}>
            <H1 style={styles.h1}>Resultados: {search} </H1>
            <Segment style={styles.segment}>
            <Button rounded  onPress={() => {navigation.navigate("searchResults", {search})}} style={styles.button}>	        
                    <Text style={styles.text}>
                        Stickers
                        </Text>	                    
                </Button>	                
                <Button rounded style={styles.button}>	                
                    <Text style={styles.text}>	                    
                        Gifs	
                    </Text>	
                </Button>	               
            </Segment>
            <FlatList
            data={gifs.data}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No se encontraron Stickers</Text>}
            renderItem={({ item }) => {
                return (
                    <View >
                    <TouchableOpacity onPress={() => navigation.navigate("Image", {id: item.id})}>
                    <Card style={styles.card}>
                    <CardItem cardBody style={styles.cardItem}>
                        <Image source={{uri: `${item.images.original.webp}${item.images.original.height}${item.images.original.width}`}} style={styles.imageStyle}/>
                    </CardItem>
                </Card>
                </TouchableOpacity>
                </View>
                )
            }}/>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FBEFFB",
    },
    h1:
    {         
        color: "#3B0B2E",
        backgroundColor: "#FBEFFB",
        marginTop: height*0.02,
        marginEnd: height*0.08,  
    },
    imageStyle:
    {
        width: width * 0.50,
        height: height * 0.28,
    },
    cardItem:
    {
        backgroundColor: "#FBEFFB",
        marginLeft:width*0.0099, 
        marginRight:width*0.0099, 
        marginTop:height*0.007,
        marginBottom:height*0.007,
        flex:1,  
        justifyContent: "center", 
        alignItems: "center",
        borderRadius:20,
    },
    card:
    {
        width:width*0.96, 
        height:height*0.35, 
        backgroundColor: "#F6CEF5", 
        borderRadius:20, 
        marginLeft:width*0.02, 
        marginRight:width*0.02
    },
    spinner:
    {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#FBEFFB",
        flex: 1,
    },
    segment:
    {
        backgroundColor: "#FBEFFB",
    },
    button:
    {
        flex: 1,
        width: width * 0.5,
        fontFamily: "FontAwesome",
        fontSize: 50,
        borderBottomColor: "#F5A9F2",
        marginLeft: 15,
        marginHorizontal: 15,
    },
    text:
    {
        color : "#3B0B2E",
        fontSize: 18,
    },
});

export default SearchResults;