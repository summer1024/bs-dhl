define(function(require, exports, module){
    var $ = require('jquery');
    require('bootstrap');
    var bt = require('./template.js');
    require('./dialog.js');
    require('./jquery.form.js');
    var menu = require('./menu.js');
    //生成菜单 
    menu.init('multiData');
    
    var multiData = {
        init: function(options){
            var me = this;
            me.initTable(options.getSummary);

        },
        initTable: function(opt){
            $.ajax({
                url: opt.url,
                type: opt.type,
                dataType: 'json',
                success: function(res){
                    $('.outline-wrapper').empty().append(bt('table-multi', res));
                }
            });
        }
    };

    module.exports = multiData;
});
