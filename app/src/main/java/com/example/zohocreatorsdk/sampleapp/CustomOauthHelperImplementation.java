package com.example.zohocreatorsdk.sampleapp;

import android.content.Context;

import com.zoho.accounts.externalframework.ZohoSDK;
import com.zoho.creator.framework.exception.ZCException;
import com.zoho.creator.framework.interfaces.ZCOauthHelper;


public class CustomOauthHelperImplementation implements ZCOauthHelper {

    private final Context appContext;

    CustomOauthHelperImplementation(Context appContext) {
        this.appContext = appContext;
    }


    @Override
    public String getAccessToken() throws ZCException {
        return ZohoSDK.getInstance(appContext).getToken().getToken();
    }

    @Override
    public boolean isUserSignedIn() {
        return ZohoSDK.getInstance(appContext).isUserSignedIn();
    }

    @Override
    public Object getUserData() {
        return null;
    }

    @Override
    public String getTransformedUrl(String s) {
        return s;
    }

    @Override
    public boolean checkAndLogout() {
        return ZohoSDK.getInstance(appContext).checkAndLogout();
    }
}
