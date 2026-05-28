const form = document.querySelector("#converterForm");
const input = document.querySelector("#videoUrl");
const status = document.querySelector("#status");
const year = document.querySelector("#year");
const languageSelect = document.querySelector("#languageSelect");
const videoResult = document.querySelector("#videoResult");
const videoThumb = document.querySelector("#videoThumb");
const videoId = document.querySelector("#videoId");
const videoFormat = document.querySelector("#videoFormat");
const videoOpenLink = document.querySelector("#videoOpenLink");

const translations = {
  en: {
    title: "YouTube Video Downloader - Download YouTube Videos to MP4 & MP3 | VagaTools",
    description: "Free YouTube video downloader for preparing YouTube to MP4 and YouTube to MP3 conversions. Paste a YouTube link and use VagaTools on mobile or desktop.",
    primaryNav: "Primary navigation",
    navFormats: "Formats",
    navKeywords: "Keywords",
    navHow: "How it works",
    navFaq: "FAQ",
    languageLabel: "Language",
    eyebrow: "Free YouTube video downloader",
    heroTitle: "YouTube Video Downloader",
    heroIntro: "Paste a YouTube link to prepare YouTube to MP4 or YouTube to MP3 conversions in a clean, fast, mobile-friendly tool.",
    urlLabel: "Video URL",
    urlPlaceholder: "Paste your YouTube video link here",
    startButton: "Start",
    formatAria: "Choose output format",
    mp4: "MP4 Video",
    mp3: "MP3 Audio",
    adAria: "Advertisement",
    adLabel: "Advertisement",
    formatsTitle: "Supported Output Formats",
    mp4CardTitle: "MP4 video",
    keywordsTitle: "Popular YouTube Downloader Searches",
    keywordsIntro: "VagaTools is optimized around common search intent for YouTube video downloads, online YouTube converters, and YouTube to MP4 or MP3 workflows.",
    keywordsAria: "YouTube downloader keywords",
    keyword1: "YouTube video downloader",
    keyword2: "download YouTube videos",
    keyword3: "YouTube to MP4",
    keyword4: "YouTube to MP3",
    keyword5: "YouTube downloader online",
    keyword6: "free YouTube converter",
    keyword7: "save YouTube video",
    keyword8: "YouTube Shorts download",
    mp4CardText: "Useful for YouTube to MP4 playback on phones, computers, and tablets.",
    mp3CardTitle: "MP3 audio",
    mp3CardText: "Prepare YouTube to MP3 audio-only files for personal listening and permitted reuse.",
    webmCardText: "A web-friendly format for modern browsers and lightweight sharing.",
    howTitle: "How It Works",
    howIntro: "VagaTools keeps the YouTube downloader workflow direct: paste a link, choose MP4 or MP3, and continue with your conversion flow.",
    step1: "Copy the YouTube URL of content you own or have permission to download.",
    step2: "Paste the YouTube link into the input box above.",
    step3: "Select MP4, MP3, or WEBM and start the conversion.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Is this YouTube video downloader free?",
    faq1A: "Yes. This page is built for a free web-based YouTube downloader and converter experience.",
    faq2Q: "Does it work on mobile?",
    faq2A: "Yes. The layout is responsive and designed for modern mobile and desktop browsers.",
    faq3Q: "Can I download any YouTube video?",
    faq3A: "Only download YouTube videos you own, created, or have permission to save. Respect the rights of creators and each platform's terms.",
    copyright: "Copyright",
    footerNote: "Use this tool only for content you are allowed to download.",
    footerNav: "Footer navigation",
    footerHome: "Home",
    footerContact: "Contact",
    success: "Ready to process {format}. Connect this form to your converter API when the backend is available.",
    error: "Please paste a valid video URL that starts with http or https.",
    parseError: "This link could not be parsed. Please paste a valid YouTube watch, Shorts, embed, or youtu.be link.",
    resultTitle: "YouTube video parsed",
    resultIdLabel: "Video ID:",
    resultFormatLabel: "Format:",
    resultOpenLabel: "Open original YouTube link",
    resultHint: "Frontend parsing is ready. Connect a compliant backend API to fetch available formats and create download links."
  },
  zh: {
    title: "YouTube 视频下载器 - YouTube 下载视频 MP4/MP3 在线工具 | VagaTools",
    description: "免费 YouTube 视频下载器，支持 YouTube to MP4、YouTube to MP3 相关转换流程。粘贴 YouTube 链接即可在手机或电脑上使用。",
    primaryNav: "主导航",
    navFormats: "格式",
    navKeywords: "关键词",
    navHow: "使用方法",
    navFaq: "常见问题",
    languageLabel: "语言",
    eyebrow: "免费 YouTube 视频下载器",
    heroTitle: "YouTube 视频下载器",
    heroIntro: "粘贴 YouTube 链接，快速准备 YouTube to MP4 或 YouTube to MP3 转换，界面简洁，手机和电脑都好用。",
    urlLabel: "YouTube 视频链接",
    urlPlaceholder: "在这里粘贴 YouTube 视频链接",
    startButton: "开始",
    formatAria: "选择输出格式",
    mp4: "MP4 视频",
    mp3: "MP3 音频",
    adAria: "广告",
    adLabel: "广告",
    formatsTitle: "支持的输出格式",
    mp4CardTitle: "MP4 视频",
    keywordsTitle: "热门 YouTube 下载关键词",
    keywordsIntro: "页面围绕 YouTube 下载视频、YouTube 在线下载、YouTube to MP4、YouTube to MP3 等常见搜索意图进行优化。",
    keywordsAria: "YouTube 下载关键词",
    keyword1: "YouTube 视频下载器",
    keyword2: "YouTube 下载视频",
    keyword3: "YouTube to MP4",
    keyword4: "YouTube to MP3",
    keyword5: "YouTube 在线下载",
    keyword6: "免费 YouTube 转换器",
    keyword7: "保存 YouTube 视频",
    keyword8: "YouTube Shorts 下载",
    mp4CardText: "适合 YouTube to MP4 后在手机、电脑和平板上播放。",
    mp3CardTitle: "MP3 音频",
    mp3CardText: "适合 YouTube to MP3 音频提取，用于个人收听或已获授权的用途。",
    webmCardText: "适合现代浏览器播放和轻量网页分享。",
    howTitle: "使用方法",
    howIntro: "VagaTools 保持 YouTube 下载流程直接：粘贴链接，选择 MP4 或 MP3，然后继续转换。",
    step1: "复制你拥有或有权下载的 YouTube 内容链接。",
    step2: "把 YouTube 链接粘贴到上方输入框。",
    step3: "选择 MP4、MP3 或 WEBM，然后开始转换。",
    faqTitle: "常见问题",
    faq1Q: "这个 YouTube 视频下载器免费吗？",
    faq1A: "是的。这个页面面向免费的 YouTube 网页下载和转换体验。",
    faq2Q: "手机上可以使用吗？",
    faq2A: "可以。页面是响应式布局，适合现代手机和桌面浏览器。",
    faq3Q: "可以下载任何 YouTube 视频吗？",
    faq3A: "请只下载你拥有、自己创建或获得授权保存的 YouTube 视频，并遵守平台规则和创作者权益。",
    copyright: "版权所有",
    footerNote: "请仅用于你有权下载的内容。",
    footerNav: "页脚导航",
    footerHome: "首页",
    footerContact: "联系",
    success: "已准备处理 {format}。后端接口完成后，可把这个表单接入转换 API。",
    error: "请粘贴以 http 或 https 开头的有效视频链接。",
    parseError: "无法解析这个链接。请粘贴有效的 YouTube watch、Shorts、embed 或 youtu.be 链接。",
    resultTitle: "YouTube 视频解析成功",
    resultIdLabel: "视频 ID：",
    resultFormatLabel: "格式：",
    resultOpenLabel: "打开原始 YouTube 链接",
    resultHint: "前端解析已完成。要生成真实下载链接，需要接入合规的后端解析和转码 API。"
  },
  ja: {
    title: "VagaTools 動画ダウンローダー - 無料オンライン変換",
    description: "動画リンクを貼り付けて、VagaTools で素早くオンライン変換を準備できます。",
    navFormats: "形式",
    navHow: "使い方",
    navFaq: "FAQ",
    languageLabel: "言語",
    eyebrow: "無料オンライン動画変換",
    heroTitle: "動画ダウンローダー",
    heroIntro: "動画リンクを貼り付けて、MP4 または MP3 変換をすばやく準備できます。",
    urlLabel: "動画 URL",
    urlPlaceholder: "ここに動画リンクを貼り付け",
    startButton: "開始",
    mp4: "MP4 動画",
    mp3: "MP3 音声",
    adLabel: "広告",
    formatsTitle: "対応形式",
    howTitle: "使い方",
    faqTitle: "よくある質問",
    footerHome: "ホーム",
    footerContact: "お問い合わせ",
    success: "{format} の処理準備ができました。バックエンド完成後に変換 API へ接続できます。",
    error: "http または https で始まる有効な動画 URL を入力してください。"
  },
  ko: {
    title: "VagaTools 동영상 다운로더 - 무료 온라인 변환기",
    description: "동영상 링크를 붙여넣고 VagaTools에서 빠른 온라인 변환을 준비하세요.",
    navFormats: "형식",
    navHow: "사용 방법",
    navFaq: "FAQ",
    languageLabel: "언어",
    eyebrow: "무료 온라인 동영상 변환기",
    heroTitle: "동영상 다운로더",
    heroIntro: "동영상 링크를 붙여넣어 MP4 또는 MP3 변환을 간단하게 준비하세요.",
    urlLabel: "동영상 URL",
    urlPlaceholder: "여기에 동영상 링크 붙여넣기",
    startButton: "시작",
    mp4: "MP4 동영상",
    mp3: "MP3 오디오",
    adLabel: "광고",
    formatsTitle: "지원 출력 형식",
    howTitle: "사용 방법",
    faqTitle: "자주 묻는 질문",
    footerHome: "홈",
    footerContact: "문의",
    success: "{format} 처리를 준비했습니다. 백엔드가 준비되면 변환 API에 연결하세요.",
    error: "http 또는 https로 시작하는 올바른 동영상 URL을 입력하세요."
  },
  fr: {
    title: "VagaTools Téléchargeur Vidéo - Convertisseur en ligne gratuit",
    description: "Collez un lien vidéo et préparez des conversions rapides avec VagaTools.",
    navFormats: "Formats",
    navHow: "Mode d'emploi",
    navFaq: "FAQ",
    languageLabel: "Langue",
    eyebrow: "Convertisseur vidéo en ligne gratuit",
    heroTitle: "Téléchargeur vidéo",
    heroIntro: "Collez un lien vidéo pour préparer une conversion MP4 ou MP3 simple et rapide.",
    urlLabel: "URL de la vidéo",
    urlPlaceholder: "Collez votre lien vidéo ici",
    startButton: "Démarrer",
    adLabel: "Publicité",
    formatsTitle: "Formats pris en charge",
    howTitle: "Fonctionnement",
    faqTitle: "Questions fréquentes",
    footerHome: "Accueil",
    footerContact: "Contact",
    success: "{format} est prêt à être traité. Connectez ce formulaire à votre API de conversion.",
    error: "Collez une URL vidéo valide commençant par http ou https."
  },
  de: {
    title: "VagaTools Video Downloader - Kostenloser Online-Konverter",
    description: "Füge einen Videolink ein und bereite schnelle Online-Konvertierungen mit VagaTools vor.",
    navFormats: "Formate",
    navHow: "So geht's",
    navFaq: "FAQ",
    languageLabel: "Sprache",
    eyebrow: "Kostenloser Online-Video-Konverter",
    heroTitle: "Video Downloader",
    heroIntro: "Füge einen Videolink ein, um MP4- oder MP3-Konvertierungen schnell vorzubereiten.",
    urlLabel: "Video-URL",
    urlPlaceholder: "Videolink hier einfügen",
    startButton: "Start",
    adLabel: "Anzeige",
    formatsTitle: "Unterstützte Formate",
    howTitle: "So funktioniert es",
    faqTitle: "Häufige Fragen",
    footerHome: "Startseite",
    footerContact: "Kontakt",
    success: "{format} ist bereit. Verbinde dieses Formular mit deiner Konvertierungs-API.",
    error: "Bitte füge eine gültige Video-URL ein, die mit http oder https beginnt."
  },
  es: {
    title: "VagaTools Descargador de Videos - Convertidor online gratis",
    description: "Pega un enlace de video y prepara conversiones rápidas en línea con VagaTools.",
    navFormats: "Formatos",
    navHow: "Cómo funciona",
    navFaq: "FAQ",
    languageLabel: "Idioma",
    eyebrow: "Convertidor de video online gratis",
    heroTitle: "Descargador de videos",
    heroIntro: "Pega un enlace de video para preparar conversiones MP4 o MP3 de forma rápida y sencilla.",
    urlLabel: "URL del video",
    urlPlaceholder: "Pega aquí tu enlace de video",
    startButton: "Empezar",
    adLabel: "Anuncio",
    formatsTitle: "Formatos compatibles",
    howTitle: "Cómo funciona",
    faqTitle: "Preguntas frecuentes",
    footerHome: "Inicio",
    footerContact: "Contacto",
    success: "{format} está listo para procesarse. Conecta este formulario a tu API de conversión.",
    error: "Pega una URL de video válida que empiece por http o https."
  },
  pt: {
    title: "VagaTools Baixador de Vídeos - Conversor online grátis",
    description: "Cole um link de vídeo e prepare conversões online rápidas com o VagaTools.",
    navFormats: "Formatos",
    navHow: "Como funciona",
    navFaq: "FAQ",
    languageLabel: "Idioma",
    eyebrow: "Conversor de vídeo online grátis",
    heroTitle: "Baixador de vídeos",
    heroIntro: "Cole um link de vídeo para preparar conversões MP4 ou MP3 de forma rápida.",
    urlLabel: "URL do vídeo",
    urlPlaceholder: "Cole o link do vídeo aqui",
    startButton: "Iniciar",
    adLabel: "Anúncio",
    formatsTitle: "Formatos suportados",
    howTitle: "Como funciona",
    faqTitle: "Perguntas frequentes",
    footerHome: "Início",
    footerContact: "Contato",
    success: "{format} está pronto para processar. Conecte este formulário à sua API de conversão.",
    error: "Cole uma URL de vídeo válida que comece com http ou https."
  },
  ru: {
    title: "VagaTools загрузчик видео - бесплатный онлайн-конвертер",
    description: "Вставьте ссылку на видео и подготовьте быструю онлайн-конвертацию с VagaTools.",
    navFormats: "Форматы",
    navHow: "Как это работает",
    navFaq: "FAQ",
    languageLabel: "Язык",
    eyebrow: "Бесплатный онлайн-конвертер видео",
    heroTitle: "Загрузчик видео",
    heroIntro: "Вставьте ссылку на видео, чтобы подготовить конвертацию в MP4 или MP3.",
    urlLabel: "URL видео",
    urlPlaceholder: "Вставьте ссылку на видео",
    startButton: "Старт",
    adLabel: "Реклама",
    formatsTitle: "Поддерживаемые форматы",
    howTitle: "Как это работает",
    faqTitle: "Частые вопросы",
    footerHome: "Главная",
    footerContact: "Контакты",
    success: "{format} готов к обработке. Подключите форму к API конвертации.",
    error: "Вставьте корректный URL видео, начинающийся с http или https."
  },
  ar: {
    title: "VagaTools تنزيل الفيديو - محول مجاني عبر الإنترنت",
    description: "الصق رابط فيديو وجهز التحويل السريع عبر الإنترنت باستخدام VagaTools.",
    navFormats: "الصيغ",
    navHow: "طريقة الاستخدام",
    navFaq: "الأسئلة",
    languageLabel: "اللغة",
    eyebrow: "محول فيديو مجاني عبر الإنترنت",
    heroTitle: "تنزيل الفيديو",
    heroIntro: "الصق رابط فيديو لتجهيز تحويل MP4 أو MP3 بواجهة بسيطة وسريعة.",
    urlLabel: "رابط الفيديو",
    urlPlaceholder: "الصق رابط الفيديو هنا",
    startButton: "ابدأ",
    adLabel: "إعلان",
    formatsTitle: "صيغ الإخراج المدعومة",
    howTitle: "طريقة الاستخدام",
    faqTitle: "الأسئلة الشائعة",
    footerHome: "الرئيسية",
    footerContact: "اتصال",
    success: "تم تجهيز {format}. اربط هذا النموذج بواجهة التحويل عند توفرها.",
    error: "يرجى لصق رابط فيديو صالح يبدأ بـ http أو https."
  },
  hi: {
    title: "VagaTools वीडियो डाउनलोडर - मुफ्त ऑनलाइन कन्वर्टर",
    description: "वीडियो लिंक पेस्ट करें और VagaTools के साथ तेज ऑनलाइन रूपांतरण तैयार करें।",
    navFormats: "फ़ॉर्मेट",
    navHow: "कैसे काम करता है",
    navFaq: "FAQ",
    languageLabel: "भाषा",
    eyebrow: "मुफ्त ऑनलाइन वीडियो कन्वर्टर",
    heroTitle: "वीडियो डाउनलोडर",
    heroIntro: "MP4 या MP3 रूपांतरण तैयार करने के लिए वीडियो लिंक पेस्ट करें।",
    urlLabel: "वीडियो URL",
    urlPlaceholder: "अपना वीडियो लिंक यहाँ पेस्ट करें",
    startButton: "शुरू करें",
    adLabel: "विज्ञापन",
    formatsTitle: "समर्थित फ़ॉर्मेट",
    howTitle: "कैसे काम करता है",
    faqTitle: "सामान्य प्रश्न",
    footerHome: "होम",
    footerContact: "संपर्क",
    success: "{format} प्रोसेस के लिए तैयार है। बैकएंड उपलब्ध होने पर इसे API से जोड़ें।",
    error: "कृपया http या https से शुरू होने वाला मान्य वीडियो URL पेस्ट करें।"
  },
  id: {
    title: "VagaTools Pengunduh Video - Konverter online gratis",
    description: "Tempel tautan video dan siapkan konversi online cepat dengan VagaTools.",
    navFormats: "Format",
    navHow: "Cara kerja",
    navFaq: "FAQ",
    languageLabel: "Bahasa",
    eyebrow: "Konverter video online gratis",
    heroTitle: "Pengunduh video",
    heroIntro: "Tempel tautan video untuk menyiapkan konversi MP4 atau MP3 dengan cepat.",
    urlLabel: "URL video",
    urlPlaceholder: "Tempel tautan video di sini",
    startButton: "Mulai",
    adLabel: "Iklan",
    formatsTitle: "Format yang didukung",
    howTitle: "Cara kerja",
    faqTitle: "Pertanyaan umum",
    footerHome: "Beranda",
    footerContact: "Kontak",
    success: "{format} siap diproses. Hubungkan formulir ini ke API konversi Anda.",
    error: "Tempel URL video valid yang diawali http atau https."
  },
  tr: {
    title: "VagaTools Video İndirici - Ücretsiz online dönüştürücü",
    description: "Video bağlantısını yapıştırın ve VagaTools ile hızlı online dönüşüm hazırlayın.",
    navFormats: "Formatlar",
    navHow: "Nasıl çalışır",
    navFaq: "SSS",
    languageLabel: "Dil",
    eyebrow: "Ücretsiz online video dönüştürücü",
    heroTitle: "Video indirici",
    heroIntro: "MP4 veya MP3 dönüşümü hazırlamak için video bağlantısını yapıştırın.",
    urlLabel: "Video URL",
    urlPlaceholder: "Video bağlantısını buraya yapıştırın",
    startButton: "Başlat",
    adLabel: "Reklam",
    formatsTitle: "Desteklenen formatlar",
    howTitle: "Nasıl çalışır",
    faqTitle: "Sık sorulan sorular",
    footerHome: "Ana sayfa",
    footerContact: "İletişim",
    success: "{format} işlemeye hazır. Backend hazır olduğunda bu formu API'ye bağlayın.",
    error: "Lütfen http veya https ile başlayan geçerli bir video URL'si yapıştırın."
  },
  vi: {
    title: "VagaTools Trình tải video - Bộ chuyển đổi miễn phí",
    description: "Dán liên kết video và chuẩn bị chuyển đổi trực tuyến nhanh với VagaTools.",
    navFormats: "Định dạng",
    navHow: "Cách dùng",
    navFaq: "FAQ",
    languageLabel: "Ngôn ngữ",
    eyebrow: "Bộ chuyển đổi video trực tuyến miễn phí",
    heroTitle: "Trình tải video",
    heroIntro: "Dán liên kết video để chuẩn bị chuyển đổi MP4 hoặc MP3 nhanh chóng.",
    urlLabel: "URL video",
    urlPlaceholder: "Dán liên kết video tại đây",
    startButton: "Bắt đầu",
    adLabel: "Quảng cáo",
    formatsTitle: "Định dạng hỗ trợ",
    howTitle: "Cách hoạt động",
    faqTitle: "Câu hỏi thường gặp",
    footerHome: "Trang chủ",
    footerContact: "Liên hệ",
    success: "{format} đã sẵn sàng xử lý. Kết nối biểu mẫu này với API chuyển đổi của bạn.",
    error: "Vui lòng dán URL video hợp lệ bắt đầu bằng http hoặc https."
  }
};

