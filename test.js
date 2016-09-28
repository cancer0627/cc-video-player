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

    //有声，无声
    btn_music_con.onclick = function() {
        if (video1.muted) {
            video1.muted = false;
            btn_music_con.src = "source/musicup1.png";
        } else {
            video1.muted = true;
            btn_music_con.src = "source/musicdown.png";
        }
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
        video1.poster = "source/video1.jpg";
        show_jindu();
        jindu_cur();
        music_cur();
        musicbtn();
    })

    //视频播放时
    video1.ontimeupdate = function() {
        show_jindu();
        jindu_cur();
        music_cur();
        musicbtn();
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
        jindu_buffer.style.width = ((video1.buffered.length + video1.currentTime) / video1.duration) * 100 + '%';
        jindu_current.style.width = (video1.currentTime / video1.duration) * 100 + '%';
    }

    //音量条
    function music_cur() {
        music_duration.style.width = "100%";
        music_current.style.width = (video1.volume * 100) + '%';
    }

    //音量进度
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

    btn_music_up.onclick = function() {
        if (video1.volume >= 0.9) {
            video1.volume = 1;
        } else {
            video1.volume += 0.1;
        }
    }

    btn_music_down.onclick = function() {
        if (video1.volume <= 0.1) {
            video1.volume = 0;
        } else {
            video1.volume -= 0.1;
        }
    }

    //音量拖放
    video1.onvolumechange = function() {};
    var x1, x2, xz, xzz, x;

    music_button.ondragstart = function(event) {
        x1 = event.clientX;
        xz = music_current.clientWidth;
        xzz = music_duration.clientWidth;

        /*console.log(event.clientX);
        console.log(music_current.offsetLeft);
        console.log(music_current.clientWidth);*/

    }

    /*music_button.ondragleave = function(event) {
        console.log(event.clientX);
    }*/

    music_button.ondragend = function(event) {
        x2 = event.clientX;
        x = (xz - x1 + x2) / xzz;
        if (x <= 0) {
            video1.volume = 0;
        } else if (x >= 1) {
            video1.volume = 1;
        } else {
            video1.volume = x;
        }
        music_current.style.width = video1.volume * 100 + "%";
        musicbtn();

        /*console.log(event.clientX);
        console.log(video1.volume);*/

    }

}(window))
