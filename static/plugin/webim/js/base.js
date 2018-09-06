//帐号模式，0-表示独立模式，1-表示托管模式
var accountMode = 0;
//官方 demo appid,需要开发者自己修改（托管模式）
var sdkAppID = 1400018807;
var accountType = 8699;

var avChatRoomId = '2253245_9896587163624586873'; //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)

if (webim.Tool.getQueryString("groupid")) {
  avChatRoomId = webim.Tool.getQueryString("groupid");//用户自定义房间群id
}

var selType = webim.SESSION_TYPE.GROUP;
var selToID = avChatRoomId;//当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var selSess = null;//当前聊天会话

//默认群组头像(选填)
var selSessHeadUrl = 'img/2017.jpg';

//当前用户身份
var loginInfo = {
  'sdkAppID': sdkAppID, //用户所属应用id,必填
  'appIDAt3rd': sdkAppID, //用户所属应用id，必填
  'accountType': accountType, //用户所属应用帐号类型，必填
  'identifier': '', //当前用户ID,必须是否字符串类型，选填
  'identifierNick': '', //当前用户昵称，选填
  'userSig': '', //当前用户身份凭证，必须是字符串类型，选填
  'headurl': selSessHeadUrl, //当前用户默认头像，选填
  'channel_id':''
};
//监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
//注意每个数字代表的含义，比如，
//1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
var onGroupSystemNotifys = {
  //"1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到,暂不支持）
  //"2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到,暂不支持）
  //"3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到,暂不支持）
  //"4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到,暂不支持)
  // "5": onDestoryGroupNotify, //群被解散(全员接收)
  //"6": onCreateGroupNotify, //创建群(创建者接收,暂不支持)
  //"7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收,暂不支持)
  //"8": onQuitGroupNotify, //主动退群(主动退出者接收,暂不支持)
  //"9": onSetedGroupAdminNotify, //设置管理员(被设置者接收,暂不支持)
  //"10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收,暂不支持)
  // "11": onRevokeGroupNotify, //群已被回收(全员接收)
  // "255": onCustomGroupNotify//用户自定义通知(默认全员接收)
};


//监听连接状态回调变化事件
var onConnNotify = function (resp) {
  switch (resp.ErrorCode) {
    case webim.CONNECTION_STATUS.ON:
      //webim.Log.warn('连接状态正常...');
      break;
    case webim.CONNECTION_STATUS.OFF:
      webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
      break;
    default:
      webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
      break;
  }
};


//监听事件
var listeners = {
  // "onConnNotify": onConnNotify, //选填
  "jsonpCallback": jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
  "onBigGroupMsgNotify": onBigGroupMsgNotify, //监听新消息(大群)事件，必填
  "onMsgNotify": onMsgNotify,//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
  // "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
  // "onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
};

var isAccessFormalEnv = true;//是否访问正式环境

if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
  isAccessFormalEnv = false;//访问测试环境
}

var isLogOn = false;//是否在浏览器控制台打印sdk日志

//其他对象，选填
var options = {
  'isAccessFormalEnv': isAccessFormalEnv,//是否访问正式环境，默认访问正式，选填
  'isLogOn': isLogOn//是否开启控制台打印日志,默认开启，选填
};
var curPlayAudio = null;//当前正在播放的audio对象

var openEmotionFlag = false;//是否打开过表情

// if(accountMode==1){ //托管模式
//     //判断是否已经拿到临时身份凭证
//     if (webim.Tool.getQueryString('tmpsig')) {
//         if (loginInfo.identifier == null) {
//             webim.Log.info('start fetchUserSig');
//             //获取正式身份凭证，成功后会回调tlsGetUserSig(res)函数
//             TLSHelper.fetchUserSig();
//         }
//     } else {//未登录,无登录态模式
//         //sdk登录
//         sdkLogin();
//     }
// }else{ //独立模式
//     //sdk登录
//     sdkLogin();
// }

