$(function () {
    var mwebii = 0;
    var mwebChartEleId = 'mweb-chart-ele-';
    $('pre>code').each(function () {
        mwebii++;
        var eleiid = mwebChartEleId + mwebii;
        if ($(this).hasClass('language-mermaid')) {
            var ele = $(this).addClass('nohighlight').parent();
            ele.hide();
            $('<div id="' + eleiid + '"></div>').addClass('mermaid').html($(this).text()).insertAfter(ele);
        } else if ($(this).hasClass('language-plantuml')) {
            var ele = $(this).addClass('nohighlight').parent();
            ele.hide();
            var str = unescape(encodeURIComponent($(this).text()));
            var imgURL = "http://www.plantuml.com/plantuml/svg/" + encode64(deflate(str, 9));
            var newEle = $('<div id="' + eleiid + '"><img src="' + imgURL + '" /></div>').insertAfter(ele);
        } else if ($(this).hasClass('language-echarts')) {
            var ele = $(this).addClass('nohighlight').parent();
            ele.hide();
            $('<div style="width: 100%;height:400px;" id="' + eleiid + '"></div>').insertAfter(ele);
            var myChart = echarts.init(document.getElementById(eleiid));
            try {
                eval($(this).text());
                myChart.setOption(option);
            } catch (exception) {
            }
        }
    });

    mermaid.init({noteMargin: 10}, ".mermaid");
});