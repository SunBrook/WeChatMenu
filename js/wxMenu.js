/* 微信自定义菜单
*
*/

/*菜单数据
* data-name 菜单名称
* data-type 菜单的响应动作类型   view表示网页类型，click表示点击类型, scancode_push扫码推事件
* data-value 真实的对应的值 Url Key
* data-t_view 临时存储的值 Url
* data-t_click 临时存储的值 Key
* data-t_scan 临时存储的值 Key
*/

/*data数据
*/
var par1, par2, par3;//父级数据
var sub1, sub2, sub3;//子级数据
var pullData;//发布菜单暂存数据



//获取第一组的数据
function data1() {
    par1 = $("#menu1").find(".parent_menu_span").data();
    var sub = $("#menu1").find(".sub_menu_span");
    sub1 = new Array(sub.length);
    for (var i = 0; i < sub.length; i++) {
        sub1[i] = $(sub[i]).data();
    }
}
//获取第二组的数据
function data2() {
    par2 = $("#menu2").find(".parent_menu_span").data();
    var sub = $("#menu2").find(".sub_menu_span");
    sub2 = new Array(sub.length);
    for (var i = 0; i < sub.length; i++) {
        sub2[i] = $(sub[i]).data();
    }
}
//获取第三组的数据
function data3() {
    par3 = $("#menu3").find(".parent_menu_span").data();
    var sub = $("#menu3").find(".sub_menu_span");
    sub3 = new Array(sub.length);
    for (var i = 0; i < sub.length; i++) {
        sub3[i] = $(sub[i]).data();
    }
}

//第三组的数据放入第二组
function data3ToData2() {
    //父菜单
    var m2_data = $("#menu2").find(".parent_menu_span").data();
    m2_data.name = par3.name;
    m2_data.type = par3.type;
    m2_data.value = par3.value;
    m2_data.t_view = par3.t_view;
    m2_data.t_click = par3.t_click;
    m2_data.t_scan = par3.t_scan;
    //子菜单
    m2_sub = $("#menu2").find(".sub_menu_span");
    for (var i = 0; i < sub3.length; i++) {
        $(m2_sub[i]).data().name = sub3[i].name;
        $(m2_sub[i]).data().type = sub3[i].type;
        $(m2_sub[i]).data().value = sub3[i].value;
        $(m2_sub[i]).data().t_view = sub3[i].t_view;
        $(m2_sub[i]).data().t_click = sub3[i].t_click;
        $(m2_sub[i]).data().t_scan = sub3[i].t_scan;
    }
}
//第二组的数据放入第一组
function data2ToData1() {
    //父菜单
    var m1_data = $("#menu1").find(".parent_menu_span").data();
    m1_data.name = par2.name;
    m1_data.type = par2.type;
    m1_data.value = par2.value;
    m1_data.t_view = par2.t_view;
    m1_data.t_click = par2.t_click;
    m1_data.t_scan = par2.t_scan;
    //子菜单
    m1_sub = $("#menu1").find(".sub_menu_span");
    for (var i = 0; i < sub2.length; i++) {
        $(m1_sub[i]).data().name = sub2[i].name;
        $(m1_sub[i]).data().type = sub2[i].type;
        $(m1_sub[i]).data().value = sub2[i].value;
        $(m1_sub[i]).data().t_view = sub2[i].t_view;
        $(m1_sub[i]).data().t_click = sub2[i].t_click;
        $(m1_sub[i]).data().t_scan = sub2[i].t_scan;
    }
}


