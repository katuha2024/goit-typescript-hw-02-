import axios from "axios";
import { ImgData } from "../src/types/index";

const ACCESS_KEY = import.meta.env.VITE_REACT_API_KEY;

interface RequestParams {
  query: string;
  page: number;
}

interface ApiResponse {
  total: number;
  total_pages: number;
  results: ImgData[];
}

export const getUnsplashData = async (
  { query, page }: RequestParams
): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      orientation: "landscape",
      per_page: 15,
      content_filter: 'high',
      query,
      page,
    },
  });

  return response.data;
};
