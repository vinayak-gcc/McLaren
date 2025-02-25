# McLaren

## A Website built using React , Tailwind , Redux , Firebase and TypeScript along with many other Tech-Stacks  

## Features

- Good Design and Fullly Responsive CSS using Tailwind CSS , styled-components and Headless UI
- Cart Functionalities like AddtoCart , RemovefromCart using Redux and Redux Persist
- EmailJS Integration for Email Confirmation
- Dynamic Order Summary using Cart Data
- Firebase for Login and Registration
- Download ScreenShot as PDF after Order
- Few small features here and there among the whole website
- Overall Smooth experience
- Real Stripe Payments (Only in Test Mode)

### More Info about Stripe and EmilJS

- Use vercel cli to run serverless stripe backend using API given in api folder
- you can also go the the server folder using 'cd server' and then run 'node index.js' to start localhost for backend
- Make an stripe account if you are a developer to use Stripe with the following details required in .env file:
  - REACT_APP_STRIPE_SECRET_KEY=' '
  - REACT_APP_STRIPE_PUBLIC_KEY=' '
- Make an EmailJS account if you are a developer to get .env values required for running the email function properly:
  - REACT_APP_EMAILJS_SERVICE_ID=' '
  - REACT_APP_EMAILJS_TEMPLATE_ID=' '
  - REACT_APP_EMAILJS_PUBLIC_KEY=' '

### Here's A ScreenShot

![alt text](<Screenshot.png>)
