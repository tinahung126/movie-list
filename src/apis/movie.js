import axios from 'axios'
const baseURL = 'https://www.omdbapi.com/'
const axiosInstance = axios.create({
  baseURL
})

export default {
  getMovies (keyword, page) {
    return axiosInstance.get(`?apikey=2e767472&s=${keyword}&page=${page}`)
  },
  getDetail (id) {
    return axiosInstance.get(`?apikey=2e767472&i=${id}&plot=full`)
  }
}
