import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native"
import {Text, View, Spinner, Content, Card, CardItem} from "native-base"
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const {apiKey} = getEnvVars();

const { width, height} = Dimensions.get("window");

const ShowImageScreen = ({route, navigation}) => {

    const {id} = route.params;
    const [sticker, setSticker] = useState(null);
    const [error, setError] = useState(false);
    

    const getStickerImage = async () => { 

        try{

        const response = await backend.get(`gifs/${id}?api_key=${apiKey}`);

        setSticker(response.data);
        }catch (error) {

            setError(true);
        }
     };

     useEffect(() => {
        getStickerImage();
    }, [])

    if (!sticker)
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
                    { uri: `${sticker.data.images.original.webp}${sticker.data.images.original.height}${sticker.data.images.original.width}`}
                    } style={styles.imageStyle}/>
                </CardItem>
            </Card>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Text>Tipo: {sticker.data.type}</Text>
                </CardItem>
            </Card>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Text>Titulo: {sticker.data.title}</Text>
                </CardItem>
            </Card>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Text>Fecha Creación: {sticker.data.import_datetime}</Text>
                </CardItem>    
            </Card>
        </Content>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: height*0.005,
        backgroundColor: "#FFF3EA",
    },
    imageStyle:
    {
        width: width * 0.99,
        height: height * 0.5,
        resizeMode: "contain",
    },
    cardItemImage:
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
    cardItem:
    {
        backgroundColor: "#E5E4E2",
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
        backgroundColor: "#251C69", 
        borderRadius:20, 
        marginLeft:width*0.02, 
        marginRight:width*0.02
    },
    card:
    {
        width:width*0.96, 
        height:height*0.0999, 
        backgroundColor: "#251C69", 
        borderRadius:20, 
        marginLeft:width*0.02, 
        marginRight:width*0.02,
    },
    spinner:
    {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#50858b",
        flex: 1,
    },
});

export default ShowImageScreen;