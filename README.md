# Yousician App

> Technical Aspects - by Mahyar Yahya

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).- The project is available on my [Github](https://github.com/MahyarJ/yousician-app).- The project UI is also available on [Netlify](https://yousician-hero.netlify.app/).

## Professional Considerations

- I started to add some amount of test cases to show up the availability of the knowledge

- Handling key-down options and keyboard friendly behaviors like hitting `Enter` on search could help users to have a better experiences.

- Having optimistic UI considerations - here using on set and unset the favorite property of the songs, to show things realtime and make more online experiences for users

## Design

- I put a good effort to fulfill the entire design mockups to make everything deployable right out of the box. Be Pixel-Perfect!

## Quality

- I separated the components as much as they could make tests simpler and prevent complications.

- Assigning proper `data-testid` to components can help us find the components among bunch of others.

- Also extracting utility functions as `utils` could make things cleaner and also help us to separately test the utility functions themselves.

## Production

- In a real and bigger project with reasonable timing, I try to add more tests, specially `integration tests` to make sure of what is happening during complicated renderings.

## Available APIs

A fake API is available for this assignment. In case need more information: [json server](https://github.com/typicode/json-server).
To start it, you must go inside the ‍‍`/api` folder, install the dependencies via `npm i` and run:
`npm run start-api`
Now if you go to http://localhost:3004 you should see the default JSON server page.

## Available Scripts

In the project directory, you can run:
`npm start`
Runs the app in the development mode.
As I believe most of the developers like me have their port `3000` unavailable,I changed the default port to `4040`
Open [http://localhost:4040](http://localhost:4040) to view it in the browser.
If you started the fake API already, the app works perfectly then.
The page will reload if you make edits.You will also see any lint errors in the console.Other scripts are the same as `create-react-app` documentation.
