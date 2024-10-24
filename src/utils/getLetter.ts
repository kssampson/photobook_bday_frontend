import axios from "axios";

const getLetter = async ( token: string ) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/get-letter`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data;
  } catch (error: any) {
    console.error('an error occurred: ', error.response ? error.response.data : error.message)
  }
}

export default getLetter;