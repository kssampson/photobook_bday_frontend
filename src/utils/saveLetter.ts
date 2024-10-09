import axios from "axios";

const saveLetter = async ( id: number, token: string | null, letterContent: string, deltaContent: object ) => {
  // console.log('Attempting to send request:');
  // console.log('ID:', typeof id);
  // console.log('Letter Content:', letterContent);
  // console.log('Delta Content:', deltaContent);
  // console.log('Token:', token);
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/save-letter`, { id, letterContent, deltaContent },
    {headers: { Authorization: `Bearer ${token}`}} )
    return response.data;
  } catch (error: any) {
    // console.log('error: ', error)
    // throw new Error();
    console.error('an error occurred: ', error.response ? error.response.data : error.message)
  }
};

export default saveLetter;