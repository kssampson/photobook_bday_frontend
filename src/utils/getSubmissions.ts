import axios from "axios";

const getSubmissions = async (token: string, page: number, limit: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/get-submissions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        limit
      }
    })
    return response.data;
  } catch (error: any) {
    console.error('an error occurred: ', error.response ? error.response.data : error.message)
  }
};

export default getSubmissions;