//IE9(含)以下浏览器用到的jsonp回调函数
function jsonpCallback(rspData) {
  //设置接口返回的数据
  webim.setJsonpLastRspData(rspData);
}
function GetOnlinenum(){
    $.ajax({
        url:'http://api.9first.com/mv1/live/online-num',
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        async: true,
        data:{
            channel_id:loginInfo.channel_id,
            format:'jsonp'
        },
        success: function( result ){
            if(result.status == 1){
                  $('#userfans').text(result.data.num_show);
            }
       }
   })
}
//监听大群新消息（普通，点赞，提示，红包）
function onBigGroupMsgNotify(msgList) {
  for (var i = msgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
    var msg = msgList[i];
    //console.log(msg);
    webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
    // 显示收到的消息
    if (msg.subType == 2) {
      // 修改人数
      const num = parseInt(msg.getElems()[0].content.groupMemberNum)
       this.GetOnlinenum();

      return false
    }
    showMsg(msg);
  }
}

//监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList) {
  var newMsg;
  for (var j in newMsgList) {//遍历新消息
    newMsg = newMsgList[j];
    handlderMsg(newMsg);//处理新消息
  }
}

//处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
function handlderMsg(msg) {
  var fromAccount, fromAccountNick, sessType, subType, contentHtml;

  fromAccount = msg.getFromAccount();
  if (!fromAccount) {
    fromAccount = '';
  }
  fromAccountNick = msg.getFromAccountNick();
  if (!fromAccountNick) {
    fromAccountNick = fromAccount;
  }

  //解析消息
  //获取会话类型
  //webim.SESSION_TYPE.GROUP-群聊，
  //webim.SESSION_TYPE.C2C-私聊，
  sessType = msg.getSession().type();
  //获取消息子类型
  //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
  //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
  subType = msg.getSubType();
  switch (sessType) {
    case webim.SESSION_TYPE.C2C://私聊消息
      switch (subType) {
        case webim.C2C_MSG_SUB_TYPE.COMMON://c2c普通消息
          //业务可以根据发送者帐号fromAccount是否为app管理员帐号，来判断c2c消息是否为全员推送消息，还是普通好友消息
          //或者业务在发送全员推送消息时，发送自定义类型(webim.MSG_ELEMENT_TYPE.CUSTOM,即TIMCustomElem)的消息，在里面增加一个字段来标识消息是否为推送消息
          contentHtml = convertMsgtoHtml(msg);
          webim.Log.warn('receive a new c2c msg: fromAccountNick=' + fromAccountNick + ", content=" + contentHtml);
          //c2c消息一定要调用已读上报接口
          var opts = {
            'To_Account': fromAccount,//好友帐号
            'LastedMsgTime': msg.getTime()//消息时间戳
          };
          webim.c2CMsgReaded(opts);
          alert('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ", 内容=" + contentHtml);
          break;
      }
      break;
    case webim.SESSION_TYPE.GROUP://普通群消息，对于直播聊天室场景，不需要作处理
      break;
  }
}

//sdk登录
function sdkLogin() {
  //web sdk 登录
  webim.login(loginInfo, listeners, options,
    function (identifierNick) {
      //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
      webim.Log.info('webim登录成功');
      applyJoinBigGroup(avChatRoomId);//加入大群
      hideDiscussForm();//隐藏评论表单
      initEmotionUL();//初始化表情
    },
    function (err) {
      // console.log(err.ErrorInfo);
    }
  );//
}

//进入大群
function applyJoinBigGroup(groupId) {
  var me=this;
  var options = {
    'GroupId': groupId//群id
  };
  webim.applyJoinBigGroup(
    options,
    function (resp) {
      //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
      if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
        console.log('进群成功');
        selToID = groupId;
        setTimeout(function(){
          me.onSendMsg('进入了房间')
          me.onSendMsg(JSON.stringify({headurl: loginInfo.headurl}))
        },500)
      } else {
        alert('进群失败');
      }
    },
    function (err) {
      // console.log(err.ErrorInfo);//error
    }
  );
}

