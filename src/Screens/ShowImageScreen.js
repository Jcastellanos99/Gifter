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
            <View style={{flex: 1}}>
                <Spinner/>
            </View>
        )
    }

    return (
        <Content style={styles.container}>
            <Card style={{backgroundColor: "#EDE9E6"}}>
                <CardItem cardBody style={styles.cardItemImage}>
                    <Image source={{uri: `${sticker.data.images.original.webp}${sticker.data.images.original.height}${sticker.data.images.original.width}`}} style={styles.imageStyle}/>
                </CardItem>
                <CardItem style={styles.cardItem}>
                <Text>Tipo: {sticker.data.type}</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                <Text>Titulo: {sticker.data.title}</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                <Text>Fecha Creación: {sticker.data.import_datetime}</Text>
                </CardItem>
                
            </Card>
        </Content>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: height*0.03,
        backgroundColor: "#EDE9E6",
    },
    imageStyle:
    {
        width: width * 0.90,
        height: height * 0.60,
        justifyContent: "center",
    },
    cardItemImage:
    {
        backgroundColor: "#EDE9E6",
        marginLeft:15, 
        marginRight:15, 
        flex:1,  
        justifyContent: "center", 
        alignItems: "center"
    },
    cardItem:
    {
        backgroundColor: "#EDE9E6",
        flex:1,
    },
});

export default ShowImageScreen;