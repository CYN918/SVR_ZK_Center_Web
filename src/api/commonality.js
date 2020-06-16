import echarts from 'echarts';
import axios from 'axios';
import {Message} from 'element-ui'
export default {
    downloadImg(url){
        var cent = 'center',
            urld = 'https://c.zookingsoft.com/api';
        if(window.location.host=='ts-centerweb.idatachain.cn'){
            cent = 'center_dev';
            urld ='http://ts-i.idatachain.cn/api';

        }
        if(window.location.host=='c2.zookingsoft.com'){
            cent = 'center_dev2';
            urld ='https://c2.zookingsoft.com/api';

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
            eLink.download = (new Date()).toLocaleDateString().split('/').join('-')+'_'+"导出数据.xlsx";
            eLink.style.display = 'none';
            var blob = new Blob([content]);
            eLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eLink);
            eLink.click();
            document.body.removeChild(eLink);
        };
        xmlResquest.send();
    },//导出EXEL
    cavansLine(xData,yData){
        let  histogram =echarts.init(document.getElementById('histogram'));
         var option = {
            color: ['#3377ff'],
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
                    data : xData,
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
                    data:yData,
                }
            ]
        };
        histogram.setOption(option)
    }, //柱状图
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
                 data: xData,
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
                    name: '2019年',
                    type: 'bar',
                    data: yData,
                    itemStyle:{ normal:{ color:'#3377FF'} },
                    label:{ normal:{ show: true, position: 'right'},},
                },

            ]
        };
        across.setOption(option)
    },//横向柱状图
    pie(xData,yData){
        let pie =echarts.init(document.getElementById('pie'))
       var option = {
           color: ['#1890FF','#13C2C2','#FACC14','#8543E0','#F04864','#2FC25B'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data:xData,
                // formatter:    //后缀说明
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
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:yData
                }
            ]
        };
        pie.setOption(option)
    },//饼状图
    chart(xData,yData,tData){
        let flowChart =echarts.init(document.getElementById('flowChart'))
       var option = {
            color:["#1890FF","#2FC25B"],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:tData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: yData
            },
            yAxis: {
                type: 'value'
            },
            series: xData
        };
        flowChart.setOption(option)
    },//多折现图

    formatDateTime(date){
        var y = date.getFullYear(); 
        var m = date.getMonth() + 1; 
        m = m < 10 ? ('0' + m) : m; 
        var d = date.getDate(); 
        d = d < 10 ? ('0' + d) : d; 
        var h = date.getHours(); 
        h=h < 10 ? ('0' + h) : h; 
        var minute = date.getMinutes(); 
        minute = minute < 10 ? ('0' + minute) : minute; 
        var second=date.getSeconds(); 
        second=second < 10 ? ('0' + second) : second; 
        return y + '-' + m + '-' + d; 
    },//日期标准格式化

    compareTime(startTime,stopTime){
        var intStartTime=0;
        if(typeof startTime=='string' && startTime.constructor==String ){
            var  startTimeArray=startTime.split(":");
            // if(startTimeArray.length ==3){
            //     intStartTime= startTimeArray[0] *3600+startTimeArray[1] *60+startTimeArray[2];
            // }else{
            //     Message({message: '开始时间格式错误',type: 'warning'});
            //     return false;  
            // }
            if(startTimeArray.length ==2){
                intStartTime= startTimeArray[0] *3600+startTimeArray[1] *60;
            }else{
                Message({message: '开始时间格式错误',type: 'warning'});
                return false;  
            }
        }else{
            Message({message: '开始时间格式错误',type: 'warning'});
            return false;  
        }
        
        var intStopTime =0;
        if(typeof stopTime=='string' && stopTime.constructor==String ){
            var  stopTimeArray=stopTime.split(":");
            // if(stopTimeArray.length ==3){
            //     intStopTime =stopTimeArray[0] *3600+stopTimeArray[1] *60+stopTimeArray[2];
            // }else{
            //     Message({message: '结束时间格式错误',type: 'warning'});
            //     return false;  
            // }
            if(stopTimeArray.length ==2){
                intStopTime =stopTimeArray[0] *3600+stopTimeArray[1] *60;
            }else{
                Message({message: '结束时间格式错误',type: 'warning'});
                return false;  
            }
            
        }else{
            Message({message: '结束时间格式错误',type: 'warning'});
            return false;  
        }
        
        if(intStopTime<intStartTime){
            return false;  
        }
    },

    loginout(){//登出
        window.localStorage.clear();
        let urld = 'http://ts-i.idatachain.cn',
        accountUrl = "http://ts-account.idatachain.cn/auth/logout?from=";
        if(window.location.host=='c.zookingsoft.com'){
            urld = 'https://c.zookingsoft.com';
            accountUrl = "http://account.zookingsoft.com/auth/logout?from=";
        }
        if(window.location.host=='c2.zookingsoft.com'){
            urld = 'https://c2.zookingsoft.com';
            accountUrl = "http://account.zookingsoft.com/auth/logout?from=";
        }
        axios({
            method: 'get',
            timeout: 10000,
            url: urld+'/api/logout',			     
        }).then((msg)=>{	
                if(msg.data.code==0){
                    localStorage.setItem('token','');
                    let cent = 'center';
                    if(window.location.host=='ts-centerweb.idatachain.cn'){
                        cent = 'center_dev';
                    }else
                    if(window.location.host=='localhost:8080'){
                        cent = 'center_local';
                    }else if(window.location.host=='c2.zookingsoft.com'){
                        cent = 'center_dev2';
                    }
                    window.location.href=accountUrl + cent;
                }						
        }).catch(()=>{
        
        })			
    },
}