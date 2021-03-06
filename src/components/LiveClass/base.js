/* eslint-disable */
var webim = require('./webim');
var selToID
    ,loginInfo
    ,accountMode
    ,accountType
    ,sdkAppID
    ,avChatRoomId
    ,selType
    ,selToID
    ,selSess
    ,selSessHeadUrl
    ,getPrePageC2CHistroyMsgInfoMap=[]
    ;
//webim 登录
function initIM(userInfo,callBack){
  var Config = {
    sdkappid: userInfo.sdkappid,
    accountType: 8699,
    accountMode: 0,
  }
  init({
    accountMode: Config.accountMode,
    accountType: Config.accountType,
    sdkAppID: Config.sdkappid,
    avChatRoomId: userInfo.room_id, // 默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
    selType: webim.SESSION_TYPE.GROUP,
    selToID: selToID,
    selSess: null, // 当前聊天会话
  })
  // 当前用户身份
  const loginInfo = {
    'sdkAppID': Config.sdkappid, // 用户所属应用id,必填
    'appIDAt3rd': Config.sdkappid, // 用户所属应用id，必填
    'accountType': Config.accountType, // 用户所属应用帐号类型，必填
    'identifier': userInfo.user_id==0 ? userInfo.user_name : userInfo.user_id, // 当前用户ID,必须是否字符串类型，选填
    'identifierNick': userInfo.nick_name || userInfo.user_id, // 当前用户昵称，选填
    'userSig': userInfo.usersig, // 当前用户身份凭证，必须是字符串类型，选填
    'headurl': userInfo.user_thumb || '//f3-xz.veimg.cn/m/images/user/head.jpg',
  }
  // 监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
  const onGroupSystemNotifys = {
    // '1': onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到）
    // '2': onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到）
    // '3': onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到）
    // '4': onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到)
    // '5': onDestoryGroupNotify, //群被解散(全员接收)
    // '6': onCreateGroupNotify, //创建群(创建者接收)
    // '7': onInvitedJoinGroupNotify, //邀请加群(被邀请者接收)
    // '8': onQuitGroupNotify, //主动退群(主动退出者接收)
    // '9': onSetedGroupAdminNotify, //设置管理员(被设置者接收)
    // '10': onCanceledGroupAdminNotify, //取消管理员(被取消者接收)
    // '11': onRevokeGroupNotify, //群已被回收(全员接收)
    // '255': onCustomGroupNotify//用户自定义通知(默认全员接收)
    '5': onDestoryGroupNotify, //群被解散(全员接收)
    '11': onRevokeGroupNotify, //群已被回收(全员接收)
    '255': onCustomGroupNotify//用户自定义通知(默认全员接收)
  }
  // 监听连接状态回调变化事件
  const onConnNotify = (resp) => {
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        webim.Log.warn('连接状态正常...')
        break
      case webim.CONNECTION_STATUS.OFF:
        webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常')
        break
      default:
        webim.Log.error('未知连接状态,status=' + resp.ErrorCode)
        break
    }
  }
  // 监听事件
  const listeners = {
    'onConnNotify': onConnNotify, // 选填
    // 监听新消息(大群)事件，必填
    'onBigGroupMsgNotify': function(msg) {
      onBigGroupMsgNotify(msg, function(msgs) {
        callBack(msgs)
      })
    },
    // 监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
    'onMsgNotify': function(msg) {
      onMsgNotify(msg, function(msgs) {
        callBack(msgs)
      })
    },
    'onGroupSystemNotifys': onGroupSystemNotifys, // 监听（多终端同步）群系统消息事件，必填
    'onGroupInfoChangeNotify': onGroupInfoChangeNotify, // 监听群资料变化事件，选填
  }
  // 其他对象，选填
  const options = {
    'isAccessFormalEnv': true, // 是否访问正式环境，默认访问正式，选填
    'isLogOn': false, // 是否开启控制台打印日志,默认开启，选填
  }
  //sdk登录
  sdkLogin(loginInfo, listeners, options, function(isok){
      callBack(isok)
  })
}
//监听大群新消息（普通，点赞，提示，红包）
function onBigGroupMsgNotify(msgList,callback) {
    for (var i = msgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
        var msg = msgList[i];
        //console.warn(msg);
        webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
        //显示收到的消息
        callback(showMsg(msg));
        //showMsg(msg);
    }
}
//监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList,callback) {
    var sess, newMsg;
    //获取所有聊天会话
    var sessMap = webim.MsgStore.sessMap();
    for (var j in newMsgList) {//遍历新消息
        newMsg = newMsgList[j];

        if (newMsg.getSession().id() == selToID) {//为当前聊天对象的消息
            selSess = newMsg.getSession();
            //在聊天窗体中新增一条消息
            //console.log(newMsg);
            handlderMsg(newMsg,callback);//处理新消息
            //消息已读上报，以及设置会话自动已读标记
            webim.setAutoRead(selSess, true, true);
        }

    }


    for (var i in sessMap) {
        sess = sessMap[i];
        if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
            //updateSessDiv(sess.type(), sess.id(), sess.unread());
        }
    }
}
//处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
function handlderMsg(msg,callback) {
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
                    // console.log(msg);
                    webim.Log.warn('receive a new c2c msg: fromAccountNick=' + fromAccountNick + ", content=" + contentHtml);
                    //c2c消息一定要调用已读上报接口
                    var opts = {
                        'To_Account': fromAccount,//好友帐号
                        'LastedMsgTime': msg.getTime()//消息时间戳
                    };
                    webim.c2CMsgReaded(opts);
                    callback(
                       {
                         fromAccountNick: fromAccountNick,
                         content: contentHtml,
                         subType: msg.subType,
                         isSend: msg.isSend,
                         time: msg.time //webim.Tool.formatTimeStamp(msg.time)
                       }
                    );
                    //console.error('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ", 内容=" + contentHtml);
                    break;
            }
            break;
        case webim.SESSION_TYPE.GROUP://普通群消息，对于直播聊天室场景，不需要作处理
            break;
    }
}
//上传图片
function uploadPic(uploadFiles,callback) {
    //封装上传图片请求
    var opt = {
        'file': uploadFiles, //图片对象
        // 'onProgressCallBack': function(progress) {
        //   callback(progress)
        // }, //上传图片进度条回调函数
        //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
        'From_Account': loginInfo.identifier, //发送者帐号
        'To_Account': selToID, //接收者
        'businessType': 2 //业务类型，1-发群图片，2-向好友发图片
    };
    //上传图片
    webim.uploadPic(opt,
            function (resp) {
                //上传成功发送图片
                // console.log(resp);
                sendPic(resp,callback);
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
}
//发送图片
function sendPic(images,callback) {
    if (!selToID) {
        alert("您还没有好友，暂不能聊天");
        return;
    }
    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, friendHeadUrl,
        Math.round(new Date().getTime() / 1000));
    }
    var msg = new webim.Msg(selSess, true);
    var images_obj = new webim.Msg.Elem.Images(images.File_UUID);
    for (var i in images.URL_INFO) {
        var img = images.URL_INFO[i];
        var newImg;
        var type;
        switch (img.PIC_TYPE) {
            case 1://原图
                type = 1;//原图
                break;
            case 2://小图（缩略图）
                type = 3;//小图
                break;
            case 4://大图
                type = 2;//大图
                break;
        }
        newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width,
        img.PIC_Height, img.DownUrl);
        images_obj.addImage(newImg);
    }
    msg.addImage(images_obj);
    //调用发送图片接口
    webim.sendMsg(msg, function (resp) {
        // addMsg(msg);
        handlderMsg(msg,callback);
        // curMsgCount++;
    }, function (err) {
        alert(err.ErrorInfo);
    });
}
//初始化聊天界面左侧好友列表框
function getAllFriend(callback, cbErr){
  var options = {
      'From_Account': loginInfo.identifier,
      'TimeStamp': 0,
      'StartIndex': 0,
      'GetCount': 0,
      'LastStandardSequence': 0,
      "TagList": [
        'Tag_Profile_IM_Nick',
        'Tag_SNS_IM_Remark',
        'Tag_Profile_IM_Image'//头像
        ]
  }
  webim.getAllFriend(
      options,
      function (resp) {
        // console.log(resp);
        if (resp.FriendNum > 0) {
          var friends = resp.InfoItem;
          if (!friends || friends.length == 0) {
              return;
          }
          var count = friends.length,
              time =resp.TimeStampNow,
              userList=[];
          for (var i = 0; i < count; i++) {
              var friend_name = friends[i].Info_Account,
                  friend_head = "";
              if (friends[i].SnsProfileItem && friends[i].SnsProfileItem[0]
                  && friends[i].SnsProfileItem[0].Tag) {
                  friend_name = friends[i].SnsProfileItem[0].Value;
              }
              if (friends[i].SnsProfileItem && friends[i].SnsProfileItem[1]
                  && friends[i].SnsProfileItem[1].Tag) {
                  friend_head = friends[i].SnsProfileItem[1].Value;
              }
              if (friend_name.length > 7) {//帐号或昵称过长，截取一部分
                  friend_name = friend_name.substr(0, 7) + "...";
              }
              const options={
                account:friends[i].Info_Account,
                friend_name:friend_name,
                friend_head:friend_head,
                time:time
              }
              userList.push(options)
          }
          if(callback)
            callback(userList)
        }
      },
      function (err) {
          console.log(err.ErrorInfo);
      }
  )
}
//获取最新的c2c历史消息,用于切换好友聊天，重新拉取好友的聊天消息
function getLastC2CHistoryMsgs(opt,callback,cbError) {
    if (selType == webim.SESSION_TYPE.GROUP) {
        alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
        return;
    }
    if(!opt.order){
      getPrePageC2CHistroyMsgInfoMap=[]
    }
    var lastMsgTime = getPrePageC2CHistroyMsgInfoMap[selToID] ? getPrePageC2CHistroyMsgInfoMap[selToID].LastMsgTime : 0;//第一次拉取好友历史消息时，必须传0
    var msgKey = getPrePageC2CHistroyMsgInfoMap[selToID] ? getPrePageC2CHistroyMsgInfoMap[selToID].MsgKey : '';
    var options = {
        'Peer_Account': opt.count==1 ? opt.account: selToID, //好友帐号
        'MaxCnt': opt.count, //拉取消息条数
        'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': msgKey
    };
    webim.getC2CHistoryMsgs(
        options,
        function (resp) {
            var complete = resp.Complete;//是否还有历史消息可以拉取，1-表示没有，0-表示有
            var retMsgCount = resp.MsgCount;//返回的消息条数，小于或等于请求的消息条数，小于的时候，说明没有历史消息可拉取了

            if (resp.MsgList.length == 0) {
                webim.Log.error("没有历史消息了:data=" + JSON.stringify(options));
                return;
            }
            getPrePageC2CHistroyMsgInfoMap[selToID] = { //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
                'LastMsgTime': resp.LastMsgTime,
                'MsgKey': resp.MsgKey
            }
            if (callback)
               callback(resp.MsgList);
        },
        cbError
    );
}
//消息时间
function formatTimeStamp(time){
  if(time==null) return
  var spanTime = '';
  const s=Math.floor(Math.round(new Date().getTime() / 1000)-time)
  if(s<60){
    spanTime = '刚刚';
  }else if(s>60 && s<3600){
    spanTime=Math.floor(s/60)+'分钟前'
  }else if(s/3600<24){
    //spanTime=Math.floor(s/3600)+'小时前'
    spanTime=webim.Tool.formatTimeStamp(time).substring(11,16)
  }else if(s/3600/24==1){
    spanTime='昨天'
  }else if(s/3600/24>1){
    spanTime=webim.Tool.formatTimeStamp(time).substring(0,10)
  }
  return spanTime;
}
//查看好友资料
function getProfilePortrait(callback){
  var tag_list = [
        "Tag_Profile_IM_Nick",//昵称
        "Tag_Profile_IM_Gender",//性别
        "Tag_Profile_IM_AllowType",//加好友方式
        "Tag_Profile_IM_Image"//头像
    ];
    var options = {
        'To_Account':[selToID,loginInfo.identifier],
        'TagList': tag_list
    };

    webim.getProfilePortrait(
            options,
            function (resp) {
                var data = [];
                if (resp.UserProfileItem && resp.UserProfileItem.length > 0) {
                    for (var i in resp.UserProfileItem) {
                        var to_account = resp.UserProfileItem[i].To_Account;
                        var nick = null, gender = null, allowType = null,imageUrl=null;
                        for (var j in resp.UserProfileItem[i].ProfileItem) {
                            switch (resp.UserProfileItem[i].ProfileItem[j].Tag) {
                                case 'Tag_Profile_IM_Nick':
                                    nick = resp.UserProfileItem[i].ProfileItem[j].Value;
                                    break;
                                case 'Tag_Profile_IM_Gender':
                                    switch (resp.UserProfileItem[i].ProfileItem[j].Value) {
                                        case 'Gender_Type_Male':
                                            gender = '男';
                                            break;
                                        case 'Gender_Type_Female':
                                            gender = '女';
                                            break;
                                        case 'Gender_Type_Unknown':
                                            gender = '未知';
                                            break;
                                    }
                                    break;
                                case 'Tag_Profile_IM_AllowType':
                                    switch (resp.UserProfileItem[i].ProfileItem[j].Value) {
                                        case 'AllowType_Type_AllowAny':
                                            allowType = '允许任何人';
                                            break;
                                        case 'AllowType_Type_NeedConfirm':
                                            allowType = '需要确认';
                                            break;
                                        case 'AllowType_Type_DenyAny':
                                            allowType = '拒绝任何人';
                                            break;
                                        default:
                                            allowType = '需要确认';
                                            break;
                                    }
                                    break;
                                case 'Tag_Profile_IM_Image':
                                    imageUrl = resp.UserProfileItem[i].ProfileItem[j].Value;
                                    break;
                            }
                        }
                        data.push({
                            'To_Account': to_account,
                            'Nick': webim.Tool.formatText2Html(nick),
                            'Gender': gender,
                            'AllowType': allowType,
                            'Image': imageUrl
                        });
                    }
                }
                callback(data)
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
  }
//sdk登录
function sdkLogin(userInfo, listeners, options,callback) {
    //web sdk 登录
    webim.login(userInfo, listeners, options,
        function (identifierNick) {
            console.debug(identifierNick);
            //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
            webim.Log.info('webim登录成功');
            loginInfo = userInfo;
						applyJoinBigGroup(avChatRoomId);//加入大群
          	callback(true)
        },
        function (err) {
            callback(false)
            console.error(err.ErrorInfo);
        }
    );//
}

//修改昵称
function setProfilePortrait(options,callback){
    webim.setProfilePortrait(options,
        function(res){
            webim.Log.info('修改昵称成功');
            callback && callback();
        },
        function(){

        }
    );
}

//进入大群
function applyJoinBigGroup(groupId) {
    var options = {
        'GroupId': groupId//群id
    };
    webim.applyJoinBigGroup(
        options,
        function (resp) {
            //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
            if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
                webim.Log.info('进群成功');
                selToID = groupId;
            } else {
                console.error('进群失败');
            }
        },
        function (err) {
            console.error(err.ErrorInfo);
        }
    );
}

//申请加好友
function applyAddFriend(callback) {
    var that=this;
    var add_friend_item = [
        {
            'To_Account': selToID,
            "AddSource": "AddSource_Type_Unknow",
            "AddWording": "你好，我正在找以上工作，这是我的简历，我们来聊聊看吧" //加好友附言，可为空
        }
    ];
    var options = {
        'From_Account': loginInfo.identifier,
        'AddFriendItem': add_friend_item
    };
    webim.applyAddFriend(
        options,
        function (resp) {
            // console.log(resp);
            if (resp.Fail_Account && resp.Fail_Account.length > 0) {
                for (var i in resp.ResultItem) {
                  alert(resp.ResultItem[i].ResultInfo);
                  break;
                }
                callback(false);
            }else{
                callback(true);
            }
        },
        function (err) {
            callback(false);
            //alert(err.ErrorInfo);
        }
    );
}

//显示消息（群普通+点赞+提示+红包）
function showMsg(msg) {
    var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
    var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;

    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        fromAccount = '';
    }
    fromAccountNick = msg.getFromAccountNick();
    if (!fromAccountNick) {
        fromAccountNick = '未知用户';
    }
    //解析消息
    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
    sessType = msg.getSession().type();
    //获取消息子类型
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();

    isSelfSend = msg.getIsSend();//消息是否为自己发的
    var content = "";
    switch (subType) {

        case webim.GROUP_MSG_SUB_TYPE.COMMON://群普通消息
            content = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.REDPACKET://群红包消息
            content = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG://群点赞消息
            //业务自己可以增加逻辑，比如展示点赞动画效果
            content = convertMsgtoHtml(msg);
            //展示点赞动画
            showLoveMsgAnimation();
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP://群提示消息
            content = convertMsgtoHtml(msg);
            break;
    }

    return {
        fromAccountNick: fromAccountNick,
        content: content,
        subType: subType,
        isSend: isSelfSend
    }
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
                msg.subType=3;
                html += convertLocationMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                msg.subType=4;
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
    return webim.Tool.formatHtml2Text(html);
}

