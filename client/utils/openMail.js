import { Platform } from "react-native";
import { openInbox } from "react-native-email-link";
import * as IntentLauncher from 'expo-intent-launcher';

export const openEmail = async () => {
  if (Platform.OS === "ios") {
    try {
      await openInbox();
    } catch (error) {
      console.error('iOS error', error);
    }
  }

  if (Platform.OS === "android") {
    const activityAction = "android.intent.action.MAIN";
    const intentParams = {
      category: "android.intent.category.APP_EMAIL",
    };
    IntentLauncher.startActivityAsync(activityAction, intentParams);
  }
}