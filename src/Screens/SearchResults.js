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
            <View style={styles.spinner}>
                <Spinner/>
            </View>
        )
    }


    return (
        <Container style={styles.container}>
            <H1>Resultados</H1>
            <FlatList
            data={stickers.data}
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
        backgroundColor: "#FFF3EA",
    },
    h1:
    { 
        
        color: "#000",
        position: "relative",
        backgroundColor: "#FFF3EA",
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
        backgroundColor: "#E5E4E2",
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
        backgroundColor: "#251C69", 
        borderRadius:20, 
        marginLeft:width*0.02, 
        marginRight:width*0.02
    },
    spinner:
    {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#FFF3EA",
        flex: 1,
    },
});

export default SearchResults;