
$(function(){    
    Browser.init();
    Site.Init();     

});

var Site = new function () {
    this.mask = {};
     this.toogleNavBar = function(){        
        var start = ($("body").width() < 1024) ? true : false;                
        var data = {};
        
        $(".navbar-toggle").bind("click", function(e){
            e.preventDefault();
            data.obj = $(this).closest(".container").find("#navbar");
            data.visible = ["52px", "295px"];
            if (!data.obj.hasClass("in"))
                {
                    data.obj.addClass("collapse in").animate({height:data.visible[1]},500);
                } else closeNavBar(data);

            return false;
        }); 
        
        function closeNavBar(data){
            data.obj.animate({height:data.visible[0]},500, function(){ $(this).removeClass("in")});
        }
        
        if (start)
            {
                $(".nav li a").bind("click", function(){ closeNavBar(data);});
            }
    }
    this.Init = function(){
        //this.setMask();
        this.toogleNavBar();
        
        $("input[type='tel']").mask("+375 99 999 9999? 999999");
               
        $(".navbar-toggle").bind("click", function(e){
            e.preventDefault();
            var obj = $(this).closest(".container").find("#navbar");
            var visible = ["52px", "295px"];
            if (!obj.hasClass("in"))
                {
                    obj.addClass("collapse in").animate({height:visible[1]},500);
                } else obj.animate({height:visible[0]},500, function(){ $(this).removeClass("in")});

            return false;
        }); 
        
        $('.block-map').click(function() {
            $(this).find('#map').css("pointer-events", "auto");
        });
                
        //smooth scroll to top
        $(".cd-top").on('click', function(event){
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0 ,
                }, 700
            );
        });    
        
        $("a[data-rel='m_PageScroll2id']").mPageScroll2id({
            scrollSpeed: 500,
            offset: 52
        });
        
        $(".btn-close").bind("click", function() {
            $($(this).data("target")).modal('hide');
            $(".btn").removeClass("active");
        });
                       
        $(".call-back-form").each(function() {
            var it = $(this);
            it.validate({
                rules: {
                    name: {
                        required: true
                    },
                    phone: {
                        required: true
                    },
                    email: {
                        required: true
                    }
                },
                messages: {},
                errorPlacement: function(error, element) {},
                submitHandler: function(form) {
                    var thisForm = $(form);
                    
                    thisForm.find("input[type=tel]").removeClass("focus");
                    thisForm.find(".mask").removeClass("active");
                    
                    $(this).find("input").val("");
                    var value = [{
                        old: '.people',
                        id: "fullName"
                    }, {
                        old: '.phone',
                        id: "phone"
                    }, {
                        old: '.email',
                        id: "email"
                    }];
                    var temp = null;
                    for (i = 0; i < 3; i++) {
                        temp = thisForm.find(value[i].old);
                        if (temp != undefined) {
                            var newForm = thisForm.find(value[i].old).attr("id", value[i].id).attr("name", value[i].id);
                            thisForm.find(value[i].old).html(newForm);
                        }
                    }    
                    
                    thisForm.find("input[type='tel']").val("+375 " + thisForm.find("input[type='tel']").val());                    
                    var str = thisForm.serialize();
                    thisForm.find("input").val("");                   
                    
                    $.ajax({
                        type: "POST",
                        url: "back-end/main.php",
                        data: str
                    }).done(function() {
                        
                        $(this).find("input").val("");                                           
                        
                        if (thisForm.find("[type='submit']").data("successful") != undefined) {
                            thisForm.parent().animate({height: 0}, 500, function() {$(".thanks").show();});
                        } else  $('#callForm').modal({show: 'true'}).find(".call-answer").addClass("small-window");

                        setTimeout(function() {
                            $('.modal').modal('hide');
                            $.magnificPopup.close();
                        }, 3000);                    
                        $(".call-back-form").trigger("reset");
                    });
                    return false;
                },
                success: function() {},
                highlight: function(t, errorClass) {
                    var t = $(t);
                    t.addClass('error'); //.val().length == 0 ? t.parent().find(".mask").removeClass("active") : undefined;  
                    //t.closest("form").find("li").first().focus();
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).removeClass('error');                    
                }
            })
        });
        
         $('.call').magnificPopup({
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 200,
            callbacks: {
                beforeOpen: function() {
                   this.st.mainClass = this.st.el.attr('data-effect');
                }
              },
              midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.            
        });          
        
        $('.btn-order').magnificPopup({
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 200,
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = this.st.el.attr('data-effect');
                    var text = $(this.st.el).closest(".base").find(".description");
                    var el = $("#Order");
                    el.find(".text").html(text.text());
                    el.find(".subject").val(text.text());
                }
              },
              midClick: true
        });           
        
        var show_count = 4;
        if ($("body").width() > 1024) { show_count = 4; } 
        else if ($("body").width() > 768)  { show_count = 3;}
        else if ($("body").width() > 639)  { show_count = 2;}
        else show_count = 1;
        
        $('.multiple-items').slick({
            infinite: true,
            dots: false,
            slidesToShow: show_count,
            slidesToScroll: show_count,
        });
        
        // Image popups
        $('.slider .image').magnificPopup({
          delegate: 'a',
          type: 'image',
          removalDelay: 500,
          gallery: {
              enabled: true
          },
          callbacks: {
            beforeOpen: function() {
              // just a hack that adds mfp-anim class to markup 
               this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
               this.st.mainClass = this.st.el.attr('data-effect');
            }
          },
          closeOnContentClick: true,
          midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });        
    };
    this.setMask = function(){
        var obj = $('input[type=tel]').attr("maxlength",15);        
        this.mask.$ = obj.parent().find(".mask");        
        this.mask.text = "+375";
        
        this.mask.$.text(this.mask.text);            
        
        obj.bind("focus",function(){
            calc($(this));            
        }).bind("change",function(){
            calc($(this));
        }).bind("keydown",function(e){
            key($(this),e);
            calc($(this));
        }).bind("focusout",function(e){
            var a = "active";      
            var t = $(this);
            
            (t.hasClass("focus") && t.val().length == 0) ? t.removeClass("focus").parent().find(".mask").removeClass(a) : undefined;            
        });
        
        
        function key(t, e){
             var value = t.val();     
             if ( value.length > 2 && value.indexOf(" ") == -1 ){
                    t.val(value.substring(0, 2)+" "+value.substring(2, value.length));
                    return;
                }             
             // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                 // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                 // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                 // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)){
                     // let it happen, don't do anything                                         
                                   
                     if ((e.keyCode ==8 && value.length !=0) || (e.keyCode == 32))
                         {                             
                             t.val(value.substring(0,value.length));
                         }                  
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
                
            }    
        }
        
        function calc(t){
           var clazz = "focus";
           var a = "active";            
           var mask = t.parent().find(".mask");
            
            !t.hasClass(clazz) ? t.addClass(clazz) : undefined;
            t.val().length == 0 ? mask.addClass(a) : undefined;           
        }        
    }
};

