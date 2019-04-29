        var wsUri = "ws:localhost:5207";
        var ws = new WebSocket(wsUri);
        // console.log("point"+point);
        /** 
         * 时间戳转化为年 月 日 时 分 秒 
         * number: 传入时间戳 
         * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
        */  
        function formatTime(number,format) {  
          var formateArr  = ['Y','M','D','h','m','s'];  
          var returnArr   = [];  
          var date = new Date(number * 1000);  
          returnArr.push(date.getFullYear());  
          returnArr.push(formatNumber(date.getMonth() + 1));  
          returnArr.push(formatNumber(date.getDate()));  
          returnArr.push(formatNumber(date.getHours()));  
          returnArr.push(formatNumber(date.getMinutes()));  
          returnArr.push(formatNumber(date.getSeconds()));  
          for (var i in returnArr)  
          {  
            format = format.replace(formateArr[i], returnArr[i]);  
          }  
          return format;  
        } 
        function formatTime2(number,format) {  
          var formateArr  = ['Y','M','D','h','m','s'];  
          var returnArr   = [];  
          var date = new Date(number * 1000);  
          returnArr.push(date.getFullYear());  
          returnArr.push(formatNumber(date.getMonth() + 1));  
          returnArr.push(formatNumber(date.getDate()+1));  
          returnArr.push(formatNumber(date.getHours()));  
          returnArr.push(formatNumber(date.getMinutes()));  
          returnArr.push(formatNumber(date.getSeconds()));  
          for (var i in returnArr)  
          {  
            format = format.replace(formateArr[i], returnArr[i]);  
          }  
          return format;  
        } 

        //数据转化  
        function formatNumber(n) {  
          n = n.toString()  
          return n[1] ? n : '0' + n  
        } 


        var section=[];
        var sectionname=[];
        var sectiondata=[];
        var sectionname_today=[];
        var sectiondata_today=[];
        arrsyesterday =[];
        arrstoday =[];
        ws.onopen = function(evt) {
            console.log("Connection open ...");
            ws.send("Hello WebSockets!" + Math.random());
        };

        ws.onmessage = function(evt) {
            // console.log( "Received Message: " + evt.data);
            var message = evt.data;
            var flags=message.split('#')[0];
            var value=message.split('#')[1];//value[93, 100, 60, 100, 100, 100, 100, 100]
            var dataStrArr=value.split(",");//分割成字符串数组  
            var dataIntArr=[];//保存转换后的整型字符串  
            dataIntArr=dataStrArr.map(item => {  
                return +item;  
            });  
           
            // console.log("dataIntArr:::"+dataIntArr);
            if('linegraph2'===flags){
                var value_data=value.split('=[');//昨日数据
                var value_yesterday=value_data[1];//昨日数据
                var value_today=value_data[2];//今日数据
                //昨日数据处理
                value_yesterday=value_yesterday.replace(/\"/g,"");
                value_yesterday=value_yesterday.substring(0,value_yesterday.length-7);//去掉，，今日
                //今日数据处理
                value_today=value_today.replace(/\"/g,"");
                value_today=value_today.substring(0,value_today.length-4);//去掉]}, }]
                // console.log("value_yesterday"+value_yesterday);
                // console.log("value_today"+value_today);
                section_yesterday=value_yesterday.split(']}');//断面
                section_today=value_today.split(']}');
                for(var i=0;i<section_yesterday.length-1;i++){
                    if(i==0){
                        sectionname[0]=section_yesterday[0].split(":")[0].split("{")[1];
                        sectiondata[0]=section_yesterday[0].split(": [")[1];
                    }else{
                        sectionname[i]=section_yesterday[i].split(":")[0].split(", {")[1];
                        sectiondata[i]=section_yesterday[i].split(": [")[1];
                    }
                }
                for(var i=0;i<section_today.length-1;i++){
                    if(i==0){
                        sectionname_today[0]=section_today[0].split(":")[0].split("{")[1];
                        sectiondata_today[0]=section_today[0].split(": [")[1];
                    }else{
                        sectionname_today[i]=section_today[i].split(":")[0].split(", {")[1];
                        sectiondata_today[i]=section_today[i].split(": [")[1];
                    }
                }
               
                for(var i=0;i<section_yesterday.length-1;i++){
                    Items=[];
                    var arr=!!sectiondata[i] ? sectiondata[i].split(", ") : [];
                    initArrSize = arr.length;
                    for (var j = 0; j<arr.length; ) {
                        // var items={"value":[formatTime(arr[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr[j].split('znb: ')[1]]};
                        var items={"value":[formatTime2(arr[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr[j].split('znb: ')[1]]};
                        // console.log("items"+items.value);
                        Items.push(items);
                        j=j+2;
                    }
                    arrsyesterday.push(Items);
                }

                for(var i=0;i<section_today.length-1;i++){
                    Items2=[];
                    var arr2=!!sectiondata_today[i] ? sectiondata_today[i].split(", ") : [];
                    initArrSize2 = arr2.length;
                    for (var j = 0; j<arr2.length; ) {
                        // var items2={"value":[formatTime(arr2[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr2[j].split('znb: ')[1]]};
                        var items2={"value":[formatTime(arr2[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr2[j].split('znb: ')[1]]};
                        // console.log("items2"+items2.value);
                        Items2.push(items2);
                        j=j+2;
                    }
                    arrstoday.push(Items2);
                }
            }
        };
        setInterval(function () {
            processingDataLine(sectionname[0],arrstoday[0],arrsyesterday[0]);
        }, 10000);
        
        ws.onerror = function(evt) {
            console.log("发生了错误");
        };

        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };  