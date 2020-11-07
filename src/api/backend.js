import axios from "axios";
import getEnvVars from "../../enviroment";

const { apiUrl } = getEnvVars();

//Instacia de conexión
const instance = axios.create({
    baseURL: apiUrl 
});

export default instance;