//解析文本消息元素
function convertTextMsgToHtml(content) {
    return content.getText();
}
//解析表情消息元素
function convertFaceMsgToHtml(content) {
    var data = content.getData();
    var index = content.getIndex();
    var faceUrl='';
    var emotion = webim.Emotions[index];
    if (emotion) {
        faceUrl = emotion.pic;
    }
    if (faceUrl) {
        return "<img src='"+faceUrl+"' width='20px'/>";
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
    return JSON.stringify({
      longitude:content.getLongitude(),
      latitude:content.getLatitude(),
      store_address:content.getDesc()
    })
}
//解析自定义消息元素
function convertCustomMsgToHtml(content) {
    var data = content.getData();
    var desc = content.getDesc();
    var ext = 1;//content.getExt();
    //return "data:" + data + ", desc:"+ desc +", ext:" + ext;
    return JSON.stringify({
      data:data.replace(/\s+/g, "").replace(/<[^>]+>/g,""),
      desc:desc,
      ext:ext
    })
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
            text += "进入房间";
            //房间成员数加1
            // memberCount = $('#user-icon-fans').html();
            //memberCount = parseInt(memberCount) + 1;
            break;
        case webim.GROUP_TIP_TYPE.QUIT://退出群
            text += opUserId + "离开房间";
            //房间成员数减1
            // if (memberCount > 0) {
            //     memberCount = parseInt(memberCount) - 1;
            // }
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
    console.warn('tlslogin need rewrite');
    // TLSHelper.goLogin({
    //     sdkappid: loginInfo.sdkAppID,
    //     acctype: loginInfo.accountType,
    //     url: window.location.href
    // });
}
//第三方应用需要实现这个函数，并在这里拿到UserSig
function tlsGetUserSig(res) {
    //成功拿到凭证
    if (res.ErrorCode == webim.TLS_ERROR_CODE.OK) {
        //从当前URL中获取参数为identifier的值
        loginInfo.identifier = webim.Tool.getQueryString("identifier");
        //拿到正式身份凭证
        loginInfo.userSig = res.UserSig;
        //从当前URL中获取参数为sdkappid的值
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(webim.Tool.getQueryString("sdkappid"));
        //从cookie获取accountType
        var accountType = webim.Tool.getCookie('accountType');
        if (accountType) {
            loginInfo.accountType = accountType;
            sdkLogin();//sdk登录
        } else {
            location.href = location.href.replace(/\?.*$/gi,"");
        }
    } else {
        //签名过期，需要重新登录
        if (res.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION) {
            tlsLogin();
        } else {
            console.error("[" + res.ErrorCode + "]" + res.ErrorInfo);
        }
    }
}

//单击图片事件
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

//切换播放audio对象
function onChangePlayAudio(obj) {
    var curPlayAudio;
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

//单击评论图片
function smsPicClick() {
    if (!loginInfo.identifier) {//未登录
        if (accountMode == 1) {//托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else {//独立模式
            console.error('请填写帐号和票据');
        }
        return;
    } else {
        hideDiscussTool();//隐藏评论工具栏
        showDiscussForm();//显示评论表单
    }
}

//发送消息(普通消息)
function onSendMsg(msg,callback) {
    if (!loginInfo.identifier) {//未登录
        if (accountMode == 1) {//托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else {//独立模式
            console.error('请填写帐号和票据');
        }
        return;
    }

    if (!selToID) {
        console.error("您还没有进入房间，暂不能聊天");
        return;
    }
    //获取消息内容
    var msgtosend = msg;
    var msgLen = webim.Tool.getStrBytes(msg);

    if (msgtosend.length < 1) {
        console.error("发送的消息不能为空!");
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
        console.error(errInfo);
        return;
    }
    if (!selSess || (selSess._impl && selSess._impl.id!=selToID)) {
        selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    // console.log(selSess);
    var isSend = true;//是否为自己发送
    var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
    var subType;//消息子类型
    if (selType == webim.SESSION_TYPE.GROUP) {
        //群消息子类型如下：
        //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

    } else {
        //C2C消息子类型如下：
        //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
        subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    }
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifier);
    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgtosend.match(expr);
    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(msgtosend);
        msg.addText(text_obj);
    } else {//有表情
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
        if(resp.ActionStatus=="OK"){
          if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
              handlderMsg(msg,callback);
          }else{
            callback && callback(msg);
          }
          webim.Log.info("发消息成功");
        }
    }, function (err) {
        webim.Log.error("发消息失败:" + err.ErrorInfo);
        console.error("发消息失败:" + err.ErrorInfo);
    });
}

