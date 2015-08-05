/// <reference path="jQuery.Min.js" />
/// <reference path="JX.js" />

(function () {

    window.Site = {
        /*接口地址*/
        Host: "/Service",
        /*公共操作数*/
        options: {
            codeFlag: 0,
            delay: 60,
            timer: null,
            checkTimer: null
        },
        /*设置窗体标题*/
        _setBoxTitle: function (title) {
            $("#_winbox .win-header span").html(title);
        },
        /*重置窗体Top位置*/
        _resetBoxTop: function (top) {
            $("#_winbox").css({ top: top + "px" });
        },
        /*重置位置*/
        _resetPos: function () {
            var box = $("#_winbox");
            var top = ($(window).height() - box.height()) * 0.4;
            if (top < 0) top = 0;
            box.css({ top: top + "px" });
        },
        /*显示错误信息*/
        showMsg: function (id, message, flag) {
            var color = flag ? "#00F" : "#F00";
            $(id).html('<span style="color:' + color + '">' + message + '</span>');
            setTimeout(function () { $(id).html(""); }, 1500);
        },

        getTalk: function () {
            var s = [
            '亲，还能再送一张么？',
            '作者360°旋转跳跃鞠躬: 亲,还能再送一张么?',
            '作者爱你哟！么么哒！',
            '亲的投票，真真是极好的！',
            '如果在我的生命当中曾经有那张票票出现过，那么其他一切的票票都会成为将就。而我不愿意将就，就是你了~',
            '神马才是潇湘最壕？从今天起坐拥男神后宫！拿起你手中的票票！爱他就宣他宣他！',
            '票虽说少了些，但这份心意，真真是极好的~',
            '亲的投票，真真是极好的！如若能有幸再来一张，本宫便率皇帝陛下来耍个宝给亲看看',
            '亲投票累了吗？来，我煮碗面你吃，吃完继续投~',
            '给我一张票，我将告诉全世界，这个鱼塘被你承包了！',
            '十年修得同船渡，百年修得亲投票！',
            '山无棱，天地合，依旧要开口：亲，再来一张吧！',
            '多不多投，我都在这里不离不弃！',
            '看书容易，投票不易，且投且珍惜！',
            '开文这么久，终于等来了你，亲，再投一张呗\(^o^)/~',
            '终于等到你，还好我没放弃，投票来得好不容易，才会让人更加珍惜',
            '多谢亲的慷慨，大明湖畔的容嬷嬷替作者送个香吻给您~',
            '此文是我开，此字是我写，既然看我书，赶紧投票来！',
            '多订阅少订阅多少都订阅，早来投晚来投早晚都来投。【横批：订阅投票】',
            '亲，我若在你心上，再投一张又何妨？你若在我身旁，每天万更又怎样！',
            '自从得了亲的票，整个人精神多了！',
            '曾经有一张票摆在我面前我没有珍惜,等到失去时才后悔莫及。人生最悲哀的事情莫过于此。如果上天能再给我一次重来的机会,我会说：再给我一张！',
            '谢谢亲的票票，男主表示已经洗白白躺到了床上，请笑纳~',
            '我能想到最浪漫的事，就是你投票来，我狂更',
            '向来缘浅，奈何情深，缘浅的请投一张票！情深的，请再来N张！',
            '我一直很清醒，清醒地看着自己的沉沦 。沉沦在你的票票中！',
            '票票诚可贵，基情价更高；若有土豪在，多少都可抛！',
            '亲的每一张票，在我的心中，都是一句我爱你。',
            '女人，投了票就想走？好好呆在这，我陪你一起看完这本书。',
            '一切不以投票为目的的阅读都是耍流氓！来，再耍一次',
            '如果世界上曾经有那个人出现过，其他人都会变成将就。可我愿意将就在你的投票深情中！',
            '此票终需要一投，或投给你爱的我，或投个爱你的我。',
            '看到你的票票，我只想说：谢谢你爱我，谢谢你出现在我的世界里，谢谢你让我的生命里充满了温暖：可以再来一张吗',
            '我终究没能飙得过那辆宝马，只能眼看着它在夕阳中绝尘而去，不是我的引擎不好，而是我脚蹬子坏了！再投一票吧，好让我尽快换个脚蹬子。',
            '再来一发，看看会出现什么提示？' ];
            var index = Math.floor(Math.random() * s.length);
            return s[index];
        },

        /*显示浮层*/
        showWinbox: function (title, html, cover, goHis) {

            var htm = [];
            htm.push('<div id="_winbox" class="win-box">');
            htm.push('    <div class="win-padding">');
            htm.push('        <div class="win-main">');
            htm.push('            <div class="win-header">');
            htm.push('                <span>' + title + '</span>');
            htm.push('                <button class="win-box-close">×</button>');
            htm.push('            </div>');
            htm.push('              <div class="win-line"></div>');
            htm.push('             <div id="_winBody">' + html + '</div>');
            htm.push('        </div>');
            htm.push('    </div>');
            htm.push('</div>');
            $("#_winbox").remove();
            $(htm.join("")).appendTo("body");

            Site._resetPos();
            $("button[class=win-box-close]").click(function () {
                Site.closeWinbox(goHis);
            });

            if (cover) {
                $("#_winCover").remove();
                $('<div id="_winCover" class="win-cover"></div>').appendTo("body");
                $("#_winCover").height($(document).height());
            }
        },
        /*关闭浮层*/
        closeWinbox: function (goHis) {
            $("#_winbox").remove();
            $("#_winCover").remove();
            if (Site.options.timer) clearTimeout(Site.options.timer);
            if (Site.options.checkTimer) clearInterval(Site.options.checkTimer);
            if (typeof goHis != "undefined" && goHis == 1)
                history.go(-1);
        },
        /*登陆框*/
        showLoginbox: function (callback) {

            var htm = [
                '<ul class="group2 m10">',
                '    <li><input id="_txtLoginName" class="input r3" type="text" data-text="账号:手机号/潇湘账号" value="账号:手机号/潇湘账号" /></li>',
                '    <li><input id="_txtPassword" class="input r3" type="text" data-text="密码" value="密码" /></li>',
                '    <li style="text-align:right;"><a id="_lnkFindPassword" href="javascript:;">忘记密码?</a></li>',
                '    <li><a id="_lnkLogin" class="button blue r3" href="javascript:;" onclick="login();">登录</a></li>',
                '    <li><a id="_lnkQQLogin" class="button color1 r3" href="javascript:;">QQ号登录</a></li>',
                '    <li><a id="_lnkRegister" class="button color2 r3" href="javascript:;">注册账户</a></li>',
                '</ul>'
            ];

            var goHis = location.href.toLocaleLowerCase().indexOf("\content") >= 0 ? 1 : 0;
            this.showWinbox('用户登陆', htm.join(""), true, goHis);

            $(".input").click(
                function () {
                    if ($(this).val() == $(this).attr("data-text")) {
                        $(this).val("");
                        $(this).css({ color: "#555" });
                    }
                }).blur(
                    function () {
                        if ($(this).val() == "") {
                            $(this).val($(this).attr("data-text"));
                            $(this).css({ color: "#999" });
                        }
                    });
            $("#_lnkLogin").click(
                function () {
                    var userName = $("#_txtLoginName").val();
                    var userPass = $("#_txtPassword").val();
                    if (userName == $("#_txtLoginName").attr("data-text")
                        || userName == "") {
                        Util.Alert("请输入账户");
                        return;
                    }
                    if (userPass == $("#_txtPassword").attr("data-text")
                        || userPass == "") {
                        Util.Alert("请输入密码");
                        return;
                    }
                    Site._setBoxTitle("登录中....");

                    ajaxLocalService('user_login', { username: userName, userpassword: userPass }
                        , function (response) {

                            Site._setBoxTitle("用户登录");

                            if (response.Code != 0) {
                                Util.Alert(response.Message);
                                try {
                                    XiaoXiangJS.loginFailed();
                                } catch (e) { };
                                return;
                            }

                            var res = response.Data;

                            Util.Alert("登录成功了");
                            setTimeout(function () {
                                if (typeof callback == "function") callback(res.Id);
                                Site.closeWinbox();
                            }, 1500);
                            try {
                                XiaoXiangJS.loginSuccess(res.Id, res.Name);
                            } catch (e) { };
                        });
                });

            $("#_lnkRegister").click(
                function () {
                    Site.showRegisterbox(callback);
                });
            $("#_lnkFindPassword").click(
                function () {
                    Site.showFindPasswordbox(callback);
                });
            // QQ登陆支持
            $("#_lnkQQLogin").click(function () {
                location.href = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100389624&state=androidxxsynet&scope=get_user_info&redirect_uri=" + encodeURI("http://android.xxsy.net/pages2/QQAuthorizeLogin.aspx");
                Util.CookieWrite("QQ_LOGIN_RETURN_LINK", _referer, 999);
            });

        },
        /*注册框*/
        showRegisterbox: function (callback) {

            var htm = [
             '<div id="_registerBox">',
             '   <div class="tab t3">',
             '       <ul><li class="animbg"></li></ul>',
             '       <ul id="_tabRegister">',
             '           <li data-index="0" class="curr">一键注册</li>',
             '           <li data-index="1">手机号注册</li>',
             '           <li data-index="2">昵称注册</li>',
             '       </ul>',
             '   </div>',
             '   <div id="_panels" style="border-top:2px solid #efefef;">',
             '       <div class="box" style="padding:10px;">',
             '           <div class="m8">',
             '               <a target="_blank" href="SMS:12114?body=8888;" class="button blue r3">发送短信一键注册</a>',
             '           </div>',
             '           <div class="wenxin ww bgwhite m15">',
             '               <h3>一键注册说明</h3>',
             '               <ul>',
             '                   <li>1、如点击发送按钮无效，请手工编辑短信内容<em>潇湘</em>发送到号码<em>12114</em>即可完成注册。</li>',
             '                   <li>2、发送一条短信即可完成注册。</li>',
             '                   <li>3、注册完成将收到成功提示短信。</li>',
             '                   <li>4、账号为手机号，密码为手机号后六位。</li>',
             '               </ul>',
             '           </div>',
             '           <div class="m10">',
             '               <a data-action="gologin" href="javascript:;" class="button color1 r3">已有账号前往登陆</a>',
             '           </div>',
             '       </div>',
             '       <div class="box" style=" padding:10px; display:none;">',
              '       <div data-step="1">',
             '           <ul class="group2 ww">',
             '               <li><input id="_txtMobile" class="input r3" type="tel" data-text="请输入手机号" value="请输入手机号" /></li>',
             '               <li>',
             '                   <ul class="group g2 ww">',
             '                       <li><input id="_txtResult" class="input r3" type="tel" data-text="输入答案" value="输入答案" /></li>',
             '                       <li><img src="/Vercode?r=' + new Date() + '" onclick="this.src = \'/Vercode?r=\' + new Date()" style="width:100%; height:38px;" /></li>',
             '                   </ul>',
             '               </li>',
             '               <li><a id="_lnkCode" class="button blue r3">获取短信验证码</a></li>',
             '           </ul>',
             '       </div>',
             '       <div data-step="2" style="display:none;">',
             '           <ul class="group2 ww">',
             '               <li><input id="_txtVerifyCode" class="input r3" type="tel" data-text="请输入短信验证码" value="请输入短信验证码" /></li>',
             '               <li><a id="_lnkRegister" class="button blue r3">确定注册</a></li>',
             '           </ul>',
             '           <div class="wenxin bgwhite ww">',
             '               <h3>温馨提示</h3>',
             '               <ul>',
             '                   <li>1、账号的密码为手机号最后6位数字。</li>',
             '               </ul>',
             '           </div>',
             '       </div>',
             '       <ul class="group2 ww">',
             '           <li><a data-action="gologin" href="javascript:;" class="button color2 r3">已有账号前往登陆</a></li>',
             '       </ul>',
             '       </div>',
             '       <div class="box" style="padding:10px;display:none;">',
             '           <ul class="group2 ww">',
             '               <li><input id="_txtNickname" class="input r3" type="text" data-text="昵称" value="昵称" /></li>',
             '               <li><input id="_txtPass2" class="input r3" type="text" data-text="密码" value="密码" /></li>',
             '               <li><input id="_txtNickMobile" class="input r3" type="tel" data-text="手机号(错误手机号将不能取回密码)" value="手机号(错误手机号将不能取回密码)" /></li>',
             '               <li><a id="_lnkRegister2" href="javascript:;" class="button blue r3">确定注册</a></li>',
             '               <li><a data-action="gologin" href="javascript:;" class="button color1 r3">已有账号前往登陆</a></li>',
             '           </ul>',
             '       </div>',
             '   </div>',
             '</div>'];

            this.showWinbox("账户注册", htm.join(""), true);

            $("#_tabRegister").find("li").click(function () {
                var sel = $(this);
                var index = parseInt(sel.attr("data-index"));
                var v = 33.3;
                sel.parent().siblings("ul").find(".animbg").animate({ marginLeft: (index * v) + "%" }, 200
                    , function () {
                        sel.addClass("curr")
                            .siblings().removeClass("curr");
                    });
                $("#_panels > div").eq(index)
                    .show()
                    .siblings("div").hide();
            });
            // 输入框单击事件
            $("#_registerBox .input").click(
                function () {
                    if ($(this).val() == $(this).attr("data-text")) {
                        $(this).val("");
                    }
                }).blur(
                    function () {
                        if ($(this).val() == "") {
                            $(this).val($(this).attr("data-text"));
                        }
                    });
            // 获取验证码
            $("#_lnkCode").click(
                function () {
                    if (Site.options.codeFlag == 1)
                        return;

                    var rv = $("#_txtResult").val();
                    if (rv == "" || rv == $("#_txtResult").attr("data-text")) {
                        Util.Alert("答案不能为空");
                        return;
                    }

                    var mobile = $("#_txtMobile").val();
                    if (/\d{11}/gi.test(mobile) == false) {
                        Util.Alert("手机号不正确");
                        return;
                    }

                    ajaxLocalService('user_sendregistercode', { mobile: mobile, rv: rv },
                        function (responseData) {
                            if (responseData.Code != 0) {
                                Util.Alert(responseData.Message);
                                return;
                            }
                            var res = responseData.Data;

                            Site.options.codeFlag = 1;
                            Site.options.delay = 60; //60秒之内不能重复发送
                            Site.options.timer = setInterval(
                                function () {
                                    if (Site.options.delay <= 0) {
                                        clearInterval(Site.options.timer);
                                        Site.options.codeFlag = 0;
                                        $("#lnkCode").html("获取验证码");
                                        return;
                                    }
                                    $("#lnkCode").html("获取验证码(" + (Site.options.delay--) + ")");
                                }, 1000);
                            $("div[data-step='1']").hide()
                                .siblings("div[data-step='2']").show();
                            Util.Alert(res);
                        });
                });
            // 手机号注册
            $("#_lnkRegister").click(function () {

                var mobile = $("#_txtMobile").val();
                var verifyCode = $("#_txtVerifyCode").val();

                if (/\d{11}/gi.test(mobile) == false) {
                    Util.Alert("密码不能少于6个字符");
                    return;
                }
                if (verifyCode == "") {
                    Util.Alert("请输入验证");
                    return;
                }
                Site._setBoxTitle("正在注册....");

                ajaxService2({
                    method: 'user.register',
                    username: mobile, usrepassword: mobile.substring(mobile.length - 6),
                    usermail: mobile + "@@XXSY.NET", usrmobile: mobile, channel: 6// XiaoXiangJS.getChannel()
                }
                , function (response) {
                    Site._setBoxTitle("账户注册");
                    if (response.Code != 0) {
                        Util.Alert(response.Message);
                        try {
                            XiaoXiangJS.loginFailed();
                        }
                        catch (e) { }
                        return;
                    }

                    ajaxLocalService('user_login', { username: mobile, userpassword: mobile.substring(mobile.length - 6) },
                        function (responseData) {

                            if (responseData.Code != 0) {
                                Util.Alert(responseData.Message);
                                try {
                                    XiaoXiangJS.loginFailed();
                                }
                                catch (e) { }
                                return;
                            }

                            var res = responseData.Data;

                            Util.Alert("注册成功了");
                            setTimeout(function () {
                                if (typeof callback == "function") {
                                    callback(res.Id);
                                }
                                Site.closeWinbox();
                            }, 1500);

                            try {
                                XiaoXiangJS.loginSuccess(res.Id, res.Name);
                            }
                            catch (e) { }
                        });
                });
            });
            // 昵称注册
            $("#_lnkRegister2").click(function () {

                var nickname = $("#_txtNickname").val();
                var userPass = $("#_txtPass2").val();
                var mobile = $("#_txtNickMobile").val();

                if (nickname == "" || nickname == $("#_txtNickname").attr("data-text")) {
                    Util.Alert("昵称不能为空");
                    return;
                }
                if (/^[(0-9A-Za-z)(\u4e00-\u9fa5)]{2,}$/ig.test(nickname) == false) {
                    Util.Alert("昵称只能包含数字、字母、汉字！");
                    return;
                }
                if (userPass.length < 6) {
                    Util.Alert("密码不能少于6个字符");
                    return;
                }
                if (/^1\d{10}$/gi.test(mobile) == false) {
                    Util.Alert("不是一个有效的手机号");
                    return;
                }

                Site._setBoxTitle("正在注册....");
                ajaxService2({
                    method: "user.register",
                    username: nickname, usrepassword: userPass, usrmobile: mobile, channel: 6//XiaoXiangJS.getChannel()
                }
                , function (response) {
                    Site._setBoxTitle("账户注册");
                    if (response.Code != 0) {
                        Util.Alert(response.Message);
                        try {
                            XiaoXiangJS.loginFailed();
                        }
                        catch (e) { }
                        return;
                    }

                    ajaxLocalService('user_login', { username: nickname, userpassword: userPass },
                        function (responseData) {
                            if (responseData.Code != 0) {
                                Util.Alert(responseData.Message);
                                try {
                                    XiaoXiangJS.loginFailed();
                                }
                                catch (e) { }
                                return;
                            }

                            var res = responseData.Data;

                            Util.Alert("注册成功了");
                            setTimeout(function () {
                                if (typeof callback == "function") callback(res.Id);
                                Site.closeWinbox();
                            }, 1500);
                            try {
                                XiaoXiangJS.loginSuccess(res.Id, res.Name);
                            }
                            catch (e) { }
                        });
                });
            });
            // 已有账号登陆
            $("a[data-action=gologin]").click(function () {
                Site.showLoginbox(callback);
            });

        },
        /*找回密码框*/
        showFindPasswordbox: function (callback) {

            var htm = [
                '<ul id="_step1" class="group2 m10">',
                '    <li><input id="_txtUserName" class="input r3" type="text" data-text="请输入账号" value="请输入账号" /></li>',
                '    <li>',
                '        <ul class="group g2 ww">',
                '            <li><input id="_txtResult" class="input r3" type="tel" data-text="输入答案" value="输入答案" /></li>',
                '            <li><img src="/Vercode?r=' + new Date() + '" onclick="this.src = \'/Vercode?r=\' + new Date()" style="width:100%; height:38px;" /></li>',
                '        </ul>',
                '   </li>',
                '    <li><a id="_lnkCode" class="button blue r3">获取短信验证码</a></li>',
                '</ul>',
                '<ul id="_step2" class="group2 m10" style="display:none;">',
                '    <li><input id="_txtPass" class="input r3" type="text" data-text="请输入新密码" value="请输入新密码" /></li>',
                '    <li><input id="_txtVerifyCode" class="input r3" type="tel" data-text="输入验证码" value="输入验证码" /></li>',
                '    <li><a id="_lnkUpdatePassword" class="button blue r3">确定修改密码</a></li>',
                '</ul>',
                '<ul id="_step1" class="group2 m10">',
                '    <li><a id="_lnkRegister" class="button color2 r3">前往注册</a></li>',
                '</ul>'
            ];
            this.showWinbox("找回密码", htm.join(""), true);
            var _userName = "";

            $(".input").click(
                function () {
                    if ($(this).val() == $(this).attr("data-text")) {
                        $(this).val("");
                        $(this).css({ color: "#555" });
                    }
                }).blur(
                    function () {
                        if ($(this).val() == "") {
                            $(this).val($(this).attr("data-text"));
                            $(this).css({ color: "#999" });
                        }
                    });

            $("#_lnkCode").click(
                function () {
                    var rv = $("#_txtResult").val();
                    if (rv == "" || rv == $("#_txtResult").attr("data-text")) {
                        Util.Alert("答案不能为空");
                        return;
                    }

                    var userName = $("#_txtUserName").val();
                    if (userName == "" || userName == $("#_txtUserName").attr("data-text")) {
                        Util.Alert("账户不能为空")
                        return;
                    }

                    ajaxLocalService("user_sendfindpasswordcode", { username: userName, rv: rv }
                        , function (response) {
                            if (response.Code != 0) {
                                Util.Alert(response.Message);
                                return;
                            }

                            $("#_step1").hide();
                            $("#_step2").show();
                            _userName = userName;
                        });
                });

            $("#_lnkUpdatePassword").click(function () {

                var userName = _userName;
                var userPass = $("#_txtPass").val();
                var verifyCode = $("#_txtVerifyCode").val();

                if (userPass.length < 6) {
                    Util.Alert("密码不能少于6个字符");
                    return;
                }

                if (verifyCode == "") {
                    Util.Alert("请输入验证");
                    return;
                }

                ajaxLocalService("user_findpassword", { username: userName, userpass: userPass, verifycode: verifyCode }
                    , function (response) {
                        if (response.Code != 0) {
                            try {
                                XiaoXiangJS.loginFailed();
                            } catch (e) { }
                            Util.Alert(response.Message);
                            return;
                        }

                        var res = response.Data;

                        Util.Alert("成功修改了密码");
                        setTimeout(function () {
                            if (typeof callback == "function") callback(res.Id);
                            Site.closeWinbox();
                        }, 1500);
                        try {
                            XiaoXiangJS.loginSuccess(res.Id, res.Name);
                        } catch (e) { };
                    });
            });

            // 前往注册
            $("#_lnkRegister").click(
                function () {
                    Site.showRegisterbox(callback);
                });

        },
        /*章节订阅框*/
        showChapterSubscribebox: function (userid, bookid, chapterid, callback) {

            var htm = [];
            htm.push('<div class="box">');
            htm.push('    <ul class="list">');
            htm.push('        <li>章节名:<span id="_spnChapterName"></span></li>');
            htm.push('        <li>订阅该章节需:<span id="_spnChapterPrice"></span><em>(潇湘币)</em></li>');
            htm.push('        <li>账户余额:<span id="_spanAccount"></span><em>(潇湘币)</em></li>');
            htm.push('    </ul>');
            htm.push('    <ul class="group2">');
            htm.push('        <li><a href="javascript:;" id="_lnkSubscribe" class="button blue r3">订阅本章节</a></li>');
            htm.push('        <li><a href="javascript:;" id="_lnkTejia" class="button color1 r3" style="display:none;">全本订阅只需100潇湘币</a></li>');
            htm.push('        <li><a href="javascript:;" id="_lnkBaoyue" class="button color2 r3" style="display:none;">包月作品点此订购包月</a></li>');
            htm.push('    </ul>');
            htm.push('</div>');

            Site.showWinbox("Loading....", htm.join(""), true, 1);
            $.get(Site.Host, $.param({ action: "chapter_getsubscribedetail", userid: userid, bookid: bookid, chapterid: chapterid })
                , function (data) {

                    var res = eval("(" + data + ")");
                    var i = res.result;
                    Site._setBoxTitle(i.BookName + " - 章节订阅");
                    $("#_spnChapterName").html(i.ChapterName);
                    $("#_spnChapterPrice").html(i.Price);
                    $("#_spanAccount").html(i.UserAccount);

                    if (i.Tejia > 0) {
                        $("#_lnkTejia").html("全本订阅只需" + i.Tejia + "潇湘币");
                        $("#_lnkTejia").show().click(function () {
                            Site.showQuanbenrSubscribebox(userid, bookid, callback);
                        });
                    }
                    if (i.IsBaoyue == 1) {
                        $("#_lnkBaoyue").show().click(function () {
                            Site.showBaoyuebox(userid, callback);
                        });
                    }
                    Site._resetPos();
                    $("#_lnkSubscribe").click(
                        function (data) {
                            Site._setBoxTitle("订阅中请稍后....");
                            $.get(Site.Host, $.param({ action: "chapter_subscribe", userid: userid, chapterid: chapterid })
                                , function (data) {
                                    Site._setBoxTitle("章节订阅");
                                    var res = eval("(" + data + ")");
                                    if (res.result == 0) {
                                        Util.Alert("订阅时发生了错误")
                                        return;
                                    }
                                    var str = "订阅成功";
                                    if (res.mon > 0) str += ",本次订阅获取月票1张";
                                    if (res.assess > 0) str += ",本次订阅获取评价票1张";
                                    Util.Alert(str);
                                    setTimeout(
                                        function () {
                                            if (typeof callback == "function") callback();
                                            Site.closeWinbox();
                                        }, 1400);

                                });
                        });
                });

        },
        /*包月框*/
        showBaoyuebox: function (userid, callback) {
            var htm = [
                '<div class="box ww" style="padding:10px 0;">',
                '    <div class="wenxin bgwhite">',
                '        <h3>包月说明</h3>',
                '        <ul>',
                '            <li>包月书库内有超过700多部优秀作品,购买包月服务，期间可无限制阅读任何包月书库作品任何章节。</li>',
                '        </ul>',
                '    </div>',
                '    <ul id="_monCount" class="group-price m12">',
                '        <li><a href="javascript:;" data-value="1"><span>包1个月</span><em>1500潇湘币</em></a></li>',
                '        <li><a href="javascript:;" data-value="3"><span>包3个月</span><em>4000潇湘币</em></a></li>',
                '        <li><a href="javascript:;" data-value="6"><span>包6个月</span><em>7000潇湘币</em></a></li>',
                '        <li><a href="javascript:;" data-value="12"><span>包12个月</span><em>12000潇湘币</em></a></li>',
                '        <li><a href="javascript:;" data-value="24"><span>包24个月</span><em>20000潇湘币</em></a></li>',
                '    </ul>',
                '    <ul class="group2">',
                '        <li><a id="_lnkBaoyue" href="javascript:;" class="button blue r3">确定包月</a></li>',
                '    </ul>',
                '</div>'
            ];

            var goHis = location.href.toLocaleLowerCase().indexOf("content.aspx") >= 0 ? 1 : 0;
            Site.showWinbox("包月服务", htm.join(""), true, goHis);
            var _count = 0;
            var _site = 6;

            $("#_monCount a").click(function () {
                $("#_monCount a").removeClass("current");
                $(this).addClass("current");
                _count = parseInt($(this).attr("data-value"));
            });

            $("#_lnkBaoyue").click(function () {
                Site._setBoxTitle("正在提交");

                ajaxService2({ method: "book.buy.monthly", userid: _userid, buymons: _count, site: _site }
                    , function (response) {
                        Site._setBoxTitle("包月服务");

                        if (response.Code != 0) {
                            Util.Alert(response.Message);
                            XiaoXiangJS.purchaseFailed();
                            return;
                        }

                        Util.Alert("包月成功了");
                        setTimeout(function () {
                            if (typeof callback == "function") callback();
                            Site.closeWinbox();
                        }, 1500);
                        XiaoXiangJS.purchaseSuccess();
                    });
            });
        },
        /*显示发表评论框*/
        showSendReviewbox: function (userid, bookid, callback) {

            var htm = [
                ' <ul class="group2">',
                '     <li><textarea class="area" id="_txtReviewText"></textarea></li>',
                '     <li style="text-align:right;"><span id="_spnLength">0/1000</span></li>',
                '     <li><a href="javascript:;" id="_lnkSendReview" class="button blue r3">确定发表评论</a></li>',
                ' </ul>'
            ];

            Site.showWinbox("发表评论", htm.join(""), true);
            Site.options.checkTimer = setInterval(
                function () {
                    var len = $("#_txtReviewText").val().length;
                    var spn = $("#_spnLength");
                    spn.css({ color: (len > 1000 || len < 6) ? "#f00" : "#555" });
                    spn.html(len + "/1000");
                }, 500);

            $("#_lnkSendReview").click(
                function () {

                    var txt = $("#_txtReviewText").val();
                    if (txt.length < 6) {
                        Util.Alert("评论内容不能少于6个字");
                        return;
                    }

                    if (txt.length > 1000) {
                        Util.Alert("评论内容不能1000个字");
                        return;
                    }

                    Site._setBoxTitle("发送中....");

                    $.get(Site.Host, $.param({ action: "book_sendreview", userid: userid, bookid: bookid, content: txt })
                        , function (data) {

                            Site._setBoxTitle("发表评论");

                            var res = eval("(" + data + ")");
                            if (res.result == 0) {

                                Util.Alert("成功发表了一条评论");
                                clearInterval(Site.options.checkTimer);

                                setTimeout(function () {
                                    if (typeof callback == "function") callback();
                                    Site.closeWinbox();
                                }, 1500);

                                return;
                            }

                            var err = "发表失败";
                            if (res.result == 1) err = "注册未满48小时不能发表";
                            if (res.result == 2) err = "被永久禁言";
                            if (res.result == 3) err = "禁言中";
                            if (res.result == 4) err = "您发表的太快了,休息片刻后再发表";

                            Util.Alert(err);

                        });
                });

        },
        /*粉丝互动(送鲜花、钻石、打赏等)*/
        showPropsbox: function (userid, bookid, type) {
            var htm = [
            '<div id="_propsBox" class="box ww">',
            '    <div class="tab t5" >',
            '        <ul><li class="animbg"></li></ul>',
            '        <ul>',
            '            <li data-index="0" data-props="2">鲜花</li>',
            '            <li data-index="1" data-props="1">钻石</li>',
            '            <li data-index="2" data-props="5">打赏</li>',
            '            <li data-index="3" data-props="4">月票</li>',
            '            <li data-index="4" data-props="8">评价票</li>',
            '        </ul>',
            '    </div>',
            '    <div id="_propsPanels">',
            '        <div>',
            '            <ul class="group-count">',
            '                <li><a href="javascript:;" data-type="2" data-count="1">1(朵)</a></li>',
            '                <li><a href="javascript:;" data-type="2" data-count="5">5(朵)</a></li>',
            '                <li><a href="javascript:;" data-type="2" data-count="10">10(朵)</a></li>',
            '                <li><a href="javascript:;" data-type="2" data-count="50">50(朵)</a></li>',
            '                <li><a href="javascript:;" data-type="2" data-count="100">100(朵)</a></li>',
            '                <li><a id="_btnCustom2" href="javascript:;" data-type="2" data-count="0" contenteditable="true">自定义</a></li>',
            '            </ul>',
            '            <ul class="group2"><li><a href="javascript:;" class="button blue r3" data-value="2">确定送鲜花</a></li></ul>',
            '            <div class="wenxin bgwhite m5">',
            '                <h3>温馨提示</h3>',
            '                <ul>',
            '                    <li>1、赠送一朵鲜花需要消耗20点潇湘币</li>',
            '                </ul>',
            '            </div>',
            '        </div>',
            '        <div style="display:none">',
            '            <ul class="group-count">',
            '                <li><a href="javascript:;" data-type="1" data-count="1">1(颗)</a></li>',
            '                <li><a href="javascript:;" data-type="1" data-count="5">5(颗)</a></li>',
            '                <li><a href="javascript:;" data-type="1" data-count="10">10(颗)</a></li>',
            '                <li><a href="javascript:;" data-type="1" data-count="50">50(颗)</a></li>',
            '                <li><a href="javascript:;" data-type="1" data-count="100">100(颗)</a></li>',
            '                <li><a id="_btnCustom1" href="javascript:;" data-type="1" data-count="0" contenteditable="true">自定义</a></li>',
            '            </ul>',
            '            <ul class="group2"><li><a href="javascript:;" class="button blue r3" data-value="1">确定送钻石</a></li></ul>',
            '            <div class="wenxin bgwhite m5">',
            '                <h3>温馨提示</h3>',
            '                <ul>',
            '                    <li>1、赠送一颗钻石需要消耗100点潇湘币</li>',
            '                </ul>',
            '            </div>',
            '        </div>',
            '        <div style="display:none">',
            '            <ul class="group-count">',
            '                <li><a href="javascript:;" data-type="5" data-count="188">188</a></li>',
            '                <li><a href="javascript:;" data-type="5" data-count="388">388</a></li>',
            '                <li><a href="javascript:;" data-type="5" data-count="888">888</a></li>',
            '                <li><a href="javascript:;" data-type="5" data-count="1888">1888</a></li>',
            '                <li><a href="javascript:;" data-type="5" data-count="8888">8888</a></li>',
            '                <li><a id="_btnCustom5" href="javascript:;" data-type="5" data-count="0" contenteditable="true">自定义</a></li>',
            '            </ul>',
            '            <ul class="group2"><li><a href="javascript:;" class="button blue r3" data-value="5">确定打赏</a></li></ul>',
            '            <div class="wenxin bgwhite m5">',
            '                <h3>温馨提示</h3>',
            '                <ul>',
            '                    <li>1、打赏单位为潇湘币</li>',
            '                </ul>',
            '            </div>',
            '        </div>',
            '        <div style="display:none">',
            '            <ul class="group-count">',
            '                <li><a href="javascript:;" data-type="4" data-count="1">1(张)</a></li>',
            '                <li><a href="javascript:;" data-type="4" data-count="2">2(张)</a></li>',
            '                <li><a href="javascript:;" data-type="4" data-count="3">3(张)</a></li>',
            '                <li><a href="javascript:;" data-type="4" data-count="4">4(张)</a></li>',
            '                <li><a href="javascript:;" data-type="4" data-count="5">5(张)</a></li>',
            '                <li><a id="_btnCustom4" href="javascript:;" data-type="4" data-count="0" contenteditable="true">自定义</a></li>',
            '            </ul>',
            '            <div class="box" style="font-size:14px; color:#0B3985; padding-bottom:5px;">当前月票:<span id="_shengyu4">0</span>(张)</div>',
            '            <ul class="group2"><li><a href="javascript:;" class="button blue r3" data-value="4">确定投月票</a></li></ul>',
            '            <div class="wenxin bgwhite m5">',
            '                <h3>温馨提示</h3>',
            '                <ul>',
            '                    <li>1、vip订阅消费每满10元即可获得1张月票,月票当月有效.</li>',
            '                </ul>',
            '            </div>',
            '        </div>',
            '        <div style="display:none">',
            '            <ul class="group-count">',
            '                <li><a href="javascript:;" data-type="8" data-count="1">不知所云</a></li>',
            '                <li><a href="javascript:;" data-type="8" data-count="2">随便看看</a></li>',
            '                <li><a href="javascript:;" data-type="8" data-count="3">值得一看</a></li>',
            '                <li><a href="javascript:;" data-type="8" data-count="4">不容错过</a></li>',
            '                <li><a href="javascript:;" data-type="8" data-count="5">经典必看</a></li>',
            '            </ul>',
            '            <div class="box" style="font-size:14px; color:#0B3985; padding-bottom:5px;">当前评价票:<span id="_shengyu8">0</span>(张)</div>',
            '            <ul class="group2"><li><a href="javascript:;" class="button blue r3" data-value="8">确定投评价票</a></li></ul>',
            '            <div class="wenxin bgwhite m5">',
            '                <h3>温馨提示</h3>',
            '                <ul>',
            '                    <li>1、每月消费满10元即可获赠1张评价票,每月只可获赠一次.</li>',
            '                    <li>2、可以每张200点潇湘币购买(购买无限制)</li>',
            '                    <li>3、每次评价消耗1张评价票</li>',
            '                </ul>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div>'];

            Site.showWinbox("粉丝互动", htm.join(""), true);

            var _count = 0;
            var _integral = 0;
            var _propsType = 1;
            var _userid = userid;
            var _bookid = bookid;
            var _iscus = 0;
            var _site = 6;//XiaoXiangJS.getChannel();

            var current = $("#_propsBox li[data-props=" + type + "]").addClass("curr");
            var idx = parseInt(current.attr("data-index"));
            current.parent().siblings().find(".animbg").css({ marginLeft: idx * 20 + "%" });
            $("#_propsPanels > div").eq(idx).show().siblings().hide();
            _propsType = type;

            ajaxService2({ method : "user.get", userid: _userid }
                , function (response) {
                    var user = response.Data;
                    if (user.Id > 0) {
                        $("#_shengyu8").html(user.Assesstickets);
                        $("#_shengyu4").html(user.Montickets);
                    }
                });

            // 绑定选项卡单击事件
            $("#_propsBox li[data-props]").click(function () {
                var sel = $(this);
                var index = parseInt(sel.attr("data-index"));
                sel.parent().siblings().find(".animbg").animate({ marginLeft: index * 20 + "%" }, 200
                    , function () { sel.addClass("curr").siblings().removeClass("curr"); });
                $("#_propsPanels > div").eq(index).show().siblings().hide();
                _count = 0;
                _propsType = parseInt(sel.attr("data-props"));
                Site._resetPos();
            });

            // 绑定自定义输入框单击、失去焦点事件
            $("#_propsBox a[contenteditable]").click(
                 function () {
                     var value = $(this).html();
                     value = value.replace(/<[^>]+>|\s+/gi, "");
                     if (/\d+/gi.test(value) == false)
                         $(this).html("");
                 }).blur(
                    function () {
                        var value = $(this).html();
                        value = value.replace(/<[^>]+>|\s+/gi, "");
                        if (/\d+/gi.test(value) == false)
                            $(this).html("自定义");
                    });

            $("#_propsBox a[data-type]").click(
                function () {
                    $("#_propsBox a[data-type]").removeClass("curr");
                    $(this).addClass("curr");
                    _propsType = parseInt($(this).attr("data-type"));
                    _count = parseInt($(this).attr("data-count"));

                    _iscus = (_count > 0) ? 0 : 1;

                    if (_propsType == 8) {
                        _integral = _count;
                        _count = 1;
                    }

                });

            // 绑定发送按钮事件
            $("#_propsBox .button").click(
                function () {
                    if (_propsType == 8 && _integral == 0) {
                        Util.Alert("请选择评论信息");
                        return;
                    }
                    if (_count == 0) {
                        if (_iscus == 1) {
                            var temp = $("#_btnCustom" + _propsType).html();
                            temp = temp.replace(/<[^>]+>|\s+/gi, "");
                            if (/\d+/gi.test(temp)) {
                                _count = parseInt(temp);
                            }
                        }
                    }
                    if (_propsType == 1 && _count == 0) {
                        Util.Alert("请选择钻石数量或自定义数量");
                        return;
                    }
                    if (_propsType == 2 && _count == 0) {
                        Util.Alert("请选择鲜花数量或自定义数量");
                        return;
                    }
                    if (_propsType == 4 && _count == 0) {
                        Util.Alert("请选择月票数量或自定义数量");
                        return;
                    }
                    if (_propsType == 5 && _count == 0) {
                        Util.Alert("请选择打赏数量或自定义数量");
                        return;
                    }
                    if (_propsType == 5 && _iscus == 1 && _count < 100) {
                        Util.Alert("打赏至少100潇湘币");
                        return;
                    }
                    Site._setBoxTitle("提交中....");
                    ajaxService2({ method: 'user.use.gift', userid: _userid, bookid: _bookid, gifttype: _propsType, count: _count, score: _integral, site: _site },
                        function (response) {
                            Site._setBoxTitle("粉丝互动");
                            if (response.Code != 0) {
                                Util.Alert(response.Message);
                                return;
                            }

                            if (_propsType == 4) {
                                var message = '成功投了张' + _count + '月票,' + Site.getTalk();
                                Util.Alert(message);
                            } else {
                                Util.Alert("操作成功了");
                            }

                            if (_propsType == 4 || _propsType == 8) {
                                var shengyu = $("#_shengyu" + _propsType);
                                var sh = parseInt(shengyu.html());
                                sh = sh - _count;
                                if (sh < 0) sh = 0;
                                shengyu.html(sh);
                            }
                        });
                });
        },
        /*修改密码*/
        showUpdatePasswordbox: function (userid, callback) {

            var htm = [];

            htm.push('<div>');
            htm.push('   <ul class="group2">');
            htm.push('       <li><input id="_txtOldPassword" class="input" type="text" data-text="输入旧密码" value="输入旧密码" /></li>');
            htm.push('       <li><input id="_txtNewPassword" class="input" type="text" data-text="新密码" value="新密码" /></li>');
            htm.push('       <li><a href="javascript:;" id="_lnkUpdate" class="button blue r3">确定修改</a></li>');
            htm.push('   </ul>');
            htm.push('</div>');

            this.showWinbox('密码修改', htm.join(""), true);

            $(".input").click(
                function () {
                    if ($(this).val() == $(this).attr("data-text")) {
                        $(this).val("");
                        $(this).css({ color: "#555" });
                    }
                }).blur(
                    function () {
                        if ($(this).val() == "") {
                            $(this).val($(this).attr("data-text"));
                            $(this).css({ color: "#999" });
                        }
                    });

            $("#_lnkUpdate").click(
                function () {

                    var oldPassword = $("#_txtOldPassword").val();
                    var newPassword = $("#_txtNewPassword").val();

                    if (newPassword.length < 6) {
                        Util.Alert("密码至少6个字符");
                        return;
                    }

                    Site._setBoxTitle("发送请求中....");

                    ajaxService2({ method: "user.update.password", userid: userid, oldpassword: oldPassword, newpassword: newPassword }
                        , function (response) {
                            Site._setBoxTitle("密码修改");
                            if (response.Code != 0) {
                                Util.Alert(response.Message);
                                return;
                            }

                            var res = response.Data;

                            ajaxLocalService("user_login", { username: res.Name, userpassword: res.Password },
                                function (response) {
                                    if (response.Code == 0) {
                                        Util.Alert("成功修改了密码");
                                        if (typeof callback == "function") callback();
                                        setTimeout(function () {
                                            Site.closeWinbox();
                                        }, 1500);
                                    }
                                });
                        });

                });
        },
        /*显示全本订阅框*/
        showQuanbenrSubscribebox: function (userid, bookid, callback) {

            if (userid == 0 || userid == null) {
                Site.showLoginbox(function (uid) {
                    setTimeout(function () {
                        Site.showQuanbenrSubscribebox(uid, bookid);
                    }, 300);
                });
                return;
            }

            var htm = [
                '<div class="box">',
                '    <ul id="_subscribeInfoUL" class="list ww">',
                '        <li>全本订阅价格:<span id="_spnPrice">0</span>(潇湘币)</li>',
                '        <li>当前余额:<span id="_spnAccount">0</span>(潇湘币)</li>',
                '    </ul>',
                '    <div id="_successDiv" style="display:none;color:#1C3FD4;padding:10px 0 5px;text-align:center;">订阅成功了！</div>',
                '    <ul id="_qbDingyueUL" class="group2 m10"><li><a id="_lnkDingyue" href="javascript:;" class="button blue r3">确定订阅</a></li></ul>',
                '    <div class="wenxin bgwhite m5">',
                '        <h3>全本订阅说明</h3>',
                '        <ul>',
                '            <li>1、一次性订阅特定作品的全部VIP章节，可享受特价优惠。</li>',
                '            <li>2、订阅后可永久阅读已订阅的作品。</li>',
                '        </ul>',
                '    </div>',
                '</div>'
            ];

            var goHis = location.href.toLocaleLowerCase().indexOf("content.aspx") >= 0 ? 1 : 0;
            this.showWinbox('全本订阅', htm.join(""), true, goHis);

            Site._setBoxTitle("加载中.....");
            $.get(Site.Host, $.param({ action: "book_tejia_detail", userid: userid, bookid: bookid })
                , function (data) {
                    var res = eval("(" + data + ")");

                    if (res.code == 0) {
                        Site._setBoxTitle(res.bookName + " - 全本订阅");
                        $("#_spnPrice").html(res.price);
                        $("#_spnAccount").html(res.account);

                        var isbuy = res.isbuy;
                        if (isbuy == 1) {
                            $("#_qbDingyueUL").html('<li><a href="javascript:Site.closeWinbox();" class="button color3 r3">该作品已订阅！</a></li>');
                            return;
                        }

                        if (res.isIngot == 1) {

                            var maxDeduction = res.maxDeduction;
                            var canget = res.canget;
                            var ingot = res.ingot;
                            var sli = [];

                            //if ((ingot + res.account) >= res.price) {
                            //    if (ingot > 0) {
                            //        var strbtn = "使用" + maxDeduction + "元宝";
                            //        if (res.price > maxDeduction &&
                            //            res.account > 0)
                            //            strbtn += "+" + (res.price - maxDeduction) + "潇湘币";
                            //        strbtn += "订阅";
                            //        sli.push('<li><a id="_lnkDingyueByIngot" href="javascript:;" class="button blue r3">' + strbtn + '</a></li>');
                            //    }
                            //} else {
                            //    sli.push('<li><a id="_gotoPay" href="javascript:;" class="button blue r3">余额不足前往充值</a></li>');
                            //}

                            //用户余额大于订阅点数才显示
                            if (res.account >= res.price) {
                                var str = '使用' + res.price + '潇湘币订阅';
                                //if (canget > 0)
                                //    str += '(可获赠' + canget + '元宝)';
                                sli.push('<li><a id="_lnkDingyue" href="javascript:;" class="button color1 r3">' + str + '</a></li>');
                            }

                            $("#_qbDingyueUL").html(sli.join(""));
                            //$("#_subscribeInfoUL").append('<li>剩余体验币:' + ingot + '</li>');
                        }

                        $("#_gotoPay").click(function () {
                            location.href = 'Chongzhi.aspx';
                        });

                        $("#_lnkDingyue").click(function () {
                            var strbtn2 = $("#_lnkDingyue").html();
                            $("#_lnkDingyue").html("提交中.....");
                            $.get(Site.Host, $.param({ action: "book_quanben2", userid: userid, bookid: bookid, siteid: 2 })
                                , function (data2) {
                                    $("#_lnkDingyue").html(strbtn2);
                                    var res2 = eval("(" + data2 + ")");
                                    if (res2.result == 1) {
                                        $("#_successDiv").show();
                                        setTimeout(function () {
                                            if (typeof callback == "function") callback();
                                            Site.closeWinbox();
                                        }, 2000);
                                        XiaoXiangJS.purchaseSuccess();
                                        return;
                                    }
                                    var errs = ["缺少参数", "余额不足", "已经订阅过了不能重复点阅", "不是特价书"];
                                    Util.Alert(errs[Math.abs(res2.result)]);
                                    XiaoXiangJS.purchaseFailed();
                                });
                        });

                        //$("#_lnkDingyueByIngot").click(function () {
                        //    var strbtn2 = $("#_lnkDingyueByIngot").html();
                        //    $("#_lnkDingyueByIngot").html("提交中.....");
                        //    $.get(Site.Host, $.param({ action: "book_quanben2", userid: userid, bookid: bookid, ingotnum: res.maxDeduction })
                        //        , function (data2) {
                        //            $("#_lnkDingyueByIngot").html(strbtn2);
                        //            var res2 = eval("(" + data2 + ")");
                        //            if (res2.result == 1) {
                        //                $("#_successDiv").show();
                        //                setTimeout(function () {
                        //                    if (typeof callback == "function") callback();
                        //                    Site.closeWinbox();
                        //                }, 2000);
                        //                XiaoXiangJS.purchaseSuccess();
                        //                return;
                        //            }
                        //            var errs = ["缺少参数", "余额不足", "已经订阅过了不能重复点阅", "不是特价书"];
                        //            Util.Alert(errs[Math.abs(res2.result)]);
                        //            XiaoXiangJS.purchaseFailed();
                        //        });
                        //});

                        return;
                    }
                });

        },
        /*绑定手机号*/
        showBindingMobilebox: function (userid, callback) {
            var htm = [
               '<div class="box">',
                '    <div class="tab t2">',
                '        <ul><li class="animbg"></li></ul>',
                '        <ul id="_ulBinding">',
                '            <li data-index="0" class="curr">手机绑定</li>',
                '            <li data-index="1">解除绑定</li>',
                '        </ul>',
                '    </div>',
                '    <div id="_bindingPanels" style="border-top:2px solid #efefef; padding:10px 0;">',
                '        <div>',
                '               <div data-step="1">',
                        '            <ul class="group2">',
                        '               <li><input id="_txtMobile" class="input r3" type="tel" data-text="输入手机号" value="输入手机号" /></li>',
                        '               <li>',
                        '                   <ul class="group g2 ww">',
                        '                       <li><input id="_txtResult" class="input r3" type="tel" data-text="输入答案" value="输入答案" /></li>',
                        '                       <li><img src="/Vercode?r=' + new Date() + '" onclick="this.src = \'/Vercode?r=\' + new Date()" style="width:100%; height:38px;" /></li>',
                        '                   </ul>',
                        '               </li>',
                        '                <li><a id="_lnkCode" class="button color1 r3">获取短信验证码</a></li>',
                        '            </ul>',
                '               </div>',
                '               <div id="_hasBinding" style="text-align:center; font-size:14px; display:none;"></div>',
                '               <div data-step="2" style="display:none;">',
                '                   <ul class="group2">',
                '                       <li><input id="_txtCode" class="input r3" type="tel" data-text="输入短信验证码" value="输入短信验证码" /></li>',
                '                       <li><a id="_lnkBinding" class="button blue r3">确定绑定</a></li>',
                '                   </ul>',
                        '            <div class="wenxin bgwhite m10">',
                        '                <h3>温馨提示</h3>',
                        '                <ul>',
                        '                    <li>1.绑定手机后可以通过手机号取回密码！</li>',
                        '                </ul>',
                        '            </div>',
                '               </div>',
                '       </div>',
                '        <div style="display:none;">',
                '            <ul class="group2">',
                '                <li>',
                '                   <ul class="group g2 ww">',
                '                       <li><input id="_txtSmsMobile" class="input r3" type="tel" data-text="输入绑定的手机号" value="输入绑定的手机号" /></li>',
                '                       <li><a id="_bntSendSmsCode" class="button blue r3">获取验证码</a></li>',
                '                   </ul>',
                '                </li>',
                '                <li><input id="_txtSmsCode" class="input r3" type="tel" data-text="输入收到的短信验证码" value="输入收到的短信验证码" /></li>',
                '                <li><a id="_lnkUnbinding" class="button blue r3">确定解除手机绑定</a></li>',
                '            </ul>',
                '            <div class="wenxin bgwhite m10">',
                '                <h3>温馨提示</h3>',
                '                <ul>',
                '                    <li>1.解除手机绑定后将不能通过手机号取回密码！</li>',
                '                </ul>',
                '            </div>',
                '       </div>',
                '    </div>',
                '</div>'
            ];
            this.showWinbox('手机绑定', htm.join(""), true);

            var _timer;
            var _delay = 60;

            ajaxLocalService("user_getbinding", { userid: userid },
                function (response) {
                    var res = response.Data;
                    var attements = response.Attachments;

                    if (res == 1) {
                        $("#_hasBinding").html(attements);
                        $("#_hasBinding").show().siblings().hide();
                    }
                });

            $("#_ulBinding").find("li").click(function () {
                var sel = $(this);
                var index = parseInt(sel.attr("data-index"));
                sel.parent().siblings().find(".animbg").animate({ marginLeft: index * 50 + "%" }, 200
                    , function () { sel.addClass("curr").siblings().removeClass("curr"); });
                $("#_bindingPanels > div").eq(index).show().siblings().hide();
            });

            $(".input").click(
                function () {
                    if ($(this).val() == $(this).attr("data-text")) {
                        $(this).val("");
                    }
                }).blur(
                    function () {
                        if ($(this).val() == "") {
                            $(this).val($(this).attr("data-text"));
                        }
                    });

            $("#_lnkBinding").click(
                function () {
                    var mobile = $("#_txtMobile").val();
                    var code = $("#_txtCode").val();
                    ajaxLocalService("user_binding", { userid: userid, code: code, mobile: mobile } , 
                        function (response) {
                            if (response.Code == 0) {
                                var res = response.Data;
                                Util.Alert("绑定成功");
                                if (typeof callback == "function") callback();
                                setTimeout(function () { Site.closeWinbox(); }, 1500)
                            }
                            else {
                                Util.Alert(response.Message);
                            }
                        });
                });

            $("#_lnkUnbinding").click(function () {
                var code = $("#_txtSmsCode").val();
                var mobile = $("#_txtSmsMobile").val();
                ajaxLocalService("user_unbinding", { userid: userid, code: code, mobile: mobile },
                    function (response) {
                        if (response.Code == 0) {
                            var res = response.Data;
                            Util.Alert("成功解除绑定");
                            setTimeout(function () {
                                Site.closeWinbox();
                            }, 1500);
                        }
                        else {
                            Util.Alert(response.Message);
                        }
                    });
            });

            //发送解除绑定验证码
            $('#_bntSendSmsCode').click(
                function () {
                    if (Site.options.codeFlag == 1)
                        return;

                    var mobile = $('#_txtSmsMobile').val();
                    if (/^1\d{10}$/gi.test(mobile) == false) {
                        Util.Alert('请输入正确的手机号');
                        return;
                    }

                    ajaxLocalService("user_sendunbindingcode", { mobile: mobile, userid: userid }
                    , function (response) {
                        if (response.Code == 0) {
                            var res = response.Data;
                            Util.Alert("验证码已发送");
                            Site.options.codeFlag = 1;
                            _delay = 60;
                            _timer = setInterval(
                                function () {
                                    if (_delay <= 0) {
                                        clearInterval(_timer);
                                        Site.options.codeFlag = 0;
                                        $("#_bntSendSmsCode").html("获取验证码");
                                        return;
                                    }
                                    $("#_bntSendSmsCode").html("获取验证码(" + (_delay--) + ")");
                                }, 1000);
                        }
                        else {
                            Util.Alert(response.Message);
                        }
                    });

                });

            $("#_lnkCode").click(function () {
                var mobile = $("#_txtMobile").val();
                if (/^\d{11}$/gi.test(mobile) == false) {
                    Util.Alert("请输入正确的手机号")
                    return;
                }

                var rv = $("#_txtResult").val();
                if (rv == "" || rv == $("#_txtResult").attr("data-text")) {
                    Util.Alert("答案不能为空")
                    return;
                }
                ajaxLocalService("user_sendbindingcode", {mobile: mobile, rv: rv }
                    , function (response) {
                        var res = response.Data;
                        if (response.Code == 0) {
                            Util.Alert("验证码已发送");
                            Site.options.codeFlag = 1;
                            _delay = 60;
                            _timer = setInterval(
                                function () {
                                    if (_delay <= 0) {
                                        clearInterval(_timer);
                                        Site.options.codeFlag = 0;
                                        $("#_lnkCode").html("获取验证码");
                                        return;
                                    }
                                    $("#_lnkCode").html("获取验证码(" + (_delay--) + ")");
                                }, 1000);
                            $("div[data-step='1']").hide()
                                    .siblings("div[data-step='2']").show();
                        }
                        else {
                            Util.Alert(response.Message);
                        }
                    });
            });

        },
        /*显示确认框*/
        showConfirmbox: function (msg, callback) {
            var htm = [
                '<div id="_confirmBox" class="box" style="padding:10px 0;">',
                '    <div class="box" style="padding-bottom:10px; color:#555; line-height:24px; text-indent:28px; ">',
                msg,
                '    </div>',
                '    <div class="line"></div>',
                '    <ul class="group g2 m10">',
                '        <li><a href="javascript:;" data-value="1" class="button blue r3">确定</a></li>',
                '        <li><a href="javascript:;" data-value="0" class="button color2 r3">取消</a></li>',
                '    </ul>',
                '</div>'
            ];
            this.showWinbox('提示', htm.join(""), true);
            $("#_confirmBox .button").click(function () {
                var value = parseInt($(this).attr("data-value"));
                if (typeof callback == "function")
                    callback(value);
                Site.closeWinbox();
            });
        },
        /*回顶部*/
        initGotoTop: function () {
            $("#_goTop").remove();
            $('<a id="_goTop" href="javascript:;" class="gotop"></a>').appendTo("body");
            $("#_goTop").click(function () {
                $("body").animate({ scrollTop: 0 }, 200);
            });
            setInterval(function () {
                var top = $("body").scrollTop();
                top > 10 ? $("#_goTop").show() : $("#_goTop").hide();
            }, 200);
        },
        /*显示更新*/
        showUpdate: function () {
            var html = [
                '<div>',
                '    <p class="box" style="',
                '        padding:10px;',
                '        text-indent:28px;',
                '        font-size:14px;',
                '        color:#555;',
                '        line-height:150%;',
                '        text-shadow:0 1px 0 #fff;">更新到最新版本才可以签到！</p>',
                '    <ul class="group2">',
                '        <li><a class="button blue"  href="javascript:XiaoXiangJS.checkVersion()">更新至最新版本</a></li>',
                '    </ul>',
                '</div>'
            ];
            this.showWinbox("提示", html.join(""), true);
        },
        /*绑定手机号*/
        showBindingMobileboxBySingin: function (userid, callback) {
            var htm = [
                '<div class="box">',
                '   <div style="padding:15px 10px; text-align:center; color:#555; font-size:15px; ">您需绑定手机后才能正常使用签到功能！</div>',
                '    <div id="_bindingPanels" style=" padding:0 0 10px 0;">',
                '        <div data-step="1">',
                '            <ul class="group2">',
                '                <li><input id="_txtMobile" class="input r3" type="tel" data-text="输入手机号" value="输入手机号" /></li>',
                '                <li>',
                '                   <ul class="group g2 ww">',
                '                       <li><input id="_txtResult" class="input r3" type="tel" data-text="输入答案" value="输入答案" /></li>',
                '                       <li><img src="/Vercode?r=' + new Date() + '" onclick="this.src = \'/Vercode?r=\' + new Date()" style="width:100%; height:38px;" /></li>',
                '                   </ul>',
                '                </li>',
                '                <li><a id="_lnkCode" class="button color1 r3">获取验证码</a></li>',
                '            </ul>',
                '       </div>',
                '       <div data-step="2" style="display:none;">',
                '            <ul class="group2">',
                '                <li><input id="_txtCode" class="input r3" type="tel" data-text="输入短信验证码" value="输入短信验证码" /></li>',
                '                <li><a id="_lnkBinding" class="button blue r3">确定绑定</a></li>',
                '            </ul>',
                '       </div>',
                '       <div class="wenxin bgwhite m10">',
                '            <h3>温馨提示</h3>',
                '            <ul>',
                '               <li>1. 绑定手机后可以通过手机号取回密码！</li>',
                '            </ul>',
                '        </div>',
                '    </div>',
                '</div>'
            ];
            this.showWinbox('手机绑定', htm.join(""), true);

            var _timer;
            var _delay = 60;

            ajaxLocalService("user_getbinding", { userid: userid },
                function (response) {
                    var res = response.Data;
                    var attements = response.Attachments;

                    if (res == 1) {
                        $("#_hasBinding").html(attements);
                        $("#_hasBinding").show().siblings().hide();
                    }
                });

            $(".input").click(
                function () {
                    if ($(this).val() == $(this).attr("data-text")) {
                        $(this).val("");
                    }
                }).blur(
                    function () {
                        if ($(this).val() == "") {
                            $(this).val($(this).attr("data-text"));
                        }
                    });

            $("#_lnkBinding").click(
                function () {
                    var mobile = $("#_txtMobile").val();
                    var code = $("#_txtCode").val();
                    ajaxLocalService("user_binding", {userid: userid, code: code, mobile: mobile }
                        , function (response) {
                            var res = response.Data;
                            if (response.Code == 0) {
                                Util.Alert("绑定成功");
                                if (typeof callback == "function") callback();
                                setTimeout(function () { Site.closeWinbox(); }, 1500)
                            }
                            else {
                                Util.Alert(response.Message);
                            }
                        });
                });

            $("#_lnkCode").click(function () {

                var mobile = $("#_txtMobile").val();
                if (/^\d{11}$/gi.test(mobile) == false) {
                    Util.Alert("请输入正确的手机号")
                    return;
                }

                var rv = $("#_txtResult").val();
                if (rv == "" || rv == $("#_txtResult").attr("data-text")) {
                    Util.Alert("答案不能为空")
                    return;
                }

                ajaxLocalService("user_sendbindingcode",{ mobile: mobile, rv: rv }
                    , function (response) {
                        var res = response.Data;
                        if (response.Code == 0) {
                            Util.Alert("验证码已发送");
                            Site.options.codeFlag = 1;
                            _delay = 60;
                            _timer = setInterval(
                                function () {
                                    if (_delay <= 0) {
                                        clearInterval(_timer);
                                        Site.options.codeFlag = 0;
                                        $("#_lnkCode").html("获取验证码");
                                        return;
                                    }
                                    $("#_lnkCode").html("获取验证码(" + (_delay--) + ")");
                                }, 1000);
                            $("div[data-step='1']").hide()
                                    .siblings("div[data-step='2']").show();
                        }
                        else {
                            Util.Alert(response.Message);
                        }
                    });
            });
        }
    };

})();

window.onload = function () {
    Site.initGotoTop();
}