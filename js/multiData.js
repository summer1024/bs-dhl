define(function(require, exports, module){
    var $ = require('jquery');
    require('bootstrap');
    var bt = require('./template.js');
    require('./dialog.js');
    require('./jquery.form.js');
    var list = require('./list');
    var menu = require('./menu.js');
    //生成菜单 
    menu.init('multiData');
    new list('data-source-list');
    var popup = require('./popup.js');
    
    var multiData = {
        init: function(options){
            var me = this;
            me.bindEvent(options);
            
        },
        generateResults: function(options, id){
            var me = this;

            me.initTable(options.getSummary, id);
            me.initHour(options, id);
            me.initApp(options, id);
            me.initWeb(options, id);
            me.initType(options, id);
        },
        bindEvent: function(options){
            var me = this;
            $('#exports-result').on('click', function(){
                var id = $('#data-source-list').val();
                if(id != -1){
                    me.generateResults(options, id);
                }else{
                    popup('请选择相应数据源');
                }
            });
            
            
            
        },
        initTable: function(opt, id){
            $.ajax({
                url: opt.url,
                type: opt.type,
                data:{id: id},
                dataType: 'json',
                success: function(res){
                    $('.outline-wrapper').empty().append(bt('table-multi', res));
                }
            });
        },
        initHour: function(options, id){
            var me = this;
            var api = options.perHourUser.url;
            var apiType = options.perHourUser.type;
            var params = {id: id};
            var container = '#time-analysis';

            $.ajax({
                url: api,
                type: apiType,
                data: params
            }).done(function(res){
                if(res.status == 0){
                    var viewId = 'hour-'+new Date().getTime();

                    var flowArr = [], avgflowArr = [], tmp = [];
                    for(var i = 0, len = res.res.flows.length; i < len; i++){
                        tmp = [];
                        tmp.push(i);
                        tmp.push(res.res.flows[i]);
                        flowArr.push(tmp);
                        tmp = [];
                    }
                    for(i = 0, len = res.res.avgflows.length; i < len; i++){
                        tmp = [];
                        tmp.push(i);
                        tmp.push(res.res.avgflows[i]);
                        avgflowArr.push(tmp);
                        tmp = [];
                    }

                    var sourceData = {//多对象对应不同属性的情况
                        "viewId": viewId,
                        "describe": "某时刻的上网用户数目",
                        "title": "时段分析展示结果",
                        "objects": ["每个小时的总流量","每个小时的人均流量"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "每个小时的总流量": flowArr,
                            "每个小时的人均流量": avgflowArr
                        }
                    }
                    DVL(container, sourceData, 2, false);
                }else{
                    popup(res.message);
                }
            });
        },
        initType: function(options, id){
            var me = this;
            var api = options.serviceType.url;
            var apiType = options.serviceType.type;
            var params = {id: id};
            var container1 = '#canvas-type1';
            var container2 = '#canvas-type2';
            var container3 = '#canvas-type3';

            $.ajax({
                url: api,
                type: apiType,
                data: params
            }).done(function(res){
                if(res.status == 0){
                    var viewId = 'type-'+new Date().getTime();

                    var flows     = res.res.flows;
                    var avgflows  = res.res.avgflows;
                    var usercount = res.res.usercount;

                    flows = _.map(flows, function(obj){
                        var tmp = [obj.type, obj.num];
                        return tmp;
                    });
                    avgflows = _.map(avgflows, function(obj){
                        var tmp = [obj.type, obj.num];
                        return tmp;
                    });
                    usercount = _.map(usercount, function(obj){
                        var tmp = [obj.type, obj.num];
                        return tmp;
                    });

                    var sourceData1 = {//多对象对应不同属性的情况
                        "viewId": viewId + 'type1',
                        "describe": "终端类型排行",
                        "title": "终端类型排行",
                        "objects": ["总流量"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "总流量": flows
                        }
                    };
                    var sourceData2 = {//多对象对应不同属性的情况
                        "viewId": viewId + 'type2',
                        "describe": "终端类型排行",
                        "title": "终端类型排行",
                        "objects": ["人均流量"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "人均流量": avgflows
                        }
                    };
                    var sourceData3 = {//多对象对应不同属性的情况
                        "viewId": viewId + 'type3',
                        "describe": "终端类型排行",
                        "title": "终端类型排行",
                        "objects": ["用户数量"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "用户数量": usercount
                        }
                    };
                    DVL(container1, sourceData1, 10, false);
                    DVL(container2, sourceData2, 10, false);
                    DVL(container3, sourceData3, 10, false);
                }else{
                    popup(res.message);
                }
            });
        },
        initWeb: function(options, id){
            var me = this;
            var api = options.topWeb.url;
            var apiType = options.topWeb.type;
            var params = {id: id};
            var container = '#canvas-web';

            $.ajax({
                url: api,
                type: apiType,
                data: params
            }).done(function(res){
                if(res.status == 0){
                    var viewId = 'web-'+new Date().getTime();

                    var webData = res.res;

                    webData = _.map(webData, function(obj){
                        var tmp = [obj.web, obj.hot];
                        return tmp;
                    });

                    var sourceData = {//多对象对应不同属性的情况
                        "viewId": viewId,
                        "describe": "TOP10热门访问页面",
                        "title": "TOP10热门访问页面",
                        "objects": ["访问页面排行"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "访问页面排行": webData
                        }
                    }
                    DVL(container, sourceData, 10, false);
                }else{
                    popup(res.message);
                }
            });
        },
        initApp: function(options, id){
            var me = this;
            var api = options.topApp.url;
            var apiType = options.topApp.type;
            var params = {id: id};
            var container1 = '#canvas-app1';
            var container2 = '#canvas-app2';
            var container3 = '#canvas-app3';

            $.ajax({
                url: api,
                type: apiType,
                data: params
            }).done(function(res){
                if(res.status == 0){
                    var viewId = 'app-'+new Date().getTime();

                    var flows     = res.res.flows;
                    var avgflows  = res.res.avgflows;
                    var usercount = res.res.usercount;

                    flows = _.map(flows, function(obj){
                        var tmp = [obj.type, obj.num];
                        return tmp;
                    });
                    avgflows = _.map(avgflows, function(obj){
                        var tmp = [obj.type, obj.num];
                        return tmp;
                    });
                    usercount = _.map(usercount, function(obj){
                        var tmp = [obj.type, obj.num];
                        return tmp;
                    });

                    var sourceData1 = {//多对象对应不同属性的情况
                        "viewId": viewId + '-app1',
                        "describe": "移动应用排行榜",
                        "title": "移动应用排行榜",
                        "objects": ["总流量"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "总流量": flows
                        }
                    };
                    var sourceData2 = {//多对象对应不同属性的情况
                        "viewId": viewId + '-app2',
                        "describe": "移动应用排行榜",
                        "title": "移动应用排行榜",
                        "objects": [ "人均流量"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "人均流量": avgflows
                        }
                    };
                    var sourceData3 = {//多对象对应不同属性的情况
                        "viewId": viewId + '-app3',
                        "describe": "移动应用排行榜",
                        "title": "移动应用排行榜",
                        "objects": ["用户数量"],
                        "property": [
                                    ['属性','属性值']
                                 ],
                        "relationtype":2,
                        "relations":{
                            "用户数量": usercount
                        }
                    };
                    DVL(container1, sourceData1, 10, false);
                    DVL(container2, sourceData2, 10, false);
                    DVL(container3, sourceData3, 10, false);
                }else{
                    popup(res.message);
                }
            });
        }
    };

    module.exports = multiData;
});
