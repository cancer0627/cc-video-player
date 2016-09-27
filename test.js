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
    var music_duration = document.getElementById('music_duration');
    var music_current = document.getElementById('music_current');
    btn_start.onclick = function playpause() {
        if (video1.paused) {
            video1.play();
            btn_start.src = "source/stop.png";
        } else {
            video1.pause();
            btn_start.src = "source/start.png";
        }
    }
    btn_music.onclick = function() {
        if (video1.muted) {
            video1.muted = false;
            btn_music.src = "source/musicup.png";
        } else {
            video1.muted = true;
            btn_music.src = "source/musicdown.png";
        }
    }
    video1.onplay = function() {
        console.log("video play");
        ad1.style.display = "none";
        btn2.style.display = "none";
        btn_start.src = "source/stop.png";
    }
    video1.onpause = function() {
        ad1.style.display = 'initial';
        btn2.style.display = 'initial';
        btn_start.src = "source/start.png";
    }
    btn1.onclick = function() {
        ad1.style.display = "none";
    }
    btn2.onclick=function (){
        video1.play();
    }
}(window))

