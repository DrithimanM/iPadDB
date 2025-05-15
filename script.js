// Live Clock
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}, 1000);

// News Ticker via RSS Feed
async function loadNews() {
  try {
    const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml");
    const data = await res.json();
    const headlines = data.items.map(item => item.title).join(" ⚫ ");
    document.getElementById("newsTicker").innerText = headlines;
  } catch {
    document.getElementById("newsTicker").innerText = "Unable to load news...";
  }
}

loadNews();
setInterval(loadNews, 600000); // update every 10 minutes