//显示消息（群普通+点赞+提示+红包）
function showMsg(msg) {
  var isSelfSend, fromAccount, fromAccountNick, sessType, subType, moneyMsg;
  var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;
  subType = msg.getSubType();
  fromAccount = msg.getFromAccount();
  if (!fromAccount) {
    fromAccount = '';
  }
  fromAccountNick = msg.getFromAccountNick();
  if (!fromAccountNick) {
    fromAccountNick = '未知用户';
  }
  if (!isNaN(fromAccountNick) && fromAccountNick.length == 11) {
    fromAccountNick = fromAccountNick.split('');
    fromAccountNick.splice(3, 4, '*', '*', '*', '*');
    fromAccountNick = fromAccountNick.join('');
  }
  liveChatDom = document.getElementById('liveChatWrapper')
  ul = document.getElementById("smsList");
  /*var maxDisplayMsgCount = 4;
  //var opacityStep=(1.0/4).toFixed(2);
  var opacityStep = 0.2;
  var opacity;
  var childrenLiList = $("#smsList").children();
  if (childrenLiList.length == maxDisplayMsgCount) {
      $("#smsList").children(":first").remove();
      for (var i = 0; i < maxDisplayMsgCount; i++) {
          opacity = opacityStep * (i + 1) + 0.2;
          $('#smsList').children().eq(i).css("opacity", opacity);
      }
  }*/
  li = document.createElement("li");
  paneDiv = document.createElement("div");
  paneDiv.setAttribute('class', 'video-sms-pane');
  textDiv = document.createElement("div");
  textDiv.setAttribute('class', 'video-sms-text');
  //textDiv.style.width = screen.width - 45 + 'px';
  contentSpan = document.createElement("span");
  var message = convertMsgtoHtml(msg).replace(/&quot;/g, '"')
  if (subType == 0 || subType == 2) {
    nickNameSpan = document.createElement("span");
    nickNameSpan.setAttribute('class', subType == 2 ? 'user-name' : 'user-name-blue');
    nickNameSpan.innerHTML = fromAccountNick + ':';
  } else {
    contentSpan.setAttribute('class', 'user-name-red');
    var money = convertMsgtoHtml(msg);
    moneyMsg = fromAccountNick + '赞赏了' + $("#live_user_name").text() + '老师一个' + money + '元红包';
    var red_packet = $('#red_packet').html();
    if(JSON.parse(message).type == "PushingStop"){
    }else {
        red_packet = parseFloat(parseFloat(JSON.parse(message).redPocketNum)+parseFloat(red_packet)).toFixed(2);
    }
    $('#red_packet').html(red_packet);
  }


  //解析消息
  //获取会话类型，目前只支持群聊
  //webim.SESSION_TYPE.GROUP-群聊，
  //webim.SESSION_TYPE.C2C-私聊，
  sessType = msg.getSession().type();
  //获取消息子类型
  //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
  //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE


  isSelfSend = msg.getIsSend();//消息是否为自己发的

  switch (subType) {
    case webim.GROUP_MSG_SUB_TYPE.COMMON://群普通消息
      try {
        var jsonMsg = JSON.parse(message)
        //纯数字
        if(message>=0){
          contentSpan.innerHTML = msg.toHtml();// 内容
          textDiv.appendChild(nickNameSpan);// 名字
        }
        // 安卓不支持subtype = 3
        // 头像
        //console.log(jsonMsg.headurl)
        if (jsonMsg.type === "PushingStop") {
          // 停止推流消息
          // 安卓主播退出直播
          contentSpan.innerHTML = `[系统消息] 主播已经退出直播，本次直播已结束~`
        }
        // message_processor.pushUserIcon(jsonMsg.headurl)
      }catch(e) {
        // 普通消息
        contentSpan.innerHTML = msg.toHtml();// 内容
        textDiv.appendChild(nickNameSpan);// 名字
      }
      break;
    case webim.GROUP_MSG_SUB_TYPE.REDPACKET:// 群红包消息
      message = JSON.parse(message)
      if (message.type === "PushingStop") {
        // 停止推流消息
        // IOS退出视频观看
        //contentSpan.innerHTML = '主播停止了直播'
      }else if (message.type === "barragePriceChanged") {
        // 修改弹幕价格
        //console.log(message.val)
      }else {
        // 红包消息
        // message.id = msg.random
        contentSpan.innerHTML = `[系统消息] ${message.userName} 向主播打赏了 ${message.redPocketNum}元`
      }
      break;
    case webim.GROUP_MSG_SUB_TYPE.LOVEMSG:// 弹幕
      var message = JSON.parse(msg.toHtml().replace(/&quot;/g, '"'))
      contentSpan.innerHTML = `${fromAccountNick}[弹幕消息]: ${message.barrageTxt}`;
      break;
    case webim.GROUP_MSG_SUB_TYPE.TIP:// 群提示消息
      contentSpan.innerHTML = "[系统消息] " + convertMsgtoHtml(msg);
      break;
  }
  // 有内容才添加会话
  if ($(contentSpan).text() !== "" || $(contentSpan).find('img').length > 0) {
    textDiv.appendChild(contentSpan);
    paneDiv.appendChild(textDiv);
    li.appendChild(paneDiv);
    ul.appendChild(li);
  }
  liveChatDom.scrollTop = ul.offsetHeight;
}

