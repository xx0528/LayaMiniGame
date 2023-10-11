package demo;
import java.io.InputStream;
import layaair.game.IMarket.IPlugin;
import layaair.game.IMarket.IPluginRuntimeProxy;
import layaair.game.Market.GameEngine;
import layaair.game.browser.ConchJNI;
import layaair.game.config.config;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Service;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.os.Vibrator;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;


import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.ly0528.GolfFighting.R;


public class MainActivity extends Activity{
    public static final int AR_CHECK_UPDATE = 1;
    private IPlugin mPlugin = null;
    private IPluginRuntimeProxy mProxy = null;
    boolean isLoad=false;
    boolean isExit=false;
    public static SplashDialog mSplashDialog;

    private static final String TAG = "MainActivity";
    public static MainActivity mInstance;

    private FrameLayout gameContainer;
    private AdView adView;
    private InterstitialAd mInterstitialAd;
    private RewardedAd rewardedAd;
    boolean isLoading;

    @Override    
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		if (!isTaskRoot()) {
            finish();
            return;
        }
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        JSBridge.mMainActivity = this;
        mInstance = this;
        mSplashDialog = new SplashDialog(this);
        mSplashDialog.showSplash();
        initEngine();
    }
    public void initEngine()
    {
        mProxy = new RuntimeProxy(this);
        mPlugin = new GameEngine(this);
        mPlugin.game_plugin_set_runtime_proxy(mProxy);
        mPlugin.game_plugin_set_option("localize","true");
        mPlugin.game_plugin_set_option("gameUrl", "http://stand.alone.version/index.js");
        mPlugin.game_plugin_init(3);
        View gameView = mPlugin.game_plugin_get_view();
        this.setContentView(R.layout.activity_main);

        this.gameContainer = findViewById(R.id.game_container);
        this.gameContainer.addView(gameView);

//        this.setContentView(gameView);


        // Initialize the Mobile Ads SDK.
        MobileAds.initialize(this, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) { }
        });

        RequestConfiguration requestConfiguration = MobileAds.getRequestConfiguration()
            .toBuilder()
            .setTagForChildDirectedTreatment(
                RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE)
            .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_G)
            .build();
        MobileAds.setRequestConfiguration(requestConfiguration);

        //加载横幅广告
        // Gets the ad view defined in layout/ad_fragment.xml with ad unit ID set in
        // values/strings.xml.
        this.adView = findViewById(R.id.ad_view);
        this.adView.loadAd(new AdRequest.Builder().build());
        this.adView.setVisibility(View.GONE);

        //激励广告初始化
        loadRewardedAd();

        //加载插页广告
