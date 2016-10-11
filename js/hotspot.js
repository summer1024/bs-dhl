define(function(require, exports, module){
    var $ = require('jquery');
    require('bootstrap');
    var bt = require('./template.js');
    require('./dialog.js');
    require('./jquery.form.js');
    var list = require('./list');
    var menu = require('./menu.js');
    //生成菜单 
    menu.init('traffic');
    new list('data-source-list');
    var popup = require('./popup.js');
    
    var traffic = {
        init: function(options){
            var me = this;
            // me.bindEvent(options);
            
        }
    };

    module.exports = traffic;
});
