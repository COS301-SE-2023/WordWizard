import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'word-wizard',
  webDir: '../../dist/apps/word-wizard',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
