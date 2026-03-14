import axios from "axios";

export const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    // console.log(`API Response for ${url}:`, data);
    return data;
  } catch (error) {
    // console.error(`API Error for ${url}:`, error);
    return null;
  }
};