//把消息转换成Html
function convertMsgtoHtml(msg) {
  var html = "", elems, elem, type, content;
  elems = msg.getElems();//获取消息包含的元素数组
  for (var i in elems) {
    elem = elems[i];
    type = elem.getType();//获取元素类型
    content = elem.getContent();//获取元素对象
    switch (type) {
      case webim.MSG_ELEMENT_TYPE.TEXT:
        html += convertTextMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.FACE:
        html += convertFaceMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.IMAGE:
        html += convertImageMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.SOUND:
        html += convertSoundMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.FILE:
        html += convertFileMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.LOCATION://暂不支持地理位置
        //html += convertLocationMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.CUSTOM:
        html += convertCustomMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
        html += convertGroupTipMsgToHtml(content);
        break;
      default:
        webim.Log.error('未知消息元素类型: elemType=' + type);
        break;
    }
  }
  return html;
}

//解析文本消息元素
function convertTextMsgToHtml(content) {
  return content.getText();
}

//解析表情消息元素
function convertFaceMsgToHtml(content) {
  var index = content.getIndex();
  var data = content.getData();
  var faceUrl = null;
  var emotion = webim.Emotions[index];
  if (emotion && emotion[1]) {
    faceUrl = emotion[1];
  }
  if (faceUrl) {
    return "<img src='" + faceUrl + "'/>";
  } else {
    return data;
  }
}

//解析图片消息元素
function convertImageMsgToHtml(content) {
  var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL);//小图
  var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE);//大图
  var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN);//原图
  if (!bigImage) {
    bigImage = smallImage;
  }
  if (!oriImage) {
    oriImage = smallImage;
  }
  return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";
}

//解析语音消息元素
function convertSoundMsgToHtml(content) {
  var second = content.getSecond();//获取语音时长
  var downUrl = content.getDownUrl();
  if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
    return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
  }
  return '<audio src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
}

//解析文件消息元素
function convertFileMsgToHtml(content) {
  var fileSize = Math.round(content.getSize() / 1024);
  return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + 'KB)</i></a>';

}

//解析位置消息元素
function convertLocationMsgToHtml(content) {
  return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
}

//解析自定义消息元素
function convertCustomMsgToHtml(content) {
  var data = content.getData();
  var desc = content.getDesc();
  var ext = content.getExt();
  return "data=" + data + ", desc=" + desc + ", ext=" + ext;
}

