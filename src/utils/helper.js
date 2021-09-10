import axios from 'axios'
const baseURL = 'https://infinite-mountain-11239.herokuapp.com/api'

const axiosInstance = axios.create({
  baseURL
})
export const apiHelper = axiosInstance
