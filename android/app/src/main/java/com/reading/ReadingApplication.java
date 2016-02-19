package com.reading;

import android.app.Application;

import com.tencent.bugly.crashreport.CrashReport;

/**
 * Created by richardcao on 16/2/5.
 */
public class ReadingApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        if (!BuildConfig.DEBUG) {
            CrashReport.initCrashReport(getApplicationContext(), "900019562", false);
        }
    }
}