//解析群提示消息元素
function convertGroupTipMsgToHtml(content) {
  var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
  var text = "";
  var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
  var opType, opUserId, userIdList;
  var memberCount;
  opType = content.getOpType();//群提示消息类型（操作类型）
  opUserId = content.getOpUserId();//操作人id
  switch (opType) {
    case webim.GROUP_TIP_TYPE.JOIN://加入群
      userIdList = content.getUserIdList();
      //text += opUserId + "邀请了";
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text = text.substring(0, text.length - 1);
      if (!isNaN(text) && text.length == 11) {
        text = text.split('');
        text.splice(3, 4, '*', '*', '*', '*');
        text = text.join('');
      }
      text += "进入房间";
      //房间成员数加1
    //   memberCount = $('#userfans').html();
    //   $('#userfans').html(parseInt(memberCount) + 1);
      break;
    case webim.GROUP_TIP_TYPE.QUIT://退出群
      if (!isNaN(opUserId) && opUserId.length == 11) {
        opUserId = opUserId.split('');
        opUserId.splice(3, 4, '*', '*', '*', '*');
        opUserId = opUserId.join('');
      }
      text += opUserId + "离开房间";
      //房间成员数减1
    //   memberCount = parseInt($('#userfans').html());
    //   if (memberCount > 0) {
    //     $('#userfans').html(parseInt(memberCount) - 1);
    //   }
    this.GetOnlinenum();
      break;
    case webim.GROUP_TIP_TYPE.KICK://踢出群
      text += opUserId + "将";
      userIdList = content.getUserIdList();
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text += "踢出该群";
      break;
    case webim.GROUP_TIP_TYPE.SET_ADMIN://设置管理员
      text += opUserId + "将";
      userIdList = content.getUserIdList();
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text += "设为管理员";
      break;
    case webim.GROUP_TIP_TYPE.CANCEL_ADMIN://取消管理员
      text += opUserId + "取消";
      userIdList = content.getUserIdList();
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text += "的管理员资格";
      break;

    case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO://群资料变更
      text += opUserId + "修改了群资料：";
      var groupInfoList = content.getGroupInfoList();
      var type, value;
      for (var m in groupInfoList) {
        type = groupInfoList[m].getType();
        value = groupInfoList[m].getValue();
        switch (type) {
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
            text += "群头像为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
            text += "群名称为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
            text += "群主为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
            text += "群公告为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
            text += "群简介为" + value + "; ";
            break;
          default:
            text += "未知信息为:type=" + type + ",value=" + value + "; ";
            break;
        }
      }
      break;

    case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO://群成员资料变更(禁言时间)
      text += opUserId + "修改了群成员资料:";
      var memberInfoList = content.getMemberInfoList();
      var userId, shutupTime;
      for (var m in memberInfoList) {
        userId = memberInfoList[m].getUserId();
        shutupTime = memberInfoList[m].getShutupTime();
        text += userId + ": ";
        if (shutupTime != null && shutupTime !== undefined) {
          if (shutupTime == 0) {
            text += "取消禁言; ";
          } else {
            text += "禁言" + shutupTime + "秒; ";
          }
        } else {
          text += " shutupTime为空";
        }
        if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + memberInfoList.length + "人";
          break;
        }
      }
      break;
    default:
      text += "未知群提示消息类型：type=" + opType;
      break;
  }
  return text;
}

//tls登录
function tlsLogin() {
  //跳转到TLS登录页面
  TLSHelper.goLogin({
    sdkappid: loginInfo.sdkAppID,
    acctype: loginInfo.accountType,
    url: window.location.href
  });
}

//第三方应用需要实现这个函数，并在这里拿到UserSig
function tlsGetUserSig(res) {
  //成功拿到凭证
  if (res.ErrorCode == webim.TLS_ERROR_CODE.OK) {
    // 从当前URL中获取参数为identifier的值
    loginInfo.identifier = webim.Tool.getQueryString("identifier");
    // 拿到正式身份凭证
    loginInfo.userSig = res.UserSig;
    // 从当前URL中获取参数为sdkappid的值
    loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(webim.Tool.getQueryString("sdkappid"));
    // 从cookie获取accountType
    var accountType = webim.Tool.getCookie('accountType');
    if (accountType) {
      loginInfo.accountType = accountType;
      sdkLogin();//sdk登录
    } else {
      alert('accountType非法');
    }
  } else {
    // 签名过期，需要重新登录
    if (res.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION) {
      tlsLogin();
    } else {
      alert("[" + res.ErrorCode + "]" + res.ErrorInfo);
    }
  }
}

// 单击图片事件
function imageClick(imgObj) {
  var imgUrls = imgObj.src;
  var imgUrlArr = imgUrls.split("#"); //字符分割
  var smallImgUrl = imgUrlArr[0];//小图
  var bigImgUrl = imgUrlArr[1];//大图
  var oriImgUrl = imgUrlArr[2];//原图
  webim.Log.info("小图url:" + smallImgUrl);
  webim.Log.info("大图url:" + bigImgUrl);
  webim.Log.info("原图url:" + oriImgUrl);
}

// 切换播放audio对象
function onChangePlayAudio(obj) {
  if (curPlayAudio) {//如果正在播放语音
    if (curPlayAudio != obj) {//要播放的语音跟当前播放的语音不一样
      curPlayAudio.currentTime = 0;
      curPlayAudio.pause();
      curPlayAudio = obj;
    }
  } else {
    curPlayAudio = obj;//记录当前播放的语音
  }
}