//        loadInsertAd();

        isLoad=true;
    }

    private void loadRewardedAd() {
        if (rewardedAd == null) {
            isLoading = true;
            AdRequest adRequest = new AdRequest.Builder().build();
            RewardedAd.load(
                    this,
                    getString(R.string.ad_reward_id),
                    adRequest,
                    new RewardedAdLoadCallback() {
                        @Override
                        public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                            // Handle the error.
                            Log.d(TAG, loadAdError.getMessage());
                            rewardedAd = null;
                            MainActivity.this.isLoading = false;
//                            Toast.makeText(MainActivity.this, "onAdFailedToLoad", Toast.LENGTH_SHORT).show();
                            Toast.makeText(MainActivity.this, "The reward ad load failed.", Toast.LENGTH_SHORT).show();
                        }

                        @Override
                        public void onAdLoaded(@NonNull RewardedAd rewardedAd) {
                            MainActivity.this.rewardedAd = rewardedAd;
                            Log.d(TAG, "onAdLoaded");
                            MainActivity.this.isLoading = false;
//                            Toast.makeText(MainActivity.this, "onAdLoaded", Toast.LENGTH_SHORT).show();
                        }
                    });
        }
    }

    public void loadInsertAd() {
        AdRequest adRequest = new AdRequest.Builder().build();
        InterstitialAd.load(
                this,
                getString(R.string.ad_interstitial_id),
                adRequest,
                new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                        // The mInterstitialAd reference will be null until
                        // an ad is loaded.
                        MainActivity.this.mInterstitialAd = interstitialAd;
                        Log.i(TAG, "onInsertAdLoaded----------");
//                        Toast.makeText(MainActivity.this, "onInsertAdLoaded()", Toast.LENGTH_SHORT).show();
                        interstitialAd.setFullScreenContentCallback(
                                new FullScreenContentCallback() {
                                    @Override
                                    public void onAdDismissedFullScreenContent() {
                                        // Called when fullscreen content is dismissed.
                                        // Make sure to set your reference to null so you don't
                                        // show it a second time.
                                        MainActivity.this.mInterstitialAd = null;
                                        Log.d(TAG, "The ad was dismissed.");
                                        ConchJNI.RunJS("NativeCallback.onInsertVideoEnd()");
                                    }

                                    @Override
                                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                                        // Called when fullscreen content failed to show.
                                        // Make sure to set your reference to null so you don't
                                        // show it a second time.
                                        MainActivity.this.mInterstitialAd = null;
                                        Log.d(TAG, "The ad failed to show.");
                                        ConchJNI.RunJS("NativeCallback.onInsertVideoEnd()");

                                    }

                                    @Override
                                    public void onAdShowedFullScreenContent() {
                                        // Called when fullscreen content is shown.
                                        Log.d(TAG, "The ad was shown.");
//                                        ConchJNI.RunJS("NativeCallback.onInsertVideoEnd()");
                                    }
                                });
                    }

                    @Override
                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                        // Handle the error
                        Log.i(TAG, loadAdError.getMessage());
                        mInterstitialAd = null;
                        ConchJNI.RunJS("NativeCallback.onInsertVideoEnd()");
                        Toast.makeText(MainActivity.this, "The insert ad load failed.", Toast.LENGTH_SHORT).show();
