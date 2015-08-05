/// <reference path="JX.js" />

function showTiyanbiAds(isNew) {
    if (isNew == 1) {
        var showed = Util.CookieValue('showtiyanbiads');
        if (showed == '') {
            var s = [
                '<div class="tiyanbi">',
                '    <div class="tiyanbi_cover"></div>',
                '    <div class="tiyanbi_ads">',
                '        <div class="tiyanbi_main">',
                '            <img src="http://images.xxsy.net/mxxsynet/tiyanbi_ads.png" />',
                '            <a class="tiyanbi_button" href="Chongzhi.aspx">去充值</a>',
                '            <a class="tiyanbi_help" href="MyTiyanbiMark.aspx">体验币的秘密，你造吗？</a>',
                '        </div>',     
                '    </div>',
                '</div>'
            ];

            $('.tiyanbi').remove();
            $(s.join('')).appendTo('body');
            Util.CookieWrite('showtiyanbiads', '1', 60 * 24);

            $('.tiyanbi_main img').load(function () {
                $('.tiyanbi_cover').height($(document).height()).click(function () { $('.tiyanbi').remove(); });
                var box = $('.tiyanbi_ads');
                var top = ($(window).height() - box.height()) * 0.5 - 20;
                if (top < 0) top = 0;
                box.css({top: top + 'px' });
            });
        }
    }
}