import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'eca8bb643c5a4e0c93e8162164423d1f',
  },
});

class APIClient<T> {
  private _endpoint: string;

  constructor(endpoint: string) {
    this._endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.get<FetchResponse<T>>(
      this._endpoint,
      config
    );
    return res.data;
  };
}

export default APIClient;
