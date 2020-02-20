# Create React App + Server dev boilerplate

  - Create-react-app is in frontend folder, bump version there
  - Express stuff is in server
  - At this top level folder we can do:
    - Install deps: `npm run install`
    - Dev with hot reload: `npm run dev`
    - Build everything: `npm run build`
    - Start in prod: `npm run start`
    - Eject: `npm run eject`, will create a folder with name `app` that will execute
    the application in production with the command `npm run start`
    - Clean: `npm run clean`
  - Define dev env vars in `./.dev.env` file.
  - Define prod env vars in `./.prod.env` file. It will be copied to dist at build time.
