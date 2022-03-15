package com.example.zohocreatorsdk.sampleapp;

import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;

import com.zoho.creator.a.ZCBaseActivity;
import com.zoho.creator.a.ZCPageUtil;
import com.zoho.creator.a.utils.SDKUtil;
import com.zoho.creator.framework.model.ZCApplication;
import com.zoho.creator.framework.model.components.ZCComponent;
import com.zoho.creator.framework.model.components.ZCComponentType;
import com.zoho.creator.framework.model.components.page.ZCPage;
import com.zoho.creator.framework.model.components.report.ZCReport;


import java.io.IOException;
import java.io.InputStream;
import java.security.PublicKey;
import java.util.Date;
import java.util.Properties;

public class TaskRecord extends ZCBaseActivity {
    private class IgnoreSSLErrorWebViewClient extends WebViewClient {
        // You can all the class anythin


        @Override
        public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
            handler.proceed(); // When an error occurs, ignore and go on
        }
    }

    private WebView MyWebView;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.report_task);
        setStatusBarColor();


        findViewById(R.id.back_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });


        /*
         * Defined the App Related Strings like Link Names and Display Names
         * App Link Name and Owner Name has been configured in an external file zcapp_info.properties
         */
MyWebView=(WebView) findViewById(R.id.Web_Creator);
//MyWebView.setWebViewClient(new IgnoreSSLErrorWebViewClient());
MyWebView.setWebViewClient( new WebViewClient(){
    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        //super.onReceivedSslError(view, handler, error);
        handler.proceed();//skip ssl error
    }
});
//        WebSettings settings = MyWebView.getSettings();
//        settings.setUseWideViewPort(true);
//        settings.setLoadWithOverviewMode(true);




//MyWebView.loadUrl("https://analytics.zoho.com/open-view/1740061000002754554");
        MyWebView.loadUrl("https://zoho.com/one");


WebSettings webSettings=MyWebView.getSettings();
webSettings.setJavaScriptEnabled(true);





//        findViewById(R.id.back_button).setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                onBackPressed();
//            }
//        });
    }

    public class MyWebClient extends WebViewClient{


        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon){
            super.onPageStarted(view, url, favicon);

        }
        @Override
        public boolean shouldOverrideUrlLoading(WebView view,String url){
            view.loadUrl(url);
            return true;
        }
    }
    @Override
    public void onBackPressed(){
        if(MyWebView.canGoBack()){
            MyWebView.goBack();
        }
        else{
            super .onBackPressed();
        }
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
