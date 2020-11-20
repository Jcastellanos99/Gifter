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



//Pantalla principa que aparece por defecto
//Esta pantalla pertenece al boton de Sticker

//Variable que contiene la pantalla
const HomeScreen = ( {navigation} ) => {
    //Maneja el estado de los stickers.
    const [stickers, setStickers] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(false);

    

    const getStickers = async () => {
       try {

         //Se consulta la api
         const response = await backend.get(`stickers/search?api_key=${apiKey}&q=ryan&limit=25&offset=0&rating=g&lang=es`);

         setStickers(response.data);

       } catch (error) {

            setError(true);

       }
    }

    //Verifica que no se haga una busqueda vacia
    const handlerSearch = () => {
        if (!search) setSearchError(true);
        else {
          navigation.navigate("searchResults", { search });
          setSearch("");
          setSearchError(false);
        }
      };

    //Manda a llamar la funcion que contiene la peticion de la API, y verifica que no se este mandando a llamar a cada rato.
    useEffect(() => {
        getStickers();
    }, [])

    //Manda a llamar a la busqueda 
    useEffect(() => {
        if (search) setSearchError(false);
      }, [search]);  
       
    
    //Hace una pausa para asegurarse que la variable Sticker contenga valores
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
            <Header searchBar noShadow style={styles.search} androidStatusBarColor="#610B5E">
                <Item rounded>
                    <Input  placeholder="Buscar" value={search} onChangeText={setSearch} style={searchError ? styles.inputError : null}/>
                    <Right>
                        <Button transparent onPress={handlerSearch}>
                            <Icon style={styles.icon} name="search"/>
                        </Button>
                    </Right>
                </Item>
            </Header> 
            <Segment style={styles.segment}>
                <Button rounded  style={styles.button}>	        
                    <Text style={styles.text}>
                        Stickers
                        </Text>	                    
                </Button>	                
                <Button rounded onPress={() => {navigation.navigate("homeScreenGif")}} style={styles.button}>	                
                    <Text style={styles.text}>	                    
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
        backgroundColor: "#FBEFFB",
    },
    header: 
    {
        backgroundColor:"#FBEFFB",        
    },
    gifterImage: 
    {
        width: width,
        height: height * 0.5,
        resizeMode: "contain",
    },
    search: {
        backgroundColor:"#FBEFFB",
        //marginTop:-15,
        
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
    inputError: {
        borderColor: "#251C69",
        borderWidth: 1,
        color: "#251C69",
      },
    text:
    {
        color : "#3B0B2E",
        fontSize: 18,
    },
    icon:
    {
        color : "#610B5E",
    },
});

export default HomeScreen;