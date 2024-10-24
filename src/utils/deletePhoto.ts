import axios from "axios";

const deletePhoto = async ( token: string ) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/auth/delete-photo`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data;
    } catch (error: any) {
      console.error('an error occurred: ', error.response ? error.response.data : error.message)
    }
};

export default deletePhoto;