# Reading

![Reading_Logo](./Reading_Logo.png)

[![Build Status](https://travis-ci.org/attentiveness/reading.svg?branch=master)](https://travis-ci.org/attentiveness/reading)
[![Join the chat at https://gitter.im/attentiveness/reading](https://badges.gitter.im/attentiveness/reading.svg)](https://gitter.im/attentiveness/reading)
[![License Apache2.0](https://img.shields.io/hexpm/l/plug.svg)](https://raw.githubusercontent.com/attentiveness/reading/master/LICENSE)

Reading App Write In React-Native（Studying and Programing）

**Support: Android 4.1 (API 16)+    IOS(7.0+)**

> No Profit, No Advertisement, Only Feelings

## Screenshot

![Reading_Splash](./screenshot/Reading_Splash.jpg) ![Reading_Main](./screenshot/Reading_Main.png)
![Reading_Drawer](./screenshot/Reading_Drawer.png) ![Reading_Article](./screenshot/Reading_Article.jpg)
![Reading_Share](./screenshot/Reading_Share.jpg) ![Reading_Category](./screenshot/Reading_Category.png)
![Reading_IOS_Main](./screenshot/Reading_IOS_Main.png) ![Reading_IOS_Share](./screenshot/Reading_IOS_Share.jpeg)

## Download From Android Market

*From 360 Android Market:* [Download Reading](http://zhushou.360.cn/detail/index/soft_id/3217938?recrefer=SE_D_Reading)

*From Wandou Labs:* [Download Reading](http://www.wandoujia.com/apps/com.reading)

## Application Architecture

* [Microsoft Code Push](https://github.com/Microsoft/react-native-code-push) for dynamic update
* [Redux](https://github.com/reactjs/redux) is a predictable state container for reading app, together with [React Native](https://github.com/facebook/react-native)
* [Mocha](https://mochajs.org/) for UT
* [Enzyme](https://github.com/airbnb/enzyme) for testing UI components and mock

## Development Workflow

### Step One
```
npm install -g react-native-cli
```
### Step Two
```
npm install
```
### Step Three
```
react-native start
```
### Run Test
```
npm test
```

## Important Issue
>* if error like this:
```
/xxx/reading/node_modules/react-native-wechat/ios/RCTWeChat.h:xxx: 'RCTBridgeModule.h' file not found
```
try this to solve:
```
change RCTWebChat.xcodeproj → Build Settings → Search Paths → Header Search Paths to
$(SRCROOT)/../../react-native/React and
$(SRCROOT)/../../react-native/Libraries
```

>* if error like this:
```
ld: warning: directory not found for option '-F/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulatorx.x.sdk/Developer/Library/Frameworks'
ld: file not found: /xxx/Library/Developer/Xcode/DerivedData/reading-evusolphipkzgrgghdzjodzlcllk/Build/Products/Debug-iphonesimulator/reading.app/reading
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```
try this to solve:
[directory-not-found-for-option-f-applications-xcode-app-developer-library-f](http://stackoverflow.com/questions/35234373/directory-not-found-for-option-f-applications-xcode-app-developer-library-f)



## Release Note

[Reading Release Note](https://github.com/attentiveness/reading/releases)

## OnLine Accident

[Reading Online Accident](./Reading_OnLine_Accident.md)

## Welcome

>* Star
>* Fork
>* PR
>* Issue

## Contributing

For more information about contributing PRs and issues, see our [Contribution Guidelines](https://github.com/attentiveness/reading/blob/master/CONTRIBUTING.md).

## License

Apache License 2.0
