/**
 * Created by Administrator on 2017/7/12.
 */
    //ajax封装
var ajax = {
        $ajax: function (data,success,error,clk) {
            var url=data.url,
                dat=data.data,
                type=data.type;
            if (clk){
                clk();
            }
            $.ajax({
                'url': url,
                'data': dat,
                'type': type,
                'dataType': 'json',
                'success': function (data) {
                    success(data);
                },
                'error': function (err) {
                    error(err);
                }
            })
        },
        $get:function(data,success,clk){
            if (clk)
                clk();
            var url=data.url,
                dat=data.data;
            $.get(url,dat,function (data) {
                success(data);
            })
        }
    }