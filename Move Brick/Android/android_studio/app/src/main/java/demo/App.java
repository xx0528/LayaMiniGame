package demo;

import android.app.Application;

public class App extends Application {
    public static App Instance;
    @Override
    public void onCreate() {
        super.onCreate();
        Instance = this;
    }
}