//选中颜色更换
function clickMenuItem(obj) {
    //变色class .current
    if (!$(obj).hasClass("current")) {
        $(".current").removeClass("current");
        $(obj).children("a").addClass("current");
    }
}
//删除菜单按钮
function removeMenuItem() {
    //判断是否是初始菜单，如果是不允许删除
    if ($(".current").parent().hasClass("js_firstadd")) {
        return;
    }
    //判断当前是父菜单还是子菜单
    if ($(".current").parent().hasClass("menu_parent")) {
        //**父菜单**
        //子菜单添加按钮
        var sub_add_btn = '<li class="js_addMenuBox"><a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="最多添加5个子菜单" draggable="false"><span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon14_menu_add"></i></span></a></li>';
        //不同个数，不同位置
        var parCount = $(".parent_menu_span").length;
        if (parCount == 3) {
            //删除的是3号位的父菜单，正常删除
            if ($(".current").parent().hasClass("m2")) {
                ////删除的是2号位的父菜单，3号位元素挪到2号位，3号位元素变为初始状态,并且不选中任何元素
                //获取3号位的数据
                data3();
                //3号位子菜单挪到2号位子菜单
                var m3sub_menu = $("#menu3").find(".sub_pre_menu_list").html();
                $("#menu2").find(".sub_pre_menu_list").html(m3sub_menu);
                //3号位父菜单挪到2号位父菜单
                var m3par_menu = $("#menu3").find("a").first().html();
                $("#menu2").find("a").first().html(m3par_menu);
                //data 3 -> 2
                data3ToData2();

            } else if ($(".current").parent().hasClass("m1")) {
                ////删除的是1号位的父菜单，2号位元素挪到1号位，3号位元素挪到2号位，3号位元素删除
                //获取2号位的数据
                data2();
                //2号位子菜单挪到1号位子菜单
                var m2sub_menu = $("#menu2").find(".sub_pre_menu_list").html();
                $("#menu1").find(".sub_pre_menu_list").html(m2sub_menu);
                //2号位父菜单挪到1号位父菜单
                var m2par_menu = $("#menu2").find("a").first().html();
                $("#menu1").find("a").first().html(m2par_menu);
                //data 2 -> 1
                data2ToData1();

                //3号位子菜单挪到2号位子菜单
                //获取3号位的数据
                data3();
                var m3sub_menu = $("#menu3").find(".sub_pre_menu_list").html();
                $("#menu2").find(".sub_pre_menu_list").html(m3sub_menu);
                //3号位父菜单挪到2号位父菜单
                var m3par_menu = $("#menu3").find("a").first().html();
                $("#menu2").find("a").first().html(m3par_menu);
                //data 3 -> 2
                data3ToData2();
            } else {
                //m3
            }

            //3号位子元素清空
            $("#menu3").find(".sub_pre_menu_list").html(sub_add_btn);
            //3号位的子添加按钮剃掉刘海
            $("#menu3").find(".sub_pre_menu_inner").addClass("inner_top");
            //3号位的父菜单清空
            $("#menu3").find("a").first().html('<i class="icon14_menu_add"></i>');

            //3号位显示提示
            $("#menu3").find("a").first().prop("title", "最多添加3个一级菜单");

            //隐藏二级菜单
            $(".current").parent().find(".sub_pre_menu_box").hide();
            //取消选中，去掉绿色
            $(".current").removeClass("current");
        } else if (parCount == 2) {
            //删除的是2号位的父菜单，正常删除
            if ($(".current").parent().hasClass("m1")) {
                ////删除的是1号位的父菜单，2号位元素挪到1号位
                //获取2号位的数据
                data2();
                //2号位子菜单挪到1号位子菜单
                var m2sub_menu = $("#menu2").find(".sub_pre_menu_list").html();
                $("#menu1").find(".sub_pre_menu_list").html(m2sub_menu);
                //2号位父菜单挪到1号位父菜单
                var m2par_menu = $("#menu2").find("a").first().html();
                $("#menu1").find("a").first().html(m2par_menu);
                //data 2 -> 1
                data2ToData1();

            } else {
                //m2

            }
            //2号位子元素清空
            $("#menu2").find(".sub_pre_menu_list").html(sub_add_btn);
            //2号位的子添加按钮剃掉刘海
            $("#menu2").find(".sub_pre_menu_inner").addClass("inner_top");
            //2号位的父菜单清空
            $("#menu2").find("a").first().html('<i class="icon14_menu_add"></i>');

            //2号位显示提示
            $("#menu2").find("a").first().prop("title", "最多添加3个一级菜单");

            //隐藏二级菜单
            $(".current").parent().find(".sub_pre_menu_box").hide();
            //取消选中，去掉绿色
            $(".current").removeClass("current");

            //3位父菜单布局变2位菜单布局
            $("#menu1").removeClass("size1of3").addClass("size1of2");
            $("#menu2").removeClass("size1of3").addClass("size1of2");
            $("#menu1").show();
            $("#menu2").show();
            $("#menu3").hide();

        } else {
            ////2位父菜单布局变初始1位菜单布局
            if ($(".current").parent().hasClass("m1")) {
                //1号位子元素清空
                $("#menu1").find(".sub_pre_menu_list").html(sub_add_btn);
                //1号位的子添加按钮剃掉刘海
                $("#menu1").find(".sub_pre_menu_inner").addClass("inner_top");
                //1号位的父菜单清空
                $("#menu1").find("a").first().html('<i class="icon14_menu_add"></i>');

                //1号位显示提示
                $("#menu1").find("a").first().prop("title", "最多添加3个一级菜单");

                //隐藏二级菜单
                $(".current").parent().find(".sub_pre_menu_box").hide();
                //取消选中，去掉绿色
                $(".current").removeClass("current");
            }
            //改变布局
            $("#menu1").hide();
            $("#menu2").hide();
            $(".js_firstadd").show();
            $(".js_firstadd").find("a").first().addClass("current");
        }
    } else {
        //**子菜单**
        //隐藏二级菜单
        $(".current").parent().parent().parent().hide();
        var pax = $(".current").parent().parent();
        //删除元素
        $(".current").parent().remove();
        //重新去掉刘海
        pax.find(".inner_top").removeClass("inner_top");
        pax.find("li").first().find(".sub_pre_menu_inner").addClass("inner_top");
        //如果子菜单全部删除，那么父菜单的点要删掉,并且需要添加一个添加按钮
        var sub_count = pax.find(".sub_menu_span").length;
        if (sub_count == 0) {
            //去点
            pax.parent().parent().find("a").first().find(".menu_icon_dot").remove();
            //加按钮
            var addli = '<li class="js_addMenuBox">' +
                '<a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="最多添加5个子菜单" draggable="false">' +
                '<span class="sub_pre_menu_inner js_sub_pre_menu_inner inner_top">' +
                '<i class="icon14_menu_add"></i>' +
                '</span>' +
                '</a>' +
                '</li>';
            pax.parent().find(".sub_pre_menu_list").html(addli);

        } else if (sub_count < 5 && pax.find(".js_addMenuBox").length == 0) {
            //加按钮
            var addli = '<li class="js_addMenuBox">' +
                '<a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="最多添加5个子菜单" draggable="false">' +
                '<span class="sub_pre_menu_inner js_sub_pre_menu_inner">' +
                '<i class="icon14_menu_add"></i>' +
                '</span>' +
                '</a>' +
                '</li>';
            pax.parent().find(".sub_pre_menu_list").find("li").last().after(addli);
        }
    }
    //右侧清空，显示为未选中状态
    clearMenu();
    //判断禁用启用发布按钮
    openCloseSave();
}



//初始化编辑区 - 菜单为空时
function initMenuNull(name) {
    $(".global_info").text(name);
    $("#menu_name").val(name);
    $(".rd_view").click();
    $("#menu_val").val("");
    $(".m_val").removeClass("border_red");
    $(".js_valHttpTips").hide();
    $(".js_valErrTips").hide();
    //选中菜单名称内容
    $("#menu_name").focus();
    $("#menu_name").select();
}
//初始化编辑区 - 菜单有值时
function initMenuValue(name, type, value) {
    $(".global_info").text(name);
    $("#menu_name").val(name);
    $(".m_val").removeClass("border_red");
    $(".js_valHttpTips").hide();
    $(".js_valErrTips").hide();
    switch (type) {
        case "view":
            $(".rd_view").click();
            break;
        case "click":
            $(".rd_click").click();
            break;
        case "scancode_push":
            $(".rd_scan").click();
            break;
    }
    $("#menu_val").val(value);
}
//清空编辑区
function clearMenu() {
    $("#menu_name").val("");
    $(".rd_view").click();
    $("#menu_val").val("");
    $(".m_val").removeClass("border_red");
    $(".js_valHttpTips").hide();
    $(".js_valErrTips").hide();
    //隐藏编辑区
    hideDispose();
}
//显示编辑区
function showDispose(ob) {
    //修改名称提示
    switch (ob) {
        case "par":
            $(".js_titleNolTips").text("字数不超过4个汉字或8个字母");
            break;
        case "sub":
            $(".js_titleNolTips").text("字数不超过8个汉字或16个字母");
            break;
        case "first":
            $(".js_titleNolTips").text("字数不超过4个汉字或8个字母");
            break;
    }
    //隐藏空白页，显示编辑区
    if ($(".space_tips").is(":visible")) {
        $(".space_tips").hide();
        $(".mid_div").show();
    }
}
//隐藏编辑区
function hideDispose() {
    if ($(".space_tips").is(":hidden")) {
        $(".space_tips").show();
        $(".mid_div").hide();
    }
}
//显示编辑区的类型和值
function showDisposePart() {
    $(".mid_type").show();
    $(".mid_value").show();
}
//隐藏编辑区的类型和值
function hideDisposePart() {
    $(".mid_type").hide();
    $(".mid_value").hide();
}

