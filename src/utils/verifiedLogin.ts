import axios from "axios";

const verifiedLogin = async (email: string, password: string, token: string | null) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/verified-log-in`, {email, password, token})
    return response;
  } catch(error){
    throw new Error;
  }
}

export default verifiedLogin;