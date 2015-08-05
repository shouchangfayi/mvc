$(document).ready(function () {

    (function ($) {
        $('.tab ul.tabs').addClass('active').find('> a:eq(0)').addClass('current');

        //$('.tab ul.tabs li a').on("touchstart", function (g) {

        //    var tab = $(this).closest('.tab'),
		//		index = $(this).closest('a').index();

        //    $('ul.tabs > li > a').removeClass('current');
        //    $(this).addClass('current');

        //    tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').hide();
        //    tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').show();

        //    g.preventDefault();
        //});

        $('.tab ul.tabs li a').tap(function (g) {
            var tab = $(this).closest('.tab'),
				index = $('.tab ul.tabs li a').index($(this));// $(this).closest('a').index()

            $('ul.tabs > li > a').removeClass('current');
            $(this).addClass('current');

            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').hide();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').show();

            g.preventDefault();
        });
    })(jQuery);
});