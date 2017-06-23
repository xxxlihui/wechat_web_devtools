"use strict";function init(){function e(){var e=a.getUserInfo(),t=e.nickName,i=new Date;return t+" 在 "+i.toLocaleDateString()+" "+i.toLocaleTimeString()+" 提交上传"}var t=require("../../lib/react.js"),a=require("../../stores/windowStores.js"),i=require("../../actions/windowActions.js"),s=(require("../../cssStr/cssStr.js"),require("../../weapp/commit/upload.js")),o=require("../../common/request/request.js"),r=require("../../config/urlConfig.js"),l=r.uploadQrCodeURL,n=r.refreshUploadConfirm,d=require("../../config/errcodeConfig.js"),c=3e5,m={ERR_UUID:1,EXPIRE_UUID:2,WAITING_SCAN:3,WAITING_CONFIRM:4,CONFIRM:5},p=function(e){i.showTipsMsg({msg:e,type:"error"})},u=function(e,t){i.showConfirm({content:e,callback:t})},h=t.createClass({displayName:"UploadInfo",getInitialState:function(){return{show:!1,showDialog:!1,showQrcode:!1,waitingConfirm:!1,qrcode_img:"",qrcode_id:"",version:"",desc:"",saveBtnTitle:"上传",saveBtnClass:"detail-upload-dialog-button-primary"}},startUpload:function(){var e=this;this.setState({showQrcode:!1,showDialog:!1,waitingConfirm:!1});var t=this.props.project.appid,a={url:l+"?appid="+t,method:"get",needToken:1};o(a,function(t,a,i){if(!t&&200===a.statusCode){i=JSON.parse(i);var s=i.baseresponse;if(0==s.errcode)if(e.props.project.platform)e.showQrcodeWnd(i.qrcode_img,i.wxa_uuid);else{var o=1===i.is_experience?"上次提交已被选为体验版，本次上传将会覆盖体验版，是否继续？":"上传成功后，需要联系管理员在小程序管理后台将本次上传设置为体验版本。";u(o,function(t){t&&e.showQrcodeWnd(i.qrcode_img,i.wxa_uuid)})}else u(s.errcode==d.DEV_Need_Admin?"需要管理员才能进行上传操作，请检查后重试":"获取二维码失败"+s.errcode)}})},showQrcodeWnd:function(e,t){this.setState({showQrcode:!1,showDialog:!0})},startRefreshConfirm:function(){var e=this;return clearTimeout(this.timeId),Date.now()-this.startRefreshTime>c?(p("二维码已过期"),void this.setState({showQrcode:!1,showDialog:!1})):void(this.timeId=setTimeout(function(){if(!e.state.showDialog){var t={appid:e.props.project.appid,wxa_uuid:e.state.qrcode_id},a={url:n,body:JSON.stringify(t),method:"post",needToken:1};o(a,function(t,a,i){if(!t&&200===a.statusCode){i=JSON.parse(i);var s=i.baseresponse;if(0==s.errcode)switch(i.qrcode_state){case m.ERR_UUID:p("二维码错误"),clearTimeout(e.timeId);break;case m.EXPIRE_UUID:p("二维码已过期"),clearTimeout(e.timeId);break;case m.WAITING_SCAN:break;case m.WAITING_CONFIRM:e.setState({waitingConfirm:!0});break;case m.CONFIRM:e.setState({showQrcode:!1,showDialog:!0}),clearTimeout(e.timeId)}else p("获取二维码状态失败"),clearTimeout(e.timeId)}}),e.startRefreshConfirm()}},3e3))},save:function(){var t=this;if(!this.lock&&this.state.showDialog){if(!this.state.version)return void p("请填写版本信息");var a=this.state.desc||e();if(!a)return void p("请填写描述信息");this.setState({saveBtnClass:"detail-upload-dialog-button-primary detail-upload-dialog-button-primary-loading",saveBtnTitle:"上传中"}),this.lock=!0;var i={version:this.state.version,desc:a,uuid:this.state.qrcode_id};s.upload(this.props.project,i,function(e,a,i,s){t.getResp({error:e,resp:a,res:i,options:s,type:"upload"})})}},cancel:function(){this.lock||(this.setState({showQrcode:!1,showDialog:!1}),clearTimeout(this.timeId))},versionChange:function(e){var t=e.target.value;t=t.replace(/[^0-9a-zA-Z\.]/g,""),this.setState({version:t})},descChange:function(e){var t=e.target.value;this.setState({desc:t})},getResp:function(e){this.setState({saveBtnClass:"detail-upload-dialog-button-primary",saveBtnTitle:"上传",showDialog:!1,showQrcode:!1}),this.lock=!1,this.props.getResp(e)},render:function(){var i=this.state.showDialog||this.state.showQrcode,s="",o=a.getUserInfo();o.nickName;if(this.state.qrcode_img){var r=+new Date+c,l=new Date(r),n=a.getUserInfo(),d=n.nickName;s=this.state.waitingConfirm?"扫码成功，请在手机上确认":"请使用 "+d+" 的微信号扫描二维码，并确认。二维码将在 "+l.toTimeString().replace(/\s.*/g,"")+" 失效。"}var m=e();return t.createElement("div",{style:{marginTop:-51,display:i?"":"none"},className:"detail-upload-dialog"},t.createElement("div",{className:"detail-upload-dialog-hd"},t.createElement("h3",{className:"detail-upload-dialog-hd-title"},"上传确认")),t.createElement("div",{style:{display:this.state.showDialog?"":"none"}},t.createElement("div",{className:"detail-upload-dialog-bd"},t.createElement("p",{className:"detail-upload-dialog-tips"},"上传后，可以在公众平台查看本版本"),t.createElement("div",{className:"detail-upload-dialog-form"},t.createElement("div",{className:"detail-upload-dialog-form-item"},t.createElement("label",{className:"detail-upload-dialog-form-label"},"版本号"),t.createElement("div",{className:"detail-upload-dialog-form-input-box"},t.createElement("input",{onChange:this.versionChange,value:this.state.version,type:"text",maxLength:"10",className:"detail-upload-dialog-form-input"}),t.createElement("p",{className:"detail-upload-dialog-form-tips"},"合理设置版本号便于管理，只能输入字母、数字、. 如 v1.0.0 "))),t.createElement("div",{className:"detail-upload-dialog-form-item"},t.createElement("label",{className:"detail-upload-dialog-form-label"},"项目备注"),t.createElement("div",{className:"detail-upload-dialog-form-input-box"},t.createElement("input",{placeholder:m,onChange:this.descChange,value:this.state.desc,type:"text",maxLength:"100",className:"detail-upload-dialog-form-input"}),t.createElement("p",{className:"detail-upload-dialog-form-tips"},"可以备注项目版本优化内容等，便于管理员识别"))))),t.createElement("div",{className:"detail-upload-dialog-ft"},t.createElement("a",{onClick:this.cancel,href:"javascript:;",className:"detail-upload-dialog-button-default"},"取消"),t.createElement("a",{onClick:this.save,href:"javascript:;",style:{display:this.props.isTourist?"none":""},className:this.state.saveBtnClass},this.state.saveBtnTitle))),t.createElement("div",{style:{display:this.state.showQrcode?"":"none"}},t.createElement("div",{className:"setting-bd"},t.createElement("img",{src:"data:image/png;base64,"+this.state.qrcode_img,style:{width:"200px",heigth:"200px",marginBottom:"20px"}}),t.createElement("p",null,s)),t.createElement("div",{className:"detail-upload-dialog-ft"},t.createElement("a",{onClick:this.cancel,href:"javascript:;",className:"detail-upload-dialog-button-default"},"取消"))))}});_exports=h}var _exports;init(),module.exports=_exports;