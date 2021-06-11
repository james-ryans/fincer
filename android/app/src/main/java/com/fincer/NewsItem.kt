package com.fincer

import android.graphics.Bitmap

data class NewsItem(
        val title: String,
        val abstract: String,
        val url: String,
        val byline: String,
        val thumbnail: Bitmap,
) {
}
