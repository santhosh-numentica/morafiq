import React from 'react';
import '../global.css';

import { AppProviders } from './app/providers';
import { RootNavigator } from './app/navigation';
import { bootstrapApp } from './app/bootstrap';

const App: React.FC = () => {
  // Bootstrap the app on mount
  React.useEffect(() => {
    bootstrapApp().catch(error => {
      console.error('Failed to bootstrap app:', error);
    });
  }, []);

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

export default App;