var Browser = new function() {
    var data = {
        $b: null,
        is: {
            mobile: false,
            Andorid: false,
            iPod: false,
            iPad: false
        }
    }
    this.getData = function() {
        return data;
    };
    this.init = function() {
        var t = this;
        data.$b = $("body");
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0) {
            data.$b.addClass("iPad");
            data.is.iPad = true;
        } else if (ua.indexOf("android") > 0) {
            data.$b.addClass("Android");            
            data.is.Andorid = true;
        } else if (ua.indexOf("ipod") > 0) {
            data.$b.addClass("iPod");            
            data.is.iPod = true;
        } else if (ua.indexOf("iphone") > 0) data.$b.addClass("iPhone");
        if (ua.indexOf('firefox') > 0) {
            data.$b.addClass("firefox");
        }
        if (data.is.mobile) t.orientation();
        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            data.$b.addClass("Safari");
        }
        if (ua.indexOf('MSIE 8.') > 0) {
            data.$b.addClass("ie8");
        }
        if (ua.indexOf('MSIE 9.') > 0) {
            data.$b.addClass("ie9");
        }
        if (ua.indexOf(' OPR/') > 0) {
            data.$b.addClass("Opera");
        }
        if (ua.indexOf('MSIE 10.') > 0) {
            data.$b.addClass("ie10");
        } else if ((ua.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) data.$b.addClass("ie11");
        
        
        if (this.isIPhone() || this.isAndroid())
            {
                data.$b.addClass("mobile");
            }                        
        
        this.viewPort();
    };
    this.isIpad = function() {
        var ua = navigator.userAgent.toLowerCase();
        data.$b = $("body");
        if (ua.indexOf("ipad") > 0) data.$b.addClass("iPad");
        return (data.$b.hasClass("iPad"));
    };
    this.isIPhone = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("iphone") > 0) data.$b.addClass("iPhone");
        return (data.$b.hasClass("iPhone"));
    };
    this.isAndroid = function() {
        return (data.$b.hasClass("Android"));
    };
    this.orientation = function() {
        var or = ["orX", "orY"];
        var c = [data.$b.innerHeight(), data.$b.innerWidth()]
        if (c[0] > c[1]) {
            data.$b.removeClass(or[0]);
            data.$b.addClass(or[1]);
        } else {
            data.$b.removeClass(or[1]);
            data.$b.addClass(or[0]);
        }
    };
    this.viewPort = function() {
        var def = document.querySelector("meta[name=viewport]");
        var view = '<meta name="viewport" content="width=device-width">';
        if (def != null) {            
            if (this.isIpad()) { 
                def.remove();
                view = '<meta name="viewport" content="maximum-scale=1.0, initial-scale=1.0, user-scalable=0">';
            } 
//            else 
//                if (this.isIPhone())
//                    {
//                        def.remove();
//                        view = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">';
//                    }
        };     
        jQuery('head').append(view);
    }
}
