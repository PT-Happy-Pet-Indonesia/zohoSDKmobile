package com.example.zohocreatorsdk.sampleapp;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.BottomSheetDialog;
import android.support.v4.content.ContextCompat;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.EditorInfo;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.flexbox.FlexboxLayout;
import com.zoho.creator.a.ZCBaseActivity;
import com.zoho.creator.framework.apiutil.FormUtil;
import com.zoho.creator.framework.apiutil.ReportUtil;
import com.zoho.creator.framework.exception.ZCException;
import com.zoho.creator.framework.model.components.ZCComponent;
import com.zoho.creator.framework.model.components.ZCComponentType;
import com.zoho.creator.framework.model.components.form.ZCActionResult;
import com.zoho.creator.framework.model.components.form.ZCChoice;
import com.zoho.creator.framework.model.components.form.ZCField;
import com.zoho.creator.framework.model.components.form.ZCForm;
import com.zoho.creator.framework.model.components.report.ZCRecord;
import com.zoho.creator.framework.model.components.report.ZCRecordValue;
import com.zoho.creator.framework.model.components.report.ZCReport;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class SuppliesActivity extends ZCBaseActivity implements TaskInvoker {

    public static final int LOAD_CHOICES = 1000;
    public static final int SUBMIT_FORM = 1001;
    ArrayList<AssetItem> supplies;
    int status = LOAD_CHOICES;
    private BottomSheetDialog mBottomSheetDialog;
    private View sheetView;
    private Editable seatNumber;
    private GridView gridView;
    private BaseAdapter mAdapter;
    private String appLinkName;
    private String componentLinkName;
    private String appOwner;
    private String componentName;
    private String itemsFieldLinkName;
    private String locationFieldLinkName;
    private List<ZCChoice> choices;
    private String suppliesReportLinkName;
    private ZCRecord mRecord;
    private String selectSuppliesFieldLinkName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_supplies);
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

        componentLinkName = "Supplies";
        componentName = "Supplies";

        itemsFieldLinkName = "Select_Supplies";
        locationFieldLinkName = "Seating_Location";
        suppliesReportLinkName = "All_Supplies";
        selectSuppliesFieldLinkName = "Select_Supplies";


        gridView = findViewById(R.id.gridview);

        findViewById(R.id.back_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        findViewById(R.id.gridview).setVisibility(View.INVISIBLE);
        findViewById(R.id.progressbar_loading).setVisibility(View.VISIBLE);
        SimpleAsyncTask asyncTask = new SimpleAsyncTask(this);
        asyncTask.execute();
    }

    @Override
    protected void onToggleOfflineAndOnlineMode(boolean b, boolean b1) {

    }


    @Override
    public void doInBackground() throws ZCException, CloneNotSupportedException {

        if (status == LOAD_CHOICES) {
            // We first load the Supplies Form, and get the list of choices available.
            ZCComponent mComponent = new ZCComponent(appOwner, appLinkName, ZCComponentType.FORM, componentName, componentLinkName, 0);
            ZCForm mForm = FormUtil.getForm(mComponent);
            ZCField itemsField = mForm.getField(itemsFieldLinkName);
            choices = itemsField.getRecordValue().getChoices();
            supplies = new ArrayList<>();
            for (ZCChoice choice : choices) {
                supplies.add(getSupplyWithIcon(choice));
            }

        } else if (status == SUBMIT_FORM) {
            // Once the User has selected the required items, we set those values in the form, and then submit the form
            ZCComponent mComponent = new ZCComponent(appOwner, appLinkName, ZCComponentType.FORM, componentName, componentLinkName, 0);
            ZCForm mForm = FormUtil.getForm(mComponent);
            ZCField itemsField = mForm.getField(itemsFieldLinkName);
            ZCField locationField = mForm.getField(locationFieldLinkName);
            locationField.getRecordValue().setValue(seatNumber.toString());
            List<ZCChoice> choiceValues = new ArrayList<>();
            choices = itemsField.getRecordValue().getChoices();
            for (AssetItem item : supplies) {
                if (item.selected) {
                    choiceValues.add(new ZCChoice(item.name, item.name));
                }
            }
            itemsField.getRecordValue().setChoiceValues(choiceValues);

            // The ZCActionResult will contain the Record ID of the submitted record if successful. The Record ID is used to load the Report with that record only
            ZCActionResult result = FormUtil.buttonClick(mForm.getButtons().get(0));
            long mRecordId = result.getSuccessRecordID();

            mComponent = new ZCComponent(appOwner, appLinkName, ZCComponentType.REPORT, componentName, suppliesReportLinkName, 0);
            ZCReport report = ReportUtil.getReport(mComponent, String.valueOf(mRecordId));
            if (!report.getRecords().isEmpty()) {
                mRecord = report.getRecords().get(0);
            }
        }
    }

    @Override
    public void onPostExecute() {

        if (status == LOAD_CHOICES) {
            mAdapter = new BaseAdapter() {
                @Override
                public int getCount() {
                    return supplies.size();
                }

                @Override
                public AssetItem getItem(int position) {
                    return supplies.get(position);
                }

                @Override
                public long getItemId(int position) {
                    return position;
                }

                @Override
                public View getView(int position, View convertView, ViewGroup parent) {
                    if (convertView == null) {
                        convertView = LayoutInflater.from(SuppliesActivity.this).inflate(R.layout.supplies_grid_item, null, false);
                    }
                    final AssetItem currentItem = getItem(position);
                    ((ImageView) convertView.findViewById(R.id.image)).setImageResource(currentItem.selected ? currentItem.selResId : currentItem.resId);
                    convertView.findViewById(R.id.checked_icon).setVisibility(currentItem.selected ? View.VISIBLE : View.INVISIBLE);
                    TextView label = ((TextView) convertView.findViewById(R.id.label));
                    label.setText(currentItem.name);
                    label.setTextColor(currentItem.selected ? 0xFF000000 : 0xA6000000);
                    if (currentItem.selected) {
                        label.setTypeface(null, Typeface.BOLD);
                    } else {
                        label.setTypeface(null, Typeface.NORMAL);
                    }
                    convertView.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            currentItem.selected = !currentItem.selected;
                            notifyDataSetChanged();
                        }
                    });
                    return convertView;
                }
            };
            gridView.setAdapter(mAdapter);
            findViewById(R.id.next_button).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mBottomSheetDialog = new BottomSheetDialog(SuppliesActivity.this);
                    mBottomSheetDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
                    sheetView = getLayoutInflater().inflate(R.layout.supplies_submit_bottom_sheet, null);
                    mBottomSheetDialog.setContentView(sheetView);
                    ((View) sheetView.getParent()).setBackgroundColor(Color.TRANSPARENT);
                    mBottomSheetDialog.show();

                    sheetView.findViewById(R.id.cancel_button).setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            mBottomSheetDialog.dismiss();
                        }
                    });

                    sheetView.findViewById(R.id.submit_button).setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            seatNumber = ((EditText) sheetView.findViewById(R.id.editText2)).getText();
                            sheetView.findViewById(R.id.submit_textview).setVisibility(View.INVISIBLE);
                            sheetView.findViewById(R.id.progressbar).setVisibility(View.VISIBLE);
                            status = SUBMIT_FORM;
                            SimpleAsyncTask asyncTask = new SimpleAsyncTask(SuppliesActivity.this);
                            asyncTask.execute();
                        }
                    });
                    final EditText editText = sheetView.findViewById(R.id.editText2);
                    final EditText hiddenEditText = sheetView.findViewById(R.id.hiddenEditText);
                    hiddenEditText.setImeOptions(EditorInfo.IME_ACTION_DONE);
                    editText.setImeOptions(EditorInfo.IME_ACTION_DONE);
                    sheetView.post(new Runnable() {
                        @Override
                        public void run() {
                            hiddenEditText.requestFocus();
                            ((EditText) sheetView.findViewById(R.id.hiddenEditText)).addTextChangedListener(new TextWatcher() {
                                @Override
                                public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                                }

                                @Override
                                public void onTextChanged(CharSequence s, int start, int before, int count) {
                                    editText.setText(s);
                                }

                                @Override
                                public void afterTextChanged(Editable s) {

                                }
                            });
                        }
                    });
                }
            });
            findViewById(R.id.gridview).setVisibility(View.VISIBLE);
            findViewById(R.id.progressbar_loading).setVisibility(View.INVISIBLE);
        } else {

            mBottomSheetDialog.dismiss();
            mBottomSheetDialog = new BottomSheetDialog(SuppliesActivity.this);
            View resultSheetView = getLayoutInflater().inflate(R.layout.supplies_submit_result_bottom_sheet, null);
            ((TextView) resultSheetView.findViewById(R.id.sheet_subtitle)).setText(getString(R.string.supplies_receive, seatNumber.toString()));
            FlexboxLayout flexboxLayout = resultSheetView.findViewById(R.id.flexbox);

            for (AssetItem supply : supplies) {
                supply.selected = false;
            }
            if (mRecord != null) {
                for (ZCRecordValue value : mRecord.getValues()) {
                    if (value.getField().getFieldName().equals(selectSuppliesFieldLinkName)) {
                        List<ZCChoice> mValues = value.getChoiceValues();
                        for (ZCChoice mValue : mValues) {
                            View item = getLayoutInflater().inflate(R.layout.supplies_selected_item, null, false);
                            ((TextView) item.findViewById(R.id.item_name)).setText(mValue.getValue());
                            flexboxLayout.addView(item);
                        }
                    }
                }
            }
            resultSheetView.findViewById(R.id.close_button).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mBottomSheetDialog.dismiss();
                }
            });

            mBottomSheetDialog.setContentView(resultSheetView);
            ((View) resultSheetView.getParent()).setBackgroundColor(Color.TRANSPARENT);
            mBottomSheetDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
            mBottomSheetDialog.show();
            mAdapter.notifyDataSetChanged();
        }

    }

    void setStatusBarColor() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(ContextCompat.getColor(this, R.color.default_purple));
        }
    }

    AssetItem getAssetItem(int name, int resId, int selResId) {
        return new AssetItem(getString(name), resId, selResId);
    }

    private AssetItem getSupplyWithIcon(ZCChoice choice) {
        if (choice.getValue().equals(getString(R.string.supplies_cupboard_key))) {
            return (getAssetItem(R.string.supplies_cupboard_key, R.drawable.keys, R.drawable.keys_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_footrest))) {
            return (getAssetItem(R.string.supplies_footrest, R.drawable.footrest, R.drawable.footrest_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_back_buddy))) {
            return (getAssetItem(R.string.supplies_back_buddy, R.drawable.backbuddy, R.drawable.backbuddy_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_white_board))) {
            return (getAssetItem(R.string.supplies_white_board, R.drawable.whiteboard, R.drawable.whiteboard_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_bean_bag))) {
            return (getAssetItem(R.string.supplies_bean_bag, R.drawable.beanbag, R.drawable.beanbag_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_new_cupboard))) {
            return (getAssetItem(R.string.supplies_new_cupboard, R.drawable.cupboard, R.drawable.cupboard_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_name_board))) {
            return (getAssetItem(R.string.supplies_name_board, R.drawable.nameboard, R.drawable.nameboard_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_laptop_stand))) {
            return (getAssetItem(R.string.supplies_laptop_stand, R.drawable.laptopstand, R.drawable.laptopstand_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_chair))) {
            return (getAssetItem(R.string.supplies_chair, R.drawable.chair, R.drawable.chair_selected));
        } else if (choice.getValue().equals(getString(R.string.supplies_place_change))) {
            return (getAssetItem(R.string.supplies_place_change, R.drawable.placechange, R.drawable.placechange_selected));
        }
        return (getAssetItem(R.string.supplies_cupboard_key, R.drawable.keys, R.drawable.keys_selected));
    }

    class AssetItem {
        String name;
        boolean selected;
        int resId, selResId;


        public AssetItem(String name, int resId, int selResId) {
            this.name = name;
            this.selected = false;
            this.resId = resId;
            this.selResId = selResId;


        }

    }


}
