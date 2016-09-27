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
    var btn_music = document.getElementById('btn_music');
    var music_tiao = document.getElementById('music_tiao');
    var music_duration = document.getElementById('music_duration');
    var music_current = document.getElementById('music_current');
    //开始，暂停
    btn_start.onclick = function playpause() {
            if (video1.paused) {
                video1.play();
                btn_start.src = "source/stop.png";
            } else {
                video1.pause();
                btn_start.src = "source/start.png";
            }
        }
        //有声，无声
    btn_music.onclick = function() {
            if (video1.muted) {
                video1.muted = false;
                btn_music.src = "source/musicup.png";
            } else {
                video1.muted = true;
                btn_music.src = "source/musicdown.png";
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
        console.log('loadedmetadata');
        video1.poster = "source/video1.jpg";
        show_jindu();
        jindu_cur();
        music_cur();
    });
    //视频播放时
    video1.ontimeupdate = function() {
        show_jindu();
        jindu_cur();
        music_cur();
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
        jindu_duration.style.width ='100%';
        jindu_buffer.style.width = ((video1.buffered.length + video1.currentTime) / video1.duration) * 100 + '%';
        jindu_current.style.width = (video1.currentTime / video1.duration) * 100 + '%';
    }
    //音量条
function music_cur(){
    console.log(video1.volume);
    music_duration.style.width = "100%";
    music_current.style.width = (video1.volume* 100 )+ '%';
}

}(window))
