setupServer use 
yarn add express
yarn add @types/express --save-dev
yarn add cors //security middleware
yarn add helmet //security middleware
yarn add hpp //security middleware
yarn add cookie-session //saving session and data neeed in cookies and will available in browser (ID , userId , etc)
yarn add compression //compression
yarn add express-async-error //catch async await errors
yarn add http-status-codes

app.use -> 'use' used to call middleware

yarn add @socket.io/redis-adapter -D