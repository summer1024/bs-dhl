define(function(require, exports, module){
    var $ = require('jquery');
    $.MsgBox = {
        Alert: function (title, msg) {
          GenerateHtml("alert", title, msg);
          $("#mb_box").click(function () {
          	$("#mb_box,#mb_con").remove();
        	});
          btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
          btnNo();
        },
        Confirm: function (title, msg, callback) {
          GenerateHtml("confirm", title, msg);
          btnOk(callback);
          btnNo();
        }
      }

      //生成Html
      var GenerateHtml = function (type, title, msg) {

        var _html = "";

        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
        _html += '<a id="mb_ico">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';

        if (type == "alert") {
          _html += '<input id="mb_btn_ok" type="button" value="确定" />';

        }
        if (type == "confirm") {
          _html += '<input id="mb_btn_ok" type="button" value="确定" />';
          _html += '<input id="mb_btn_no" type="button" value="取消" />';
        }
        _html += '</div></div>';

        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html); GenerateCss(type);
      }

      //生成Css
      var GenerateCss = function (type) {
     	if(type=='alert'){
     		$("#mb_btn_ok").css({width:'100%',border:'none'});
     	}
        $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99', position: 'fixed',
          filter: 'Alpha(opacity=60)', backgroundColor: 'grey', top: '0', left: '0', opacity: '0.4'
        });


        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
          $(this).css({ backgroundColor: 'Red', color: 'White' });
        }, function () {
          $(this).css({ backgroundColor: '#DDD', color: 'black' });
        });

        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高

        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();

        //让提示框居中
        $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
      }


      //确定按钮事件
      var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
          if (typeof (callback) == 'function') {
            callback();
          }
          $("#mb_box,#mb_con").remove();
        });
      }

      //取消按钮事件
      var btnNo = function () {
        $("#mb_btn_no,#mb_ico").click(function () {
          $("#mb_box,#mb_con").remove();
        });
      }
});
