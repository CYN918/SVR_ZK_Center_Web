import echarts from 'echarts'
export default {
    downloadImg(url){
        var cent = 'center',
            urld = 'http://c.zookingsoft.com/api';
        if(window.location.host=='ts-centerweb.idatachain.cn'){
            cent = 'center_dev';
            urld ='http://ts-i.idatachain.cn/api';

        }
        if(window.location.host=='c2.zookingsoft.com'){
            cent = 'center_dev2';
            urld ='http://c2.zookingsoft.com/api';

        }
        if(window.location.host=='localhost:8080'){
            cent = 'center_local';
            urld ='http://ts-i.idatachain.cn/api';

        }
        var url = urld+url;
        var xmlResquest = new XMLHttpRequest();
        xmlResquest.open("get",url,true);
        xmlResquest.setRequestHeader("Accept","application/json, text/plain, */*");
        xmlResquest.setRequestHeader("Content-type","application/json");
        xmlResquest.setRequestHeader("Authorization",'Bearer '+localStorage.getItem('token'));
        xmlResquest.responseType = "blob";
        xmlResquest.onload = function (oEvent) {
            var content = xmlResquest.response;
            var eLink = document.createElement("a");
            eLink.download = "test.xlsx";
            eLink.style.display = 'none';
            var blob = new Blob([content]);
            eLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eLink);
            eLink.click();
            document.body.removeChild(eLink);
        };
        xmlResquest.send();
    },
    cavansLine(xData,yData){
        let  histogram =echarts.init(document.getElementById('histogram'));
         var option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['1','2','3','4'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:['02','25','32','54'],
                }
            ]
        };
        histogram.setOption(option)
    },
    transverseLine(xData,yData){
        let across =echarts.init(document.getElementById('across'))
       var option = {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine:{
                    lineStyle:{
                        color:"transparent",
                    }
                }
            },
            yAxis: {
                type: 'category',
                 data: ['预估收益','已出流水','渠道成本','设计师成本'],
                axisLabel: {
                    fontSize:'15',
                    fontFamily:'微软雅黑',
                    // marginTop:'5px',
                    // marginRight:'20px',
                    show:true,
                },
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970],
                    itemStyle:{ normal:{ color:'#3377FF' } },
                    label:{ normal:{ show: true, position: 'right'},},
                },

            ]
        };
        across.setOption(option)
    },
    pie(){
        let pie =echarts.init(document.getElementById('pie'))
       var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        };
        pie.setOption(option)
    },

}