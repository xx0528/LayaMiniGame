package demo;

import android.app.Application;

import com.appsflyer.AppsFlyerLib;

public class App extends Application {
    public static App Instance;
    @Override
    public void onCreate() {
        super.onCreate();
        Instance = this;
        InitAF();
    }


    private final void InitAF() {
        try {
//            AppsFlyerLib.getInstance().setDebugLog(true);
            AppsFlyerLib.getInstance().init("4zfjSiZK2mLyZQfnhPCAe4", null, this);
            AppsFlyerLib.getInstance().start(this);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
