package com.example.zohocreatorsdk.sampleapp;

import android.app.Activity;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.BottomSheetDialog;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.zoho.creator.a.ZCBaseActivity;
import com.zoho.creator.framework.apiutil.FormUtil;
import com.zoho.creator.framework.apiutil.ReportUtil;
import com.zoho.creator.framework.exception.ZCException;
import com.zoho.creator.framework.model.components.ZCComponent;
import com.zoho.creator.framework.model.components.ZCComponentType;
import com.zoho.creator.framework.model.components.form.ZCActionResult;
import com.zoho.creator.framework.model.components.form.ZCChoice;
import com.zoho.creator.framework.model.components.form.ZCForm;
import com.zoho.creator.framework.model.components.report.ZCRecord;
import com.zoho.creator.framework.model.components.report.ZCRecordValue;
import com.zoho.creator.framework.model.components.report.ZCReport;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class CanteenActivity extends ZCBaseActivity implements TaskInvoker {


    public static final int LOAD_CHOICES = 1000;
    public static final int SUBMIT_FORM = 1001;
    int status = LOAD_CHOICES;
    private String appLinkName;
    private String componentLinkName;
    private String appOwner;
    private String componentName;
    private String itemsFieldLinkName;
    private String locationFieldLinkName;
    private List<ZCChoice> choices;
    private ZCForm mForm;
    private String todaysSpecialFieldLinkName;
    private String casserolesFieldLinkName;
    private String canteenReportLinkName;
    private List<FoodItem> specials;
    private List<FoodItem> casseroles;
    private BottomSheetDialog mBottomSheetDialog;
    private View sheetView;
    private ZCRecord mRecord;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_canteen);
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

        appOwner = zcProps.getProperty("AppOwnerName");
        appLinkName = zcProps.getProperty("AppLinkName");

        componentLinkName = "Canteen";
        componentName = "Canteen";

        todaysSpecialFieldLinkName = "Todays_Special";
        casserolesFieldLinkName = "Casseroles";
        canteenReportLinkName = "All_Canteens";

        SimpleAsyncTask asyncTask = new SimpleAsyncTask(this);
        findViewById(R.id.scrollview).setVisibility(View.INVISIBLE);
        findViewById(R.id.progressbar_loading).setVisibility(View.VISIBLE);
        findViewById(R.id.button_order_now).setVisibility(View.INVISIBLE);

        asyncTask.execute();

        View orderButton = findViewById(R.id.button_order_now);
        orderButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                status = SUBMIT_FORM;
                SimpleAsyncTask asyncTask1 = new SimpleAsyncTask(CanteenActivity.this);
                findViewById(R.id.order_now_textview).setVisibility(View.INVISIBLE);
                findViewById(R.id.progressbar).setVisibility(View.VISIBLE);
                asyncTask1.execute();
            }
        });

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


    FoodItem getFoodItem(String name) {
        return new FoodItem(this, name, true);
    }

    @Override
    public void doInBackground() throws ZCException, CloneNotSupportedException {
        if (status == LOAD_CHOICES) {
            // We first load the Canteen Form, and get the list of choices available.
            ZCComponent mComponent = new ZCComponent(appOwner, appLinkName, ZCComponentType.FORM, componentName, componentLinkName, 0);
            mForm = FormUtil.getForm(mComponent);
            specials = new ArrayList<>();
            for (ZCChoice choice : mForm.getField(todaysSpecialFieldLinkName).getRecordValue().getChoices()) {
                specials.add(getFoodItem(choice.getKey()));
            }
            casseroles = new ArrayList<>();
            for (ZCChoice choice : mForm.getField(casserolesFieldLinkName).getRecordValue().getChoices()) {
                casseroles.add(getFoodItem(choice.getKey()));

            }

        } else if (status == SUBMIT_FORM) {
            // Once the User has selected the required items, we set those values in the form, and then submit the form
            ArrayList<ZCChoice> specialsChoiceList = new ArrayList<>();
            ArrayList<ZCChoice> casserolesChoiceList = new ArrayList<>();
            for (FoodItem item : specials) {
                if (item.selected) {
                    specialsChoiceList.add(new ZCChoice(item.name, item.name));
                }
            }
            for (FoodItem item : casseroles) {
                if (item.selected) {
                    casserolesChoiceList.add(new ZCChoice(item.name, item.name));
                }
            }
            mForm.getField(todaysSpecialFieldLinkName).getRecordValue().setChoiceValues(specialsChoiceList);
            mForm.getField(casserolesFieldLinkName).getRecordValue().setChoiceValues(casserolesChoiceList);

            // The ZCActionResult will contain the Record ID of the submitted record if successful. The Record ID is used to load the Report with that record only
            ZCActionResult result = FormUtil.buttonClick(mForm.getButtons().get(0));
            long mRecordId = result.getSuccessRecordID();

            ZCComponent mComponent = new ZCComponent(appOwner, appLinkName, ZCComponentType.REPORT, componentName, canteenReportLinkName, 0);
            ZCReport report = ReportUtil.getReport(mComponent, String.valueOf(mRecordId));
            if (!report.getRecords().isEmpty()) {
                mRecord = report.getRecords().get(0);
            }

        }
    }

    @Override
    public void onPostExecute() {
        if (status == LOAD_CHOICES) {
            LinearLayout specialsLayout = findViewById(R.id.specials_layout);
            LinearLayout leftLayout = specialsLayout.findViewById(R.id.left);
            LinearLayout rightLayout = specialsLayout.findViewById(R.id.right);
            leftLayout.removeAllViews();
            rightLayout.removeAllViews();
            for (int i = 0; i < specials.size(); i++) {
                FoodItem item = specials.get(i);
                if (i % 2 == 0) {
                    leftLayout.addView(item.contentView);
                } else {
                    rightLayout.addView(item.contentView);
                }
            }


            LinearLayout casserolesLayout = findViewById(R.id.casseroles_layout);
            leftLayout = casserolesLayout.findViewById(R.id.left2);
            rightLayout = casserolesLayout.findViewById(R.id.right2);
            leftLayout.removeAllViews();
            rightLayout.removeAllViews();
            for (int i = 0; i < casseroles.size(); i++) {
                FoodItem item = casseroles.get(i);
                if (i % 2 == 0) {
                    leftLayout.addView(item.contentView);
                } else {
                    rightLayout.addView(item.contentView);
                }
            }
            findViewById(R.id.scrollview).setVisibility(View.VISIBLE);
            findViewById(R.id.progressbar_loading).setVisibility(View.INVISIBLE);
            findViewById(R.id.button_order_now).setVisibility(View.VISIBLE);

        } else {
            if (mRecord != null) {
                ArrayList<FoodItem> mItems = new ArrayList<FoodItem>();
                for (ZCRecordValue value : mRecord.getValues()) {
                    if (value.getField().getFieldName().equals(todaysSpecialFieldLinkName) || value.getField().getFieldName().equals(casserolesFieldLinkName)) {
                        List<ZCChoice> mValues = value.getChoiceValues();
                        for (ZCChoice mValue : mValues) {
                            mItems.add(new FoodItem(CanteenActivity.this, mValue.getValue(), false));
                        }
                    }
                }


                mBottomSheetDialog = new BottomSheetDialog(CanteenActivity.this);
                sheetView = getLayoutInflater().inflate(R.layout.canteen_submit_bottom_sheet, null);
                LinearLayout reportLayout = sheetView.findViewById(R.id.container);
                LinearLayout leftLayout = reportLayout.findViewById(R.id.left);
                LinearLayout rightLayout = reportLayout.findViewById(R.id.right);
                for (int i = 0; i < mItems.size(); i++) {
                    FoodItem item = mItems.get(i);
                    if (i % 2 == 0) {
                        leftLayout.addView(item.contentView);
                    } else {
                        rightLayout.addView(item.contentView);
                    }
                }
                mBottomSheetDialog.setContentView(sheetView);
                ((View) sheetView.getParent()).setBackgroundColor(Color.TRANSPARENT);
                mBottomSheetDialog.show();

                mBottomSheetDialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
                    @Override
                    public void onDismiss(DialogInterface dialog) {
                        SimpleAsyncTask asyncTask = new SimpleAsyncTask(CanteenActivity.this);
                        status = LOAD_CHOICES;
                        asyncTask.execute();
                    }
                });
                mRecord = null;
            }
            findViewById(R.id.order_now_textview).setVisibility(View.VISIBLE);
            findViewById(R.id.progressbar).setVisibility(View.INVISIBLE);
        }
    }

    void setStatusBarColor() {
        Window window = getWindow();
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.setStatusBarColor(ContextCompat.getColor(this, R.color.default_purple));
        }
    }

    public class FoodItem {
        String name;
        boolean selected;
        View contentView;
        private TextView titleText;
        private ImageView imageView;

        FoodItem(Activity activity, String name, boolean isForm) {
            this.name = name;
            this.selected = false;

            contentView = activity.getLayoutInflater().inflate(R.layout.food_item, null, false);
            titleText = contentView.findViewById(R.id.food_title);
            imageView = contentView.findViewById(R.id.checked_icon);

            imageView.setVisibility(View.INVISIBLE);
            titleText.setText(name);
            if (isForm) {
                contentView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        FoodItem.this.selected = !FoodItem.this.selected;
                        imageView.setVisibility(FoodItem.this.selected ? View.VISIBLE : View.INVISIBLE);
                    }
                });
            } else {
                imageView.setVisibility(View.INVISIBLE);
            }

        }
    }

}
