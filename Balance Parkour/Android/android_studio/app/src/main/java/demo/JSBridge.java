package demo;

import android.app.Activity;
import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import org.json.JSONArray;
import org.json.JSONException;


public class JSBridge {
    public static Handler m_Handler = new Handler(Looper.getMainLooper());
    public static Activity mMainActivity = null;

    public static void hideSplash() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        MainActivity.mSplashDialog.dismissSplash();
                    }
                });
    }

    public static void setFontColor(final String color) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        MainActivity.mSplashDialog.setFontColor(Color.parseColor(color));
                    }
                });
    }

    public static void setTips(final JSONArray tips) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        try {
                            String[] tipsArray = new String[tips.length()];
                            for (int i = 0; i < tips.length(); i++) {
                                tipsArray[i] = tips.getString(i);
                            }
                            MainActivity.mSplashDialog.setTips(tipsArray);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
    }

    public static void bgColor(final String color) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        MainActivity.mSplashDialog.setBackgroundColor(Color.parseColor(color));
                    }
                });
    }

    public static void loading(final double percent) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        MainActivity.mSplashDialog.setPercent((int)percent);
                    }
                });
    }

    public static void showTextInfo(final boolean show) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mSplashDialog.showTextInfo(show);
                    }
                });
    }


    public static void vibrateShort() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mInstance.vibrateShort();
                    }
                });
    }

    public static void vibrateLong() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mInstance.vibrateLong();
                    }
                });
    }

    public static void hideBanner() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mInstance.hideBanner();
                    }
                });
    }

    public static void showBanner() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mInstance.showBanner();
                    }
                });
    }

    public static void showInsertVideo() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mInstance.showInsertVideo();
                    }
                });
    }

    public static void loadNextAd() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mInstance.loadNextAd();
                    }
                });
    }

    public static void showRewardVideo() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if (MainActivity.mInstance != null)
                            MainActivity.mInstance.showRewardedVideo();
                    }
                });
    }

}