// 单击评论图片
function smsPicClick() {
  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天
      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      alert('请填写帐号和票据');
    }
    return;
  } else {
    hideDiscussTool();//隐藏评论工具栏
    showDiscussForm();//显示评论表单
  }
}

// 发送消息(普通消息)
function onSendMsg(content) {
  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天
      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      alert('请先登录');
    }
    return;
  }

  if (!selToID) {
    alert("您还没有进入房间，暂不能聊天");
    $("#sendMsg").val('');
    return;
  }
  // 获取消息内容
  // var msgtosend = msgtosend = $("#sendMsg").val();
  var msgtosend = msgtosend = content;
  var msgLen = webim.Tool.getStrBytes(msgtosend);

  if (msgtosend.length < 1) {
    alert("发送的消息不能为空!");
    return;
  }

  var maxLen, errInfo;
  if (selType == webim.SESSION_TYPE.GROUP) {
    maxLen = webim.MSG_MAX_LENGTH.GROUP;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  } else {
    maxLen = webim.MSG_MAX_LENGTH.C2C;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  }
  if (msgLen > maxLen) {
    // console.log(errInfo);
    return;
  }
  if (!selSess) {
    selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
  }
  var isSend = true;//是否为自己发送
  var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
  var subType;//消息子类型
  if (selType == webim.SESSION_TYPE.GROUP) {
    // 群消息子类型如下：
    // webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
    // webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
    // webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
    // webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
    subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

  } else {
    // C2C消息子类型如下：
    // webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
    subType = webim.C2C_MSG_SUB_TYPE.COMMON;
  }
  var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
  // 解析文本和表情
  var expr = /\[[^[\]]{1,3}\]/mg;
  var emotions = msgtosend.match(expr);
  var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
  if (!emotions || emotions.length < 1) {
    text_obj = new webim.Msg.Elem.Text(msgtosend);
    msg.addText(text_obj);
  } else {
    // 有表情
    for (var i = 0; i < emotions.length; i++) {
      tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
      if (tmsg) {
        text_obj = new webim.Msg.Elem.Text(tmsg);
        msg.addText(text_obj);
      }
      emotionIndex = webim.EmotionDataIndexs[emotions[i]];
      emotion = webim.Emotions[emotionIndex];
      if (emotion) {
        face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
        msg.addFace(face_obj);
      } else {
        text_obj = new webim.Msg.Elem.Text(emotions[i]);
        msg.addText(text_obj);
      }
      restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
      msgtosend = msgtosend.substring(restMsgIndex);
    }
    if (msgtosend) {
      text_obj = new webim.Msg.Elem.Text(msgtosend);
      msg.addText(text_obj);
    }
  }
  webim.sendMsg(msg, function (resp) {
    if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
      showMsg(msg);
    }
    webim.Log.info("发消息成功");
    $("#sendMsg").val('');

    hideDiscussForm();//隐藏评论表单
    showDiscussTool();//显示评论工具栏
    hideDiscussEmotion();//隐藏表情
  }, function (err) {
    webim.Log.error("发消息失败:" + err.ErrorInfo);
    //alert("发消息失败:" + err.ErrorInfo);
  });
}

//发送红包消息
function sendRedPacketMsg(money) {
  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天
      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      alert('请先登录');
    }
    return;
  }

  if (!selToID) {
    alert("您还没有进入房间，暂不能点赞");
    return;
  }

  if (!selSess) {
    selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
  }
  var isSend = true;//是否为自己发送
  var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
  //群消息子类型如下：
  //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
  //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
  //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
  //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
  var subType = webim.GROUP_MSG_SUB_TYPE.REDPACKET;

  var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
  var redPocketString = JSON.stringify({
    redPocketNum: money,
    userIcon: loginInfo.headurl,
    userName: loginInfo.identifierNick,
  })
  var text_obj = new webim.Msg.Elem.Text(redPocketString);
  msg.addText(text_obj);

  webim.sendMsg(msg, function (resp) {
    if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
      showMsg(msg);
    }
    webim.Log.info("红包成功");
  }, function (err) {
    webim.Log.error("发送红包消息失败:" + err.ErrorInfo);
    alert("发送红包消息失败:" + err.ErrorInfo);
  });
}

