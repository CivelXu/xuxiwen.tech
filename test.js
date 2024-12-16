/**
 * @fileoverview Quantumult X 拦截请求并提取 Header 参数
 * @author 
 */

// 匹配目标请求的 URL
const urlPattern = /^https:\/\/wap\.showstart\.com\/v3\/order\/wap\/order\/confirm\/v2$/;

// 主函数
const requestHandler = async (request) => {
    const headers = request.headers; // 获取请求头部信息
    const extractedHeaders = {
        'st_flpv': headers['st_flpv'],
        'userId': headers['CUSID'],
        'sign': headers['CUSUT'],
        'token': headers['CDEVICENO'],
    };

    console.log("拦截的 Header 参数:");
    console.log(JSON.stringify(extractedHeaders, null, 2)); // 打印提取的参数

    // 发送通知
    $notify("请求 Header 参数提取成功", "参数如下", JSON.stringify(extractedHeaders, null, 2));

    // 可选：保存到本地
    $prefs.setValueForKey(JSON.stringify(extractedHeaders), "showstart_headers");
};

// 入口
(() => {
    const url = $request.url || "";
    if (urlPattern.test(url)) {
        requestHandler($request);
    }
    $done();
})();