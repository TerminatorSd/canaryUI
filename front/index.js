$(document).ready(function () {
    $("#btn_a").click(function () {

        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://127.0.0.1/admin/list/",
            //数据，json字符串
            data: JSON.stringify(list),
            //请求成功
            success: function (result) {
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    });
    $("#btn_b").click(function () {
        //请求方式
        type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
                //请求地址
                url : "http://127.0.0.1/admin/list/",
                    //数据，json字符串
                    data : JSON.stringify(list),
                        //请求成功
                        success : function(result) {
                            console.log(result);
                        },
        //请求失败，包含具体的错误信息
        error: function(e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
    $("#btn_c").click(function () {
        //请求方式
        type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
                //请求地址
                url : "http://127.0.0.1/admin/list/",
                    //数据，json字符串
                    data : JSON.stringify(list),
                        //请求成功
                        success : function(result) {
                            console.log(result);
                        },
        //请求失败，包含具体的错误信息
        error: function(e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});