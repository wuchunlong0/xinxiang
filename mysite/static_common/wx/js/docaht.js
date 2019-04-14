/**
 *
 */
var self = null;
var dodoca_chat_guide = {
    'domain'  : null , //dochat_par_domain
    'id' : null ,//dochat_id
    'key' : null ,//dochat_key
    'isPhone' : null ,//dochat_phone
    'openPrefix' : '' ,//docaht_open_prefix
    'region' : '',

    'wsGroup' : null, //dochat_sub_key
    'loginGroup' : '',//docaht_iologin_group
    'socketClient' : null ,//dochat_socketClient
    'ajaxJSonp' : null ,//dochat_ajax_jsonp_opt
    'openType' : 'iframe' ,//docaht_open_type
    'btnBlocking' : false , //docaht_isopen
    'closeType' : 'close', //dochat_closetype
    'msgSum' : 0 , //dochat_msg_sum
    'logourl' : 'http://static.dodoca.com/images/service/logo.jpg',
    'self' : this,

    main : function (opt) { //dochat_wsl_run
        self = this;
        opt = opt || {};
        var url     = document.getElementById('cochaturl');
        var body           = (opt.boxhandle || document.body);
        self.id           = (opt.id || self.getQueryString('id',url.src));
        self.key          = (opt.key || self.getQueryString('key',url.src));
        self.isPhone     =  opt.phone;
        self.region      = (opt.region || self.getQueryString('region',url.src));

        self.domain       = (opt.domain || self.getDomain(url.src));
        self.openPrefix  = (opt.openPrefix ||  document.domain);
        self.loginGroup  = self.openPrefix+'_'+self.openType+'_'+self.id;
        if (document.all && !window.atob) {
            document.domain = 'dodoca.com';
        }

        if(document.getElementById("docaht_wsl_open")){
            self.isPhone = 'false';
            self.listen('docaht_wsl_open',self.open);
        }else if(document.getElementById("docaht_wsl_open_phone")){
            self.isPhone = 'true';
            self.listen('docaht_wsl_open_phone',self.open);
        }
        self.createHtml(opt.position, opt.zindex, body);
        self.ajax({ 'url':self.domain+'/guest/getsockethost', 'type':'POST', 	'body':body, 'data':'user=caht&pwd=caht',
            'success':function(data){
                var script  = document.createElement("script"); script.setAttribute('type','text/javascript'); script.setAttribute('src',data.host+"/socket.io/socket.io.js");
                body.appendChild(script);
                script.onload=script.onreadystatechange=function(){
                    if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
                        if(self.id == null) return false;
                        self.connet(data.host);
                    }
                    script.onload=script.onreadystatechange=null;
                }
            },'error':function(state,status,xhr){

            }
        });

    },
    createHtml : function (positions,zindex,body) {
        var device = /AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/iPad|Android|webOS|iPhone|iPod|BlackBerry|MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent));
        var divh    = document.createElement("div");
        var iframeh = document.createElement("iframe");
        divh.setAttribute('id',"dochatWslBox") ;
        if(self.isPhone == 'true' && device){
            divh.style.width  =  '100%';
            divh.style.height =   '100%';
            divh.style.position = 'fixed';
            divh.style.top = '0';
            divh.style.left = '0';
        }else{
            self.isPhone = 'false';
            divh.style.width ='866px';
            divh.style.height ='576px';
            divh.style.position = 'fixed';
            if(positions == 'leftup'){
                divh.style.top = '0';
                divh.style.left = '0';
            }else if(positions == 'rightup'){
                divh.style.top = '0';
                divh.style.right = '0';
            }else if(positions == 'leftdown'){
                divh.style.bottom = '0';
                divh.style.left = '0';
            }else if(positions == 'rightdown'){
                divh.style.bottom = '0';
                divh.style.right = '0';
            }else{
                var difftop  = self.winSize('innerHeight') - 576 ;
                var fiffleft = self.winSize('innerWidth') - 866;
                difftop = (difftop - difftop*0.4);
                difftop = difftop < 0 ? 0 :difftop;
                fiffleft = fiffleft < 0 ? 0 : fiffleft;
                divh.style.top = parseInt(difftop/2)+'px';
                divh.style.left = parseInt(fiffleft/2)+'px' ;
            }

        }
        divh.style.display='none';
        divh.style.zIndex=(zindex || '9999') ;
        iframeh.setAttribute('id',"dochatWslBoxIframe") ;
        iframeh.setAttribute('name','dochatWslBoxIframe');
        iframeh.setAttribute('frameborder','0') ;
        iframeh.setAttribute('src','');
        iframeh.style.width = '100%';
        iframeh.style.height = '100%';
        iframeh.style.border = '0';
        divh.appendChild(iframeh);
        body.appendChild(divh);
        var divmsg    = document.createElement("div");
        var logoimg   = document.createElement('img');
        var spanmsg   = document.createElement('span');
        divmsg.setAttribute('id',"dochatWslMsg") ;
        divmsg.style.width ='180px';
        divmsg.style.height ='40px';
        divmsg.style.position = 'fixed';
        divmsg.style.bottom = '0';
        divmsg.style.right = '0';
        divmsg.style.backgroundColor = 'rgb(252, 148, 22)';//246 88 40
        divmsg.style.border = '1px solid #a2a2a2';
        divmsg.style.display='none';
        divmsg.style.cursor = 'pointer';
        divmsg.style.zIndex=(zindex || '9999') ;
        logoimg.setAttribute('src',self.logourl) ;
        logoimg.style.width ='40px';
        logoimg.style.height ='40px';
        spanmsg.setAttribute('id','dochatWslMsgBox');
        spanmsg.style.width  = '140px';
        spanmsg.style.height = '40px';
        spanmsg.style.float  = 'right';
        spanmsg.style.textAlign = 'center';
        spanmsg.style.lineHeight = '40px';
        spanmsg.style.fontWeight = '600';
        spanmsg.style.fontSize = '12px';
        divmsg.appendChild(logoimg);
        divmsg.appendChild(spanmsg);
        body.appendChild(divmsg);
        self.listen('dochatWslMsgBox',self.open);
    },
    setParam : function (opt) {
        opt = opt || {};
        self.id = (opt.id || self.id);
        self.key = (opt.key || self.key);
        self.domain = (opt.domain || self.domain);
        self.openPrefix = (opt.openPrefix || self.openPrefix);
        self.loginGroup = self.openPrefix+'_'+self.openType+'_'+self.id;
        if(self.socketClient != null){
            self.socketClient.emit('login',{"group":self.loginGroup} );
        }
    },
    connet : function (host) {
        self.socketClient = io.connect(host);
        self.socketClient.on('connect',function(){
            self.socketClient.emit('login',{"group":self.loginGroup} );
            self.setLog('dochat_wsl_socket_login',{'group':self.loginGroup});
        })
        self.socketClient.on('message', function(data){
            self.setLog('dochat_wsl_socket_message',data);
            if(data.togroup != self.loginGroup) return false;
            if(data.msgtype == 'promptMsg'){
                self.msgPrompt();
            }else if(data.msgtype == 'promptLogin'){
                self.wsGroup = data.fromgroup;
            }
        })
        self.socketClient.on('logout', function(data) {  //listen togroup return
            self.setLog('dochat_wsl_socket_logout',data);
            if(data.togroup != self.loginGroup) return false;
            self.colse(data.type);
        });

    },
    open : function () {
        if(self.btnBlocking)  return false;
        self.btnBlocking = true;
        self.msgSum = 0;
        if(self.closeType == 'close'){
            document.getElementById('dochatWslBox').style.display='block';
            window.open(self.domain+'/index/guestlogin?openprefix='+self.openPrefix+'&open='+self.openType+'&id='+self.id+'&key='+self.key+'&phone='+self.isPhone+'&region='+self.region,'dochatWslBoxIframe','');
        }else if(self.closeType == 'hide'){
            document.getElementById('dochatWslBox').style.display='block';
            document.getElementById('dochatWslMsg').style.display='none';
            if(self.socketClient != null && self.wsGroup != 0){
                self.socketClient.emit('message',{"togroup":self.wsGroup,'fromgroup':self.loginGroup,'msg':0,'msgid':0,'msgtype':'prompt'});
            }
        }
        var dochatMobileWholePage     = document.getElementById('dochatMobileWholePage');
        if(dochatMobileWholePage){
            dochatMobileWholePage.style.display='none';
        }
    }
    ,
    colse : function (type) {
        self.btnBlocking = false;
        var dochatMobileWholePage     = document.getElementById('dochatMobileWholePage');
        if(dochatMobileWholePage){
            dochatMobileWholePage.style.display='block';
        }
        if(type == 'hide'){
            self.closeType = 'hide';
            document.getElementById('dochatWslBox').style.display='none';
            if(self.socketClient != null && self.wsGroup != 0){
                self.socketClient.emit('message',{"togroup":self.wsGroup,'fromgroup':self.loginGroup,'msg':1,'msgid':0,'msgtype':'prompt'});
            }
        }else{
            self.closeType = 'close';
            document.getElementById('dochatWslBox').style.display='none';
            document.getElementById('dochatWslBoxIframe').src = '';
        }
    },
    onclose:function () {
        var dochatMobileWholePage     = document.getElementById('dochatMobileWholePage');
        if(dochatMobileWholePage){
            dochatMobileWholePage.style.display='block';
        }
        document.getElementById('dochatWslBox').style.display='none';
        document.getElementById('dochatWslBoxIframe').src = '';
    },
    msgPrompt : function () {
        self.msgSum++
        document.getElementById('dochatWslMsg').style.display='block';
        document.getElementById('dochatWslMsgBox').innerText = '您有（'+self.msgSum+'）未接消息';

    },

    winSize : function (type) {
        if(type == 'innerWidth'){
            return (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
        }else if(type == 'innerHeight'){
            return (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
        }else if(type == 'width'){
            return (window.outerWidth) ? window.outerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
        }else if(type == 'height'){
            return (window.outerHeight) ? window.outerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
        }else{
            return false;
        }
    },
    listen : function (id,callback) {//dachat_listen
        try{
            var ua=navigator.userAgent.toLowerCase();
            var obj = document.getElementById(id);
            if(ua.indexOf("msie") >= 0 || obj.attachEvent){
                obj.attachEvent("onclick",callback);
            }else if(obj.addEventListener){
                obj.addEventListener('click',callback,false);
            }
        }catch(e){}

    },
    ajax : function (opt) { //docaht_wsl_ajax
        var agent = navigator.userAgent.toLowerCase() ;
        if(agent.indexOf("msie") > 0){
            var ver =  (agent.match(/msie [\d.]+;/gi) + '').substr(5,1);
            ver  =  parseInt(ver);
            if(ver <= 9){
                self.ajaxJSonp  = opt;
                var script = document.createElement("script");
                script.setAttribute('id',"docaht_ajax_jsonp") ;
                script.setAttribute('name','docaht_ajax_jsonp');
                script.setAttribute('src',opt.url+'?callback=docaht_wsl_ajax_callbackc');
                opt.body.appendChild(script);
                return ;
            }
        }
        //ajax
        var XMLHttpReq = null;
        try {
            XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
        }catch(e) {
            try {  // Internet Explorer
                XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        XMLHttpReq.open(opt.type, opt.url, true);
        if(opt.type == 'POST')
            XMLHttpReq.setRequestHeader( "Content-Type","application/x-www-form-urlencoded");
        XMLHttpReq.onreadystatechange = function(){  //指定响应函数
            if (XMLHttpReq.readyState == 4) {
                if (XMLHttpReq.status == 200) {
                    opt.success(eval('('+XMLHttpReq.responseText+')'));
                } else{
                    opt.error(XMLHttpReq.readyState,XMLHttpReq.status,XMLHttpReq);
                }
            }else{
                try{
                    opt.error(XMLHttpReq.readyState,XMLHttpReq.status,XMLHttpReq);
                }catch(e){}
            }
        };
        XMLHttpReq.send(opt.data);
    },
    getDomain : function (url) { //dochat_domain
        var regex = /^\w+\:\/\/([^\/]*).*/;
        var match = url.match(regex);
        return 'http://'+match[1];
    },
    getQueryString : function (name,url) { //dochat_getQueryString
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r =url.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    },
    getCookie : function (name) { //dochat_getCookie
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        return null;
    },
    setLog : function (type,data) { //dochat_set_log
        try{
            console.log(type+':// '+JSON.stringify(data) );
        }catch(e){}
    }
}
function dochat_wsl_run(opt){
    dodoca_chat_guide.main();
}
function dochat_wsl_close(type){
    dodoca_chat_guide.colse(type);
}
function docaht_wsl_ajax_callbackc(copt){
    dodoca_chat_guide.ajaxJSonp.success(copt);
}
window.onbeforeunload = function(event) {
    dodoca_chat_guide.onclose();
}