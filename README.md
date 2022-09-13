**Setup**
1. Download Android Studio and React Native CLI. [Setup Guide](https://www.valuebound.com/resources/blog/how-setup-react-native-windows-using-android-studio-and-nodejs)
    *Note: If you have Riot Vanguard installed on your machine, disable it before running the Android Emulator. 
    - To Disable: `sc config vgc start= disabled & sc config vgk start= disabled & net stop vgc & net stop vgk & taskkill /IM vgtray.exe`
    - To Enable AND Restart: `sc config vgc start= demand & sc config vgk start= system & shutdown /r /f /t 00`
2. Set up GitLab/GitHub Account.
3. Download VSCode and Git.
    1. Follow [this guide](https://www.golinuxcloud.com/set-up-gitlab-with-visual-studio-code/) to set up VSCode, Git, and GitLab within VSCode. 
4. Get the other extensions for VSCode
    1. React Native Tools
    2. React-Native/React/Redux
    3. Prettier(optional)
    4. Material Icon(optional)
    5. [Android by adelphes](https://www.linkedin.com/pulse/building-android-apps-using-microsofts-vs-code-instead-saamer-mansoor) 
5. Clone the repository.
    1. In Git CMD, cd to the destination you want the repo to be in.
    2. `git clone git@gitlab.com:Jwil200/490project.git` by SSH or
    2. `git clone https://gitlab.com/Jwil200/490project.git`  by HTTPS
6. Run the repository in VSCode.
    1. In terminal, cd to the folder of the repository. 
    2. `code .`


**Running Metro and Android Emulator**
    *Make sure Riot Vanguard is disabled before emulating.
1. In terminal, `cd C:\Users\<Your User Name Folder>\AppData\Local\Android\Sdk\emulator`
2. `emulator -list-avds` and copy the name of the emulator
3. `emulator -avd <Name of Emulator>`
4. In VSCode terminal, `npx react-native run-android`


