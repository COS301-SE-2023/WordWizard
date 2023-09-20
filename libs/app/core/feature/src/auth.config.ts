import { isPlatform } from '@ionic/angular';
export const domain = `${process.env['WW_AUTH0_DOMAIN']}`;
export const clientId = `${process.env['WW_AUTH0_CLIENT_ID']}`;
const iosOrAndroid = isPlatform('hybrid');
export const callbackUri = iosOrAndroid
  ? `com.umleiten.wordWizard://${process.env['WW_AUTH0_DOMAIN']}/capacitor/com.umleiten.wordWizard/callback`
  : `${window.location.origin}`;