const supportedLanguages = Object.keys(translations);
const rtlLanguages = new Set(["ar"]);

year.textContent = new Date().getFullYear();

function normalizeLanguage(language) {
  const code = (language || "").toLowerCase().split("-")[0];
  return supportedLanguages.includes(code) ? code : "en";
}

function detectLanguage() {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const matched = browserLanguages.map(normalizeLanguage).find((code) => code !== "en");
  return matched || "en";
}

function t(key, language = currentLanguage) {
  return translations[language]?.[key] || translations.en[key] || "";
}

function applyLanguage(language) {
  currentLanguage = normalizeLanguage(language);
  const direction = rtlLanguages.has(currentLanguage) ? "rtl" : "ltr";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = direction;
  document.title = t("title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
}

function parseYouTubeUrl(value) {
  const url = new URL(value);
  const host = url.hostname.toLowerCase().replace(/^www\./, "").replace(/^m\./, "");
  let id = "";

  if (host === "youtu.be") {
    id = url.pathname.split("/").filter(Boolean)[0] || "";
  }

  if (host === "youtube.com" || host === "music.youtube.com" || host === "youtube-nocookie.com") {
    const parts = url.pathname.split("/").filter(Boolean);

    if (url.pathname === "/watch") {
      id = url.searchParams.get("v") || "";
    } else if (["shorts", "embed", "live", "v"].includes(parts[0])) {
      id = parts[1] || "";
    }
  }

  id = id.trim();
  if (!/^[a-zA-Z0-9_-]{6,20}$/.test(id)) {
    throw new Error("Invalid YouTube video id");
  }

  return {
    id,
    watchUrl: `https://www.youtube.com/watch?v=${id}`,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  };
}

function showParsedVideo(video, selectedFormat) {
  videoId.textContent = video.id;
  videoFormat.textContent = selectedFormat;
  videoOpenLink.href = video.watchUrl;
  videoThumb.src = video.thumbnail;
  videoThumb.alt = `${t("resultTitle")} ${video.id}`;
  videoResult.hidden = false;
}

function hideParsedVideo() {
  videoResult.hidden = true;
  videoThumb.removeAttribute("src");
  videoOpenLink.href = "#";
}

window.vagaToolsParseYouTubeUrl = parseYouTubeUrl;

let currentLanguage = normalizeLanguage(localStorage.getItem("preferredLanguage") || detectLanguage());
const savedLanguage = localStorage.getItem("preferredLanguage");
languageSelect.value = savedLanguage && supportedLanguages.includes(savedLanguage) ? savedLanguage : "auto";
applyLanguage(languageSelect.value === "auto" ? detectLanguage() : languageSelect.value);

languageSelect.addEventListener("change", () => {
  if (languageSelect.value === "auto") {
    localStorage.removeItem("preferredLanguage");
    applyLanguage(detectLanguage());
    return;
  }

  localStorage.setItem("preferredLanguage", languageSelect.value);
  applyLanguage(languageSelect.value);
});

function processVideoUrl(value, selectedFormat, shouldFocus = true) {
  try {
    const parsedUrl = new URL(value);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Unsupported protocol");
    }

    const video = parseYouTubeUrl(value);
    showParsedVideo(video, selectedFormat);
    status.textContent = t("success").replace("{format}", selectedFormat);
  } catch {
    hideParsedVideo();
    status.textContent = value.startsWith("http") ? t("parseError") : t("error");
    if (shouldFocus) {
      input.focus();
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedFormat = new FormData(form).get("format");
  const value = input.value.trim();

  processVideoUrl(value, selectedFormat);
});

const initialUrl = new URLSearchParams(window.location.search).get("url");
if (initialUrl) {
  input.value = initialUrl;
  processVideoUrl(initialUrl, new FormData(form).get("format"), false);
}
