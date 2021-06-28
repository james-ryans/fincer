/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Linking, LogBox} from 'react-native';
import invokeApp from 'react-native-invoke-app';
import {StackActions} from '@react-navigation/routers';

import * as RootNavigation from './src/RootNavigation';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
