import { envSchema } from '@/validations'

const parsed = envSchema.safeParse({
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  VITE_API_KEY: import.meta.env.VITE_API_KEY,
})

if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  parsed.error.issues.forEach(issue => {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
  })
  throw new Error('Invalid environment variables. Check your .env file.')
}

export const env = parsed.data
