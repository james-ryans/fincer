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
class PremiumWidget : AppWidgetProvider() {
    companion object {
        var PREMIUM_DATA: String = "com.fincer.android.premiumwidget.PREMIUM_DATA"
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE)
        val appString = sharedPref.getString("widgetData", "{\"premiums\": []}")

        for (appWidgetId in appWidgetIds) {
            val intent = Intent(context, PremiumWidgetService::class.java).apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
                putExtra(PREMIUM_DATA, appString)
                data = Uri.parse(toUri(Intent.URI_INTENT_SCHEME))
            }

            val rv = RemoteViews(context.packageName, R.layout.premium_widget).apply {
                setRemoteAdapter(R.id.list_view, intent)
                setEmptyView(R.id.list_view, R.id.empty_view)
            }

            val browserIntent = Intent(context, PremiumWidget::class.java).apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
            }

            intent.setData(Uri.parse(intent.toUri(Intent.URI_INTENT_SCHEME)))

            val browserPendingIntent = PendingIntent.getBroadcast(
                    context,
                    0,
                    browserIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT)
            rv.setPendingIntentTemplate(R.id.list_view, browserPendingIntent)

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
