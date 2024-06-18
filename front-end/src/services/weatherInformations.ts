import { api } from "../api/api"


export interface Weather {
  data: {
    name: string,
    time: string,
    coordenates: string,
    celsius: string,
    fahrenheit: string,
    text: string,
    icon: string,
  }
}


export const weatherInformations = {
  getInformationsByCountry: async (countryName: string) => {
    try {
      const weatherApiBackEnd: Weather = await api.get(`/get-country-weather/${countryName}`)
      return weatherApiBackEnd;
    } catch (error) {
      const response = {data: 'Error', code: 500}
      return response
    }
  }

}