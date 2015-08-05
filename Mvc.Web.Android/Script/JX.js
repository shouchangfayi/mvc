/// <reference path="jQuery.Min.js" />

(function () {

    window.Util = {

        Alert: function (msg, callback) {

            var htm = [
                '<div id="_jxalertbox" class="alertbox">',
                '    <div class="alert-div"><p>' + msg + '</p></div>',
                '</div>'
            ];
            
            $("#_jxalertbox").remove();
            $(htm.join("")).appendTo("body");

            var box = $("#_jxalertbox");
            var top = ($(window).height() - box.height()) / 2 - 20 + $(window).scrollTop();
            if (top < 10) top = 10;
            box.css({ top: top + "px" });
            //box.css({ top: ($(window).height() - box.height() - 20 + $(window).scrollTop()) + "px" });
            
            setTimeout(function () {
                $("#_jxalertbox").remove();
                if (typeof callback == "function") {
                    callback();
                }
            }, 2000);

        },

        Loading: function (msg) {
            var htm = [
                '<div id="_jxloadingbox" class="loadingbox">',
                '    <div class="loading-div">',
                '    </div>',
                '</div>'
            ];
            $("#_jxloadingbox").remove();
            $(htm.join("")).appendTo("body");
            var lbox = $("#_jxloadingbox");
            lbox.css({ top: ($(window).height() - lbox.height()) * 0.4 + $(window).scrollTop() + "px" });
        },

        LoadingClear: function () {
            $("#_jxloadingbox").remove();
        },

        _Cookie: function (name, value, options) {

            if (typeof value != 'undefined') {

                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }

                var expires = '';

                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString();
                }
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else {
                var cookieValue = '';
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        },

        CookieValue: function (cookieName) {
            return this._Cookie(cookieName);
        },

        CookieWrite: function (name , value , expires) {
            this._Cookie(name, value, { path: '/', expires: expires, domain: '.xxsy.net' });
        },

        NumberFormat: function (number) {
            var number = parseInt(number);
            if (number > 10000) return parseInt(number / 10000) + "万";
            return number + "";
        },
        /*返回上一页*/
        goBack : function () {          
            if (document.referrer == "") {
                location.href = "\\";
                return;
            }
            history.go(-1);
        },
        /*获取手机唯一标识*/
        getDevice: function () {
            var device = "";
            try { device = XiaoXiangJS.getDeviceId(); }
            catch (e) { device = "4C15E022E7D479DF"; /*"DE0DC06D12A1E6D66997DC96CCEE51AF";*/ };
            return device;
        },
        /*获取设备类型*/
        getDeviceType: function () {
            var value = "";
            try { value = XiaoXiangJS.getMobileModel(); }
            catch (e) { }
            return value;
        },
        /*获取版本号*/
        getVersion: function () {
            var version = 2.10;
            try { version = XiaoXiangJS.getVersion(); }
            catch (e) { }
            return version;
        },
        /*获取版本标识*/
        getVersion2: function () {
            var version = "1CBB88DB41FD7250";
            try { version = XiaoXiangJS.getVersion2(); }
            catch (e) { }
            return version;
        },
        /*检测用户合法性*/
        checkUser: function (userid) {
            ajaxLocalService("user_check", { userid: userid }
                , function (response){
                    if (response.Data == "1") {
                        Util.CookieWrite("USER_FLAG", "", -1);
                        XiaoXiangJS.clearUserInfo();
                        location.href = "/Member/login";
                    }
                });
        }
    };

    /*移除数组元素 @index:数组索引*/
    Array.prototype.remove = function (index) {
        if (index < 0) return this;
        return this.slice(0, index).concat(this.slice(index + 1, this.length));
    };

    /*短介绍*/
    GetShortIntro = function (Intro,num) {
        var value = "";
        if (Intro != "" && Intro) {
            var pattern = eval(/<[^>]+>|\s+|http[a-z0-9\\\/\&\?\:\.\%]+|\&[\w\d]{2,6}\;|\*+/g);

            value = Intro.replace(eval(pattern), "");

            if (typeof (num) == "undefined")
                num = 30

            if (value.length > num) {
                value = value.substring(0, num) + "...";
            }
        }
        return value;
    }

    /*获取充值渠道*/
    GetPayChannel = function (ChannelId) {
        var Channel = "未知渠道";
        //0|线下汇款,1|快钱网银,2|易宝支付,5|武汉埃文短信,7|财付通,8|paypal,9|盈华讯方声讯支付,11|淘宝积分兑换,
        //12|注册兑换,99|奖励会员,6|移动短信,22|移动短信,50|移动短信,28|移动短信,24|联通短信,51|联通短信,
        //27|联通短信,16|联通短信,26|电信短信,23|电信短信,52|电信短信,15|电信短信,29|神州行卡,21|神州行卡,17|神州行卡,
        //18|神州行卡,53|神州行卡,3|神州行卡,54|支付宝,30|支付宝,32|支付宝,14|支付宝,4|支付宝,31|支付宝

        switch (ChannelId) {
            case 0: Channel = "线下汇款"; break;
            case 1: Channel = "快钱网银"; break;
            case 2: Channel = "易宝支付"; break;
            case 3: case 17: case 18: case 21: case 29: case 53: Channel = "神州行卡"; break;
            case 5: Channel = "武汉埃文短信"; break;
            case 6: case 22: case 28: case 50: Channel = "移动短信"; break;
            case 7: Channel = "财付通"; break;
            case 8: Channel = "paypal"; break;
            case 9: Channel = "盈华讯方声讯支付"; break;
            case 11: Channel = "淘宝积分兑换"; break;
            case 12: Channel = "注册兑换"; break;
            case 15: case 23: case 26: case 52: Channel = "电信短信"; break;
            case 16: case 24: case 27: case 51: Channel = "联通短信"; break;
            case 54: case 30: case 32: case 14: case 4: case 31: Channel = "支付宝"; break;
            case 99: Channel = "奖励会员"; break;
            default: Channel = "未知渠道"; break;
        }

        return Channel;
    }


})();



function ajaxService(method, parameters, callback) {
    $.ajax({
        type: 'GET',
        url: 'http://napi.xxsy.net/Services?nxpCallback?',
        data: "requestData=" + encodeURIComponent(JSON.stringify({ Method: method, Parameters: parameters })),
        dataType: 'jsonp',
        jsonp: 'nxpCallback',
        success: function (response) {
            if (typeof callback == 'function')
                callback(response);
        },
        error: function (e) {
            //alert(e);
        }
    });
}

function ajaxService2(parameters, callback) {
    $.ajax({
        type: 'GET',
        url: 'http://napi.xxsy.net/Services2?nxpCallback=?',
        data: parameters,
        dataType: 'jsonp',
        jsonp: 'nxpCallback',
        success: function (response) {
            if (typeof callback == 'function')
                callback(response);
        },
        error: function (e) {
            //alert('error');
        }
    });
}

function ajaxLocalService(method, parameters, callback) {
    $.ajax({
        type: 'GET',
        url: '/Services?nxpCallback=?',
        data: 'requestData=' + encodeURIComponent(JSON.stringify({ Method: method, Parameters: parameters })),
        dataType: 'jsonp',
        jsonp: 'nxpCallback',
        success: function (response) {
            if (typeof callback == 'function')
                callback(response);
        },
        error: function (e) {
            //alert(e.status);
        }
    });
}

//http://napi.xxsy.net/Services?requestData=


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}