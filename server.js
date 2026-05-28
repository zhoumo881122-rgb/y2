const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const root = __dirname;
const port = Number(process.env.PORT || 4290);
const host = process.env.HOST || "127.0.0.1";
const bundledYtdlpPath = path.join(root, "bin", process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp");
const ytdlpPath = process.env.YTDLP_PATH || (fs.existsSync(bundledYtdlpPath) ? bundledYtdlpPath : "yt-dlp");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function resolveFormat(format) {
  const normalized = String(format || "MP4").toUpperCase();

  if (normalized === "MP3") {
    return {
      requested: "MP3",
      selector: "bestaudio[ext=m4a]/bestaudio",
      note: "This endpoint returns the best available audio URL. True MP3 conversion requires ffmpeg and a streaming conversion endpoint."
    };
  }

  if (normalized === "WEBM") {
    return {
      requested: "WEBM",
      selector: "bestvideo[ext=webm]+bestaudio[ext=webm]/best[ext=webm]/best",
      note: ""
    };
  }

  return {
    requested: "MP4",
    selector: "best[ext=mp4]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best",
    note: ""
  };
}

function extractDownloadUrl(videoId, format) {
  const resolved = resolveFormat(format);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return new Promise((resolve, reject) => {
    execFile(
      ytdlpPath,
      ["--no-playlist", "--no-warnings", "--get-url", "-f", resolved.selector, watchUrl],
      { timeout: 45000, maxBuffer: 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error((stderr || error.message || "yt-dlp failed").trim()));
          return;
        }

        const urls = stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        if (!urls.length) {
          reject(new Error("No downloadable URL returned by yt-dlp."));
          return;
        }

        resolve({
          videoId,
          format: resolved.requested,
          note: resolved.note,
          url: urls[0],
          urls,
          watchUrl
        });
      }
    );
  });
}

async function handleDownload(req, res, url) {
  const id = (url.searchParams.get("id") || "").trim();
  const format = (url.searchParams.get("format") || "MP4").trim().toUpperCase();
  const mode = (url.searchParams.get("mode") || "redirect").trim();

  if (!/^[a-zA-Z0-9_-]{6,20}$/.test(id)) {
    sendJson(res, 400, {
      ok: false,
      error: "Invalid YouTube video ID."
    });
    return;
  }

  try {
    const result = await extractDownloadUrl(id, format);

    if (mode === "json") {
      sendJson(res, 200, {
        ok: true,
        id: result.videoId,
        format: result.format,
        url: result.url,
        urls: result.urls,
        watchUrl: result.watchUrl,
        note: result.note
      });
      return;
    }

    res.writeHead(302, {
      Location: result.url,
      "Cache-Control": "no-store"
    });
    res.end();
  } catch (error) {
    sendJson(res, 503, {
      ok: false,
      error: "YouTube download parser is not available on this server.",
      detail: error.message,
      setup: "Install yt-dlp on the server or set YTDLP_PATH to the yt-dlp executable."
    });
  }
}

function serveStatic(req, res, url) {
  const pathname = decodeURIComponent(url.pathname);
  const filePath = path.join(root, pathname === "/" ? "index.html" : pathname);
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;

  if (!filePath.startsWith(rootWithSep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/api/download") {
    handleDownload(req, res, url);
    return;
  }

  serveStatic(req, res, url);
});

server.listen(port, host, () => {
  console.log(`VagaTools server running at http://${host}:${port}/`);
});
