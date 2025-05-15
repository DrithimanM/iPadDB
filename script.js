// Live Clock - updates every second
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}, 1000);

// NDTV 24x7 RSS Feed URL for ticker
const rssUrl = "https://feeds.feedburner.com/ndtvnews-top-stories";

async function loadNews() {
  try {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        rssUrl
      )}`
    );
    const data = await response.json();
    const headlines = data.items.map((item) => item.title);
    const tickerText = headlines.join(" ⚫ ");
    document.getElementById("newsTicker").innerHTML = `<div class="ticker-text">${tickerText}</div>`;
  } catch {
    document.getElementById("newsTicker").innerText =
      "Unable to load NDTV headlines...";
  }
}

loadNews();
setInterval(loadNews, 10 * 60 * 1000); // refresh every 10 minutes

const stationUrls = {
  bbc: { type: "audio", src: "http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk" },
  ndtv: { type: "audio", src: "http://ndtvradio.cdn.tatacommunications.com/ndtv/ndtv_24x7_64k" },
  "tunein-us": { type: "iframe", src: "https://tunestream.net/player/cnn/" },
  "tunein-uk": { type: "iframe", src: "https://tunestream.net/player/bbc-news/" },
  "tunein-india": { type: "iframe", src: "https://tunestream.net/player/aa-times-of-india/" },
  "tunein-uae": { type: "iframe", src: "https://tunestream.net/player/gulf-news-uae/" },
};

const selector = document.getElementById("stationSelector");
const playerContainer = document.querySelector(".player-container");

function createAudioPlayer(src) {
  const audio = document.createElement("audio");
  audio.id = "radioPlayer";
  audio.controls = true;
  audio.autoplay = true;
  audio.src = src;
  audio.style.width = "100%";
  audio.style.height = "60px";
  return audio;
}

function createIframePlayer(src) {
  const iframe = document.createElement("iframe");
  iframe.id = "radioPlayer";
  iframe.width = "100%";
  iframe.height = "90";
  iframe.frameBorder = "0";
  iframe.src = src;
  iframe.style.display = "block";
  iframe.allowFullscreen = true;
  return iframe;
}

selector.addEventListener("change", (e) => {
  const selected = e.target.value;
  const station = stationUrls[selected];

  // Remove existing player
  const oldPlayer = document.getElementById("radioPlayer");
  if (oldPlayer) oldPlayer.remove();

  if (!station) return;

  let newPlayer;
  if (station.type === "audio") {
    newPlayer = createAudioPlayer(station.src);
  } else if (station.type === "iframe") {
    newPlayer = createIframePlayer(station.src);
  }

  playerContainer.appendChild(newPlayer);
});
