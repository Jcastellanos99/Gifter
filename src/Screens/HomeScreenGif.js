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
const HomeScreenGif = ( {navigation} ) => {
    //Maneja el estado de los stickers.
    const [stickers, setStickers] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(false);

    

    const getStickers = async () => {
       try {

         //Se consulta la api
         const response = await backend.get(`gifs/search?api_key=${apiKey}&q=ryan&limit=25&offset=0&rating=g&lang=es`);

         setStickers(response.data);

       } catch (error) {

            setError(true);

       }
    }

    const handlerSearch = () => {
        if (!search) setSearchError(true);
        else {
          navigation.navigate("searchResults", { search });
          setSearch("");
          setSearchError(false);
        }
      };

    useEffect(() => {
        getStickers();
    }, [])

    useEffect(() => {
        if (search) setSearchError(false);
      }, [search]);   

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
            <Header searchBar noShadow style={styles.search} androidStatusBarColor="#004e64">
                <Item rounded>
                    <Input placeholder="Buscar" value={search} onChangeText={setSearch} style={searchError ? styles.inputError : null}/>
                    <Right>
                        <Button transparent onPress={handlerSearch}>
                            <Icon name="search"/>
                        </Button>
                    </Right>
                </Item>
            </Header> 
            <Segment style={styles.segment}>
                <Button rounded  onPress={() => {navigation.navigate("homeScreen", {search})}} style={styles.button}>	        
                    <Text>Stickers</Text>	                    
                </Button>	                
                <Button rounded onPress={() => {navigation.navigate("searchResults", {search})}} style={styles.button}>	                
                    <Text>	                    
                        Gifs	
                    </Text>	
                </Button>	               
            </Segment>          	            
            
            <FlatList
            data={stickers.data}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No se encontraron Stickers</Text>}
            renderItem={({ item }) => {
                return (
                    <View >
                        <TouchableOpacity onPress={() => navigation.navigate("Image", {id: item.id})}>
                    <Card style={styles.card} >
                    <CardItem bordered cardBody style={styles.cardItem}>
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
        backgroundColor: "#FFF3EA",
    },
    header: 
    {
        backgroundColor:"#FFF3EA",        
    },
    gifterImage: 
    {
        width: width,
        height: height * 0.5,
        resizeMode: "contain",
    },
    search: {
        backgroundColor:"#FFF3EA",
        //marginTop:-15,
        
    },
    segment:
    {
        backgroundColor: "#FFF3EA",
    },
    button:
    {
        flex: 1,
        width: width * 0.5,
        fontFamily: "FontAwesome",
        fontSize: 50,
        borderBottomColor: "#251C69",
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
        backgroundColor: "#E5E4E2",
        flex: 1,
    },
    inputError: {
        borderColor: "#251C69",
        borderWidth: 1,
        color: "#251C69",
      },
});

export default HomeScreenGif;