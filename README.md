PG25AlexB_Pipelines_A3
04-16-2024
Alex Buzmion II

## Links:
[github repo branch develop link](<https://github.com/AlexBuzmion/alexbuzmion.github.io>) (For testing/grading please use the `develop` branch as that skips login)
[live website](<https://namesarehard.ca>) - This is from the main branch

## Release Notes
- This pipeline tool is an extrapolated implementation of the original web-app vue assignment
- Reimaged the website to our final project specific details.
- This tool has Get and Post functions into UGS for Remote Config and Cloud/Player Save
- Utilized the cloud computing class exercise account as the service account and project
- Important: Basic getters and data parsing is implemented but is not displaying anything in the screen atm
- This sets the groundwork to build on for our Final Project team 
- Webiste is online, deployed by Netlify with Github main branch as source.
- Remote Config and PlayerData is only accessible upon successful login. 
  
## Main files:
    - unityServices.js
    - remoteConfigData.js 
    - RemoteConfigurations.vue
    
## How to test 
- download the repo
- pull develop branch
- debug and inspect the API authenticate call, validate the environment data from unity being displayed in the dropdown for environments.
- data for environment configurations are pulled but not displayed anywhere (i.e. PlayerSettings, DebugEnabled, ConfigVersion
    - validate this by going to the chrome inspector -> Vue -> Pinia store to view the config settings pulled from Unity. 
