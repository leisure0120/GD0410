        var wsUri = "ws:localhost:5208";
        var ws = new WebSocket(wsUri);
        // console.log("point"+point);

        ws.onopen = function(evt) {
            console.log("Connection open ...");
            ws.send("Hello WebSockets!" + Math.random());
        };

        ws.onmessage = function(evt) {
            console.log( "Received Message: " + evt.data);
            var message = evt.data;
            var flags=message.split('#')[0];
            var value1=message.split('#')[1];//value[93, 100, 60, 100, 100, 100, 100, 100]
            
            
            // var staflags=message.split('#')[0];
            // var stavalue=message.split('#')[1];

            // value1=value1.replace(/\s*/g,"");
            // console.log("value1"+value1);
            var dataStrArr=value1.split(",");//分割成字符串数组  
            var dataIntArr=[];//保存转换后的整型字符串  
            dataIntArr=dataStrArr.map(item => {  
                return +item;  
            });  
            // console.log("dataIntArr:::"+dataIntArr);
            var value2;
        
            if('stationstatus'===flags){
                // var staarr=JSON.parse(value1);
                // console.log('staarrrrr'+staarr);
                var value=message.split('#')[1];//获取数据
                value=value.substring(1,value.length-1);
                value=value.replace(/\[/g,"");
                value=value.replace(/\]/g,"");
                var arr=!!value ? value.split(", ") : [];
                initArrSize = arr.length;
                console.log("arr.length:::"+arr.length);
                // 清理之前接收的数据，使得数据刷新
                Items = [];//.splice(0,Items.length);
                for (var i = 0; i<arr.length; ) {
                    var items={"name":arr[i].split('{')[1],"value":parseInt(arr[i+1].split('}')[0])};
                    Items.push(items);
                    i=i+2;
                }
                for(var j=0;j<Items.length;j++){
                    console.log("Items"+j+Items[j].name+','+Items[j].value);
                    console.log('Items:::'+Items[j]);
                }
                processingDataGis(Items);
            }
        };

        ws.onerror = function(evt) {
            console.log("发生了错误");
        };

        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };     