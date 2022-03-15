package com.example.zohocreatorsdk.sampleapp;

import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.zoho.creator.a.ZCBaseActivity;
import com.zoho.creator.a.utils.SDKUtil;
import com.zoho.creator.framework.model.ZCApplication;
import com.zoho.creator.framework.model.components.ZCComponent;
import com.zoho.creator.framework.model.components.ZCComponentType;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ComplaintsActivity extends ZCBaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_complaints);
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

        String appName = "utility";
        String appOwner = zcProps.getProperty("AppOwnerName");
        String appLinkName = zcProps.getProperty("AppLinkName");

        String componentLinkName = "New_Order";
        String componentName = "New_Order";


        /*
         * App and Component Objects are constructed, and then we obtain the Form Fragment which is to be embedded in the Activity
         */
        ZCApplication currentApp = new ZCApplication(appOwner, appName, appLinkName, false, null);
        ZCComponent currentComponent = new ZCComponent(appOwner, appLinkName, ZCComponentType.FORM, componentName, componentLinkName, 0);
        Fragment formFragment = SDKUtil.getFragmentViewForComponent(this, currentApp, currentComponent);

        // Title of the Form is hidden
        currentComponent.getZCHtmlTag().setHasTitle(false);


        FragmentManager fm = getSupportFragmentManager();
        fm.beginTransaction().replace(R.id.framelayout, formFragment)
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
