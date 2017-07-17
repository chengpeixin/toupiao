window.onload = function () {
    var datas = '',
        //获取Openid
        Okopenid='',
        clientma='',
        tishi='',
        tool = {
        GetQueryString: function (name) {
            //获取url参数
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        },
        formatDuring: function (mss) {
            //格式化时间戳
            var days = parseInt(mss / (1000 * 60 * 60 * 24));
            var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = (mss % (1000 * 60)) / 1000;
            return days + "天" + hours + "小时";
        }
    };


    //Code & IsOpenid
    function isUrlCode() {
        /*
         *
         * http://apply.haoyigong.com/vote2017/dovote.ashx?method=GetOpenid&CODE=xxx
         *
         * */
        // if (a==1){
        //     var Code= tool.GetQueryString('code');
        // }else {
        //     var Code='asdasda';
        // }
        //判断直接访问此页面
        // if (!Code){
        //     window.location.href='./../index.html'
        // }
        //测试
        var Code = '0513kt6u0kqP5f1G0L8u0W3j6u03kt6p';
        if (Code) {
            window.ajax.$ajax({
                url: 'http://apply.haoyigong.com/vote2017/dovote.ashx?',
                data: {'method': 'GetOpenid', 'CODE': Code},
                type: 'post'
            }, function (data) {
                var result = data;
                if (result.code != 200)
                    alert(result.message);
                // if (result.result.OPENID!='') {
                    //openid存在则
                // if (a==1){
                //     Okopenid=result.result.OPENID;
                // }else {
                    Okopenid='hahahahaha';
                // }
                     //初始化
                     var myDate = new Date();
                    informationInit(Okopenid);
                // }
            }, function (err) {
                alert('失败')
            }, function () {
            })
        }
    }

    //init视图
    function informationInit(Okopenid) {
        /*
         *
         * http://apply.haoyigong.com/vote2017/dovote.ashx?method=Init&openid=xxx
         *
         * */
        $.get('http://apply.haoyigong.com/vote2017/dovote.ashx?', {
            'method': 'Init',
            'openid': Okopenid
        }, function (data) {
            var data = JSON.parse(data),
                result = data.result;
                clientma=result.ma;
            //这里
            if (result.ma!=''){
                $('#yaoqing').css({'width':'100%'}).attr('value','您可以直接投票').attr('disabled','true');
                $('.queding').css('display','none');
            }
            if (data.code != 200){
                alert(data.message);
            }
            //点击投票
            clkVote(Okopenid);
            //倒计时
            CountDown(result.lastDay);
            //用户剩余票数
            SurplusUser(result.lastTp);
            //渲染被选举的人
            initElectionList(result.exection);
            //搜索功能
            datas = peopleAry(result.exection);
        })
    }

    //投票
    function userClkVote(clkopenId, userId, dom,clientma) {

        /*
         *
         * http://apply.haoyigong.com/vote2017/dovote.ashx?method=Vote&openid=xxx&userid=xxx
         *
         * */

        if ($('#piaoshu').html()==0){
            alert('您今日的票数已投完,请明天再来');
            return ;
        }
        //启用load动画
        var load_dom='<div class="animate_load"><div class="spinner"><div class="spinner-container container1"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div>'+
            '<div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div> <div class="circle2"></div>'+
            '<div class="circle3"></div><div class="circle4"></div></div></div></div>';
        $('body').append(load_dom);

        window.ajax.$ajax({
            url: 'http://apply.haoyigong.com/vote2017/dovote.ashx?',
            data: {
                'method': 'Vote',
                'openid': clkopenId,
                'userid': userId,
                'clientMa':clientma
            }
        }, function (data) {
            //删除
            var dom=$('.animate_load');
            $('.animate_load').remove();

            var result = data.result;
            if (data.code != 200) {
                alert(data.message);
            }
            //剩余票数为0
            $('#piaoshu').html(result.lastTp);
            //更改票数
            renderingDom(dom, result.total, result.lastTp);
            alert('投票成功,剩余'+result.lastTp+'票');
        }, function (err) {
            console.log(err)
        }, function () {
        })
    }


    isUrlCode();




    //搜索
    $('#Search').on('touchend', function () {
        okZhaoDao();
        $('.peopleList').html('');
        var Search_val = $('#Search_text').val(),
            state = false;
        if (Search_val != '') {
            //查询
            $(datas).each(function (i, v) {
                if (Search_val == v.num || Search_val == v.name) {
                    var dom = "<div class='people'><div class='portrait'><img width='100%' height='100%'src='" + v.portrait + "' alt=''> <div class='peopleName'> <p class='pt'> <span class='userName'>" + v.num + "</span> <span class='name'>" + v.name + "</span> </p> <p class='name_content'>" + v.hospital + "</p> <div class='btn_toupiao' id='" + v.userid + "'> <embed class ='tpsvg' src='./../svg/tp.svg' type='image/svg+xml'/> <span data-userid='" + v.userid + "'>投票</span> </div> <p class='zongpiaoshu'id='zongpiaoshu'>" + v.votes + "</p> </div> </div> </div> </div> </div>";
                    $('.peopleList').append(dom),
                        state = true;
                }
            })
        } else {
            informationInit(Okopenid);
        }
        if (!state) {
            var dom = '<div class="disNoe"><div> <div class="notZhaoDao"><embed src="./../svg/notZhaoDao.svg" type="image/svg+xml"/><span class="notZhaoDao_txt">没有找到您要找的人</span></div></div>';
            $('.peopleList').append(dom);
        }
    })
    //倒计时
    function CountDown(time) {
        var StarTime = '' + Date.parse(new Date()),
            EndTilem = (time + '000') - StarTime;
        $('#time').html(tool.formatDuring(EndTilem))
    }

    //剩余票数
    function SurplusUser(data) {
        $('#piaoshu').html(data);
    }

    //渲染被选举者列表
    function initElectionList(data) {
        var myDate = new Date();
        okZhaoDao();
        var str='';
        $(data).each(function (i, v) {
            if (i<40){
                // var dom = "<div class='people'><div class='portrait'><img width='100%' height='100%'src='" + v.portrait + "' alt=''> <div class='peopleName'> <p class='pt'> <span class='userName'>" + v.num + "</span> <span class='name'>" + v.name + "</span> </p> <p class='name_content'>" + v.hospital + "</p> <div class='btn_toupiao' id='" + v.userid + "'> <embed class ='tpsvg' src='./../svg/tp.svg' type='image/svg+xml'/> <span data-userid='" + v.userid + "'>投票</span> </div> <p class='zongpiaoshu'id='zongpiaoshu'>" + v.votes + "</p> </div> </div> </div> </div> </div>";
                var dom = "<div class='people'><div class='portrait'><img width='100%' height='100%'src='" + v.portrait + "' alt=''> <div class='peopleName'> <p class='pt'> <span class='userName'>" + v.num + "</span> <span class='name'>" + v.name + "</span> </p> <p class='name_content'>" + v.hospital + "</p> <div class='btn_toupiao' id='" + v.userid + "'><i class='icon iconfont icon-toupiao'></i></i><span data-userid='" + v.userid + "'>投票</span> </div> <p class='zongpiaoshu'id='zongpiaoshu'>" + v.votes + "</p> </div> </div> </div> </div> </div>";
                str+=dom;
            }
        })
        $(str).appendTo($('.peopleList'))
    }

    //点击投票
    function clkVote(Okopenid) {
        $('.peopleList').on('tap', '.btn_toupiao', function (e) {
            e.deltaX = e.deltaY = 0;

            //判断clientma
            if (clientma==''){
                alert('您还没有输入邀请码，请输入邀请码再来点击投票');
                return ;
            }

            userId = $(this).attr('id');
            userClkVote(Okopenid, userId, this,clientma);
            return false;
        })
    }

    //点击投票后渲染剩余票数和总票数
    function renderingDom(dom, total, lastTp) {
        var bDom = $(dom).next();
        $(bDom).html(total);
        $('#piaoshu').html(lastTp);
    }

    //返回搜索数据
    function peopleAry(people) {
        return people;
    }

    //搜索为空后重新渲染
    function okZhaoDao() {
        $('.peopleList').empty('.disNoe')
    }
    //点击邀请码的确定按钮
        $('#queding').on('touchend',function (e) {
            e.deltaX = e.deltaY = 0;

            /*
            *
            * http://apply.haoyigong.com/vote2017/dovote.ashx?method=VaildateMa&openid=obmNp0sdLRNk8IL26AfCXq2Tt5jg&clientma=V201071
            *
            * */
            var val=$('#yaoqing').val();
            $.get('http://apply.haoyigong.com/vote2017/dovote.ashx?',{method:'VaildateMa',openid:Okopenid,clientma:val},function (data) {
                var data=JSON.parse(data);
                if (data.code==200){
                    clientma=val;
                    alert('邀请码正确,可以投票了');
                    $('#piaoshu').html(data.result.lastTp);
                    $('#yaoqing').css({'width':'100%'}).val('您已经输入过邀请码,可以投票了').attr('disabled','true');
                    $('.queding').css('display','none');
                }else {
                    $('#yaoqing').val('');
                    alert(data.message);
                }
            })
        })
    //滑动误触
    // wuchu();
    function wuchu() {

        // var v=1,
        //     y1='',
        //     y2='';
        //
        // $('body').bind('touchstart',function(e) {
        //     $('.btn_toupiao').css('pointer-events','none');
        //     console.log('TouchStart了');
        //     // var _touch = e.changedTouches[0];
        //     // console.log(_touch.clientY)
        //     // y1=_touch.clientY;
        // });
        // //这时候代表滚动停止
        // $('body').bind('touchend',function(e) {
        //     var _touch = e.changedTouches[0];
        //     y2=_touch.clientY;
        //     if (y1==y2){
        //         $('.btn_toupiao').css('pointer-events','auto');
        //     }
        // });
        // $('body').bind('touchmove',function (e) {
        //     var x=e.changedTouches[0].clientY;
        //     $('.btn_toupiao').css('pointer-events','none');
        // })

        // $('body').bind('touchend',function (e) {
        //     console.log(x1,y1)
        //     console.log(x2,y2)
        // })
        //
        // $("body")[0].addEventListener("touchmove",function(e){
        //     var touch = e.touches[0];
        //     if (v){
        //         x1 = touch.clientX;
        //         y1 = touch.clientY;
        //         v=0;
        //     }else {
        //         x2 = touch.clientX;
        //         y2 = touch.clientY;
        //     }
        //
        // });

        // var count = 0, timer = null;
        // var oldTop = newTop = $(window).scrollTop(); //为了方便起见，使用jquery或者zepto框架
        // function log(){
        //     if(timer) clearTimeout(timer);
        //     newTop = $(window).scrollTop();
        //     console.log(++count,oldTop,newTop);
        //     if(newTop === oldTop) {
        //         clearTimeout(timer);
        //         //已停止，写入业务代码
        //         console.log('结束了');
        //     } else{
        //         oldTop = newTop;
        //         timer = setTimeout(log,100);
        //     }
        // }
        // $(window).on('touchmove',log);
    }
}