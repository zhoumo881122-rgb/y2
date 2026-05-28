const params = new URLSearchParams(window.location.search);
const id = (params.get("id") || "").trim();
const format = (params.get("format") || "MP4").trim().toUpperCase();
const validId = /^[a-zA-Z0-9_-]{6,20}$/.test(id);
const safeFormat = ["MP4", "MP3", "WEBM"].includes(format) ? format : "MP4";

const videoId = document.querySelector("#downloadVideoId");
const videoFormat = document.querySelector("#downloadFormat");
const thumb = document.querySelector("#downloadThumb");
const originalLink = document.querySelector("#originalLink");
const backendLink = document.querySelector("#backendLink");
const directDownloadLink = document.querySelector("#directDownloadLink");
const downloadStatus = document.querySelector("#downloadStatus");

if (validId) {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const apiUrl = `/api/download?id=${encodeURIComponent(id)}&format=${encodeURIComponent(safeFormat)}`;
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
      const data = await response.json();

      if (!response.ok || !data.ok || !data.url) {
        throw new Error(data.detail || data.error || "Parser failed.");
      }

      directDownloadLink.href = data.url;
      directDownloadLink.hidden = false;
      downloadStatus.textContent = "Download link parsed. Click the new download link before it expires.";
      backendLink.disabled = false;
    } catch (error) {
      downloadStatus.textContent = `Parser unavailable: ${error.message}. Deploy with server.js and install yt-dlp, then this button will return the real temporary YouTube file URL.`;
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
