// Live Clock
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}, 1000);

// NDTV 24x7 RSS Feed
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

// Initial load + refresh every 10 minutes
loadNews();
setInterval(loadNews, 10 * 60 * 1000);
