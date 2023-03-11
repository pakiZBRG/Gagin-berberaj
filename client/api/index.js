import axios from "axios";
import { apiUrl } from '../environments'

const ApiTemplate = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  },
})

export const ApiManager = async (url, method, body) => {
  try {
    const { data, status } = await ApiTemplate(url, { method, data: body })
    return { data, status }
  } catch (error) {
    return {
      status: error.response.status,
      message: Array.isArray(error.response.data) ? error.response.data[0].message : error.response.data,
      error: true
    }
  }
}