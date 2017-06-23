"use strict";function init(){var t,e,i=require("events").EventEmitter,o=require("../common/log/log.js"),n=(require("../utils/tools.js"),require("../config/config.js")),r=require("../utils/editorConfigurable.js"),s=r.Configurable,a=r.ConfigurableDefaults,c=50,u=37,f=.6,g=0,S="",l=JSON.parse(localStorage.getItem("userInfo"))||{},h={},m={},O=JSON.parse(localStorage.getItem("setting"))||{},E=O.proxyType||"SYSTEM",_=!1,d={accelerometer:!1},I=n.defaultWechatVersion,p={model:"iPhone 6",dpr:2,width:375,height:667,os:"iOS",ua:"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/"+I+" MicroMessenger/{{version}} Language/zh_CN webview/{{webviewID}}"},W=p;try{W=JSON.parse(localStorage.getItem("device"))||p}catch(t){o.error("windowStores.js parse device info from localStorage catch error "+t)}var T=!1,N=Object.assign({},i.prototype,{showTipsMsg:function(t){this.emit("SHOW_TIPS_MSG",t)},getProxySetting:function(){return E},updataProxySetting:function(t,e){E=t,o.info("windowStores.js updataProxySetting "+t);var i=require("../common/proxy/setAppProxy.js");i.up(function(){e()})},getInitInfo:function(){return o.info("windowStores.js getInitInfo "+JSON.stringify(h)+" "+JSON.stringify(m)),{urlConfig:h,clientConfig:m}},showAbout:function(){this.emit("SHOW_ABOUT_LAYER")},showLoginLayer:function(){this.emit("SHOW_LOGIN_LAYER")},getItemH:function(){return t},clearUserInfo:function(t){l={};for(var e in localStorage)0!==e.indexOf("projectattr")&&0!==e.indexOf("last-up-test-time")||localStorage.removeItem(e);localStorage.removeItem("userInfo"),localStorage.removeItem("last-select-project"),this.emit("UPDATA_USER_INFO",l),this.showLoginLayer()},getAutoComplete:function(){return e=JSON.parse(localStorage.getItem("autoComplete"))||[]},setAutoComplete:function(t){t=(t||"").trim(),e||(e=[]);var i=e.findIndex(function(e){return e===t});t&&i===-1&&t.indexOf("chrome-extension")===-1&&(e.push(t),localStorage.setItem("autoComplete",JSON.stringify(e))),this.emit("UPDATA_AUTOCOMPLETE",e)},getUserInfo:function(){if(l){var t=+new Date;t>l.signatureExpiredTime&&(l={},localStorage.removeItem("userInfo"))}return l},updateUserInfo:function(t){l=t;var e=JSON.stringify(t);localStorage.setItem("userInfo",e),o.info("windowStores.js updateUserInfo "+e),this.emit("UPDATA_USER_INFO",t)},upUserTikcet:function(t,e){l.newticket=t,l.ticketExpiredTime=e,localStorage.setItem("userInfo",JSON.stringify(l)),o.info("windowStores.js upUserTikcet newticket: "+t+" ticketExpiredTime: "+e)},delUserTicket:function(){l.ticketExpiredTime=+new Date-100,localStorage.setItem("userInfo",JSON.stringify(l)),o.info("windowStores.js delUserTicket ticketExpiredTime: "+l.ticketExpiredTime)},resize:function(e){t=e-c-u,this.emit("TOGGLE_SHARE_MENUS",t)},focus:function(){this.emit("WINDOW_FOCUS")},blur:function(){this.emit("WINDOW_BLUR")},bodyClick:function(t){this.emit("BODY_CLICK",t)},focusAddressBar:function(t){this.emit("FOCUS_ADDRESSBAR",t)},clearAddressHistory:function(t){e=[],localStorage.setItem("autoComplete",JSON.stringify(e)),this.emit("UPDATA_AUTOCOMPLETE",e,t),t.callBack&&t.callBack()},showSetting:function(){this.emit("SHOW_SETTING")},getSetting:function(){var t=localStorage.getItem("setting")||"{}";return t&&(t=JSON.parse(t),t.currentProxyHost=t.proxyHost,t.currentProxyPort=t.proxyPort,void 0===t.device&&(void 0===t.os&&(t.os="iOS"),"iOS"===t.os?t.device="iPhone 6":t.device="Nexus 5x")),t},saveSetting:function(t){var e=Object.assign(O,t);t=JSON.stringify(e),o.info("windowStores.js saveSetting: "+t+" "),localStorage.setItem("setting",t)},getCurrentWebviewID:function(){return g},getCurrentWebviewUrl:function(){return S},changeUrl:function(t,e){g=e,S=t,this.emit("CHANGE_WEBVIEW_URL",t,e)},closeDevtools:function(t){this.emit("CLOSE_WEBVIEW_DEVTOOLS",t)},openDevtools:function(t,e,i){this.emit("OPEN_WEBVIEW_DEVTOOLS",t,e,i)},setWebviewInfo:function(t){var e=Object.assign(W,t);localStorage.setItem("device",JSON.stringify(e)),W=e,this.emit("SET_WEBVIEW_INFO",e)},getWebviewInfo:function(){return W},appEnterBackground:function(){T&&(T=!1),this.emit("APP_ENTER_BACKGROUND")},appEnterForeground:function(t){this.emit("APP_ENTER_FOREGROUND",t)},clickToolsbar:function(t){this.emit("CLICK_TOOLSBAR",t)},operateMusicPlayer:function(t){this.emit("OPERATE_MUSIC_PLAY",t)},getMusicPlayState:function(t){this.emit("GET_MUSIC_PLAY_STATE",t)},startDebuggee:function(t,e){this.emit("START_WEBVIEW_DEBUGGEE",t,e)},changeWebviewID:function(t){this.emit("WINDOW_CHANGE_WEBVIEW_ID",t)},getWeappError:function(t,e,i){this.emit("WINDOW_GET_WEBAPP_ERROR",t,e,i)},showWeappError:function(t,e){this.emit("WINDOW_SHOW_WEBAPP_ERROR",t,e)},showConfirm:function(t){this.emit("WINDOW_SHOW_CONFIRM",t)},showSimulatorConfirm:function(t){this.emit("WINDOW_SHOW_SIMULATOR_CONFIRM",t)},openProjectFile:function(t){this.emit("OPEN_PROJECT_FILE",t)},getLastShow:function(){return localStorage["last-show"]||"debug"},setLastShow:function(t){localStorage["last-show"]=t,this.emit("LAST_SHOW_CHANGE",t)},setLastWinStatus:function(t){localStorage.setItem("last-winStatus",JSON.stringify(t))},getLastWinStatus:function(t){var e=localStorage.getItem("last-winStatus");if(e)try{return e=JSON.parse(e),e.x=e.x<-300?-300:e.x,e.x=e.x>1024?1024:e.x,e.y=e.y<0?0:e.y,e.y=e.y>1024?1024:e.y,e}catch(t){o.error("windowStores.js getLastWinStatus parse localStorage error:"+t)}return{}},toggleNewFeatureCheckShowStatus:function(t){this.emit("TOGGLE_NEW_FEACHE_CHECK_SHOW_STATUS",t)},showCustomPreview:function(t){this.emit("SHOW_CUSTOM_PREVIEW",t)},showAuthorizeConfirm:function(t){this.emit("WINDOW_SHOW_AUTHORIZE_CONFIRM",t)},showWidgetCustom:function(t){this.emit("SHOW_WIDGET_CUSTOM",t)},editorFocus:function(){_=!0,this.emit("EDITOR_FOCUS")},editorBlur:function(){_=!1,this.emit("EDITOR_BLUR")},isEditorFocus:function(){return _},getSensorStatus:function(){return d},setSensorStatus:function(t){d=t,this.emit("SENSOR_STATUS_CHANGE",t)},initEditorConfig:function(){var t={};for(var e in s)t[e]=localStorage.getItem("editor_config_"+e)||a[e];this.emit("UPDATE_EDITOR_CONFIG",t)},getEditorConfig:function(t){var e=localStorage.getItem("editor_config_"+t);return null===e||void 0===e||"null"===e||"undefined"===e?e=a[t]:"false"===e?e=!1:"true"===e&&(e=!0),e},getEditorConfigAll:function(){var t={};for(var e in s)t[e]=localStorage.getItem("editor_config_"+e),null===t[e]||void 0===t[e]?t[e]=a[e]:"false"===t[e]?t[e]=!1:"true"===t[e]&&(t[e]=!0);return t},getEditorDefaultConfigAll:function(){var t={};for(var e in a)t[e]=a[e];return t},updateEditorConfig:function(t){for(var e in t)localStorage.setItem("editor_config_"+e,t[e]);this.emit("UPDATE_EDITOR_CONFIG",t)},getUA:function(){return W.ua},getOffset:function(){return{height:W.height,width:W.width,dpr:W.dpr}},getWidgetOffset:function(t){if("search"==t){var e=W.aspectRatio||f;return{height:(W.width-36)*e+30,width:W.width,dpr:W.dpr}}var i=.6*W.width;return"iPhone 6"!==W.device&&"iPhone 6 Plus"!==W.device||(i=.56*W.width),{height:parseInt(.8*i),width:parseInt(i),dpr:W.dpr}},updateSettingByKey:function(t,e){O[t]=e,localStorage.setItem("setting",JSON.stringify(O)),this.emit("ON_SETTING_CHANGE",t,e)},getSettingByKey:function(t){return O[t]||{}},execEditorCommand:function(t){this.emit("EXEC_EDITOR_COMMAND",t)},getDeviceBrightness:function(){var t=parseFloat(W.brightness);return isNaN(t)?.5:t},setDeviceBrightness:function(t){t=parseFloat(t),isNaN(t)||(t=Math.max(0,Math.min(1,t)),W.brightness=t,localStorage.setItem("device",JSON.stringify(W)))},getKeepScreenOn:function(){return T},setKeepScreenOn:function(t){T=t},getSearchWidgetAspectRatio:function(){var t=W.aspectRatio;return void 0===t&&(t=f),t},setSearchWidgetAspectRatio:function(t){W.aspectRatio=t,localStorage.setItem("device",JSON.stringify(W)),this.emit("SET_WEBVIEW_INFO",W)},showSearchWidgetCustom:function(t){this.emit("SHOW_SEARCH_WIDGET_CUSTOM",t)}});N.setMaxListeners(15),_exports=N}var _exports;init(),module.exports=_exports;