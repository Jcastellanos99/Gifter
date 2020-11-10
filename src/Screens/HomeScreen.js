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

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { TouchableOpacity } from "react-native-gesture-handler";

const {apiKey} = getEnvVars();


const { width, height} = Dimensions.get("window");





//Variable que contiene la pantalla
const HomeScreen = ( {navigation} ) => {
    //Maneja el estado de los stickers.
    const [stickers, setStickers] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");

    

    const getStickers = async () => {
       try {

         //Se consulta la api
         const response = await backend.get(`stickers/search?api_key=${apiKey}&q=ryan&limit=25&offset=0&rating=g&lang=es`);

         setStickers(response.data);

       } catch (error) {

            setError(true);

       }
    }

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
                <Image source={require("../../assets/LogoPantallas.png")} styles={styles.gifterImage}/>  
            </Header>  
            <Header searchBar noShadow style={styles.search}>
                <Item rounded>
                    <Input placeholder="Buscar" value={search} onChangeText={setSearch}/>
                    <Right>
                        <Button transparent onPress={() => {navigation.navigate("searchResults", {search})}}>
                            <Icon name="search"/>
                        </Button>
                    </Right>
                </Item>
            </Header> 
            
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
        flex: 1,
        width: width * 0.5,
        fontFamily: "FontAwesome",
        fontSize: 20,
        borderBottomColor: "black",
        marginLeft: 15,
        marginHorizontal: 15,
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

export default HomeScreen;