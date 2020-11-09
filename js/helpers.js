;(function(window, ConnectyCube, CONFIG) {
    'use strict';

    /** GLOBAL */
    window.app = {};
    app.helpers = {};
    app.filter = {
        'names': 'no _1977 inkwell moon nashville slumber toaster walden'
    };
    app.network = {};

    app.helpers.notifyIfUserLeaveCall = function(session, userId, reason, title) {
        var userRequest = _.findWhere(app.users, {'id': +userId}),
            userCurrent = _.findWhere(app.users, {'id': +session.currentUserID});

        /** It's for p2p call */
        if(session.opponentsIDs.length === 1) {
            app.helpers.stateBoard.update({
                'title': 'p2p_call_stop',
                'property': {
                    'name': userRequest.login,
                    'currentName': userCurrent.login,
                    'reason': reason
                }
            });
        } else {
            /** It's for groups call */
            $('.j-callee_status_' + userId).text(title);
        }
    };

    app.helpers.changeFilter = function(selector, filterName) {
        $(selector).removeClass(app.filter.names)
            .addClass( filterName );
    };

    app.helpers.getConStateName = function(num) {
        var answ;

        switch (num) {
            case ConnectyCube.videochat.PeerConnectionState.DISCONNECTED:
            case ConnectyCube.videochat.PeerConnectionState.FAILED:
            case ConnectyCube.videochat.PeerConnectionState.CLOSED:
                answ = 'DISCONNECTED';
                break;
            default:
                answ = 'CONNECTING';
        }

        return answ;
    };

    app.helpers.toggleRemoteVideoView = function(userId, action) {
      var $video = $('#remote_video_' + userId);

      if(!_.isEmpty(app.currentSession) && $video.length){
          if(action === 'show') {
              $video.parents('.j-callee').removeClass('wait');
          } else if(action === 'hide') {
              $video.parents('.j-callee').addClass('wait');
          } else if(action === 'clear') {
              /** detachMediaStream take videoElementId */
              app.currentSession.detachMediaStream('remote_video_' + userId);
              $video.parents('.j-callee').removeClass('wait');
          }
        }
    };

    /**
     * [getUui - generate a unique id]
     * @return {[string]} [a unique id]
     */
    function _getUui(identifyAppId) {
        var navigator_info = window.navigator;
        var screen_info = window.screen;
        var uid = navigator_info.mimeTypes.length;

        uid += navigator_info.userAgent.replace(/\D+/g, '');
        uid += navigator_info.plugins.length;
        uid += screen_info.height || '';
        uid += screen_info.width || '';
        uid += screen_info.pixelDepth || '';
        uid += identifyAppId;

        return uid;
    }

    app.helpers.join = function(userId) {
        var user;
        _.each(CONFIG.USERS, function(u){
            if(u.id == userId){
                user = u;
            }
        });

        return new Promise(function(resolve, reject) {
            ConnectyCube.createSession(function(csErr, csRes){
                if(csErr) {
                    reject(csErr);
                } else {
                    /** In first trying to login */
                    ConnectyCube.login(user, function(loginErr, loginUser){
                        if(loginErr) {
                            console.log('APP [login user] Error:', loginErr);
                            reject(loginErr);
                        } else {
                            resolve(user);
                        }
                    });
                }
            });
        });
    };

    app.helpers.renderUsers = function() {
        return new Promise(function(resolve, reject) {
            var tpl = _.template( $('#user_tpl').html() ),
                usersHTML = '';

            _.each(CONFIG.USERS, function(u) {
                if(u.id !== app.caller.id) {
                    usersHTML += tpl(u);
                }
            });

            resolve({
                'usersHTML': usersHTML,
                'users': CONFIG.USERS
            });

        });
    };

    app.helpers.getUsersStatus = function(){
        var users = {};

        if(app.calleesAnwered.length){
            users.accepted = app.calleesAnwered;
        }

        if(app.calleesRejected.length){
            users.rejected = app.calleesRejected;
        }

        return users;
    };



}(window, window.ConnectyCube, window.CONFIG));