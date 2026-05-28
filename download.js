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

if (validId) {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const apiUrl = `/api/download?id=${encodeURIComponent(id)}&format=${encodeURIComponent(safeFormat)}`;

  videoId.textContent = id;
  videoFormat.textContent = safeFormat;
  thumb.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  thumb.alt = `YouTube video ${id}`;
  originalLink.href = watchUrl;
  backendLink.href = apiUrl;
} else {
  videoId.textContent = "Invalid video ID";
  videoFormat.textContent = safeFormat;
  backendLink.removeAttribute("href");
  originalLink.removeAttribute("href");
}