//发送消息(群点赞消息)
function sendGroupLoveMsg() {
  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天
      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      alert('请填写帐号和票据');
    }
    return;
  }

  if (!selToID) {
    alert("您还没有进入房间，暂不能点赞");
    return;
  }

  if (!selSess) {
    selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
  }
  var isSend = true;//是否为自己发送
  var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
  //群消息子类型如下：
  //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
  //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
  //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
  //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
  var subType = webim.GROUP_MSG_SUB_TYPE.LOVEMSG;

  var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
  var msgtosend = 'love_msg';
  var text_obj = new webim.Msg.Elem.Text(msgtosend);
  msg.addText(text_obj);

  webim.sendMsg(msg, function (resp) {
    if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
      showMsg(msg);
    }
    webim.Log.info("点赞成功");
  }, function (err) {
    webim.Log.error("发送点赞消息失败:" + err.ErrorInfo);
    alert("发送点赞消息失败:" + err.ErrorInfo);
  });
}

//隐藏评论文本框
function hideDiscussForm() {
  $(".video-discuss-form").hide();
}

//显示评论文本框
function showDiscussForm() {
  $(".video-discuss-form").show();
}

//隐藏评论工具栏
function hideDiscussTool() {
  $(".video-discuss-tool").hide();
}

//显示评论工具栏
function showDiscussTool() {
  $(".video-discuss-tool").show();
}

//隐藏表情框
function hideDiscussEmotion() {
  $("#emotion").hide();
  //$(".video-discuss-emotion").fadeOut("slow");
}

//显示表情框
function showDiscussEmotion() {
  $("#emotion").show();
  //$(".video-discuss-emotion").fadeIn("slow");

}

//展示点赞动画
function showLoveMsgAnimation() {
  //点赞数加1
  var loveCount = $('#user-icon-like').html();
  $('#user-icon-like').html(parseInt(loveCount) + 1);
  var toolDiv = document.getElementById("video-discuss-tool");
  var loveSpan = document.createElement("span");
  var colorList = ['red', 'green', 'blue'];
  var max = colorList.length - 1;
  var min = 0;
  var index = parseInt(Math.random() * (max - min + 1) + min, max + 1);
  var color = colorList[index];
  loveSpan.setAttribute('class', 'like-icon zoomIn ' + color);
  toolDiv.appendChild(loveSpan);
}

//初始化表情
function initEmotionUL() {
  for (var index in webim.Emotions) {
    var emotions = $('<img>').attr({
      "id": webim.Emotions[index][0],
      "src": webim.Emotions[index][1],
      "style": "cursor:pointer;"
    }).click(function () {
      selectEmotionImg(this);
    });
    $('<li>').append(emotions).appendTo($('#emotionUL'));
  }
}

//打开或显示表情
function showEmotionDialog() {
  if (openEmotionFlag) {//如果已经打开
    openEmotionFlag = false;
    hideDiscussEmotion();//关闭
  } else {//如果未打开
    openEmotionFlag = true;
    showDiscussEmotion();//打开
  }
}

//选中表情
function selectEmotionImg(selImg) {
  $("#sendMsg").val($("#sendMsg").val() + selImg.id);
}

//退出大群
function quitBigGroup() {
  var options = {
    'GroupId': avChatRoomId//群id
  };
  webim.quitBigGroup(
    options,
    function (resp) {

      webim.Log.info('退群成功');
      $("#smsList").find("li").remove();
      //webim.Log.error('进入另一个大群:'+avChatRoomId2);
      //applyJoinBigGroup(avChatRoomId2);//加入大群
    },
    function (err) {
      // console.log(err.ErrorInfo);
    }
  );
}

//登出
function logout() {
  //登出
  webim.logout(
    function (resp) {
      webim.Log.info('登出成功');
      loginInfo.identifier = null;
      loginInfo.userSig = null;
      //$("#smsList").find("li").remove();
      // var indexUrl = window.location.href;
      // var pos = indexUrl.indexOf('?');
      // if (pos >= 0) {
      //     indexUrl = indexUrl.substring(0, pos);
      // }
      // window.location.href = indexUrl;
    }
  );
}