//                        String error =
//                                String.format(
//                                        "domain: %s, code: %d, message: %s",
//                                        loadAdError.getDomain(), loadAdError.getCode(), loadAdError.getMessage());
//                        Toast.makeText(
//                                        MainActivity.this, "onAdFailedToLoad() with error: " + error, Toast.LENGTH_SHORT)
//                                .show();
                    }
                });
    }

    public void showRewardedVideo() {

        if (rewardedAd == null) {
            Log.d(TAG, "The rewarded ad wasn't ready yet.");
            Toast.makeText(MainActivity.this, "The rewarded ad wasn't ready yet.", Toast.LENGTH_SHORT).show();
            return;
        }
        //showVideoButton.setVisibility(View.INVISIBLE);

        rewardedAd.setFullScreenContentCallback(
                new FullScreenContentCallback() {
                    @Override
                    public void onAdShowedFullScreenContent() {
                        // Called when ad is shown.
                        Log.d(TAG, "onAdShowedFullScreenContent");
//                        Toast.makeText(MainActivity.this, "onAdShowedFullScreenContent", Toast.LENGTH_SHORT).show();
                        MainActivity.this.loadRewardedAd();
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        // Called when ad fails to show.
                        Log.d(TAG, "onAdFailedToShowFullScreenContent");
                        // Don't forget to set the ad reference to null so you
                        // don't show the ad a second time.
                        rewardedAd = null;
//                        Toast.makeText(MainActivity.this, "onAdFailedToShowFullScreenContent", Toast.LENGTH_SHORT).show();
                        ConchJNI.RunJS("NativeCallback.onVideoFail()");
                        MainActivity.this.loadRewardedAd();
                    }

                    @Override
                    public void onAdDismissedFullScreenContent() {
                        // Called when ad is dismissed.
                        // Don't forget to set the ad reference to null so you
                        // don't show the ad a second time.
                        rewardedAd = null;
                        Log.d(TAG, "onAdDismissedFullScreenContent");
//                        Toast.makeText(MainActivity.this, "onAdDismissedFullScreenContent", Toast.LENGTH_SHORT).show();
                        ConchJNI.RunJS("NativeCallback.onVideoFail()");
                        // Preload the next rewarded ad.
                        MainActivity.this.loadRewardedAd();
                    }
                });
        Activity activityContext = MainActivity.this;
        rewardedAd.show(
                activityContext,
                new OnUserEarnedRewardListener() {
                    @Override
                    public void onUserEarnedReward(@NonNull RewardItem rewardItem) {
                        // Handle the reward.
                        int rewardAmount = rewardItem.getAmount();
                        String rewardType = rewardItem.getType();
                        Log.d(TAG, "The user earned the reward.---- " + rewardType + " -- " + rewardAmount);
//                        ConchJNI.RunJS("NativeCallback.onVideoSuccess(" + rewardType + "-" + rewardAmount + ")");
                        ConchJNI.RunJS("NativeCallback.onVideoSuccess()");
                        MainActivity.this.loadRewardedAd();
                    }
                });
    }

    public void showInsertVideo() {
        if (mInterstitialAd == null) {
            Log.d(TAG, "The interstitial ad wasn't ready yet.");
            Toast.makeText(MainActivity.this, "The interstitial ad wasn't ready yet.", Toast.LENGTH_SHORT).show();
            return;
        }
        mInterstitialAd.show(this);
    }

    public  boolean isOpenNetwork(Context context)
    {
        if (!config.GetInstance().m_bCheckNetwork)
            return true;
        ConnectivityManager connManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        return connManager.getActiveNetworkInfo() != null && (connManager.getActiveNetworkInfo().isAvailable() && connManager.getActiveNetworkInfo().isConnected());
    }
    public void settingNetwork(final Context context, final int p_nType)
    {
        AlertDialog.Builder pBuilder = new AlertDialog.Builder(context);
        pBuilder.setTitle("连接失败，请检查网络或与开发商联系").setMessage("是否对网络进行设置?");
        // 退出按钮
        pBuilder.setPositiveButton("是", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface p_pDialog, int arg1) {
                Intent intent;
                try {
                    String sdkVersion = android.os.Build.VERSION.SDK;
                    if (Integer.valueOf(sdkVersion) > 10) {
                        intent = new Intent(
                                android.provider.Settings.ACTION_WIRELESS_SETTINGS);
                    } else {
                        intent = new Intent();
                        ComponentName comp = new ComponentName(
                                "com.android.settings",
                                "com.android.settings.WirelessSettings");
                        intent.setComponent(comp);
                        intent.setAction("android.intent.action.VIEW");
                    }
                    ((Activity)context).startActivityForResult(intent, p_nType);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        pBuilder.setNegativeButton("否", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
                ((Activity)context).finish();
            }
        });
        AlertDialog alertdlg = pBuilder.create();
        alertdlg.setCanceledOnTouchOutside(false);
        alertdlg.show();
    }
    public void onActivityResult(int requestCode, int resultCode,Intent intent) {

    }
    protected void onPause()
    {
        super.onPause();
        if(isLoad)mPlugin.game_plugin_onPause();
    }
    //------------------------------------------------------------------------------
    protected void onResume()
    {
        super.onResume();
        if(isLoad)mPlugin.game_plugin_onResume();
        
    }
    
    protected void onDestroy()
    {
        super.onDestroy();
        if(isLoad)mPlugin.game_plugin_onDestory();
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event)
    {
        return super.onKeyDown(keyCode, event);
    }


    public void hideBanner() {
        if (adView != null) {
            this.adView.setVisibility(View.GONE);
        }
    }

    public void showBanner() {
        Log.e("0", "============== showBanner ");
        if (adView != null) {
            this.adView.setVisibility(View.VISIBLE);
        }
        else {
            Toast.makeText(MainActivity.this, "The banner ad wasn't ready yet.", Toast.LENGTH_SHORT).show();
        }
    }
    //只有插页视频在这里主动load 激励视频看完直接就load了
    public void loadNextAd() {
        if (mInterstitialAd == null) {
            loadInsertAd();
        }
    }

    public void vibrateShort() {
        Vibrator vib = (Vibrator) this.getSystemService(Service.VIBRATOR_SERVICE);
        vib.vibrate(100);
    }

    public void vibrateLong() {
        Vibrator vib = (Vibrator) this.getSystemService(Service.VIBRATOR_SERVICE);
        vib.vibrate(1000);
    }
}
