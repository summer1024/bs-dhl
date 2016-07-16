define(function(require, exports, module){
	var $ = require('jquery');
	require('bootstrap');
    var bt = require('./template.js');
    var menu = require('./menu.js');
    var list = require('./list');
    //生成菜单 
    menu.init('cluster');
    new list('data-source-list');
    var cluster = {
        init: function(options){
        	var me = this;
        	me.bindEvent(options);
        },
        bindEvent: function(opt){
            var me = this;
            $('.btn-d-blue').on('click', function(){
            	var target = $(this).data('source');
            	var $nextEl = $('#' + target);

            	if($(this).data('val') === 0){
            		showNext();
            	}else if($(this).data('val') === 1){
            		// 数据源选择验证 --- 第一步验证
            		if(target === 'step2'){
            			if($('#data-source-list').val() != -1){
            				showNext();
            			}else{
            				alert('请选择数据源');
            			}
            		}
            		// 聚类属性选择验证 --- 第二步验证
            		else if(target === 'step3'){

            		}
            		// 算法选择设置验证 --- 第三步验证
            		else if(target === 'step4'){

            		}
            	}
            	function showNext(){
            		$('.c-div-no-border').find('.c-div').removeClass('hidden').removeClass('show').addClass('hidden');
            		$nextEl.removeClass('hidden').addClass('show');
            	}
            });
        }
    };

    module.exports = cluster;
});