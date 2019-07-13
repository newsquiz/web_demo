<template>
  <!-- Based on https://github.com/wilsonwu/vuetify-audio/blob/master/src/vuetifyaudio.vue -->
  <v-card color="transparent" dark
    class="text-xs-center player">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 style="margin-top: -30px">
          <v-progress-linear color="accent"
            @change="setPosition"
            v-model="percentage"
            :disabled="!loaded"
            height="5"
          ></v-progress-linear>
        </v-flex>

        <v-flex xs12 style="margin-top: -10px">
          <v-btn outline icon :color="color" @click.native="rewind()" :disabled="!loaded">
            <v-icon>mdi-rewind-outline</v-icon>
          </v-btn>

          <v-tooltip top>
            <v-btn
              outline
              icon
              :color="color"
              slot="activator"
              @click.native="playing ? pause() : play()"
              :disabled="!loaded"
            >
              <v-icon v-if="!playing || paused">mdi-play</v-icon>
              <v-icon v-else>mdi-pause</v-icon>
            </v-btn>
            <span>{{ currentTime }} / {{ duration }}</span>
          </v-tooltip>

          <v-btn outline icon :color="color" @click.native="fastForward()" :disabled="!loaded">
            <v-icon>mdi-fast-forward-outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
    <audio id="player" ref="player" v-on:ended="ended" v-on:canplay="canPlay" :src="file"></audio>
  </v-card>
</template>
<script>
const formatTime = second =>
  new Date(second * 1000).toISOString().substr(11, 8);
export default {
  name: "vuetify-audio",
  props: {
    file: {
      type: String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    ended: {
      type: Function,
      default: () => {}
    },
    canPlay: {
      type: Function,
      default: () => {}
    },
    color: {
      default: 'white'
    }
  },
  computed: {
    duration: function() {
      return this.audio ? formatTime(this.totalDuration) : "";
    }
  },
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: "00:00:00",
      audio: undefined,
      totalDuration: 0,
      playbackRate: 1.0,
      speedLabels: [
        { text: "Chậm", value: 0.7 },
        { text: "Bình thường", value: 1.0 },
        { text: "Nhanh", value: 1.4 }
      ]
    };
  },
  watch: {
    playbackRate(newVal) {
      var player = document.getElementById("player");
      player.playbackRate = newVal;
    }
  },
  methods: {
    setPosition(value) {
      var iv = parseInt(value);
      this.audio.currentTime = (this.totalDuration / 100) * iv;
    },
    fastForward() {
      this.audio.currentTime = Math.min(this.audio.currentTime + 5, this.totalDuration)
    },
    rewind() {
      this.audio.currentTime = Math.max(this.audio.currentTime - 5, 0)
    },
    stop() {
      this.paused = this.playing = false;
      this.audio.pause();
      this.audio.currentTime = 0;
    },
    play() {
      if (this.playing) return;
      this.paused = false;
      this.audio.play().then(_ => (this.playing = true));
    },
    pause() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    download() {
      this.audio.pause();
      window.open(this.file, "download");
    },
    mute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      this.volumeValue = this.isMuted ? 0 : 75;
    },
    reload() {
      this.audio.load();
    },
    _handleLoaded: function() {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          // Fix duration for streamed audio source or blob based
          // https://stackoverflow.com/questions/38443084/how-can-i-add-predefined-length-to-audio-recorded-from-mediarecorder-in-chrome/39971175#39971175
          this.audio.currentTime = 1e101;
          this.audio.ontimeupdate = () => {
            this.audio.ontimeupdate = () => {};
            this.audio.currentTime = 0;
            this.totalDuration = parseInt(this.audio.duration);
            this.loaded = true;
          };
        } else {
          this.totalDuration = parseInt(this.audio.duration);
          this.loaded = true;
        }
        if (this.autoPlay) this.audio.play();
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayingUI: function(e) {
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = formatTime(this.audio.currentTime);
    },
    _handlePlayPause: function(e) {
      if (e.type === "play" && this.firstPlay) {
        // in some situations, audio.currentTime is the end one on chrome
        this.audio.currentTime = 0;
        if (this.firstPlay) {
          this.firstPlay = false;
        }
      }
      if (
        e.type === "pause" &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = "00:00:00";
      }
      if (e.type == "play") {
        this.playing = true;
      }
      if (e.type == "pause") {
        this.playing = false;
      }
    },
    _handleEnded() {
      this.paused = this.playing = false;
    },
    init: function() {
      this.audio.addEventListener("timeupdate", this._handlePlayingUI);
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
      this.audio.addEventListener("ended", this._handleEnded);
    }
  },
  mounted() {
    this.audio = this.$refs.player;
    this.init();
    var player = document.getElementById("player");
    player.playbackRate = this.playbackRate;
  },
  beforeDestroy() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  }
};
</script>

<style scoped>
.player {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

