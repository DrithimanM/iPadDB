// Live Clock
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}, 1000);

// List of RSS feed URLs
const rssFeeds = [
  // India
  "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
  "https://www.thehindu.com/news/national/feeder/default.rss",

  // USA
  "https://rss.cnn.com/rss/edition.rss",
  "https://www.npr.org/rss/rss.php?id=1001",

  // Europe
  "https://feeds.bbci.co.uk/news/world/europe/rss.xml",
  "https://www.reuters.com/rssFeed/worldNews",

  // UAE
  "https://www.khaleejtimes.com/rss",
  "https://gulfnews.com/rss"
];

async function fetchFeed(rssUrl) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();
    return data.items.map(item => item.title);
  } catch (error) {
    console.error(`Error loading ${rssUrl}:`, error);
    return [];
  }
}

async function loadNews() {
  try {
    const allHeadlines = (await Promise.all(rssFeeds.map(fetchFeed))).flat();
    const uniqueHeadlines = [...new Set(allHeadlines)].slice(0, 50); // Limit to 50 unique headlines
    const tickerText = uniqueHeadlines.join(" ⚫ ");
    document.getElementById("newsTicker").innerHTML = `<div class="ticker-text">${tickerText}</div>`;
  } catch {
    document.getElementById("newsTicker").innerText = "Unable to load news...";
  }
}

// Initial load + refresh every 10 minutes
loadNews();
setInterval(loadNews, 10 * 60 * 1000);
