function inheritPrototype(childObject, parentObject){
    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
}

$(function(){
    App.addRoute('/', 'template/main.html', './../Controller/MainCtrl');

    App.addRoute('rent', 'template/rent.html', './../Controller/RentCtrl');

    App.addRoute('book/:id', 'template/book.html', './../Controller/BookCtrl');
    App.addRoute('book_list', 'template/book_list.html', './../Controller/BookListCtrl');

    App.addRoute('person/:id', 'template/person.html', './../Controller/PersonCtrl');
    App.addRoute('person_list', 'template/person_list.html', './../Controller/PersonListCtrl');

    App.init();
});

$('#sidebar_main .menu_section > ul > li > a > button').click(function(e){
    var url = $(this).attr('href');
    if(!url) return;

    window.location.href = url;
    e.stopPropagation();
});

$(function() {
    if(isHighDensity()) {
        $.getScript( "bower_components/dense/src/dense.js", function() {
            // enable hires images
            altair_helpers.retina_images();
        });
    }
    if(Modernizr.touch) {
        // fastClick (touch devices)
        FastClick.attach(document.body);
    }
});

$window.load(function() {
    // ie fixes
    altair_helpers.ie_fix();
});

$(function() {
    var $switcher = $('#style_switcher'),
        $switcher_toggle = $('#style_switcher_toggle'),
        $theme_switcher = $('#theme_switcher'),
        $mini_sidebar_toggle = $('#style_sidebar_mini'),
        $slim_sidebar_toggle = $('#style_sidebar_slim'),
        $boxed_layout_toggle = $('#style_layout_boxed'),
        $accordion_mode_toggle = $('#accordion_mode_main_menu'),
        $html = $('html'),
        $body = $('body');


    $switcher_toggle.click(function(e) {
        e.preventDefault();
        $switcher.toggleClass('switcher_active');
    });

    $theme_switcher.children('li').click(function(e) {
        e.preventDefault();
        var $this = $(this),
            this_theme = $this.attr('data-app-theme');

        $theme_switcher.children('li').removeClass('active_theme');
        $(this).addClass('active_theme');
        $html
            .removeClass('app_theme_a app_theme_b app_theme_c app_theme_d app_theme_e app_theme_f app_theme_g app_theme_h app_theme_i app_theme_dark app_theme_dark_a')
            .addClass(this_theme);

        if(this_theme == '') {
            localStorage.removeItem('altair_theme');
            $('#kendoCSS').attr('href','bower_components/kendo-ui/styles/kendo.material.min.css');
        } else {
            localStorage.setItem("altair_theme", this_theme);
            if(this_theme == 'app_theme_dark') {
                $('#kendoCSS').attr('href','bower_components/kendo-ui/styles/kendo.materialblack.min.css')
            } else {
                $('#kendoCSS').attr('href','bower_components/kendo-ui/styles/kendo.material.min.css');
            }
        }

    });

    // hide style switcher
    $document.on('click keyup', function(e) {
        if( $switcher.hasClass('switcher_active') ) {
            if (
                ( !$(e.target).closest($switcher).length )
                || ( e.keyCode == 27 )
            ) {
                $switcher.removeClass('switcher_active');
            }
        }
    });

    // get theme from local storage
    if(localStorage.getItem("altair_theme") !== null) {
        $theme_switcher.children('li[data-app-theme='+localStorage.getItem("altair_theme")+']').click();
    }


// toggle mini sidebar

    // change input's state to checked if mini sidebar is active
    if((localStorage.getItem("altair_sidebar_mini") !== null && localStorage.getItem("altair_sidebar_mini") == '1') || $body.hasClass('sidebar_mini')) {
        $mini_sidebar_toggle.iCheck('check');
    }

    $mini_sidebar_toggle
        .on('ifChecked', function(event){
            $switcher.removeClass('switcher_active');
            localStorage.setItem("altair_sidebar_mini", '1');
            localStorage.removeItem('altair_sidebar_slim');
            location.reload(true);
        })
        .on('ifUnchecked', function(event){
            $switcher.removeClass('switcher_active');
            localStorage.removeItem('altair_sidebar_mini');
            location.reload(true);
        });

// toggle slim sidebar

    // change input's state to checked if mini sidebar is active
    if((localStorage.getItem("altair_sidebar_slim") !== null && localStorage.getItem("altair_sidebar_slim") == '1') || $body.hasClass('sidebar_slim')) {
        $slim_sidebar_toggle.iCheck('check');
    }

    $slim_sidebar_toggle
        .on('ifChecked', function(event){
            $switcher.removeClass('switcher_active');
            localStorage.setItem("altair_sidebar_slim", '1');
            localStorage.removeItem('altair_sidebar_mini');
            location.reload(true);
        })
        .on('ifUnchecked', function(event){
            $switcher.removeClass('switcher_active');
            localStorage.removeItem('altair_sidebar_slim');
            location.reload(true);
        });

// toggle boxed layout

    if((localStorage.getItem("altair_layout") !== null && localStorage.getItem("altair_layout") == 'boxed') || $body.hasClass('boxed_layout')) {
        $boxed_layout_toggle.iCheck('check');
        $body.addClass('boxed_layout');
        $(window).resize();
    }

    $boxed_layout_toggle
        .on('ifChecked', function(event){
            $switcher.removeClass('switcher_active');
            localStorage.setItem("altair_layout", 'boxed');
            location.reload(true);
        })
        .on('ifUnchecked', function(event){
            $switcher.removeClass('switcher_active');
            localStorage.removeItem('altair_layout');
            location.reload(true);
        });

// main menu accordion mode
    if($sidebar_main.hasClass('accordion_mode')) {
        $accordion_mode_toggle.iCheck('check');
    }

    $accordion_mode_toggle
        .on('ifChecked', function(){
            $sidebar_main.addClass('accordion_mode');
        })
        .on('ifUnchecked', function(){
            $sidebar_main.removeClass('accordion_mode');
        });

//login: {id: 'xuke', pwd: '111111', salt:'xuke', timestamp: Date.now()}
    var loginItem = null;
    try{
        loginItem = JSON.parse(localStorage.getItem('login'));
    }catch(error){
        console.log('localStorage parse error: ' + error);
    }

    var _10seconds = 10*1000;
    var _3days = 3*24*60*60*1000; // for test
    if ( null != loginItem &&
        loginItem.timestamp &&
        (Date.now() - loginItem.timestamp) < _3days){
        $('#login_stay_in').prop('checked', true);
        login(loginItem);
    }

    $('#login_stay_in').on('ifUnchecked', function(){
        localStorage.removeItem('login');
    });

    $('#login_id').keypress(function(e){
        if(e.which == 13){
            $('#login_pwd').focus();
        }
    });

    $('#login_pwd').keypress(function(e){
        if(e.which == 13){
            $('#login_btn').click();
        }
    });

    $('#login_btn').click(function(){
        var id = $('#login_id').val();
        var pwd = $('#login_pwd').val();

        if(id.trim() == '' || pwd.trim() == ''){
            UIkit.notify("用户名或密码不能为空",{status:'danger'});
            return;
        }

        var pwdEncryt = encrytSalt(pwd, id);
        loginItem = {id:id, pwd:pwd, salt:id, timestamp: Date.now()};
        login(loginItem);
    });

    $('#logout_btn').click(logout);

//search
    $('#search_input').keypress(function(e){
        if(e.which == 13){
            $('#search_icon').click();
        }
    });
    $('#search_icon').click(function(){
        $('.menu_section > ul > li > ul > li > table > tbody > tr').show();

        var filter = $('#search_input').val();
        if(filter.trim() == '') return;

        $('.menu_section > ul > li > ul > li > table > tbody > tr').filter(function(index){
            var text = $(this).find('td > div > a').text();
            return text.indexOf(filter) == -1;
        }).hide();
    });
});

