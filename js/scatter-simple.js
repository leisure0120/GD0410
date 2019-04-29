    var myChart = echarts.init(document.getElementById('id_scatter'));
    var option = null;
function scatter_setOption(name,name_value){
    
    option = {
        backgroundColor: 'rgba(9,9,19,1 )',
        title: {
            textStyle:{
                 color:"#FFFFFF",
                 fontSize: 30
            },
           
            text:name,
            left: 'center'
        },
        xAxis: {
            name:"频率",
            max:0.3,
            min:0.1,
            nameTextStyle: {
                color: '#fff',
                fontSize: 24
            },
        axisLabel: {        
            show: true,
            interval:0,  
            rotate:0, 
                 textStyle: {
                    color: '#fff',
                    fontSize:24
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#0A81F9'
                }
            },
            splitLine: {
                show:true,
                lineStyle: {
                    type: 'dashed',
                    color:'#0A81F9'
                }
            }


        },
        yAxis: {
            name:"阻尼比",
            min: 12,
            max:18,
            nameTextStyle: {
                color: '#fff',
                fontSize: 24
            },
            axisLabel: {        
                show: true,
                interval:0,  
                rotate:0, 
                    textStyle: {
                        color: '#fff',
                        fontSize:24
                    }
                },
            axisLine: {
                lineStyle: {
                    color: '#0A81F9'
                }
            },
            splitLine: {
                show:true,
                lineStyle: {
                    type: 'dashed',
                    color:'#0A81F9'
                }
            }
        },
        series: [{
            symbolSize: 30,
            data: name_value,
            type: 'scatter',
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: 'rgb(0,136,196)'
                }
            }
        }]
    };
    
    return option;
}


function scatter_data(name,name_value){
    var scatterChartOption =scatter_setOption(name,name_value);
    myChart.setOption(scatterChartOption);


}
