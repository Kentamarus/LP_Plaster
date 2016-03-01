
$(function(){
    
    Browser.Init();
    Site.Init();     

});

var Site = new function () {
    this.Init = function(){
        
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
            $(this).find('iframe').css("pointer-events", "auto");
        });
        
        //smooth scroll to top
        $(".cd-top").on('click', function(event){
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0 ,
                }, 700
            );
        });    
        
         //$.mask.definitions['~']='[+-]';    
         $('input[type=tel]').mask("+7(999) 999-9999");
               
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
                                        
                    $.ajax({
                        type: "POST",
                        url: "back-end/main.php",
                        data: thisForm.serialize() + (formWindow != undefined ? "&view=" + JSON.stringify(formWindow) : "")
                    }).done(function() {
                        
                        $(this).find("input").val("");                   
                        if (thisForm.find("input[type='submit']").data("successful") != undefined) {
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
                highlight: function(element, errorClass) {
                    $(element).addClass('error');
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).removeClass('error');
                }
            })
        });
        
         $('.call').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom',
            callbacks:{
                open:function(){                    
//                    var id = $('#callForm');
//                    id.find(".call-answer").removeClass("small-window");
//                    id.find(".block-before").attr("style", "");                                
            },
                close:function(){}
            }
        });
        
    };
};

var Browser = new function () {
    var data = {
        $b: null,
        is: {
            mobile: false,
            Andorid: false,
            iPod: false
        }
    }
    this.getData = function()
    {
        return data;
    };
    this.Init = function () {
        var t = this;
        data.$b = $("body");
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0) { data.$b.addClass("iPad"); data.is.mobile = true; }
        else if (ua.indexOf("android") > 0) { data.$b.addClass("Android"); data.is.mobile = true; data.is.Andorid = true; }
        else if (ua.indexOf("ipod") > 0) { data.$b.addClass("iPod"); data.is.mobile = true; data.is.iPod = true; }

        if (ua.indexOf('firefox') > 0) { data.$b.addClass("Firefox"); }
        if (data.is.mobile) t.Orientation();

        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) { data.$b.addClass("Safari"); }
        if (ua.indexOf('MSIE 8.') > 0) { data.$b.addClass("ie8"); }
        if (ua.indexOf('MSIE 9.') > 0) { data.$b.addClass("ie9"); }
        if (ua.indexOf(' OPR/') > 0) { data.$b.addClass("Opera"); }

        //IE10 -- IE 11
        if (ua.indexOf('MSIE 10.') > 0) { data.$b.addClass("ie10"); }
        else if ((ua.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) data.$b.addClass("ie11"); //IE11     
    };
    this.isIpad = function () {
        return (data.$b.hasClass("iPad"));
    };
    this.isIPhone = function () {
        return (data.$b.hasClass("iPhone"));
    };
    this.isAndroid = function () {
        return (data.$b.hasClass("Android"));
    };

    this.Orientation = function () {
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
    this.ViewPort = function (def) {
        var v = document.querySelector("meta[name=viewport]");
        if (def == null) {
            if (data.is.Andorid) {
                v.setAttribute('content', 'width=1024, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            }
            else
                if (data.is.iPod) {
                    v.setAttribute('content', 'width=900, user-scalable=1');
                }
        }
        else v.setAttribute('content', def);
    }
}
