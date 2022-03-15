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
import com.zoho.creator.framework.model.components.report.ZCReport;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ContactActivity extends ZCBaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);
        setStatusBarColor();


        /*
         * Defined the App Related Strings like Link Names and Display Names
         * App Link Name and Owner Name has been configured in an external file zcapp_info.properties
         */
        InputStream zcInpStream = getResources().openRawResource(R.raw.zcapp_info);
        Properties zcProps = new Properties();
        try {
            zcProps.load(zcInpStream);
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        findViewById(R.id.back_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        LinearLayout addcontactlayout = findViewById(R.id.add_button);
        addcontactlayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ContactActivity.this, AddContactActivity.class);
                startActivity(intent);
            }
        });

        String appName = "utility";
        String appOwner = zcProps.getProperty("AppOwnerName");
        String appLinkName = zcProps.getProperty("AppLinkName");

        String componentLinkName = "All_Contacts";
        String componentName = "All_Contacts";


        ZCApplication currentApp = new ZCApplication(appOwner, appName, appLinkName, false, null);
        ZCReport currentComponent = new ZCReport(appOwner, appLinkName, ZCComponentType.REPORT, componentName, componentLinkName);

        Fragment formFragment = SDKUtil.getFragmentViewForComponent(this, currentApp, currentComponent);
        currentComponent.getZCHtmlTag().setHasTitle(false);
        FragmentManager fm = getSupportFragmentManager();
        fm.beginTransaction().replace(R.id.body_layout, formFragment)
                .commit();


        findViewById(R.id.back_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
    }

    @Override
    protected void onToggleOfflineAndOnlineMode(boolean b, boolean b1) {

    }


    void setStatusBarColor() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(ContextCompat.getColor(this, R.color.default_purple));
        }
    }

}
