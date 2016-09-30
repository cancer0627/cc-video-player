(function() {
    var video1 = document.getElementById('video1');
    var ad1 = document.getElementById('ad1');
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
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
    var file_button = document.getElementById('file_button');
    var file_list = document.getElementById('file_list');
    var file_btn = document.getElementById('file_btn');
    var add_btn = document.getElementById('add_btn');

    jindu_duration.style.width = '100%';
    music_duration.style.width = "100%";

    file_button.onclick = function() {
        file_list.classList.toggle("hide_file_list");
    }

    /*file_list.onmouseout=function (){
        file_list.classList.toggle("hide_file_list");
    }*/

    add_btn.onclick = function() {
        var file = file_btn.files[0]
        var url = URL.createObjectURL(file);
        console.log(url);
        video1.src = url;
    }

    //开始，暂停，快进
    btn_start.onclick = function playpause() {
        if (video1.paused) {
            video1.play();
            btn_start.src = "source/stop.png";
        } else {
            video1.pause();
            btn_start.src = "source/start.png";
        }
    }

    video1.ondblclick = function playpause() {
        if (video1.paused) {
            video1.play();
            btn_start.src = "source/stop.png";
        } else {
            video1.pause();
            btn_start.src = "source/start.png";
        }
    }

    btn_kuaijin.onclick = function() {
        video1.currentTime += 5;
    }

    btn_kuaitui.onclick = function() {
        video1.currentTime -= 5;
    }

    //有声，无声，增加音量，减小音量
    btn_music_con.onclick = function() {
        if (video1.volume != 0) {
            video1.volume = 0;
            musicbtn();
            music_cur();
        } else {
            video1.volume = 1;
            musicbtn();
            music_cur();
        }
    }

    btn_music_up.onclick = function() {
        if (video1.volume >= 0.9) {
            video1.volume = 1;
        } else {
            video1.volume += 0.1;
        }
        music_cur();
        musicbtn();
    }

    btn_music_down.onclick = function() {
        if (video1.volume <= 0.1) {
            video1.volume = 0;
        } else {
            video1.volume -= 0.1;
        }
        music_cur();
        musicbtn();
    }

    btn_music.onmouseover = function() {
        btn_music_up.style.display = "block";
        btn_music_down.style.display = "block";
        btn_music.style.marginTop = "-60px";
    }

    btn_music.onmouseout = function() {
        btn_music_up.style.display = "none";
        btn_music_down.style.display = "none";
        btn_music.style.marginTop = "0px";
    }

    //视频开始
    video1.onplay = function() {
        console.log("video play");
        ad1.style.display = "none";
        btn2.style.display = "none";
        btn_start.src = "source/stop.png";
    }

    //视频暂停
    video1.onpause = function() {
        ad1.style.display = 'initial';
        btn2.style.display = 'initial';
        btn_start.src = "source/start.png";
    }

    //广告关闭
    btn1.onclick = function() {
        ad1.style.display = "none";
    }

    //开始按钮
    btn2.onclick = function() {
        video1.play();
    }

    //视频加载时
    video1.addEventListener('loadedmetadata', function logg() {
        /*video1.poster = "https://media.w3.org/2010/05/sintel/poster.png";*/
        show_jindu();
        jindu_cur();
        music_cur();
        musicbtn();
        console.log(video1.buffered.start(0));
    })

    //视频播放时
    video1.ontimeupdate = function() {
        show_jindu();
        jindu_cur();
        music_cur();
        musicbtn();
        console.log(video1.buffered.end(0));
    }

    //进度
    function show_jindu() {
        var tim1 = parseInt(video1.currentTime);
        if (tim1 % 60 < 10) {
            tim1 = parseInt(tim1 / 60) + ":0" + tim1 % 60;
        } else {
            tim1 = parseInt(tim1 / 60) + ":" + tim1 % 60;
        }
        var tim2 = parseInt(video1.duration);
        if (tim2 % 60 < 10) {
            tim2 = parseInt(tim2 / 60) + ":0" + tim2 % 60;
        } else {
            tim2 = parseInt(tim2 / 60) + ":" + tim2 % 60;
        }
        jindu.innerHTML = tim1 + "/" + tim2;
    }

    function jindu_cur() {
        jindu_duration.style.width = '100%';
        jindu_buffer.style.left = (video1.buffered.start(0) / video1.duration) * 100 + '%';
        jindu_buffer.style.width = ((video1.buffered.end(0) - video1.buffered.start(0)) / video1.duration) * 100 + '%';
        jindu_current.style.width = (video1.currentTime / video1.duration) * 100 + '%';
    }

    //音量条
    function music_cur() {
        music_duration.style.width = "100%";
        music_current.style.width = (video1.volume * 100) + '%';
    }

    function musicbtn() {
        if (video1.volume > 0.66 && video1.volume <= 1) {
            btn_music_con.src = "source/musicup3.png";
        } else if (video1.volume > 0.33 && video1.volume <= 0.66) {
            btn_music_con.src = "source/musicup2.png";
        } else if (video1.volume > 0 && video1.volume <= 0.33) {
            btn_music_con.src = "source/musicup1.png";
        } else {
            btn_music_con.src = "source/musicdown.png";
        }
    }

    //音量拖动
    var x_sta, x_end, x_cur, x_dur, x_len;

    music_button.ondragstart = function() {
        x_sta = event.clientX;
        x_cur = music_current.clientWidth;
        x_dur = music_duration.clientWidth;
    }

    music_button.ondrag = function(event) {
        x_end = event.clientX;
        x_len = (x_cur - x_sta + x_end) / x_dur;
        if (x_len <= 0) {
            video1.volume = 0;
        } else if (x_len >= 1) {
            video1.volume = 1;
        } else {
            video1.volume = x_len;
        }
        music_current.style.width = video1.volume * 100 + "%";
        musicbtn();
    }

    music_button.ondragend = function(event) {
        x_end = event.clientX;
        x_len = (x_cur - x_sta + x_end) / x_dur;
        if (x_len <= 0) {
            video1.volume = 0;
        } else if (x_len >= 1) {
            video1.volume = 1;
        } else {
            video1.volume = x_len;
        }
        music_current.style.width = video1.volume * 100 + "%";
        musicbtn();
    }

    //音量点击切换
    music_duration.onclick = function(event) {
        x_end = event.layerX;
        x_dur = music_duration.clientWidth;
        x_len = x_end / x_dur;
        if (x_len <= 0) {
            video1.volume = 0;
        } else if (x_len >= 1) {
            video1.volume = 1;
        } else {
            video1.volume = x_len;
        }
        music_current.style.width = video1.volume * 100 + "%";
        musicbtn();
    }

    music_current.onclick = function(event) {
        x_end = event.layerX;
        x_dur = music_duration.clientWidth;
        x_len = x_end / x_dur;
        if (x_len <= 0) {
            video1.volume = 0;
        } else if (x_len >= 1) {
            video1.volume = 1;
        } else {
            video1.volume = x_len;
        }
        music_current.style.width = video1.volume * 100 + "%";
        musicbtn();
    }

    //进度拖动
    jindu_button.ondragstart = function(event) {
        x_sta = event.clientX;
        x_cur = jindu_current.clientWidth;
        x_dur = jindu_duration.clientWidth;
    }

    jindu_button.ondrag = function(event) {
        x_end = event.clientX;
        x_len = (x_cur - x_sta + x_end) / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
            x_len = x_len;
        }
        video1.currentTime = x_len * video1.duration;
        jindu_cur();
    }

    jindu_button.ondragend = function(event) {
        x_end = event.clientX;
        x_len = (x_cur - x_sta + x_end) / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
            x_len = x_len;
        }
        video1.currentTime = x_len * video1.duration;
        jindu_cur();
    }

    //进度点击切换
    jindu_duration.onclick = function(event) {
        x_end = event.layerX;
        x_dur = jindu_duration.clientWidth;
        x_len = x_end / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
            x_len = x_len;
        }
        video1.currentTime = x_len * video1.duration;
        jindu_cur();
    }

    jindu_buffer.onclick = function(event) {
        x_end = event.layerX;
        x_dur = jindu_duration.clientWidth;
        x_len = x_end / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
            x_len = x_len;
        }
        video1.currentTime = x_len * video1.duration;
        jindu_cur();
    }

    jindu_current.onclick = function(event) {
        x_end = event.layerX;
        x_dur = jindu_duration.clientWidth;
        x_len = x_end / x_dur;
        if (x_len <= 0) {
            x_len = 0;
        } else if (x_len >= 1) {
            x_len = 1;
        } else {
            x_len = x_len;
        }
        video1.currentTime = x_len * video1.duration;
        jindu_cur();
    }

}(window))
