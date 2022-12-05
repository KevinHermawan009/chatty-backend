start-- for setup
yarn init
yarn install
yarn add typescript
yarn add ts-node -g
yarn typescript init (if no tsconfig.js)
yarn add nodemon -D for local server
yarn add tsconfig-paths -D
yarn add dotenv for env setup
yarn add @socket.io/redis-adapter redis socket.io//to maintained communcate when diconnect or reconnect
yarn add bunyan   & yarn add @types/bunyan --save-D//pengganti console.log
yarn add eslint-config-prettier prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser -D //for configuration
yarn add eslint --save-D || yarn add eslint-cli -D
yarn add ttypescript  typescript-transform-paths
yarn add ttypescript
what u need before run server
1. make sure redis server is run, open ubuntu server 'redis-server' once it's up, u're redy to go
2. yarn run dev

Checking code consistency
1. yarn run lint:check //to check if there any error with our code consistency
2. others u can check inside package.json inside script
