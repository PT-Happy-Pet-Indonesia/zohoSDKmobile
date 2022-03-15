package com.example.zohocreatorsdk.sampleapp;

import android.os.AsyncTask;

import com.zoho.creator.framework.exception.ZCException;

/**
 * A Simple Async Task that uses an Interface to delegate Async Task methods to our Activities
 */
public class SimpleAsyncTask extends AsyncTask<Object, Object, Object> {

    private final TaskInvoker invoker;

    SimpleAsyncTask(TaskInvoker invoker){
        this.invoker = invoker;
    }

    @Override
    protected Object doInBackground(Object... arg0) {
        try {
            invoker.doInBackground();
        } catch (ZCException e) {
            e.printStackTrace();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return  null;
    }

    @Override
    protected void onPostExecute(Object o) {
        invoker.onPostExecute();
    }
}
