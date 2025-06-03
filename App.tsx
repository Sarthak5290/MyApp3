import 'react-native-gesture-handler';
import {DatadogProvider} from '@datadog/mobile-react-native';
import {NativeBaseProvider} from 'native-base';
import React, {useCallback} from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import appTheme from './src/app-theme';
import {ErrorFallback} from './src/components';
import {
  AccountContextProvider,
  AuthContextProvider,
  TaskContextProvider,
} from './src/contexts';
import Logger from './src/logger/logger';
import ApplicationNavigator from './src/navigators/application';
// import './translations';
import DatadogConfig, {onDataDogSDKInitialized} from './src/services/datadog';

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  return (
    <NativeBaseProvider theme={appTheme}>
      <ErrorBoundary
        onError={(e, stack) => Logger.error(`App Error: ${e} ${stack}`)}
        FallbackComponent={ErrorComponent}>
        <DatadogProvider
          configuration={DatadogConfig}
          onInitialization={onDataDogSDKInitialized}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AuthContextProvider>
              <AccountContextProvider>
                <TaskContextProvider>
                  <ApplicationNavigator />
                </TaskContextProvider>
              </AccountContextProvider>
            </AuthContextProvider>
          </SafeAreaProvider>
        </DatadogProvider>
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;
