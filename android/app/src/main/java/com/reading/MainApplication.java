/**
 * Copyright 2016-present reading
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p/>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p/>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.reading;

import android.app.Application;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.richardcao.exceptionsmanager.react.ExceptionsManager;
import com.tencent.bugly.crashreport.CrashReport;
import com.theweflex.react.WeChatPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        if (!BuildConfig.DEBUG) {
            CrashReport.initCrashReport(getApplicationContext(), "900019562", false);
        }
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected ReactInstanceManager createReactInstanceManager() {
            ReactInstanceManagerBuilder builder = ReactInstanceManager.builder()
                    .setApplication(getApplication())
                    .setJSMainModulePath(getJSMainModuleName())
                    .setUseDeveloperSupport(getUseDeveloperSupport())
                    .setRedBoxHandler(getRedBoxHandler())
                    .setUIImplementationProvider(getUIImplementationProvider())
                    .setInitialLifecycleState(LifecycleState.BEFORE_CREATE)
                    .setNativeModuleCallExceptionHandler(
                            new ReadingNativeModuleCallExceptionHandler());

            for (ReactPackage reactPackage : getPackages()) {
                builder.addPackage(reactPackage);
            }

            String jsBundleFile = getJSBundleFile();
            if (jsBundleFile != null) {
                builder.setJSBundleFile(jsBundleFile);
            } else {
                builder.setBundleAssetName(Assertions.assertNotNull(getBundleAssetName()));
            }
            return builder.build();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = Arrays.asList(
                    new MainReactPackage(),
                    new SplashScreenReactPackage(),
                    new WeChatPackage(),
                    new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG),
                    new RNDeviceInfo(),
                    new VectorIconsPackage());
            ArrayList<ReactPackage> packageList = new ArrayList<>(packages);
            if (!BuildConfig.DEBUG) {
                packageList.add(new ExceptionsManager());
            }
            return packageList;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
