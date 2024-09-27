import axios from 'axios';

const createUserSubmit = async (userData: object) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/sign-up`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default createUserSubmit;
