package com.fincer

import android.appwidget.AppWidgetManager
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.AsyncTask
import android.os.Bundle
import android.util.Log
import android.widget.RemoteViews
import android.widget.RemoteViewsService
import org.json.JSONObject
import java.lang.Exception
import java.net.URL

class PremiumWidgetService: RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory {
        return PremiumRemoteViewsFactory(this.applicationContext, intent)
    }
}

class PremiumRemoteViewsFactory(context: Context, intent: Intent) : RemoteViewsService.RemoteViewsFactory {
    private var mContext: Context = context
    private val mWidgetItems: MutableList<PremiumItem> = mutableListOf()
    private val newsString = intent.getStringExtra(PremiumWidget.PREMIUM_DATA)

    override fun onCreate() {
        val premiumsData = JSONObject(newsString ?: "{}").getJSONArray("premiums")
        for (i in 0 until premiumsData.length()) {
            val curData = premiumsData.getJSONObject(i)
            mWidgetItems.add(PremiumItem(
                    curData.getString("name"),
                    curData.getString("subcategory"),
                    DownloadImageTask().execute(curData.getString("imageURI")).get(),
            ))
        }
    }

    override fun onDataSetChanged() {
    }

    override fun onDestroy() {
        mWidgetItems.clear()
    }

    override fun getCount(): Int {
        return mWidgetItems.size
    }

    override fun getViewAt(position: Int): RemoteViews {
        return RemoteViews(mContext.packageName, R.layout.premium_widget_item).apply {
            setTextViewText(R.id.premium_name, mWidgetItems[position].name)
            setTextViewText(R.id.premium_subcategory, mWidgetItems[position].subcategory)
            setImageViewBitmap(R.id.premium_image, mWidgetItems[position].imageURI)
        }
    }

    override fun getLoadingView(): RemoteViews? {
        return null
    }

    override fun getViewTypeCount(): Int {
        return 1
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun hasStableIds(): Boolean {
        return true
    }

    private class DownloadImageTask: AsyncTask<String, Void, Bitmap>() {
        override fun doInBackground(vararg params: String): Bitmap {
            lateinit var bmp: Bitmap
            try {
                val url = URL(params[0])
                bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream())
            } catch (e: Exception) {
                e.printStackTrace()
            }

            return bmp
        }
    }
}