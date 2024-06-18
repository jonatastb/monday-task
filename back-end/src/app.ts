import Fastify from "fastify";
import { mondayTaskApi } from "./routes/monday-api-routes";
import cors from '@fastify/cors'

export const app = Fastify();

app.register(cors, { origin: '*' })
app.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ msg: 'Endpoint not found' } );
});

app.register(mondayTaskApi, {
  prefix: 'monday-task-api',
})

