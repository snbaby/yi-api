
var http = require("http");


var data = {'addrId':'5624106795','addrId1':'5624106795'}

var data1 = {
    'orderId':'299966988875728317',
    'code':'sn_baby@qq.com',
    'cookie':'{"api":"com.taobao.wireless.sys.ssoLogin","data":{"nick":"tb249348617","loginTime":"1557810373","loginCookie":["cookie2=; Domain=.etao.com; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","cookie2=; Domain=.yao.95095.com; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","cookie2=; Domain=.tb.cn; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","cookie2=; Domain=.tdd.la; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","imewweoriw=3ZoIhWfYM3HgC1k34GG8lofdjrUDCazPRKFnhdaA%2Bow%3D; Domain=.m.taobao.com; Expires=Tue, 21-May-2019 05:06:13 GMT; Path=/","WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKK8cMJzBPGuJJkq92g%3D%3D; Domain=.m.taobao.com; Expires=Wed, 13-May-2020 05:06:13 GMT; Path=/","_w_tb_nick=tb249348617; Domain=.m.taobao.com; Expires=Tue, 21-May-2019 05:06:13 GMT; Path=/","ockeqeudmj=qHZAKTU%3D; Domain=.m.taobao.com; Expires=Tue, 21-May-2019 05:06:13 GMT; Path=/","imewweoriw=3ZoIhWfYM3HgC1k34GG8lofdjrUDCazPRKFnhdaA%2Bow%3D; Domain=.m.etao.com; Expires=Tue, 21-May-2019 05:06:13 GMT; Path=/","WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKK8cMJzBPGuJJkq92g%3D%3D; Domain=.m.etao.com; Expires=Wed, 13-May-2020 05:06:13 GMT; Path=/","_w_tb_nick=tb249348617; Domain=.m.tmall.com; Expires=Tue, 21-May-2019 05:06:13 GMT; Path=/","imewweoriw=3ZoIhWfYM3HgC1k34GG8lofdjrUDCazPRKFnhdaA%2Bow%3D; Domain=.m.tmall.com; Expires=Tue, 21-May-2019 05:06:13 GMT; Path=/","WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKK8cMJzBPGuJJkq92g%3D%3D; Domain=.m.tmall.com; Expires=Wed, 13-May-2020 05:06:13 GMT; Path=/","_w_tb_nick=tb249348617; Domain=.m.etao.com; Expires=Tue, 21-May-2019 05:06:13 GMT; Path=/","yryetgfhth=; Domain=.login.m.taobao.com; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","yryetgfhth=; Domain=.login.m.etao.com; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","yryetgfhth=; Domain=.login.m.tmall.com; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","unb=2201217721783;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;HttpOnly","tbcp=f=UUjZeljM2Oodvr%2B8E4xhtZXZbCA%3D;Domain=.caipiao.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;","uc3=lg2=URm48syIIVrSKA%3D%3D&vt3=F8dBy3qP4Oc401wTLO0%3D&nk2=F5RHpVjBmRIRUI8%3D&id2=UUphy%2FA40GJd5Bn80A%3D%3D;Domain=.taobao.com;Path=/;Expires=Thu, 13-Jun-2019 05:06:13 GMT;HttpOnly","uc1=cookie15=URm48syIIVrSKA%3D%3D&cookie14=UoTZ4832xgMwCA%3D%3D&cookie21=UtASsssmfufd;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;","csg=52790c94;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;","lgc=tb249348617;Domain=.taobao.com;Path=/;Expires=Thu, 13-Jun-2019 05:06:13 GMT;","t=94b46490fb7d98d458a5675756249aeb;Domain=.taobao.com;Path=/;Expires=Mon, 12-Aug-2019 05:06:13 GMT;","cookie17=UUphy%2FA40GJd5Bn80A%3D%3D;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;HttpOnly","skt=1d5a8287d94fb17a;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;HttpOnly","cookie2=37d09c48f5a9b71e00602eb182a66efe;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;HttpOnly","uc4=id4=0%40U2grEJfNiqGrRnNGE2l6BEHGiTzc3H%2Fn&nk4=0%40FY4Mt4crR6tLFIvKry1U3wKz6TNykg%3D%3D;Domain=.taobao.com;Path=/;Expires=Thu, 13-Jun-2019 05:06:13 GMT;HttpOnly","tracknick=tb249348617;Domain=.taobao.com;Path=/;Expires=Wed, 13-May-2020 05:06:13 GMT;","_cc_=URm48syIZQ%3D%3D;Domain=.taobao.com;Path=/;Expires=Wed, 13-May-2020 05:06:13 GMT;","lid=;Domain=login.taobao.com;Path=/;Expires=Thu, 01-Jan-1970 00:00:00 GMT;","_l_g_=Ug%3D%3D;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;","sg=733;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;","_nk_=tb249348617;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;","cookie1=BvKJS0WICeMH%2BKcAFVFAv4Pe6sRYNfwUiVWxxVpBo7c%3D;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;HttpOnly","_tb_token_=e353733eee8b6;Domain=.taobao.com;Path=/;Expires=Tue, 21-May-2019 05:06:13 GMT;"],"phone":"17716154415","userId":"2201217721783","sid":"37d09c48f5a9b71e00602eb182a66efe","ecode":"FpYHj"},"ret":["SUCCESS::调用成功"],"v":"3.0"}'
}
data = JSON.stringify(data1);

var opt = {
    host:'47.106.239.73',
    port:'3000',
    method:'post',
    path:'/api/getAddresslist',
    data:data,
    headers:{
        "Content-Type": 'application/json;charset=UTF-8'
    }
}

var body = '';
var req = http.request(opt, function(res) {
    console.log("response: " + res.statusCode);
    res.on('data',function(data){
        body += data;
    }).on('end', function(){
        console.log(body)
    });
}).on('error', function(e) {
    console.log("error: " + e.message);
})
req.write(data);
req.end();
