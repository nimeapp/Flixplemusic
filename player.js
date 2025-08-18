// player.js
export class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.playlist = [];
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isRepeat = false;
    this.isShuffle = false;

    this.audio.addEventListener('ended', () => this._handleEnded());
    this.audio.addEventListener('timeupdate', () => {
      if (this.onTimeUpdate) this.onTimeUpdate(this.audio.currentTime);
    });
  }

  play(trackUrl) {
    if (trackUrl) {
      this.audio.src = trackUrl;
      this.currentTrack = trackUrl;
    }
    this.audio.play();
    this.isPlaying = true;
    if (this.onPlay) this.onPlay(this.currentTrack);
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    if (this.onPause) this.onPause(this.currentTrack);
  }

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  }

  setVolume(value) {
    this.audio.volume = value;
  }

  seek(time) {
    this.audio.currentTime = time;
  }

  nextTrack() {
    if (!this.playlist.length) return;
    if (this.isShuffle) {
      this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    }
    this.play(this.playlist[this.currentTrackIndex].url);
    if (this.onTrackChange) this.onTrackChange(this.getCurrentTrack());
  }

  prevTrack() {
    if (!this.playlist.length) return;
    if (this.isShuffle) {
      this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    }
    this.play(this.playlist[this.currentTrackIndex].url);
    if (this.onTrackChange) this.onTrackChange(this.getCurrentTrack());
  }

  _handleEnded() {
    if (this.isRepeat) {
      this.audio.currentTime = 0;
      this.play();
    } else {
      this.nextTrack();
    }
  }

  setPlaylist(playlistArray, startIndex = 0) {
    this.playlist = playlistArray;
    this.currentTrackIndex = startIndex;
  }

  getCurrentTrack() {
    return this.playlist[this.currentTrackIndex] || null;
  }

  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
  }
}

export const player = new MusicPlayer();
