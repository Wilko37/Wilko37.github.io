/*  This script uses the howler.js library
    https://howlerjs.com/
    https://github.com/goldfire/howler.js
    Copyright (c) 2013-2020 James Simpson and GoldFire Studios, Inc.
*/

/*  Create the audio player for each beat page by providing a 
    window.STEM_FILES in each beat page, then maping a new Howl for each
    file.
    This links each pad to each sound (in js array just for now)
    Players[0] is first stem etc...
*/
// Use empty array (no sounds) if file can't load
const players = (window.STEM_FILES || []).map(function(src) {
    return new Howl({
        src: [src],
        loop: true,
        html5: false,
        preload: true,
    });
});

// tracks whether each stem is muted
const mutedStates = players.map(() => true);

// determines whether a track is currently playing
let isPlaying = false;

/* Play all the stems at the same time*/
function playAll() {
    players.forEach((howl, index) => {
        howl.stop();
        howl.mute(mutedStates[index]);
        howl.play();
    });
    isPlaying = true;
}

/*Pause all stems at the same time */
function pauseAll() {
    //.stop instead of .pause to reset every track (for timing purposes)
    players.forEach(howl => howl.stop());
    isPlaying = false;
}

/*  Mutes and unmutes each stem when a pad is clicked.
    This is instead of pausing to ensure all elements are playing at the 
    same time.
 */
function togglePad(index, padEl) {
  const howl = players[index];
  if (!howl) return;

  const nowMuted = !mutedStates[index];
  mutedStates[index] = nowMuted;

  howl.mute(nowMuted);
  padEl.classList.toggle('pad-active', !nowMuted);
}

/*  Wait for the browser to load everything
*/
document.addEventListener('DOMContentLoaded', () => {
    // find all pads in html
    const pads = document.querySelectorAll('.pad-panel .pad');

    // make all pads "active" to start
    players.forEach((howl, index) => howl.mute(mutedStates[index]));
    pads.forEach((pad, index) => {
            pad.classList.toggle('pad-active', !mutedStates[index]);
    });

    // connects pad (in html) to corresponding track
    pads.forEach((pad, index) => {
        pad.addEventListener('click', () => togglePad(index, pad));
    });

    // assign playback buttons to have js scripts
    const buttons = document.querySelectorAll('.player-section-right .player-button');
    const playBtn = buttons[0];
    const pauseBtn = buttons[1];

    playBtn.addEventListener('click', () => {
        if (!isPlaying) playAll();
    });

    pauseBtn.addEventListener('click', () => {
        if (isPlaying) pauseAll();
    });
});