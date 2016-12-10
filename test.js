(function () {
    var main_video = document.getElementById('main_video');
    var media_player = document.getElementById('media_player');

    var video = document.getElementById('video');
    var btn_start_large = document.getElementById('btn_start_large');
    var btn_start = document.getElementById('btn_start');
    var jindu = document.getElementById('jindu');
    var jindu_tiao = document.getElementById('jindu_tiao');
    var jindu_duration = document.getElementById('jindu_duration');
    var jindu_buffer = document.getElementById('jindu_buffer');
    var jindu_current = document.getElementById('jindu_current');
    var jindu_button = document.getElementById('jindu_button');
    var btn_music_con = document.getElementById('btn_music_con');
    var music_tiao = document.getElementById('music_tiao');
    var music_duration = document.getElementById('music_duration');
    var music_current = document.getElementById('music_current');
    var music_button = document.getElementById('music_button');
    var btn_music_up = document.getElementById('btn_music_up');
    var btn_music_down = document.getElementById('btn_music_down');
    var btn_kuaijin = document.getElementById('btn_kuaijin');
    var btn_kuaitui = document.getElementById('btn_kuaitui');
    var file_open_btn = document.getElementById('file_open_btn');
    var file_close_btn = document.getElementById('file_close_btn');
    var file_list = document.getElementById('file_list');
    var file_btn = document.getElementById('file_btn');
    var add_btn = document.getElementById('add_btn');
    var btn_quanping = document.getElementById('btn_quanping');

    jindu_duration.style.width = '100%';
    music_duration.style.width = "100%";

    //进度
    function show_jindu() {
        var tim1 = parseInt(video.currentTime);
        if (tim1 % 60 < 10) {
            tim1 = parseInt(tim1 / 60) + ":0" + tim1 % 60;
        } else {
            tim1 = parseInt(tim1 / 60) + ":" + tim1 % 60;
        }
        var tim2 = parseInt(video.duration);
        if (tim2 % 60 < 10) {
            tim2 = parseInt(tim2 / 60) + ":0" + tim2 % 60;
        } else {
            tim2 = parseInt(tim2 / 60) + ":" + tim2 % 60;
        }
        jindu.innerHTML = tim1 + "/" + tim2;
    }

    function jindu_cur() {
        jindu_duration.style.width = '100%';
        jindu_buffer.style.left = (video.buffered.start(0) / video.duration) * 100 + '%';
        jindu_buffer.style.width = ((video.buffered.end(0) - video.buffered.start(0)) / video.duration) * 100 + '%';
        jindu_current.style.width = (video.currentTime / video.duration) * 100 + '%';
    }

    //音量条
    function music_cur() {
        music_duration.style.width = "100%";
        music_current.style.width = (video.volume * 100) + '%';
    }

    function musicbtn() {
        if (video.volume > 0.66 && video.volume <= 1) {
            btn_music_con.src = "source/musicup3.png";
        } else if (video.volume > 0.33 && video.volume <= 0.66) {
            btn_music_con.src = "source/musicup2.png";
        } else if (video.volume > 0 && video.volume <= 0.33) {
            btn_music_con.src = "source/musicup1.png";
        } else {
            btn_music_con.src = "source/musicdown.png";
        }
    }

    /*---------------------------------------------------------------------------------------------------------------*/
    //本地文件加载
    file_open_btn.onclick = function () {
        file_list.classList.toggle("hide_file_list");
        file_open_btn.classList.toggle("hide_file_list");
    };
    file_close_btn.onclick = function () {
        file_list.classList.toggle("hide_file_list");
        file_open_btn.classList.toggle("hide_file_list");
    };
    add_btn.onclick = function () {
        var file = file_btn.files[0];
        var url = URL.createObjectURL(file);
        console.log(url);
        video.src = url;
    };

    //视频加载时
    video.addEventListener('loadedmetadata', function logg() {
        show_jindu();
        jindu_cur();
        music_cur();
        musicbtn();
    });

    //视频播放时
    video.ontimeupdate = function () {
        show_jindu();
        jindu_cur();
        music_cur();
        musicbtn();
    };

    //视频开始
    video.onplay = function () {
        console.log("video play");
        btn_start_large.style.display = "none";
        btn_start.src = "source/stop.png";
    };

    //视频暂停
    video.onpause = function () {
        btn_start_large.style.display = 'initial';
        btn_start.src = "source/start.png";
    };

    //开始按钮
    btn_start_large.onclick = function () {
        video.play();
    };

    //开始，暂停，快进，快退
    btn_start.onclick = function playpause() {
        if (video.paused) {
            video.play();
            btn_start.src = "source/stop.png";
        } else {
            video.pause();
            btn_start.src = "source/start.png";
        }
    };

    video.ondblclick = function playpause() {
        if (video.paused) {
            video.play();
            btn_start.src = "source/stop.png";
        } else {
            video.pause();
            btn_start.src = "source/start.png";
        }
    };

    btn_kuaijin.onclick = function () {
        video.currentTime += 5;
    };

    btn_kuaitui.onclick = function () {
        video.currentTime -= 5;
    };

    //有声，无声，增加音量，减小音量
    btn_music_con.onclick = function () {
        if (video.volume != 0) {
            video.volume = 0;
            musicbtn();
            music_cur();
        } else {
            video.volume = 1;
            musicbtn();
            music_cur();
        }
    };
    btn_music_up.onclick = function () {
        if (video.volume >= 0.9) {
            video.volume = 1;
        } else {
            video.volume += 0.1;
        }
        music_cur();
        musicbtn();
    };
    btn_music_down.onclick = function () {
        if (video.volume <= 0.1) {
            video.volume = 0;
        } else {
            video.volume -= 0.1;
        }
        music_cur();
        musicbtn();
    };
    btn_music.onmouseover = function () {
        btn_music_up.style.display = "block";
        btn_music_down.style.display = "block";
        btn_music.style.marginTop = "-60px";
    };
    btn_music.onmouseout = function () {
        btn_music_up.style.display = "none";
        btn_music_down.style.display = "none";
        btn_music.style.marginTop = "0px";
    };

    //全屏
    btn_quanping.onclick = function () {
        if (btn_quanping.src.match("quanping1.png")) {
            main_video.classList.toggle('fullscreen');
            media_player.classList.toggle('fullscreen');
            btn_quanping.src = "source/quanping0.png";
            exitFull();
        } else {
            main_video.classList.toggle('fullscreen');
            media_player.classList.toggle('fullscreen');
            btn_quanping.src = "source/quanping1.png";
            requestFullScreen(document.documentElement);
        }
    };

    function requestFullScreen(element) {
        // 判断各种浏览器，找到正确的方法
        var requestMethod = element.requestFullScreen || //W3C
            element.webkitRequestFullScreen || //Chrome等
            element.mozRequestFullScreen || //FireFox
            element.msRequestFullScreen; //IE11
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    //退出全屏 判断浏览器种类
    function exitFull() {
        // 判断各种浏览器，找到正确的方法
        var exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen || //Chrome等
            document.webkitExitFullscreen || //FireFox
            document.webkitExitFullscreen; //IE11
        if (exitMethod) {
            exitMethod.call(document);
        } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    /*音量，进度条--拖动，点击效果-----------------------------------------------------------------------------------*/
    var x_sta, x_end, x_cur, x_dur, x_len;
    //音量拖动
    function music_drag(event) {
        x_end = event.clientX;
        x_len = (x_cur - x_sta + x_end) / x_dur;
        if (x_len <= 0) {
            video.volume = 0;
        } else if (x_len >= 1) {
            video.volume = 1;
        } else {
            video.volume = x_len;
        }
        music_current.style.width = video.volume * 100 + "%";
        musicbtn();
    }

    music_button.ondragstart = function () {
        x_sta = event.clientX;
        x_cur = music_current.clientWidth;
        x_dur = music_duration.clientWidth;
    };
    music_button.ondrag = music_drag;
    music_button.ondragend = music_drag;

    //进度拖动
    jindu_button.ondragstart = function (event) {
        x_sta = event.clientX;
        x_cur = jindu_current.clientWidth;
        x_dur = jindu_duration.clientWidth;
    };

    jindu_button.ondrag = function (event) {
        x_end = event.clientX;
        x_len = (x_cur - x_sta + x_end) / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
        }
        video.currentTime = x_len * video.duration;
        jindu_cur();
    };

    jindu_button.ondragend = function (event) {
        x_end = event.clientX;
        x_len = (x_cur - x_sta + x_end) / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
        }
        video.currentTime = x_len * video.duration;
        jindu_cur();
    };

    //音量点击切换
    function music_click(event) {
        x_end = event.layerX;
        x_dur = music_duration.clientWidth;
        x_len = x_end / x_dur;
        if (x_len <= 0) {
            video.volume = 0;
        } else if (x_len >= 1) {
            video.volume = 1;
        } else {
            video.volume = x_len;
        }
        music_current.style.width = video.volume * 100 + "%";
        musicbtn();
    }

    music_duration.onclick = music_click;
    music_current.onclick = music_click;

    //进度点击切换
    function jindu_click(event) {
        x_end = event.layerX;
        x_dur = jindu_duration.clientWidth;
        x_len = x_end / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
        }
        video.currentTime = x_len * video.duration;
        jindu_cur();
    }

    jindu_duration.onclick = jindu_click;
    jindu_buffer.onclick = jindu_click;
    jindu_current.onclick = jindu_click;

}(window));
