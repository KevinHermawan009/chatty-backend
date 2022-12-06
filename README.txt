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
yarn add yarn add tsc-alias -D //to build and transform path
what u need before run server
1. make sure redis server is run, open ubuntu server 'redis-server' once it's up, u're redy to go
2. yarn run dev

Checking code consistency
1. yarn run 'lint:check' //to check if there any error with our code consistency
2. yarn run 'lint:fix' //to check if there any error with our code consistency
3. yarn run 'prettier:check' //to check if there any error with our code prettier
4. yarn run 'prettier:fix' //to check if there any error with our code prettier


if using unix or others OS try this at your package.json to build script
1. change 'build: "ttsc -p ."'

  //---------------------------------package.json---------------------------------\\
  "scripts": {
    "start": "nodemon ./build/app.js",
    "dev": "nodemon -r tsconfig-paths/register src/app.ts | ./node_modules/.bin/bunyan",
    "lint:check": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "prettier:check": "prettier --check src/**/*.{ts,json}",
    "prettier:fix": "prettier --write src/**/*.{ts,json}",
    "build": "ttsc -p ." <-- to build our code to javascript where directory was set in tsconfig.json inside "ourdir"
  },
 //---------------------------------tsconfig.json---------------------------------\\
  {
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "lib": ["DOM", "ES2015"],
    "baseUrl": ".",
    "outDir": "./build",
    "rootDir": "src",
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "pretty": true,
    "resolveJsonModule": true,
    "plugins": [
      {
        "transform": "typescript-transform-paths"
      },
      {
        "transform": "typescript-transform-paths", "afterDeclarations": true
      }
    ],
    "paths": {
      "@root/*":["src/*"],
      "@global/*":["src/shared/globals/*"],
      "@services/*":["src/shared/services/*"],
      "@socket/*":["src/shared/sockets/*"],
      "@workers/*":["src/shared/workers/*"],
    }
  }
}
