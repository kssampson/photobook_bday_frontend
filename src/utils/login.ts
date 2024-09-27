import axios from "axios";

const login = async (username: string, password: string, visitorId: string | null) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/log-in`, {username, password, visitorId})
    return response
  } catch(error){
    throw new Error;
  }
}

export default login