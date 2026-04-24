import { connectDB } from '../src/lib/db'
import app from '../src/app'

// Connect to MongoDB on cold start; subsequent invocations reuse the cached connection
connectDB().catch(console.error)

export default app
