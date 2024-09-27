import axios from "axios";

const processOtp = async (username: string, password: string, visitorId: string | null, otp: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/process-otp`, {username, password, visitorId, otp})
    return response.data;
  } catch (error) {
    throw error
  }
}

export default processOtp;