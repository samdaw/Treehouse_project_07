const video = document.querySelector('video');
video.controls = false;
const progressBar = document.getElementById('progress-bar');
const bufferBar = document.getElementById('buffer-bar');
const playButton = document.getElementById('play-pause');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration-time');
const muteButton = document.getElementById('mute');
const fullscreenBtn = document.getElementById('full-screen');
const volumeBar = document.getElementById('volume-bar');
const documentTranscript = document.getElementById('video-transcript');
const videoTranscript=[{start:"0.000",end:"4.130",caption:"Now that we've looked at the architecture of the internet, let's see how you might "},{start:"4.130",end:"7.535",caption:"connect your personal devices to the internet inside your house. "},{start:"7.535",end:"11.270",caption:"Well there are many ways to connect to the internet, and "},{start:"11.270",end:"13.960",caption:"most often people connect wirelessly. "},{start:"13.960",end:"17.940",caption:"Let's look at an example of how you can connect to the internet. "},{start:"17.940",end:"22.370",caption:"If you live in a city or a town, you probably have a coaxial cable for  "},{start:"22.370",end:"26.880",caption:"cable Internet, or a phone line if you have DSL, running to the outside of "},{start:"26.880",end:"30.920",caption:"your house, that connects you to the Internet Service Provider, or ISP. "},{start:"32.100",end:"34.730",caption:"If you live far out in the country, you'll more likely have "},{start:"34.730",end:"00:00:39,430",caption:"a dish outside your house, connecting you wirelessly to your closest ISP, or "},{start:"39.430",end:"00:00:41,190",caption:"you might also use the telephone system. "},{start:"42.350",end:"46.300",caption:"Whether a wire comes straight from the ISP hookup outside your house, or "},{start:"46.300",end:"49.270",caption:"it travels over radio waves from your roof, "},{start:"49.270",end:"53.760",caption:"the first stop a wire will make once inside your house, is at your modem. "},{start:"53.760",end:"57.780",caption:"A modem is what connects the internet to your network at home. "},{start:"57.780",end:"59.150",caption:"A few common residential modems are DSL or"}];

playButton.addEventListener('click', () => {
	if (video.paused == true) {
		video.play();
		playButton.innerHTML = '<img src="img/pause-icon.png" alt="Pause button"/>';
	} else {
		video.pause();
		playButton.innerHTML = '<img src="img/play-icon.png" alt="Play button"/>';
	}
});

muteButton.addEventListener('click', () => {
	if (video.muted == false) {
		video.muted = true;
		muteButton.innerHTML = '<img src="img/volume-off-icon.png" alt="Mute button"/>';
	} else {
		video.muted = false;
		muteButton.innerHTML = '<img src="img/volume-on-icon.png" alt="Loud button"/>';
	}
});

volumeBar.addEventListener('change', () => video.volume = volumeBar.value);

fullscreenBtn.addEventListener('click', () => {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	}
});

const format_time = (sec) => {
	let min = Math.floor(sec / 60);
    min = (min >= 10) ? min : "0" + min;
    sec = Math.floor(sec % 60);
    sec = (sec >= 10) ? sec : "0" + sec;
    return min + ':' + sec;
}

const skip_to_text = (e) => {
	video.currentTime = e.target.id;
	video.play();
}

const prep_transcript = () => {
	for (let i = 0; i < videoTranscript.length; i++) {
		let transText = document.createElement('span');
		transText.innerHTML = videoTranscript[i].caption + ' ';
		transText.setAttribute('id', videoTranscript[i].start);
		documentTranscript.appendChild(transText);
		transText.addEventListener('click', skip_to_text);
	}
}
prep_transcript();

video.addEventListener('loadedmetadata', () => duration.innerHTML = format_time(video.duration));

const videoProgress = (clickTime) => video.currentTime = clickTime / 100 * video.duration;

progressBar.addEventListener('click', function(e) {
  let clickTime = Math.round(e.offsetX / this.offsetWidth * 100);
  videoProgress(clickTime);
});

video.addEventListener('timeupdate', () => {
	let value = (100 / video.duration) * video.currentTime;
	let bufferVal = (100 / video.duration) * video.buffered.end(0);
	progressBar.value = value;
	bufferBar.value = bufferVal;
	currentTime.innerHTML = format_time(video.currentTime);
	for (let i = 0; i < videoTranscript.length; i++) {
		document.getElementById(videoTranscript[i].start).classList.remove('orange');
		if (video.currentTime >= videoTranscript[i].start && video.currentTime <= videoTranscript[i].end) {
			document.getElementById(videoTranscript[i].start).classList.add('orange');
		}
	}
});