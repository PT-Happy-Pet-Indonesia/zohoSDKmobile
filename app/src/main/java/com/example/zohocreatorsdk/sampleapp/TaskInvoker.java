package com.example.zohocreatorsdk.sampleapp;

import com.zoho.creator.framework.exception.ZCException;

/**
 * Interface used to provide Asynctask Methods to our Activities
 */
interface TaskInvoker {

    void doInBackground() throws ZCException, CloneNotSupportedException;

    void onPostExecute();
}
