package com.example.zohocreatorsdk.sampleapp;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.zoho.accounts.externalframework.ZohoSDK;
import com.zoho.creator.a.ZCBaseActivity;
import com.zoho.creator.a.utils.SDKUtil;
import com.zoho.creator.framework.apiutil.ZOHOCreatorUtil;
import com.zoho.creator.framework.exception.ZCException;
import com.zoho.creator.framework.model.ZCApplication;
import com.zoho.creator.framework.model.components.ZCComponent;
import com.zoho.creator.framework.model.components.ZCComponentType;
import com.zoho.creator.framework.model.components.report.ZCReport;
import com.zoho.creator.framework.user.ZOHOUser;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Properties;

public class HomeActivity extends ZCBaseActivity implements TaskInvoker {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_home);
        setStatusBarColor();

        // Loading the User Details to set on our home screen
        setUserDetails();
        findViewById(R.id.menu_layouut).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this,MenuzActivity.class);
                startActivity(intent);

            }
        });
        // Showing sign out option on click of the profile icon
        findViewById(R.id.profile_icon).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                AlertDialog.Builder builder = new AlertDialog.Builder(HomeActivity.this);
                builder.setTitle(R.string.common_signout);
                builder.setMessage(R.string.common_signout_message);

                builder.setPositiveButton(R.string.common_signout_confirm, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        ZohoSDK sdk = ZohoSDK.getInstance(getApplicationContext());
                        if (sdk.isUserSignedIn()) {
                            sdk.revoke(new ZohoSDK.OnLogoutListener() {
                                @Override
                                public void onLogoutSuccess() {
                                    ZOHOUser.setUserCredentialNull();
                                }

                                @Override
                                public void onLogoutFailed() {
                                    ZOHOUser.setUserCredentialNull();
                                }
                            });
                            finish();
                        }
                    }
                });

                builder.setNegativeButton(R.string.common_cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
                AlertDialog dialog = builder.show();

            }
        });
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

        String componentLinkName = "Shuttle";
        String componentName = "Shuttle";
        String ReportLinkName = "All_Shuttles";
        String ReportName = "All_Shuttles";


        ZCApplication currentApp = new ZCApplication(appOwner, appName, appLinkName, false, null);
//        ZCComponent currentComponent = new ZCComponent(appOwner, appLinkName, ZCComponentType.FORM, componentName, componentLinkName, 0);
//        ZCReport currentReport = new ZCReport (appOwner,appLinkName,ReportLinkName,ZCComponentType.REPORT);
        ZCReport currentReport = new ZCReport(appOwner,appLinkName, ZCComponentType.REPORT,ReportLinkName,ReportName);


        Fragment formFragment = SDKUtil.getFragmentViewForComponent(this, currentApp, currentReport);
//        currentComponent.getZCHtmlTag().setHasTitle(false);
        currentReport.getZCHtmlTag().setHasTitle(false);
        FragmentManager fm = getSupportFragmentManager();
        fm.beginTransaction().replace(R.id.body_layout, formFragment)
                .commit();



    }

    private void setUserDetails() {

        // Getting the stored value of user details, or loading from web if not available
        SharedPreferences prefs = getSharedPreferences("userdetails", MODE_PRIVATE);
        String displayName = prefs.getString("displayName", null);
        String email = prefs.getString("email", null);
        if (!(displayName == null || email == null)) {
            ((TextView) findViewById(R.id.user_name)).setText(displayName);
            ((TextView) findViewById(R.id.user_id)).setText(email);
        }
        new SimpleAsyncTask(this).execute();


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

    @Override
    public void doInBackground() throws ZCException, CloneNotSupportedException {
        // We load the User Details from web
        try {
            ZOHOUser.setZOHOUser(new ZOHOUser("", "", new ArrayList<String>(1), "", ""));
        } catch (ZCException e) {
            e.printStackTrace();
        }
        try {
            ZOHOCreatorUtil.getZohoUser().setZohoUserDetailsForOAuth(true);
        } catch (ZCException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onPostExecute() {
        try {
            String displayName = ZOHOCreatorUtil.getZohoUser().getDisplayName();
            String email = ZOHOCreatorUtil.getZohoUser().getEmailAddresses().get(0);

            SharedPreferences prefs = getSharedPreferences("userdetails", MODE_PRIVATE);
            prefs.edit().putString("displayName", displayName).putString("email", email).apply();

            ((TextView) findViewById(R.id.user_name)).setText(displayName);
            ((TextView) findViewById(R.id.user_id)).setText(email);
        } catch (ZCException e) {
            e.printStackTrace();
        }
    }

}
