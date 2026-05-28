const params = new URLSearchParams(window.location.search);
const rawUrl = (params.get("url") || "").trim();
const rawId = (params.get("id") || "").trim();
const format = (params.get("format") || "MP4").trim().toUpperCase();
const id = rawId || parseYouTubeId(rawUrl);
const validId = /^[a-zA-Z0-9_-]{6,20}$/.test(id);
const safeFormat = ["MP4", "MP3", "WEBM"].includes(format) ? format : "MP4";
const metaApiBase = document.querySelector('meta[name="vagatools-api-base"]')?.content || "";
const apiBase = (metaApiBase || window.VAGATOOLS_CONFIG?.API_BASE || "").replace(/\/$/, "");

function parseYouTubeId(value) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "").replace(/^m\./, "");

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (host === "youtube.com" || host === "music.youtube.com" || host === "youtube-nocookie.com") {
      const parts = url.pathname.split("/").filter(Boolean);

      if (url.pathname === "/watch") {
        return url.searchParams.get("v") || "";
      }

      if (["shorts", "embed", "live", "v"].includes(parts[0])) {
        return parts[1] || "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

const videoId = document.querySelector("#downloadVideoId");
const videoFormat = document.querySelector("#downloadFormat");
const thumb = document.querySelector("#downloadThumb");
const originalLink = document.querySelector("#originalLink");
const backendLink = document.querySelector("#backendLink");
const directDownloadLink = document.querySelector("#directDownloadLink");
const downloadStatus = document.querySelector("#downloadStatus");

if (validId) {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const apiUrl = `${apiBase}/api/download?id=${encodeURIComponent(id)}&format=${encodeURIComponent(safeFormat)}`;
  const jsonApiUrl = `${apiUrl}&mode=json`;

  videoId.textContent = id;
  videoFormat.textContent = safeFormat;
  thumb.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  thumb.alt = `YouTube video ${id}`;
  originalLink.href = watchUrl;
  backendLink.dataset.apiUrl = apiUrl;
  backendLink.addEventListener("click", async () => {
    downloadStatus.textContent = "Parsing YouTube download link...";
    backendLink.disabled = true;

    try {
      const response = await fetch(jsonApiUrl, { cache: "no-store" });
      const contentType = response.headers.get("content-type") || "";
      const responseText = await response.text();

      if (!contentType.includes("application/json")) {
        throw new Error(`API returned ${contentType || "non-JSON"} instead of JSON. GitHub Pages cannot run the parser. Set API_BASE in config.js to your deployed backend URL.`);
      }

      const data = JSON.parse(responseText);

      if (!response.ok || !data.ok || !data.url) {
        throw new Error(data.detail || data.error || "Parser failed.");
      }

      directDownloadLink.href = data.url;
      directDownloadLink.hidden = false;
      downloadStatus.textContent = "Download link parsed. Click the new download link before it expires.";
      backendLink.disabled = false;
    } catch (error) {
      downloadStatus.textContent = `Parser unavailable: ${error.message}`;
      backendLink.disabled = false;
    }
  });
} else {
  videoId.textContent = "Invalid video ID";
  videoFormat.textContent = safeFormat;
  backendLink.disabled = true;
  directDownloadLink.hidden = true;
  originalLink.removeAttribute("href");
  downloadStatus.textContent = "Invalid video ID. Please go back and parse a valid YouTube link.";
}
