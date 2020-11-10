import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Dimensions, Image} from "react-native";
import {Container, Content, H1, Spinner, Card, CardItem } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const { width, height} = Dimensions.get("window");

const {apiUrl, apiKey} = getEnvVars();

const SearchResults = ({route, navigation}) => {
    const { search } = route.params;
    const [stickers, setStickers] = useState(null);
    const [error, setError] = useState(false);

    const getSearchStickers = async () => {
        try {

            const response = await backend.get(`stickers/search?api_key=${apiKey}&q=${search}&limit=25&offset=0&rating=g&lang=es`);

            setStickers(response.data);

        } catch (error) {

            setError(true);

        }
    }

    useEffect(() => {
        getSearchStickers();
     }, []);

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
            <H1 style={styles.h1}>Resultados de la busqueda:  {search} </H1>
            <FlatList
            data={stickers.data}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No se encontraron Stickers</Text>}
            renderItem={({ item }) => {
                return (
                    <View >
                    <TouchableOpacity onPress={() => navigation.navigate("Image", {id: item.id})}>
                    <Card style={{width:width*0.99, height:height*0.35, backgroundColor: "#EDE9E6"}}>
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
        backgroundColor: "#EDE9E6",
    },
    h1:
    { 
        
        color: "#000",
        position: "relative",
        backgroundColor: "#EDE9E6",
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
        backgroundColor: "#EDE9E6",
        marginLeft:15, 
        marginRight:15, 
        flex:1,  
        justifyContent: "center", 
        alignItems: "center"
    },
});

export default SearchResults;