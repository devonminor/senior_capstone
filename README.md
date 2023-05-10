# Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Next, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Technologies Used

Next.js
React.js
Vercel
GitHub

## File Structure

The application file system is organized into two main folders, one for backend files and one for frontend files. In the frontend folder, source code for pages can be found in the "pages" folder, page components can be found in the "components" section, and styling files can be found in the "styles" folder.


# Backend
The backend portion of our web app uses the python framework FastAPI for general application interfacing.

## Getting Started

First, install all requirements by running command `pip install -r requirements.txt`. This should install all necessary dependencies in order to run the backend portion of the application

### Technologies
We are using the following technologies, so ensure you have them correctly installed/correct version
- Python 3.10.3 and up
- FastAPI 
- Beanie (our object document mapper)
- auth0  (how we handle login)
- Cloudinary  (how we handle images)
- MongoDB  (how we store our data information)

Some of these require accounts/configuration. We will leave some login information with Steven Bell, but if you choose to create your own path, you may need to reconfigure some of these technologies (i.e. the .env file)

## Learn More
- [FastAPI Documentation](https://devdocs.io/fastapi/) - learn about FastAPI features
- [Beanie documentation](https://beanie-odm.dev/) - learn about Beanie documentation


# Quick Start
In order to get this running on your local, there are several steps needed to be done:

#### Run start_server.sh
The command is: `uvicorn main:app --port 5002`. This starts the backend uvicorn server, which is important to have up when interfacing with the frontend, which allows for you to connect to local host once you run `yarn dev` or `npm run dev` command.

#### Run `yarn dev` or `npm run dev`
This command will start the app. Next, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.