//判断是否要显示只能添加名称
function cantAddTip() {
    if ($(".current").parent().hasClass("menu_parent")) {
        var sub_count = $(".current").parent().find(".sub_menu_span").length;
        if (sub_count > 0) {
            var par_name = $(".current").find(".parent_menu_span").data("name");
            $("#js_innerNone").html("已为“" + par_name + "”添加了" + sub_count + "个子菜单，无法设置其他内容。");
        } else {
            $("#js_innerNone").html("");
        }
    } else {
        $("#js_innerNone").html("");
    }
}

//左侧按钮选中后，离开之前保存菜单数据
function beforeSaveMenu() {
    if ($(".current").parent().hasClass("js_firstadd")) {
        //初始菜单，没有保存的数据
        return;
    }
    var name = $("#menu_name").val();
    var type = $('input:radio[name="menu_type"]:checked').val();
    var value = $("#menu_val").val();
    if ($(".current").parent().hasClass("sub_menu_li")) {
        //子菜单
        var sub_obj = $(".current").find(".sub_menu_span");
        //todo 只能保存8汉字16字母 为空默认值
        sub_obj.data("name", name);
        sub_obj.data("type", type);
        sub_obj.data("value", value);
    } else {
        //父菜单
        var par_obj = $(".current").find(".parent_menu_span");
        //todo 只能保存4汉字8字母 为空默认值
        par_obj.data("name", name);
        par_obj.data("type", type);
        par_obj.data("value", value);
    }
}

