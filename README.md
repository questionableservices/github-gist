# github-gist
Technical challenge for a SPA that joggles with Github Gists API

# Project Setup

Firstly create a .env file from the env.txt sent and add it to ./app folder.

Next, to run the project without Node installed, run the following:

```javascript
docker-compose up --build
```

This will build the docker images, create a production build and run a NGINX server so that it can be viewed at [http://localhost:8000](http://localhost:8000)

Also it can be traditionally run by going to ./app directory and running

```javascript
npm i
```

Though before doing that, due to peer dependencies, the following command should be ran:
```javascript
npm config set legacy-peer-deps true
```

After this the normal flow should continue with:
```javascript
npm i
npm ci
npm start
```
Now the React APP can be accessed at [http://localhost:3000](http://localhost:3000)

# What has been done?
* Decided to go with the Typescript version of React so to learn "a better way of coding". There were moments when I 
regretted this decision due to being forced on defining the variable types an creating interfaces
* Chose Atlaskit component from [Atlasian Design Language](https://atlassian.design/) thinking it will speed up UI 
and the rest of visual implementations and animations
* Decided to go with a more modern Functional Component and Hooks way of working instead of Classes
* Rendering lists using .map
* Went for a kebab-case naming the components to avoid different OS problems. Got the information from [here](https://profy.dev/article/react-folder-structure#kebab-case-for-file-and-folder-names)

# Optimizations
### Already done
* Implemented AtlasKit components for better UX
* Minimal Error handling for API request
* Cleaning states when user is invalid
* Getting forks and file contents in the same call

### Next steps
* using [absolute imports](https://profy.dev/article/react-folder-structure#absolute-imports) of components
* better code fragmentation for cleaner developer experience
* better research regarding UI library ( even if it looks really nice, Atlassian Design Language proved to be pretty restrictive - ex: for some reason, I couldn't manage to make the modal for the syntax appear without a full page re-render implying all the gist API calls to be made again; spent over 2 hours trying to fix this )
* better async functionality ( spent over 3 hours trying to figure out a cleaner looking approach than what has been implemented )
* improve performance by code splitting
* user autocomplete search
* infinite load for gist listing for fragmented API calls
* proofing the code for XSS injections
* try another syntax highlighter library. Atlassian one doesn't have great contrast