//发送自定义消息
function onSendCustomMsg(msg,callback) {
    if (!loginInfo.identifier) {//未登录
        if (accountMode == 1) {//托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else {//独立模式
            console.error('请填写帐号和票据');
        }
        return;
    }

    if (!selToID) {
        console.error("您还没有进入房间，暂不能点赞");
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
    var subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    var msgtosend = msg;
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
    var text_obj = new webim.Msg.Elem.Custom(msgtosend,"1","");
    msg.addCustom(text_obj);

    webim.sendMsg(msg, function (resp) {
        if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            //console.log(msg);
            handlderMsg(msg,callback);
        }else{
            callback && callback(msg);
        }
        webim.Log.info("自定义消息发送成功");
    }, function (err) {
        webim.Log.error("自定义消息失败:" + err.ErrorInfo);
        console.error("自定义消息失败:" + err.ErrorInfo);
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
            console.error('请填写帐号和票据');
        }
        return;
    }

    if (!selToID) {
        console.error("您还没有进入房间，暂不能点赞");
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
        console.error("发送点赞消息失败:" + err.ErrorInfo);
    });
}
//隐藏评论文本框
function hideDiscussForm() {
    //$(".video-discuss-form").hide();
}
//显示评论文本框
function showDiscussForm() {
    //$(".video-discuss-form").show();
}
//隐藏评论工具栏
function hideDiscussTool() {
    //$(".video-discuss-tool").hide();
}
//显示评论工具栏
function showDiscussTool() {
    //$(".video-discuss-tool").show();
}
//隐藏表情框
function hideDiscussEmotion() {
    //$(".video-discuss-emotion").hide();
    ////$(".video-discuss-emotion").fadeOut("slow");
}
//显示表情框
function showDiscussEmotion() {
    //$(".video-discuss-emotion").show();
    //$(".video-discuss-emotion").fadeIn("slow");

}
//展示点赞动画
function showLoveMsgAnimation() {
    //点赞数加1
    // var loveCount = $('#user-icon-like').html();
    // $('#user-icon-like').html(parseInt(loveCount) + 1);
    // var toolDiv = document.getElementById("video-discuss-tool");
    // var loveSpan = document.createElement("span");
    // var colorList = ['red', 'green', 'blue'];
    // var max = colorList.length - 1;
    // var min = 0;
    // var index = parseInt(Math.random() * (max - min + 1) + min, max + 1);
    // var color = colorList[index];
    // loveSpan.setAttribute('class', 'like-icon zoomIn ' + color);
    // toolDiv.appendChild(loveSpan);
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
    $("#send_msg_text").val($("#send_msg_text").val() + selImg.id);
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
            selSess = null;
            //webim.Log.error('进入另一个大群:'+avChatRoomId2);
            //applyJoinBigGroup(avChatRoomId2);//加入大群
        },
        function (err) {
            console.error(err.ErrorInfo);
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
        }
    );
}



