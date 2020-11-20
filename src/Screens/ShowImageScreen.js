import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native"
import {Text, View, Spinner, Content, Card, CardItem} from "native-base"
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const {apiKey} = getEnvVars();

const { width, height} = Dimensions.get("window");


//Variable que contiene la pantalla
const ShowImageScreen = ({route, navigation}) => {

    const {id} = route.params;
    const [stickerGif, setStickerGif] = useState(null);
    const [error, setError] = useState(false);
    

    const getStickerImage = async () => { 

        try{
            //Se consulta la api
        const response = await backend.get(`gifs/${id}?api_key=${apiKey}`);

        setStickerGif(response.data);
        }catch (error) {

            setError(true);
        }
     };

     //Manda a llamar la funcion para obtener el sticker o gif
     useEffect(() => {
        getStickerImage();
    }, [])

    //Verifica que la variable no este vacia
    if (!stickerGif)
    {
        return(
            <View style={styles.spinner}>
                <Spinner/>
            </View>
        )
    }

    return (
        <Content style={styles.container}>
            <Card style={styles.cardImage}>
                <CardItem cardBody style={styles.cardItemImage}>
                    <Image source={
                    { uri: `${stickerGif.data.images.original.webp}${stickerGif.data.images.original.height}${stickerGif.data.images.original.width}`}
                    } style={styles.imageStyle}/>
                </CardItem>
            </Card>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Tipo: {stickerGif.data.type}</Text>
                </CardItem>
            </Card>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Titulo: {stickerGif.data.title}</Text>
                </CardItem>
            </Card>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Fecha Creación: {stickerGif.data.import_datetime}</Text>
                </CardItem>    
            </Card>
        </Content>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: height*0.005,
        backgroundColor: "#FBEFFB",
    },
    imageStyle:
    {
        width: width * 0.90,
        height: height * 0.7,
        resizeMode: "contain",
    },
    cardItemImage:
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
    cardItem:
    {
        backgroundColor: "#FBEFFB",
        marginLeft:width*0.0099, 
        marginRight:width*0.0099, 
        marginTop:height*0.007,
        marginBottom:height*0.007,
        flex:1,  
        borderRadius:20,
    },
    cardImage:
    {
        width:width*0.96, 
        height:height*0.535, 
        backgroundColor: "#F6CEF5", 
        borderRadius:20, 
        marginLeft:width*0.02, 
        marginRight:width*0.02
    },
    card:
    {
        width:width*0.96, 
        height:height*0.0999, 
        backgroundColor: "#F6CEF5", 
        borderRadius:20, 
        marginLeft:width*0.02, 
        marginRight:width*0.02,
    },
    spinner:
    {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#FBEFFB",
        flex: 1,
    },
    text:
    {
        color : "#3B0B2E",
        fontSize: 18,
    },
});

export default ShowImageScreen;