//字数不超过4个汉字或8个字母或8个符号
function isLength48(str) {
    return /^[a-zA-Z]{1,8}$/.test((str + '').replace(/[\u4e00-\u9fa5]/g, 'aa').replace(/./g, 'a'));
}
//字数不超过8个汉字或16个字母或16个符号
function isLength816(str) {
    return /^[a-zA-Z]{1,16}$/.test((str + '').replace(/[\u4e00-\u9fa5]/g, 'aa').replace(/./g, 'a'));
}
//获取正常长度字符串 - 字数不超过4个汉字或8个字母或8个符号
function subString48(str) {
    while (!isLength48(str)) {
        str = str.substring(0, str.length - 1);
    }
    return str;
}
//获取正常长度字符串 - 字数不超过8个汉字或16个字母或16个符号
function subString816(str) {
    while (!isLength816(str)) {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

//启用禁用发布按钮
function openCloseSave() {
    //页面加载时判断是否存在菜单消息，如果消息为空，那么禁用发布按钮，否则启用
    if ($(".parent_menu_span").length == 0) {
        //禁用按钮
        $("#submitMenu").prop("disabled", true);
        $("#submitMenu").css("cursor", "not-allowed");
        $("#submitMenu").prop("title", "菜单为空，不允许发布");

    } else {
        //启用按钮
        $("#submitMenu").prop("disabled", false);
        $("#submitMenu").css("cursor", "pointer");
        $("#submitMenu").prop("title", "");
    }
}

//弹窗关闭
function popClose() {
    $(".fade").hide();
    $(".dialog_wrp").hide();
}

//弹窗初始化,并打开弹窗
function popInit(picstyle, title, description, event) {
    $(".dialog_bd").find(".msg_icon_wrapper").find(".icon_msg").removeClass("tip").removeClass("warn").removeClass("success").addClass(picstyle);
    $(".msg_content").find("h4").text(title);
    $(".msg_content").find("p").text(description);
    $("#dialogOk").data("event", event);
    if (event == null) {
        $("#dialogClose").hide();
    } else {
        $("#dialogClose").show();
    }
    popOpen();
}

//弹窗开启
function popOpen() {
    $(".fade").show();
    $(".dialog_wrp").show();
}


//清空页面到初始状态
function clearPage() {
    //3 2 1 号位子元素清空
    var fron_li = '<li class="js_addMenuBox">' +
        '<a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="最多添加5个子菜单" draggable="false">' +
        '<span class="sub_pre_menu_inner js_sub_pre_menu_inner inner_top">' +
        '<i class="icon14_menu_add"></i>' +
        '</span>' +
        '</a>' +
        '</li>'
    $("#menu3").find(".sub_pre_menu_list").html(fron_li);
    $("#menu2").find(".sub_pre_menu_list").html(fron_li);
    $("#menu1").find(".sub_pre_menu_list").html(fron_li);
    //3 2 1号位的父菜单清空
    $("#menu3").find("a").first().html('<i class="icon14_menu_add"></i>');
    $("#menu2").find("a").first().html('<i class="icon14_menu_add"></i>');
    $("#menu1").find("a").first().html('<i class="icon14_menu_add"></i>');
    //3 2 1号位显示提示
    $("#menu3").find("a").first().prop("title", "最多添加3个一级菜单");
    $("#menu2").find("a").first().prop("title", "最多添加3个一级菜单");
    $("#menu1").find("a").first().prop("title", "最多添加3个一级菜单");
    //隐藏二级菜单
    $(".sub_pre_menu_box").hide();
    //改变布局
    $("#menu1").hide();
    $("#menu2").hide();
    $("#menu3").hide();
    $(".js_firstadd").show();
    $(".js_firstadd").find("a").first().addClass("current");
    //编辑器清空
    hideDispose();
    //禁用保存
    openCloseSave();
}

//菜单第3项的验证
function m3Check() {
    //验证第三项是否为空
    m3NullCheck();
    //为空时添加边框
    if ($("#menu_val").val().length > 0) {
        $(".m_val").removeClass("border_red");
        //验证链接格式
        if ($(".mid_value").find(".lbl_name").text() == "跳转链接") {
            //1.必须以http:// 或者 https:// 开头
            if (!ishttpTop($("#menu_val").val())) {
                $(".js_valHttpTips").show();
                return;
            } else {
                $(".js_valHttpTips").hide();
            }
            //2.为跳转链接时，验证链接格式
            if (!IsURL($("#menu_val").val())) {
                $(".js_valErrTips").show();
                return;
            } else {
                $(".js_valErrTips").hide();
            }
        }
    } else {
        $(".js_valHttpTips").hide();
        $(".js_valErrTips").hide();
    }
}

//菜单第3项链接格式验证
function m3UrlCheck(value) {
    //1.必须以http:// 或者 https:// 开头
    if (!ishttpTop(value)) {
        $(".js_valHttpTips").show();
        return false;
    } else {
        $(".js_valHttpTips").hide();
    }
    //2.为跳转链接时，验证链接格式
    if (!IsURL(value)) {
        $(".js_valErrTips").show();
        return false;
    } else {
        $(".js_valErrTips").hide();
    }
    return true;
}

//菜单第3项非空验证
function m3NullCheck() {
    var m3 = $("#menu_val").val();
    if (m3 == null || m3 == "") {
        $(".js_valnoTips").show();
    } else {
        $(".js_valnoTips").hide();
        $(".m_val").removeClass("border_red");
    }
    //更改信息data
    if ($(".current").parent().hasClass("pre_menu_item")) {
        //父级
        $(".current").find(".parent_menu_span").data("value", m3);
    } else {
        //子级
        $(".current").find(".sub_menu_span").data("value", m3);
    }
}

//字符串是否包含子字符串
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

//获取菜单
function getWxMenu() {
    $.ajax({
        url: '/WeChat/GetCustomMenu',
        type: "post",
        dataType: "json",
        success: function (response) {
            //清空页面到初始状态
            clearPage();
            if (response.Status) {
                var subbtn_count = 0;
                for (var i = 0; i < response.button.length; i++) {
                    subbtn_count += response.button[i].sub_button.length;
                }
                popInit("success", "获取成功", "总共 " + response.button.length + " 个父级菜单, " + subbtn_count + " 个子级菜单", null);
                //根据值初始化页面
                for (var i = 1; i < response.button.length + 1; i++) {

                    var par_obj = $("#menu" + i);
                    //添加父级名称
                    par_obj.find("a").first().html('<span class="parent_menu_span">' + response.button[i - 1].name + '</span>');
                    //判断是否需要添加.dot
                    if (response.button[i - 1].sub_button.length > 0) {
                        par_obj.find("a").first().find("span").before('<i class="menu_icon_dot" style="margin-right:5px;"></i>');
                    }
                    //父级取消提示
                    par_obj.find("a").first().prop("title", "");

                    //添加子菜单
                    for (var j = 0; j < response.button[i - 1].sub_button.length; j++) {
                        if (par_obj.find(".sub_menu_span").length == 4) {
                            //替换子菜单
                            var replaceLi = par_obj.find(".js_addMenuBox");
                            replaceLi.addClass("sub_menu_li").removeClass("js_addMenuBox");
                            var xa = '<a href="javascript:void(0);" draggable="false" class="current">' +
                                '   <span class="sub_pre_menu_inner js_sub_pre_menu_inner">' +
                                '      <span class="sub_menu_span">' + response.button[i - 1].sub_button[j].name + '</span>' +
                                ' </span>' +
                                '</a>';
                            replaceLi.html(xa);
                        } else {
                            //添加子菜单
                            var newli = '<li class="sub_menu_li"><a href="javascript:void(0);" draggable="false" class="current">' +
                                '   <span class="sub_pre_menu_inner js_sub_pre_menu_inner">' +
                                '      <span class="sub_menu_span">' + response.button[i - 1].sub_button[j].name + '</span>' +
                                ' </span>' +
                                '</a>' +
                                '</li>';
                            par_obj.find(".js_addMenuBox").before(newli);

                        }
                    }
                    //子菜单顶部重新去掉刘海
                    par_obj.find(".inner_top").removeClass("inner_top");
                    par_obj.find("li").first().find(".sub_pre_menu_inner").addClass("inner_top");

                    //添加父级data
                    var par_data = par_obj.find(".parent_menu_span");
                    var dapar = response.button[i - 1];
                    par_data.data("name", dapar.name);
                    par_data.data("type", dapar.type);

                    par_data.data("t_view", null);
                    par_data.data("t_click", null);
                    par_data.data("t_scan", null);
                    switch (dapar.type) {
                        case null:
                            par_data.data("value", null);
                            break;
                        case "view":
                            par_data.data("value", dapar.url);
                            par_data.data("t_view", dapar.url);
                            break;
                        case "click":
                            par_data.data("value", dapar.key);
                            par_data.data("t_click", dapar.key);
                            break;
                        case "scancode_push":
                            par_data.data("value", dapar.key);
                            par_data.data("t_scan", dapar.key);
                            break;
                    }

                    //添加子级data
                    var sub_obj = par_obj.find(".sub_menu_span");
                    for (var k = 0; k < sub_obj.length; k++) {
                        var sub_data = $(sub_obj[k]);
                        var dasub = response.button[i - 1].sub_button[k];
                        sub_data.data("name", dasub.name);
                        sub_data.data("type", dasub.type);

                        sub_data.data("t_view", null);
                        sub_data.data("t_click", null);
                        sub_data.data("t_scan", null);

                        switch (dasub.type) {
                            case null:
                                sub_data.data("value", null);
                                break;
                            case "view":
                                sub_data.data("value", dasub.url);
                                sub_data.data("t_view", dasub.url);
                                break;
                            case "click":
                                sub_data.data("value", dasub.key);
                                sub_data.data("t_click", dasub.key);
                                break;
                            case "scancode_push":
                                sub_data.data("value", dasub.key);
                                sub_data.data("t_scan", dasub.key);
                                break;
                        }
                    }

                }
                //根据父菜单个数来布局
                var par_count = response.button.length;
                switch (par_count) {
                    case 0:
                        $(".js_firstadd").show();
                        $("#menu1").hide();
                        $("#menu2").hide();
                        $("#menu3").hide();
                        //隐藏编辑区
                        hideDispose();
                        break;
                    case 1:
                        //隐藏初始
                        $(".js_firstadd").hide();
                        //显示前2个父级菜单
                        $("#menu1").removeClass("size1of3").addClass("size1of2");
                        $("#menu2").removeClass("size1of3").addClass("size1of2");
                        $("#menu1").show();
                        $("#menu2").show();
                        //第一个菜单不用提示
                        $("#menu1").find("a").first().prop("title", "");
                        $("#menu2").find("a").first().prop("title", "最多添加3个一级菜单");
                        //点击第一个按钮
                        $("#menu1").click();
                        break;
                    case 2:
                        //隐藏初始
                        $(".js_firstadd").hide();
                        //显示前3个父级菜单
                        $("#menu1").removeClass("size1of2").addClass("size1of3");
                        $("#menu2").removeClass("size1of2").addClass("size1of3");
                        $("#menu3").removeClass("size1of2").addClass("size1of3");
                        $("#menu1").show();
                        $("#menu2").show();
                        $("#menu3").show();
                        //第一二个菜单不用提示
                        $("#menu1").find("a").first().prop("title", "");
                        $("#menu2").find("a").first().prop("title", "");
                        $("#menu3").find("a").first().prop("title", "最多添加3个一级菜单");
                        //点击第一个按钮
                        $("#menu1").click();
                        break;
                    case 3:
                        //隐藏初始
                        $(".js_firstadd").hide();
                        //显示前3个父级菜单
                        $("#menu1").removeClass("size1of2").addClass("size1of3");
                        $("#menu2").removeClass("size1of2").addClass("size1of3");
                        $("#menu3").removeClass("size1of2").addClass("size1of3");
                        $("#menu1").show();
                        $("#menu2").show();
                        $("#menu3").show();
                        //第一二三个菜单不用提示
                        $("#menu1").find("a").first().prop("title", "");
                        $("#menu2").find("a").first().prop("title", "");
                        $("#menu3").find("a").first().prop("title", "");
                        //点击第一个按钮
                        $("#menu1").click();
                        break;
                }

                //保存启用
                openCloseSave();
            } else {
                //获取异常 弹窗提示
                if (isContains(response.Message, "46003")) {
                    popInit("success", "获取成功", "总共 0 个父级菜单，0 个子级菜单", null);
                } else {
                    popInit("warn", "获取失败", "请联系管理员：" + response.Message, null);
                }
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            popInit("warn", "获取失败", "请联系管理员：[error]" + errorThrown, null);
        }
    });
}

//收集页面菜单信息，同时检查数据是否有效,返回结果是否通过检查
function getPageMenuInfo() {
    var m1_par_data, m2_par_data, m3_par_data;
    var m1_sub_data, m2_sub_data, m3_sub_data;
    //第一组
    var m1 = $("#menu1").find(".parent_menu_span");
    if (m1.length == 0) return false;
    var m1_sub = $("#menu1").find(".sub_menu_span");
    m1_par_data = new Object();
    m1_sub_data = new Array();
    m1_par_data.name = m1.data("name");
    if (m1_sub.length == 0) {
        //没有子级，检查父级信息完整性
        var value = m1.data("value");
        m1_par_data.type = m1.data("type");
        m1_par_data.value = value;
        //验证链接格式 和 非空
        if ((value == null || value == "" || value == undefined) || (m1_par_data.type == "view" && !m3UrlCheck(value))) {
            $("#menu1").click();
            //边框变红
            $(".m_val").addClass("border_red");
            return false;
        }
    } else {
        //有子级，检查子级信息完整性
        m1_par_data.type = null;
        m1_par_data.value = null;
        for (var i = 0; i < m1_sub.length; i++) {
            var sub_btn = new Object();
            var value = $(m1_sub[i]).data("value");
            sub_btn.type = $(m1_sub[i]).data("type");
            //验证链接格式 和 非空
            if ((value == null || value == "" || value == undefined) || (sub_btn.type == "view" && !m3UrlCheck(value))) {
                //显示子项菜单
                $(".sub_pre_menu_box").hide();
                $("#menu1").find(".sub_pre_menu_box").show();
                //问题子项被选中
                $($("#menu1").find(".sub_menu_li")[i]).click();
                //边框变红
                $(".m_val").addClass("border_red");
                return false;
            }
            sub_btn.name = $(m1_sub[i]).data("name");
            sub_btn.value = value;
            m1_sub_data.push(sub_btn);
        }
    }

    //第二组
    var m2 = $("#menu2").find(".parent_menu_span");
    if (m2.length > 0) {
        var m2_sub = $("#menu2").find(".sub_menu_span");
        m2_par_data = new Object();
        m2_sub_data = new Array();
        m2_par_data.name = m2.data("name");
        if (m2_sub.length == 0) {
            //没有子级，检查父级信息完整性
            var value = m2.data("value");
            m2_par_data.type = m2.data("type");
            m2_par_data.value = value;
            //验证链接格式 和 非空
            if ((value == null || value == "" || value == undefined) || (m2_par_data.type == "view" && !m3UrlCheck(value))) {
                $("#menu2").click();
                //边框变红
                $(".m_val").addClass("border_red");
                return false;
            }
        } else {
            //有子级，检查子级信息完整性
            m2_par_data.type = null;
            m2_par_data.value = null;
            for (var i = 0; i < m2_sub.length; i++) {
                var sub_btn = new Object();
                var value = $(m2_sub[i]).data("value");
                sub_btn.type = $(m2_sub[i]).data("type");
                //验证链接格式 和 非空
                if ((value == null || value == "" || value == undefined) || (sub_btn.type == "view" && !m3UrlCheck(value))) {
                    //显示子项菜单
                    $(".sub_pre_menu_box").hide();
                    $("#menu2").find(".sub_pre_menu_box").show();
                    //问题子项被选中
                    $($("#menu2").find(".sub_menu_li")[i]).click();
                    //边框变红
                    $(".m_val").addClass("border_red");
                    return false;
                }
                sub_btn.name = $(m2_sub[i]).data("name");
                sub_btn.value = value;
                m2_sub_data.push(sub_btn);
            }
        }
    }

    //第三组
    var m3 = $("#menu3").find(".parent_menu_span");
    if (m3.length > 0) {
        var m3_sub = $("#menu3").find(".sub_menu_span");
        m3_par_data = new Object();
        m3_sub_data = new Array();
        m3_par_data.name = m3.data("name");
        if (m3_sub.length == 0) {
            //没有子级，检查父级信息完整性
            var value = m3.data("value");
            m3_par_data.type = m3.data("type");
            m3_par_data.value = value;
            //验证链接格式 和 非空
            if ((value == null || value == "" || value == undefined) || (m3_par_data.type == "view" && !m3UrlCheck(value))) {
                $("#menu3").click();
                //边框变红
                $(".m_val").addClass("border_red");
                return false;
            }
        } else {
            //有子级，检查子级信息完整性
            m3_par_data.type = null;
            m3_par_data.value = null;
            for (var i = 0; i < m3_sub.length; i++) {
                var sub_btn = new Object();
                var value = $(m3_sub[i]).data("value");
                sub_btn.type = $(m3_sub[i]).data("type");
                //验证链接格式 和 非空
                if ((value == null || value == "" || value == undefined) || (sub_btn.type == "view" && !m3UrlCheck(value))) {
                    //显示子项菜单
                    $(".sub_pre_menu_box").hide();
                    $("#menu3").find(".sub_pre_menu_box").show();
                    //问题子项被选中
                    $($("#menu3").find(".sub_menu_li")[i]).click();
                    //边框变红
                    $(".m_val").addClass("border_red");
                    return false;
                }
                sub_btn.name = $(m3_sub[i]).data("name");
                sub_btn.value = value;
                m3_sub_data.push(sub_btn);
            }
        }
    }

    //汇总数据
    pullData = new Object();
    pullData.button = new Array();
    //第一组
    if (m1_par_data != null && m1_par_data != undefined) {
        var mm1 = new Object();
        mm1.sub_button = new Array();
        mm1.name = m1_par_data.name;
        if (m1_sub_data.length == 0) {
            mm1.type = m1_par_data.type;
            if (mm1.type == "view") {
                mm1.url = m1_par_data.value;
            } else {
                mm1.key = m1_par_data.value;
            }
            mm1.sub_button = new Array();
        }
        //子菜单
        for (var i = 0; i < m1_sub_data.length; i++) {
            var mm1_sub = new Object();
            mm1_sub.name = m1_sub_data[i].name;
            mm1_sub.type = m1_sub_data[i].type;
            if (mm1_sub.type == "view") {
                mm1_sub.url = m1_sub_data[i].value;
            } else {
                mm1_sub.key = m1_sub_data[i].value;
            }
            mm1_sub.sub_button = new Array();
            mm1.sub_button.push(mm1_sub);
        }
        pullData.button.push(mm1);
    }

    //第二组
    if (m2_par_data == null || m2_par_data == undefined) return true;
    var mm2 = new Object();
    mm2.name = m2_par_data.name;
    mm2.sub_button = new Array();
    if (m2_sub_data.length == 0) {
        mm2.type = m2_par_data.type;
        if (mm2.type == "view") {
            mm2.url = m2_par_data.value;
        } else {
            mm2.key = m2_par_data.value;
        }
        mm2.sub_button = new Array();
    }
    //子菜单
    for (var i = 0; i < m2_sub_data.length; i++) {
        var mm2_sub = new Object();
        mm2_sub.name = m2_sub_data[i].name;
        mm2_sub.type = m2_sub_data[i].type;
        if (mm2_sub.type == "view") {
            mm2_sub.url = m2_sub_data[i].value;
        } else {
            mm2_sub.key = m2_sub_data[i].value;
        }
        mm2_sub.sub_button = new Array();
        mm2.sub_button.push(mm2_sub);
    }
    pullData.button.push(mm2);

    //第三组
    if (m3_par_data == null || m3_par_data == undefined) return true;
    var mm3 = new Object();
    mm3.name = m3_par_data.name;
    mm3.sub_button = new Array();
    if (m3_sub_data.length == 0) {
        mm3.type = m3_par_data.type;
        if (mm3.type == "view") {
            mm3.url = m3_par_data.value;
        } else {
            mm3.key = m3_par_data.value;
        }
        mm3.sub_button = new Array();
    }
    //子菜单
    for (var i = 0; i < m3_sub_data.length; i++) {
        var mm3_sub = new Object();
        mm3_sub.name = m3_sub_data[i].name;
        mm3_sub.type = m3_sub_data[i].type;
        if (mm3_sub.type == "view") {
            mm3_sub.url = m3_sub_data[i].value;
        } else {
            mm3_sub.key = m3_sub_data[i].value;
        }
        mm3_sub.sub_button = new Array();
        mm3.sub_button.push(mm3_sub);
    }
    pullData.button.push(mm3);
    return true;
}

//发布菜单
function pullMenu() {
    $.ajax({
        url: '/WeChat/UpdateCustomMenu',
        type: "post",
        data: { postData: JSON.stringify(pullData) },
        dataType: "json",
        success: function (response) {
            if (response.Status) {
                //保存启用
                openCloseSave();
                popInit("success", "发布成功", "发布成功后，将在24小时内对所有已关注用户生效，新用户关注可以看到更新菜单", null);
            } else {
                //获取异常 弹窗提示
                popInit("warn", "发布失败", "请联系管理员：" + response.Message, null);
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            popInit("warn", "发布失败", "请联系管理员：[error]" + errorThrown, null);
        }
    });
}

//清零菜单
function onlineDel() {
    $.ajax({
        url: '/WeChat/DelCustomMenu',
        type: "post",
        dataType: "json",
        success: function (response) {
            window.bb = response;
            console.log(response.Status);
            if (response.Status) {
                popInit("success", "删除成功", "删除成功后，将在24小时内对所有已关注用户生效，新用户关注看到的菜单为空", null);
                //清空页面到初始状态
                clearPage();
                //保存启用
                openCloseSave();
            } else {
                //获取异常 弹窗提示
                popInit("warn", "删除失败", "请联系管理员：" + response.Message, null);
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            popInit("warn", "删除失败", "请联系管理员：[error]" + e, null);
        }
    });
}

//url验证
function IsURL(str_url) {
    var strRegex = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    var re = new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}

//微信必须以http 或 https 开头
function ishttpTop(str_url) {
    var strRegex = /(http|https):\/\/?/;
    var re = new RegExp(strRegex);
    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}


$(function () {

    //页面加载时，获取菜单并绑定
    getWxMenu();

    //启用禁用发布按钮
    openCloseSave();

    //开始菜单为空，点击添加菜单
    $(".js_firstadd").click(function (e) {
        //隐藏自身
        $(this).hide();
        //显示前2个父级菜单
        $("#menu1").removeClass("size1of3").addClass("size1of2");
        $("#menu2").removeClass("size1of3").addClass("size1of2");
        $("#menu1").show();
        $("#menu2").show();
        //第一个菜单不用提示
        $("#menu1").find("a").first().prop("title", "");
        $("#menu2").find("a").first().prop("title", "最多添加3个一级菜单");
        //点击第一个按钮
        $("#menu1").click();
        //启用禁用发布按钮
        openCloseSave();
        //阻止冒泡
        e.stopPropagation();
    });

    //菜单名称获取焦点
    $("#menu_name").focus(function () {
        var type = $('input:radio[name="menu_type"]:checked').val();
        if ($(".current").parent().hasClass("sub_menu_li")) {
            //子菜单
            var sub_obj = $(".current").find(".sub_menu_span");
            if (sub_obj.data("type") == undefined || sub_obj.data("type") == null) {
                $("#menu_name").select();
                sub_obj.data("type", type);
            }
        } else {
            //父菜单
            var par_obj = $(".current").find(".parent_menu_span");
            if (par_obj.data("type") == undefined || par_obj.data("type") == null) {
                $("#menu_name").select();
                par_obj.data("type", type);
            }
        }
    });

    //菜单按钮点击
    $(".menuList").on("click", "li", function (e) {
        //保存上一次菜单数据
        beforeSaveMenu();
        if ($(this).hasClass("js_firstadd")) {
            //初始菜单，直接无视，因为有单独写方法
            return;
        }
        if ($(this).hasClass("js_addMenuBox")) {
            //**添加子级按钮**

            //显示编辑区
            showDispose("sub");
            showDisposePart();

            //先移除之前选中的颜色
            $(".current").removeClass("current");
            //添加上限只有5，如果已经到达4，那么把添加按钮的元素替换为子菜单
            if ($(this).parent().find(".sub_menu_span").length == 4) {
                //替换子菜单
                var replaceLi = $(this).parent().find(".js_addMenuBox");
                replaceLi.addClass("sub_menu_li").removeClass("js_addMenuBox");
                var xa = '<a href="javascript:void(0);" draggable="false" class="current">' +
                    '   <span class="sub_pre_menu_inner js_sub_pre_menu_inner">' +
                    '      <span class="sub_menu_span">子级菜单</span>' +
                    ' </span>' +
                    '</a>';
                replaceLi.html(xa);
            } else {
                //添加子菜单
                var newli = '<li class="sub_menu_li"><a href="javascript:void(0);" draggable="false" class="current">' +
                    '   <span class="sub_pre_menu_inner js_sub_pre_menu_inner">' +
                    '      <span class="sub_menu_span">子级菜单</span>' +
                    ' </span>' +
                    '</a>' +
                    '</li>';
                $(this).before(newli);
                //子菜单顶部重新去掉刘海
                $(this).parent().find(".inner_top").removeClass("inner_top");
                $(this).parent().find("li").first().find(".sub_pre_menu_inner").addClass("inner_top");
                //父菜单添加点，表示有父菜单有子级,同时父菜单将失去作为一个普通子级的权利，只存在一个名称
                var pul = $(this).parent().parent().parent();
                if (pul.find("a").first().find(".menu_icon_dot").length == 0) {
                    //添加点
                    pul.find("a").first().find("span").before('<i class="menu_icon_dot" style="margin-right:5px;"></i>');
                }
                //删除数据
                var par_obj = pul.find("a").first().find(".parent_menu_span");
                par_obj.data("type", null);
                par_obj.data("value", null);
            }
            //添加元素值 data-name
            $(".current").find(".sub_menu_span").data("name", "子级菜单");
            //初始化编辑区
            initMenuNull("子级菜单");

        } else if ($(this).hasClass("menu_parent")) {
            //**父级按钮**
            clickMenuItem(this);
            //显示当前子级菜单
            if ($(this).children(".sub_pre_menu_box").is(":hidden")) {
                $(".sub_pre_menu_box").hide();
                $(this).children(".sub_pre_menu_box").show();
            }
            //右侧信息更改
            //先显示编辑区，然后看部分是否需要隐藏
            showDispose("par");

            //判断父级的状态
            if ($(this).find("a").first().find(".icon14_menu_add").length == 1) {
                //空值全部显示
                showDisposePart();
                //父菜单空值
                $(this).find("a").first().html('<span class="parent_menu_span">菜单名称</span>');
                //取消提示
                $(this).find("a").first().prop("title", "");
                //添加元素值 data-name
                $(this).find("a").first().find(".parent_menu_span").data("name", "菜单名称");
                //初始化编辑区
                initMenuNull("菜单名称");
                //如果当前的父菜单有2个，那么需要在添加一个
                if ($(".parent_menu_span").length == 2) {
                    $("#menu1").removeClass("size1of2").addClass("size1of3");
                    $("#menu2").removeClass("size1of2").addClass("size1of3");
                    $("#menu3").removeClass("size1of2").addClass("size1of3");
                    $("#menu1").show();
                    $("#menu2").show();
                    $("#menu3").show();
                }
            } else {
                //父菜单有值
                var obj_par = $(this).find("a").first().find(".parent_menu_span");
                var name = obj_par.data("name");
                var type = obj_par.data("type");
                var value = obj_par.data("value");
                initMenuValue(name, type, value);
                //判断父级有没有子级，根据有没有子级来对应右侧显示
                if ($(this).find(".sub_menu_span").length > 0) {
                    //有子级，只显示名称
                    hideDisposePart();
                } else {
                    //无子级，全部显示
                    showDisposePart();
                    //验证第三项是否为空
                    m3Check();
                }
            }



        }
        else {
            //**子级按钮**
            //选中颜色更换
            clickMenuItem(this);
            var obj_sub = $(this).find("a").first().find(".sub_menu_span");
            var name = obj_sub.data("name");
            var type = obj_sub.data("type");
            var value = obj_sub.data("value");
            initMenuValue(name, type, value);
            //子菜单全部显示
            showDisposePart();
            //验证第三项是否为空
            m3Check();
        }

        //最后判断父级只能显示名称修改
        cantAddTip();

        //启用禁用按钮
        openCloseSave();

        //阻止事件向父级冒泡
        e.stopPropagation();
    });

    //单选按钮点击事件
    $(".frm_radio").click(function () {
        //保存之前写的值
        var current = $(".current").parent().hasClass("menu_parent") ? $(".current").find(".parent_menu_span") : $(".current").find(".sub_menu_span");
        var input_value = $("#menu_val").val();
        var label_name = $(".frm_label").find(".lbl_name").text();
        switch (label_name) {
            case "跳转链接":
                current.data("t_view", input_value);
                break;
            case "点击Key":
                current.data("t_click", input_value);
                break;
            case "扫码Key":
                current.data("t_scan", input_value);
                break;
        }
        //获取选中的值，同时赋值对应的值,同时更改data - type value
        var checked_val = $(this).val();
        current.data("type", checked_val);
        switch (checked_val) {
            case "view":
                $(".frm_label").find(".lbl_name").text("跳转链接");
                $("#menu_val").val(current.data("t_view"));
                current.data("value", current.data("t_view") == undefined ? null : current.data("t_view"));
                break;
            case "click":
                $(".frm_label").find(".lbl_name").text("点击Key");
                $("#menu_val").val(current.data("t_click"));
                current.data("value", current.data("t_click") == undefined ? null : current.data("t_click"));
                break;
            case "scancode_push":
                $(".frm_label").find(".lbl_name").text("扫码Key");
                $("#menu_val").val(current.data("t_scan"));
                current.data("value", current.data("t_scan") == undefined ? null : current.data("t_scan"));
                break;
        }
        //验证第三项是否为空
        m3NullCheck();
    });

    // 菜单名称 失去焦点事件 动态验证名称的合法性 离开截取合法字符 对应按钮也要相应更改 为空赋默认值
    $("#menu_name").blur(function () {
        //todo 有值截取合法长度字符 或者为空赋默认值
        $(".js_titlenoTips").hide();
        $(".js_titleEorTips").hide();
        var ipt_n = $(this).val();
        //判断当前是父菜单还是子菜单
        if ($(".current").parent().hasClass("sub_menu_li")) {
            //子菜单 8汉字 或 16字母符号 更新按钮名称、标题名称
            var btn = $(".current").find(".sub_menu_span");
            if (ipt_n.length == 0) {
                $(this).val("子级菜单");
                $(".global_info").text("子级菜单");
                btn.text("子级菜单");
            } else {
                //todo 子菜单截取正常长度字符
                var n_str = subString816(ipt_n);
                $(this).val(n_str);
                $(".global_info").text(n_str);
                btn.text(n_str);
            }
        } else {
            //父菜单 4汉字 或 8字母符号 更新按钮名称、标题名称、父级菜单特使时期提示信息
            var btn = $(".current").find(".parent_menu_span");
            if (ipt_n.length == 0) {
                $(this).val("菜单名称");
                $(".global_info").text("菜单名称");
                btn.text("菜单名称");
                btn.data("name", "菜单名称");
                cantAddTip();
            } else {
                //todo 父菜单截取正常长度字符
                var n_str = subString48(ipt_n);
                $(this).val(n_str);
                $(".global_info").text(n_str);
                btn.text(n_str);
                btn.data("name", n_str);
                cantAddTip();
            }
        }
    });

    //文本改变事件 动态判断菜单名称的合法性
    $("#menu_name").on('input propertychange', function () {
        //实时判断长度问题
        $(".js_titlenoTips").hide();
        $(".js_titleEorTips").hide();
        var ipt_n = $(this).val();
        if (ipt_n.length == 0) {
            $(".js_titlenoTips").show();
        } else {
            //判断当前是父菜单还是子菜单
            if ($(".current").parent().hasClass("sub_menu_li")) {
                //子菜单 8汉字 或 16字母符号
                if (!isLength816(ipt_n)) {
                    $(".js_titleEorTips").show();
                }
            } else {
                //父菜单 4汉字 或 8字母符号
                if (!isLength48(ipt_n)) {
                    $(".js_titleEorTips").show();
                }
            }
        }
    });

    //菜单第3项
    $("#menu_val").blur(function () {
        //验证第三项是否为空
        m3Check();
    });

    $("#menu_val").on("input propertychange", function () {
        m3Check();
    });

    //删除本地菜单
    $("#jsDelBt").click(function () {
        //开启弹窗
        popInit("tip", "删除确认", "删除后“" + $("#menu_name").val() + "”菜单下设置的内容将被删除", "localDel");
    });

    //弹框确认
    $("#dialogOk").click(function () {
        var event_name = $("#dialogOk").data("event");
        switch (event_name) {
            case "localDel"://本地菜单删除
                removeMenuItem();
                break;
            case "getMenu"://获取在线菜单
                getWxMenu();
                break;
            case "pullMenu"://提交菜单到线上
                pullMenu();
                break;
            case "onlineDel"://线上菜单删除
                onlineDel();
                break;
        }
        //关闭弹窗
        popClose();
    });

    //获取菜单 可考虑加载动画 此页面开始加载时 ajax请求菜单信息
    $("#orderBt").click(function () {
        //开启弹窗
        popInit("tip", "获取菜单", "此操作会先清空此页面已有的菜单信息，然后绑定微信上的菜单信息", "getMenu");
    });

    //提交菜单 弹窗 提交时验证数据的合理性，特别是第三项跳转链接key值的内容，提交时才做验证
    $("#submitMenu").click(function () {
        //收集并整理菜单信息,验证值是否正常
        if (getPageMenuInfo()) {
            //开启弹窗
            popInit("tip", "发布确认", "发布成功后会覆盖原版本，且将在24小时内对所有用户生效，确认发布", "pullMenu");
        }
    });

    //线上删除菜单
    $("#removeMenu").click(function () {
        //开启弹窗
        popInit("tip", "线上删除", "请注意，该操作清空本页面的填写信息，同时会删除线上微信菜单，可能会影响用户使用体验", "onlineDel");
    });

});