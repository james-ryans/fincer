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

class NewsWidgetService: RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory {
        return NewsRemoteViewsFactory(this.applicationContext, intent)
    }
}

class NewsRemoteViewsFactory(context: Context, intent: Intent) : RemoteViewsService.RemoteViewsFactory {
    private var mContext: Context = context
    private val mWidgetItems: MutableList<NewsItem> = mutableListOf()
    private val newsString = intent.getStringExtra(NewsWidget.NEWS_DATA)
    private var mAppWidgetId: Int = intent.getIntExtra(
            AppWidgetManager.EXTRA_APPWIDGET_ID,
            AppWidgetManager.INVALID_APPWIDGET_ID
    )

    override fun onCreate() {
        val newsData = JSONObject(newsString ?: "{}").getJSONArray("news")
        for (i in 0 until newsData.length()) {
            val curData = newsData.getJSONObject(i)
            mWidgetItems.add(NewsItem(
                    curData.getString("title"),
                    curData.getString("abstract"),
                    curData.getString("url"),
                    curData.getString("byline"),
                    DownloadImageTask().execute(curData.getString("thumbnail")).get(),
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
        return RemoteViews(mContext.packageName, R.layout.news_widget_item).apply {
            setTextViewText(R.id.news_title, mWidgetItems[position].title)
            setTextViewText(R.id.news_abstract, mWidgetItems[position].abstract)
            setTextViewText(R.id.news_byline, mWidgetItems[position].byline)
            setImageViewBitmap(R.id.news_thumbnail, mWidgetItems[position].thumbnail)

            val fillInIntent = Intent().apply {
                Bundle().also { extras ->
                    extras.putString(NewsWidget.EXTRA_ITEM, mWidgetItems[position].url)
                    putExtras(extras)
                }
            }

            setOnClickFillInIntent(R.id.news_widget_item, fillInIntent)
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
