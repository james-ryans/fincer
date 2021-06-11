package com.fincer

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import android.widget.RemoteViews

/**
 * Implementation of App Widget functionality.
 */
class NewsWidget : AppWidgetProvider() {
    companion object {
        var BROWSER_ACTION: String = "com.fincer.android.newswidget.BROWSER_ACTION"
        var EXTRA_ITEM: String = "com.fincer.android.newswidget.EXTRA_ITEM"
        var NEWS_DATA: String = "com.fincer.android.newswidget.NEWS_DATA"
    }

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == BROWSER_ACTION) {
            val itemURL: String? = intent.getStringExtra(EXTRA_ITEM)
            if (itemURL !== null) {
                val browserIntent = Intent(Intent.ACTION_VIEW).apply {
                    data = Uri.parse(itemURL)
                }

                browserIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(browserIntent)
            }
        }
        super.onReceive(context, intent)
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE)
        val appString = sharedPref.getString("widgetData", "{\"news\": []}")

        for (appWidgetId in appWidgetIds) {
            val intent = Intent(context, NewsWidgetService::class.java).apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
                putExtra(NEWS_DATA, appString)
                data = Uri.parse(toUri(Intent.URI_INTENT_SCHEME))
            }

            val rv = RemoteViews(context.packageName, R.layout.news_widget).apply {
                setRemoteAdapter(R.id.stack_view, intent)
                setEmptyView(R.id.stack_view, R.id.empty_view)
            }

            val browserIntent = Intent(context, NewsWidget::class.java).apply {
                action = BROWSER_ACTION
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
            }

            intent.setData(Uri.parse(intent.toUri(Intent.URI_INTENT_SCHEME)))

            val browserPendingIntent = PendingIntent.getBroadcast(
                    context,
                    0,
                    browserIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT)
            rv.setPendingIntentTemplate(R.id.stack_view, browserPendingIntent)

            appWidgetManager.updateAppWidget(appWidgetId, rv)
        }
        super.onUpdate(context, appWidgetManager, appWidgetIds)
    }

    override fun onDeleted(context: Context, appWidgetIds: IntArray) {
        super.onDeleted(context, appWidgetIds)
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
    }
}
