// Live Clock - updates every second
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}, 1000);

// NDTV 24x7 RSS Feed URL for ticker
const rssUrl = "https://feeds.feedburner.com/ndtvnews-top-stories";

// Load news headlines for ticker and update every 10 minutes
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
setInterval(loadNews, 10 * 60 * 1000); // refresh every 10 minutes

// Map station keys to embed URLs
const stationUrls = {
  bbc: "https://tunestream.net/player/bbc-world-service/",
  ndtv: "https://tunestream.net/player/ndtv-24x7/",
  "tunein-us": "https://tunein.com/embed/player/s24953/",    // CNN US
  "tunein-uk": "https://tunein.com/embed/player/s27588/",    // BBC News UK
  "tunein-india": "https://tunein.com/embed/player/s26657/", // Times of India
  "tunein-uae": "https://tunein.com/embed/player/s32810/",   // Gulf News UAE
};

let radioPlayer = document.getElementById("radioPlayer");
const selector = document.getElementById("stationSelector");

// When user changes station selection
selector.addEventListener("change", (e) => {
  const selected = e.target.value;
  const newSrc = stationUrls[selected];

  // Create a new iframe to force reload on iOS Safari
  const newIframe = document.createElement("iframe");
  newIframe.id = "radioPlayer";
  newIframe.width = "100%";
  newIframe.height = "90";
  newIframe.frameBorder = "0";
  newIframe.src = newSrc;
  newIframe.style.display = "block";
  newIframe.allowFullscreen = true;

  // Enable autoplay only for NDTV station
  if(selected === "ndtv") {
    newIframe.setAttribute("allow", "autoplay");
  } else {
    newIframe.removeAttribute("allow");
  }

  // Replace the old iframe with the new one
  radioPlayer.parentNode.replaceChild(newIframe, radioPlayer);
  radioPlayer = newIframe;
});
