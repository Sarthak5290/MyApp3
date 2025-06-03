/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// Add this import at the top
import {BackHandler} from 'react-native';

// Add this polyfill before your app renders
if (!BackHandler.removeEventListener) {
  BackHandler.removeEventListener = BackHandler.remove || (() => {});
}
AppRegistry.registerComponent(appName, () => App);
