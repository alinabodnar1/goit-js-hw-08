import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const STORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(getCurrenTime, 1000));

continuePlaying();

function getCurrenTime(event) {
    
    let currentTime = event.seconds;
       
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTime));
}


function continuePlaying() {

    const savedTime = localStorage.getItem(STORAGE_KEY);

    const parseTime = JSON.parse(savedTime);

    if (parseTime) {
        
        player.setCurrentTime(parseTime).then(function () {

            console.log(`Continue playing from ${parseTime}`);
        });
        
    }
}

