package com.example.zohocreatorsdk.sampleapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.zoho.accounts.externalframework.ZohoSDK;

public class HandleRedirectActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ZohoSDK.getInstance(this).handleRedirection(this);
        setContentView(R.layout.activity_handle_redirect);
    }
}