function encrytSalt(pwd, salt){
    return btoa(pwd+salt);
    //return btoa(md5(pwd+salt));
}

function login(loginItem){
    if(loginItem.id == 'xuke' && loginItem.pwd == '111111'){
        UIkit.notify("登录成功！",{status:'info'});
        //change to login state
        $('#logined_id').text(loginItem.id);
        $('#login_name').text('许可');
        $('#login_dept').text('系统研发');
        $('#login_form').fadeOut('280');
        altair_md.card_show_hide($('#login_form'),undefined,function(){
            $('#login_success').show().siblings().hide();
        },undefined);

        var isStayIn = $('#login_stay_in').prop('checked');
        if(isStayIn){
            loginItem.timestamp = Date.now();
            localStorage.setItem('login', JSON.stringify(loginItem));
        }
    } else {
        UIkit.notify("登录失败！",{status:'danger'});
    }

    // $.get('rest/login', loginItem, function(userStatus){
    //     var user = {id:'xuke', name:'许可', dept:'系统研发'};
    //     UIkit.notify("登录成功！",{status:'success'});
    //
    //     var isStayIn = $('#login_stay_in').val();
    //     if(isStayIn){
    //         loginItem.timestamp = new Date();
    //         localStorage.setItem('login', JSON.stringify(loginItem));
    //     }
    // }).fail(function(error){
    //     UIkit.notify("登录失败！"+error,{status:'danger'});
    // });
}

function logout(){
    UIkit.notify("已退出登录！",{status:'info'});
    localStorage.removeItem('login');

    //change to logout state
    $('#login_success').fadeOut('280');
    altair_md.card_show_hide($('#login_success'),undefined,function(){
        $('#login_form').show().siblings().hide();
    },undefined);

    // $.get('rest/logout', loginItem, function(userStatus){
    //     UIkit.notify("已退出登录！",{status:'info'});
    //     localStorage.removeItem('login');
    //
    //     //change to logout state
    //     $('#login_success').fadeOut('280');
    //     altair_md.card_show_hide($('#login_form'));
    // });
}
