# 🚀 Getting READ Set Up
1. Set up GitLab/GitHub Account.
2. Download VSCode and Git.
    1. Follow [this guide](https://www.golinuxcloud.com/set-up-gitlab-with-visual-studio-code/) to set up VSCode, Git, and GitLab within VSCode. 
3. Get the other extensions for VSCode
    1. React Native Tools
    2. React-Native/React/Redux
    3. Prettier(optional)
    4. Material Icon(optional)
4. Clone the repository.
    1. In Git CMD, cd to the destination you want the repo to be in.
    2. `git clone git@gitlab.com:Jwil200/490project.git` by SSH or
      `git clone https://gitlab.com/Jwil200/490project.git`  by HTTPS
5. Run the repository in VSCode.
    1. In terminal, cd to the folder of the repository. 
    2. `code .`

## Running READ in Expo (1st Time)
1. `cd <Project Directory>`
2. `npm install` or `yarn` to install dependencies. 
3. `expo start `
    1. If you get expo.ps1 cannot be loaded because loading scripts.. error, run `Set-ExecutionPolicy Unrestricted` in *administrator powershell*.
    2. If you get Unable to find expo.. error, run `npm install -g yarn` and `yarn add expo`
4. Scan the QR code or use expo login to sync your project to your phone app.
A. You may need to install dependencies with:
    `yarn add react-native-safe-area-view react-native-safe-area-context`

### *After any new changes in a branch, make sure to do a `git pull` and an `npm install` if there are any added dependencies. 

