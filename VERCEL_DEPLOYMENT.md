# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying both the **Next.js frontend** and the **Express backend** of the Paragon Global Training Academy demo onto Vercel.

Since this repository is organized as a monorepo containing `/frontend` and `/backend` directories, the industry-standard and Vercel-recommended approach is to **deploy them as two separate Vercel projects**. This ensures fast, independent builds, optimal scaling, and zero resource conflict.

---

## Prerequisites

1. A **Vercel account** (free tier is fully sufficient).
2. A **MongoDB Atlas** database cluster (free M0 tier is fully sufficient).
3. An **OpenAI API Key** (for the AI Sales Chatbot).
4. A **Stripe account** (optional, for test-mode checkout).

---

## Step 1: Deploy the Express Backend

Deploying the backend first allows us to obtain the backend API URL, which is needed to configure the frontend.

1. **Import the repository to Vercel:**
   - Log in to your Vercel Dashboard.
   - Click **Add New** -> **Project**.
   - Select your GitHub/GitLab repository.

2. **Configure project settings:**
   - **Project Name:** `pg-training-backend` (or similar)
   - **Framework Preset:** Select **Other** (do NOT select Node.js as Vercel will auto-configure everything via the `vercel.json` file inside the directory).
   - **Root Directory:** Click "Edit" and select **`backend`**.
   - **Build & Development Settings:** Leave these at their default values. The `backend/vercel.json` file configures the build and routing automatically.

3. **Configure Environment Variables:**
   Under **Environment Variables**, add the following keys:
   
   | Variable Name | Value Description | Example |
   |---|---|---|
   | `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://...` |
   | `OPENAI_API_KEY` | Your OpenAI API key | `sk-proj-...` |
   | `FRONTEND_URL` | Set to `*` initially, then update to your deployed Frontend URL once ready. | `https://pg-training-frontend.vercel.app` |
   | `NODE_ENV` | `production` | `production` |
   | `PORT` | `5000` | `5000` |
   | `SMTP_HOST` | *(Optional)* Your SMTP mail server | `smtp.gmail.com` |
   | `SMTP_PORT` | *(Optional)* Your SMTP port | `587` |
   | `SMTP_SECURE` | *(Optional)* Use secure connection | `false` |
   | `SMTP_USER` | *(Optional)* SMTP username | `your-email@gmail.com` |
   | `SMTP_PASS` | *(Optional)* SMTP app password | `your-app-password` |
   | `STRIPE_SECRET_KEY` | *(Optional)* Stripe Secret Key | `sk_test_...` |
   | `STRIPE_WEBHOOK_SECRET` | *(Optional)* Stripe Webhook Signing Secret | `whsec_...` |

4. **Deploy:**
   - Click **Deploy**.
   - Once the deployment is complete, Vercel will provide a URL for your backend (e.g., `https://pg-training-backend.vercel.app`). **Copy this URL** for the frontend setup.

---

## Step 2: Seed the MongoDB Database

To display courses and training paths on the deployed application, you must seed your MongoDB Atlas cluster.

1. Create a `.env` file in the `backend/` directory of your local project copy with your MongoDB Atlas `MONGODB_URI`.
2. Run the seed script from your terminal:
   ```bash
   cd backend
   npm run seed
   ```
3. This will populate your remote database with the full training catalog and testimonials.

---

## Step 3: Deploy the Next.js Frontend

1. **Import the repository to Vercel:**
   - On the Vercel Dashboard, click **Add New** -> **Project**.
   - Select the same repository.

2. **Configure project settings:**
   - **Project Name:** `pg-training-frontend` (or similar)
   - **Framework Preset:** Select **Next.js**.
   - **Root Directory:** Click "Edit" and select **`frontend`**.

3. **Configure Environment Variables:**
   Under **Environment Variables**, add the following keys:

   | Variable Name | Value Description | Example |
   |---|---|---|
   | `NEXT_PUBLIC_API_URL` | The deployed Vercel backend URL | `https://pg-training-backend.vercel.app` |
   | `NEXT_PUBLIC_SITE_URL` | This frontend's future deployment URL | `https://pg-training-frontend.vercel.app` |
   | `OPENAI_API_KEY` | *(Optional)* OpenAI API key (for direct Next.js API chat route) | `sk-proj-...` |
   | `SMTP_HOST` | *(Optional)* SMTP mail server (for contact form email) | `smtp.gmail.com` |
   | `SMTP_PORT` | *(Optional)* SMTP port | `587` |
   | `SMTP_SECURE` | *(Optional)* Use secure connection | `false` |
   | `SMTP_USER` | *(Optional)* SMTP username | `your-email@gmail.com` |
   | `SMTP_PASS` | *(Optional)* SMTP app password | `your-app-password` |

4. **Deploy:**
   - Click **Deploy**.
   - Once complete, copy your deployed frontend URL (e.g., `https://pg-training-frontend.vercel.app`).

---

## Step 4: Finalize CORS Configuration on Backend

To ensure secure cookie management and cross-origin security:

1. Go to your **Vercel Dashboard** and open your **backend** project.
2. Navigate to **Settings** -> **Environment Variables**.
3. Update the `FRONTEND_URL` environment variable from `*` to your actual frontend URL:
   - Name: `FRONTEND_URL`
   - Value: `https://pg-training-frontend.vercel.app` (do **not** include a trailing slash)
4. Redeploy the backend project (or trigger a new build) to apply this update.

---

## Next.js API Proxy Configuration

The Next.js frontend has been pre-configured in `frontend/next.config.ts` to include a secure **CORS-bypassing rewrite proxy**. 

Any client-side request made to `/api/courses`, `/api/paths`, `/api/orders`, `/api/testimonials`, or `/api/campaign` will be automatically proxied server-side to your Express backend's deployed URL (defined by `NEXT_PUBLIC_API_URL`). 

This architecture provides three major benefits:
1. **No CORS headaches** in the browser, since client-side calls are made to the same origin (`/api/...`).
2. **Simplified relative URLs** in frontend client components.
3. **No Mixed Content issues** (HTTP vs. HTTPS).

---

## Verification & Testing

Once both projects are deployed, you can verify everything is working:

1. **Health Check:** Open your browser and navigate to `https://your-backend-domain.vercel.app/api/health`. You should receive:
   ```json
   {"status":"ok","timestamp":"..."}
   ```
2. **Dynamic Data Fetching:** Open the frontend website. The training paths and courses should load dynamically from the MongoDB database.
3. **AI Chatbot:** Open the chat bubble on the bottom-right and send a message. The AI should respond with course recommendations and be able to automatically add courses to your cart.
4. **Checkout:** Add a course to your cart, go to checkout, fill in the details, and place a mock order. The order should be written to the database successfully and redirect you to the success screen.
