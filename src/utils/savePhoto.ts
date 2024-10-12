import axios from "axios";

const savePhoto = async ( formData: FormData, token: string | null, ) => {
  /*
    // Use this to look at the formData
    const entries = formData.entries(); // Get an iterator

    // Use a while loop to iterate through FormData entries
    let entry = entries.next();
    while (!entry.done) {
      const [key, value] = entry.value; // Destructure the entry
      console.log('key type : ',typeof key,"   value: ", value); // Log each key-value pair in formData
      entry = entries.next(); // Move to the next entry
    }
  */
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/save-photo`, formData,
    {headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }} )
    return response.data;
  } catch (error: any) {
    // throw new Error();
    console.error('an error occurred: ', error.response ? error.response.data : error.message)
  }
};

export default savePhoto;