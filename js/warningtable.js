var MyMarhq = '';
clearInterval(MyMarhq);
$('.tbl-body tbody').empty();
$('.tbl-header tbody').empty();
var str = '';
var Items = [{"HappenTime":"发生时间 ","Type":"类型","Details":"告警内容","Level":"1","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间1","Type":"类型1","Details":"告警内容1","Level":"1","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间2","Type":"类型2","Details":"告警内容2","Level":"2","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间3","Type":"类型3","Details":"告警内容3","Level":"3","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间4","Type":"类型4","Details":"告警内容4","Level":"4","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间5","Type":"类型5","Details":"告警内容5","Level":"5","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间6","Type":"类型6","Details":"告警内容6","Level":"6","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间7","Type":"类型7","Details":"告警内容7","Level":"7","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间8","Type":"类型8","Details":"告警内容8","Level":"8","ProcessingTime":"7200000"},
    {"HappenTime":"发生时间9","Type":"类型9","Details":"告警内容9","Level":"9","ProcessingTime":"7200000"}]
$.each(Items,function (i, item) {
    str = '<tr>'+
        '<td>'+item.HappenTime+'</td>'+
        '<td>'+item.Type+'</td>'+
        '<td>'+item.Details+'</td>'+
        '<td>'+item.Level+'</td>'+
        '<td>'+item.ProcessingTime+'</td>'+
        '</tr>'

    $('.tbl-body tbody').append(str);
    $('.tbl-header tbody').append(str);
});

if(Items.length > 5){
    $('.tbl-body tbody').html($('.tbl-body tbody').html()+$('.tbl-body tbody').html());
    $('.tbl-body').css('top', '0');
    var tblTop = 0;
    var speedhq = 50; // 数值越大越慢
    var outerHeight = $('.tbl-body tbody').find("tr").outerHeight();
    function Marqueehq(){
        if(tblTop <= -outerHeight*Items.length){
            tblTop = 0;
        } else {
            tblTop -= 1;
        }
        $('.tbl-body').css('top', tblTop+'px');
    }

    MyMarhq = setInterval(Marqueehq,speedhq);

    // 鼠标移上去取消事件
    $(".tbl-header tbody").hover(function (){
        clearInterval(MyMarhq);
    },function (){
        clearInterval(MyMarhq);
        MyMarhq = setInterval(Marqueehq,speedhq);
    })

}