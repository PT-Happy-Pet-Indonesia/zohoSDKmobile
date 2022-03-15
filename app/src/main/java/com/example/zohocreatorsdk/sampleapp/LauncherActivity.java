package com.example.zohocreatorsdk.sampleapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;

import com.zoho.accounts.externalframework.ZohoErrorCodes;
import com.zoho.accounts.externalframework.ZohoSDK;
import com.zoho.accounts.externalframework.ZohoToken;
import com.zoho.accounts.externalframework.ZohoTokenCallback;
import com.zoho.creator.a.ZCBaseActivity;
import com.zoho.creator.framework.apiutil.ZOHOCreatorUtil;

public class LauncherActivity extends ZCBaseActivity {

    public static final String SCOPES = "aaaserver.profile.READ,zohocontacts.userphoto.READ,ZohoCreator.meta.READ,ZohoCreator.data.READ,ZohoCreator.meta.CREATE,ZohoCreator.data.CREATE,ZohoContacts.contactapi.READ";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);
        ZOHOCreatorUtil.setOAuthHelper(new CustomOauthHelperImplementation(getApplicationContext()));

        final ZohoSDK sdk = ZohoSDK.getInstance(getApplicationContext());
        sdk.init(SCOPES, true);
        (new Handler()).postDelayed(new Runnable() {

            @Override
            public void run() {
                if (!sdk.isUserSignedIn()) {
                    sdk.presentLoginScreen(LauncherActivity.this, new ZohoTokenCallback() {
                        @Override
                        public void onTokenFetchInitiated() {

                        }

                        @Override
                        public void onTokenFetchComplete(ZohoToken zohoToken) {
                            SharedPreferences prefs = getSharedPreferences("userdetails", MODE_PRIVATE);
                            prefs.edit().remove("displayName").remove("email").apply();
                            startActivity(new Intent(LauncherActivity.this, HomeActivity.class));
                            finish();
                        }

                        @Override
                        public void onTokenFetchFailed(ZohoErrorCodes zohoErrorCodes) {
                            finish();
                        }
                    }, null);
                } else {
                    startActivity(new Intent(LauncherActivity.this, HomeActivity.class));
                    finish();
                }
            }
        }, 1000);
    }

    @Override
    protected void onToggleOfflineAndOnlineMode(boolean b, boolean b1) {

    }

}
