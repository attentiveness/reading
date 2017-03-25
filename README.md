# iReading

![iReading_Logo](./Reading_Logo.png)

[![Build Status](https://travis-ci.org/attentiveness/reading.svg?branch=master)](https://travis-ci.org/attentiveness/reading)
[![Code Climate](https://codeclimate.com/github/attentiveness/reading/badges/gpa.svg)](https://codeclimate.com/github/attentiveness/reading)
[![Join the chat at https://gitter.im/attentiveness/reading](https://badges.gitter.im/attentiveness/reading.svg)](https://gitter.im/attentiveness/reading)
[![License Apache2.0](https://img.shields.io/hexpm/l/plug.svg)](https://raw.githubusercontent.com/attentiveness/reading/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/attentiveness/reading.svg?maxAge=2592000?style=flat-square)](https://github.com/attentiveness/reading/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/attentiveness/reading/pulls)

iReading App Write In React-Native（Studying and Programing）

**Support: Android 4.1 (API 16)+   IOS(8.0+)**

> No Profit, No Advertisement, Only Feelings

## Screenshot

![iReading_Main](./screenshot/iReading_Main.png)
![iReading_Article](./screenshot/iReading_Article.png)
![iReading_Category](./screenshot/iReading_Category.png)
![iReading_IOS_Main](./screenshot/iReading_iOS_Main.png)
![iReading_IOS_Share](./screenshot/iReading_iOS_Share.png)

## Download

### From Android Market

*360 Android Market:* [Download iReading](http://zhushou.360.cn/detail/index/soft_id/3217938?recrefer=SE_D_Reading)

*Wandou Labs:* [Download iReading](http://www.wandoujia.com/apps/com.reading)

### From App Store

[Download iReading](https://itunes.apple.com/cn/app/ireading/id1135411121?l=zh&ls=1&mt=8)

### β Version

*Android:* [Download iReading](http://fir.im/w7gu)

## Application Architecture

- [Microsoft Code Push](https://github.com/Microsoft/react-native-code-push) for dynamic update
- [Redux](https://github.com/reactjs/redux) is a predictable state container for reading application, together with [React Native](https://github.com/facebook/react-native)
- [Redux-Saga](https://github.com/yelouafi/redux-saga/) is a library that aims to make side effects in reading application easier and better
- [react-native-router-flux](https://github.com/aksonov/react-native-router-flux) is a router for reading based on new react native navigation API and redux
- [Jest](https://facebook.github.io/jest/) for testing [React Native](https://github.com/facebook/react-native) components and UT
- [Eslint](https://github.com/eslint/eslint) is a tool for identifying and reporting on patterns found in reading application code
- [react-native-exceptions-manager](https://github.com/Richard-Cao/react-native-exceptions-manager) for handling crashes in release version

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

### Format Code

```
npm run format
```

### Run Lint

```
npm run lint
```

## Release Note

[Reading Release Note](https://github.com/attentiveness/reading/releases)

## Known Issue
[react-native-scrollable-tab-view: [Android]ScrollableTabBar Crash](https://github.com/skv-headless/react-native-scrollable-tab-view/issues/328)

## OnLine Accident

[Reading Online Accident](./Reading_OnLine_Accident.md)

## Contributing

**For more information about contributing PRs and issues, see our [Contribution Guidelines](https://github.com/attentiveness/reading/blob/master/CONTRIBUTING.md).**

## License

Apache License 2.0
