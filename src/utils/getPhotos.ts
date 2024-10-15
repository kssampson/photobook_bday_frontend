import axios from "axios";

const getPhotos = async (token: string) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/get-photos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // console.log('response.data: ', response.data)
    return response.data;
  } catch (error: any) {
    console.error('an error occurred: ', error.response ? error.response.data : error.message)
  }
};

export default getPhotos;