//监听 申请加群 系统消息
function onApplyJoinGroupRequestNotify(notify) {
    webim.Log.warn("执行 加群申请 回调：" + JSON.stringify(notify));
    var timestamp = notify.MsgTime;
    var reportTypeCh = "[申请加群]";
    var content = notify.Operator_Account + "申请加入你的群";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, timestamp);
}

//监听 申请加群被同意 系统消息
function onApplyJoinGroupAcceptNotify(notify) {
    webim.Log.warn("执行 申请加群被同意 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[申请加群被同意]";
    var content = notify.Operator_Account + "同意你的加群申请，附言：" + notify.RemarkInfo;
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 申请加群被拒绝 系统消息
function onApplyJoinGroupRefuseNotify(notify) {
    webim.Log.warn("执行 申请加群被拒绝 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[申请加群被拒绝]";
    var content = notify.Operator_Account + "拒绝了你的加群申请，附言：" + notify.RemarkInfo;
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被踢出群 系统消息
function onKickedGroupNotify(notify) {
    webim.Log.warn("执行 被踢出群  回调：" + JSON.stringify(notify));
    var reportTypeCh = "[被踢出群]";
    var content = "你被管理员" + notify.Operator_Account + "踢出该群";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 解散群 系统消息
function onDestoryGroupNotify(notify) {
    webim.Log.warn("执行 解散群 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[群被解散]";
    var content = "群主" + notify.Operator_Account + "已解散该群";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 创建群 系统消息
function onCreateGroupNotify(notify) {
    webim.Log.warn("执行 创建群 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[创建群]";
    var content = "你创建了该群";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被邀请加群 系统消息
function onInvitedJoinGroupNotify(notify) {
    webim.Log.warn("执行 被邀请加群  回调: " + JSON.stringify(notify));
    var reportTypeCh = "[被邀请加群]";
    var content = "你被管理员" + notify.Operator_Account + "邀请加入该群";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 主动退群 系统消息
function onQuitGroupNotify(notify) {
    webim.Log.warn("执行 主动退群  回调： " + JSON.stringify(notify));
    var reportTypeCh = "[主动退群]";
    var content = "你退出了该群";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被设置为管理员 系统消息
function onSetedGroupAdminNotify(notify) {
    webim.Log.warn("执行 被设置为管理员  回调：" + JSON.stringify(notify));
    var reportTypeCh = "[被设置为管理员]";
    var content = "你被群主" + notify.Operator_Account + "设置为管理员";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被取消管理员 系统消息
function onCanceledGroupAdminNotify(notify) {
    webim.Log.warn("执行 被取消管理员 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[被取消管理员]";
    var content = "你被群主" + notify.Operator_Account + "取消了管理员资格";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 群被回收 系统消息
function onRevokeGroupNotify(notify) {
    webim.Log.warn("执行 群被回收 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[群被回收]";
    var content = "该群已被回收";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 用户自定义 群系统消息
function onCustomGroupNotify(notify) {
    webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[用户自定义系统消息]";
    var content = notify.UserDefinedField;//群自定义消息数据
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}

//监听 群资料变化 群提示消息
function onGroupInfoChangeNotify(groupInfo) {
    webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(groupInfo));
    var groupId = groupInfo.GroupId;
    var newFaceUrl = groupInfo.GroupFaceUrl;//新群组图标, 为空，则表示没有变化
    var newName = groupInfo.GroupName;//新群名称, 为空，则表示没有变化
    var newOwner = groupInfo.OwnerAccount;//新的群主id, 为空，则表示没有变化
    var newNotification = groupInfo.GroupNotification;//新的群公告, 为空，则表示没有变化
    var newIntroduction = groupInfo.GroupIntroduction;//新的群简介, 为空，则表示没有变化

    if (newName) {
        //更新群组列表的群名称
        //To do
        webim.Log.warn("群id=" + groupId + "的新名称为：" + newName);
    }
}

//显示一条群组系统消息
function showGroupSystemMsg(type, typeCh, group_id, group_name, msg_content, msg_time) {
    var sysMsgStr = "收到一条群系统消息: type=" + type + ", typeCh=" + typeCh + ",群ID=" + group_id + ", 群名称=" + group_name + ", 内容=" + msg_content + ", 时间=" + webim.Tool.formatTimeStamp(msg_time);
    webim.Log.warn(sysMsgStr);
    console.error(sysMsgStr);
}

function init(opts){
    accountMode = opts.accountMode;
    accountType = opts.accountType;
    sdkAppID = opts.sdkAppID;
    avChatRoomId = opts.avChatRoomId;
    selType = opts.selType;
    selToID = opts.selToID;
}

module.exports = {
    init : init,
    applyAddFriend : applyAddFriend,
    getLastC2CHistoryMsgs : getLastC2CHistoryMsgs,
    getAllFriend: getAllFriend,
    getProfilePortrait : getProfilePortrait,
    onBigGroupMsgNotify : onBigGroupMsgNotify,
    onMsgNotify : onMsgNotify,
    handlderMsg : handlderMsg,
    uploadPic : uploadPic,
    sdkLogin : sdkLogin,
    initIM : initIM,
    applyJoinBigGroup : applyJoinBigGroup,
    formatTimeStamp : formatTimeStamp,
    showMsg : showMsg,
    convertMsgtoHtml : convertMsgtoHtml,
    convertTextMsgToHtml : convertTextMsgToHtml,
    convertFaceMsgToHtml : convertFaceMsgToHtml,
    convertImageMsgToHtml : convertImageMsgToHtml,
    convertSoundMsgToHtml : convertSoundMsgToHtml,
    convertFileMsgToHtml : convertFileMsgToHtml,
    convertLocationMsgToHtml : convertLocationMsgToHtml,
    convertCustomMsgToHtml : convertCustomMsgToHtml,
    convertGroupTipMsgToHtml : convertGroupTipMsgToHtml,
    tlsLogin : tlsLogin,
    tlsGetUserSig : tlsGetUserSig,
    imageClick : imageClick,
    onChangePlayAudio : onChangePlayAudio,
    smsPicClick : smsPicClick,
    onSendMsg : onSendMsg,
    sendRedPacketMsg : sendRedPacketMsg,
    onSendCustomMsg : onSendCustomMsg,
    sendGroupLoveMsg : sendGroupLoveMsg,
    hideDiscussForm : hideDiscussForm,
    showDiscussForm : showDiscussForm,
    hideDiscussTool : hideDiscussTool,
    showDiscussTool : showDiscussTool,
    hideDiscussEmotion : hideDiscussEmotion,
    showDiscussEmotion : showDiscussEmotion,
    showLoveMsgAnimation : showLoveMsgAnimation,
    showEmotionDialog : showEmotionDialog,
    selectEmotionImg : selectEmotionImg,
    quitBigGroup : quitBigGroup,
    logout : logout,
    onApplyJoinGroupRequestNotify : onApplyJoinGroupRequestNotify,
    onApplyJoinGroupAcceptNotify : onApplyJoinGroupAcceptNotify,
    onApplyJoinGroupRefuseNotify : onApplyJoinGroupRefuseNotify,
    onKickedGroupNotify : onKickedGroupNotify,
    onDestoryGroupNotify : onDestoryGroupNotify,
    onCreateGroupNotify : onCreateGroupNotify,
    onInvitedJoinGroupNotify : onInvitedJoinGroupNotify,
    onQuitGroupNotify : onQuitGroupNotify,
    onSetedGroupAdminNotify : onSetedGroupAdminNotify,
    onCanceledGroupAdminNotify : onCanceledGroupAdminNotify,
    onRevokeGroupNotify : onRevokeGroupNotify,
    onCustomGroupNotify : onCustomGroupNotify,
    onGroupInfoChangeNotify : onGroupInfoChangeNotify,
    showGroupSystemMsg : showGroupSystemMsg,
};
