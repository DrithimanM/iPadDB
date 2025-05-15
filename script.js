// Live Clock
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}, 1000);

// NDTV 24x7 RSS Feed for ticker (only NDTV to keep simple)
const rssUrl = "https://feeds.feedburner.com/ndtvnews-top-stories";

async function loadNews() {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();
    const headlines = data.items.map(item => item.title);
    const tickerText = headlines.join(" ⚫ ");
    document.getElementById("newsTicker").innerHTML = `<div class="ticker-text">${tickerText}</div>`;
  } catch {
    document.getElementById("newsTicker").innerText = "Unable to load NDTV headlines...";
  }
}

loadNews();
setInterval(loadNews, 10 * 60 * 1000);

// Station URLs mapping
const stationUrls = {
  bbc: "https://tunestream.net/player/bbc-world-service/",
  ndtv: "https://tunestream.net/player/ndtv-24x7/",
  "tunein-us": "https://tunein.com/embed/player/s24953/",    // CNN US
  "tunein-uk": "https://tunein.com/embed/player/s27588/",    // BBC News UK
  "tunein-india": "https://tunein.com/embed/player/s26657/", // Times of India
  "tunein-uae": "https://tunein.com/embed/player/s32810/",   // Gulf News UAE
};

const radioPlayer = document.getElementById("radioPlayer");
const selector = document.getElementById("stationSelector");

selector.addEventListener("change", (e) => {
  const selected = e.target.value;
  radioPlayer.src = stationUrls[selected];
  
  // Control autoplay for NDTV only
  if(selected === "ndtv"){
    radioPlayer.setAttribute("allow", "autoplay");
  } else {
    radioPlayer.removeAttribute("allow");
  }
});
