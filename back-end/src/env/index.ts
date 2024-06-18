import {config} from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  TOKEN: z.string(),
  PORT: z.coerce.number().default(5432),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new Error('Invalid environment variables.')
}

export const env = _env.data