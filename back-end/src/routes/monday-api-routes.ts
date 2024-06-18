import axios from 'axios'
import { FastifyInstance } from "fastify";
import { env } from '../env';

export async function mondayTaskApi(app: FastifyInstance) {

  app.get('/get-country-weather/:country', async (request, reply) => {
    const { country } = request.params as { country: string }
    
    try {
      const token = env.TOKEN
      const axiosConfig = {
        timeout: 2000 
      };
      const weatherApi = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${country}&aqi=no`, axiosConfig);
      
      if(!weatherApi.data) {
        return reply.send({msg: 'The country does not have available weather'})
      }

      const { location, current} = weatherApi.data

      const replyObject = {
        name: location.country,
        time: location.localtime,
        coordenates: 'LATITUDE: ' + location.lat + ' | LONGITUDE:' + location.lon,
        celsius: current.temp_c,
        fahrenheit: current.temp_f,
        text: current.condition.text,
        icon: current.condition.icon,
      }

      return reply.send(replyObject)

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return reply.send({ msg: 'The request timed out, please try again later' });
      }
    
      if (error.response && error.response.status === 400) {
        return reply.send({ msg: 'The country does not have available weather' });
      }
    
      return reply.code(500).send({ msg: 'An error occurred' });
    
    }
    
  })
}