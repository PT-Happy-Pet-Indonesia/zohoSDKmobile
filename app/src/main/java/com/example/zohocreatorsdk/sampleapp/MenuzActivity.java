package com.example.zohocreatorsdk.sampleapp;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;

import com.zoho.creator.a.ZCBaseActivity;
import com.zoho.creator.a.utils.SDKUtil;
import com.zoho.creator.framework.model.ZCApplication;
import com.zoho.creator.framework.model.components.ZCComponent;
import com.zoho.creator.framework.model.components.ZCComponentType;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class MenuzActivity extends ZCBaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
//        setStatusBarColor();
//
        findViewById(R.id.back_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        LinearLayout shuttleLayout = findViewById(R.id.shuttle_layout);
        shuttleLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuzActivity.this, ShuttleActivity.class);
                startActivity(intent);
            }
        });

        LinearLayout complaintsLayout = findViewById(R.id.order_layout);
        complaintsLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuzActivity.this, ComplaintsActivity.class);
                startActivity(intent);
            }
        });
        LinearLayout stocklayout = findViewById(R.id.stock_layout);
        stocklayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuzActivity.this, TaskRecord.class);
                startActivity(intent);
            }
        });


        LinearLayout contactlayout = findViewById(R.id.contact_layout);
        contactlayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuzActivity.this, ContactActivity.class);
                startActivity(intent);
            }
        });
        /*
         * Defined the App Related Strings like Link Names and Display Names
         * App Link Name and Owner Name has been configured in an external file zcapp_info.properties
         */


    }

    @Override
    protected void onToggleOfflineAndOnlineMode(boolean b, boolean b1) {

    }
}
