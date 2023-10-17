import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'eca8bb643c5a4e0c93e8162164423d1f',
  },
});
