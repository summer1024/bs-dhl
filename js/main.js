define(function(require, exports, module){
    var $ = require('jquery');
    require('bootstrap');
    var bt = require('./template.js');

    var source = {
        init: function(url){
            var me = this;
            me.boot();
            me.initTable(url);
        },
        initTable: function(url){
            $.ajax({
                url: url,
                dataType: 'json',
                success: function(res){
                    console.log(res);
                }
            });
        },
        boot: function(){
            //放置bootstrap相关JS
            //显示提示框
            $('[data-toggle="tooltip"]').tooltip();
            $('.catalog-li').click(function(e){
                /*切换折叠指示图标*/
                if($(this).find('.absolute-down').hasClass('glyphicon-chevron-down')){
                    $(this).find('.absolute-down').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
                }else{
                    $(this).find('.absolute-down').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                }
            });
        }
    };
    module.exports = source;

});
