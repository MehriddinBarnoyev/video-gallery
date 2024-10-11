const videosBox = document.getElementById("videosBox");
const videoText = document.getElementById("video-text");
let index = 1;
let lastState = ""; // So'nggi holatni saqlash uchun

// YouTube URL tekshiruvchi funksiya
const checkVideo = (videoUrl) => {
  const iframes = document.getElementsByTagName("iframe"); // Barcha iframelarni olish
  const currentVideoId = extractVideoId(videoUrl); // Kirilgan URL dan video ID ni olish

  for (const iframe of iframes) {
    const iframeVideoId = extractVideoId(iframe.src); // Har bir iframe'dagi video ID ni olish
    if (iframeVideoId === currentVideoId) {
      return true; // Agar video URL allaqachon mavjud bo'lsa, true qaytaradi
    }
  }
  return false; // Agar video mavjud bo'lmasa, false qaytaradi
};

// URL'dan YouTube video ID ni olish uchun yordamchi funksiya
const extractVideoId = (url) => {
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
  return videoId;
};

// YouTube videoni qo'shish funksiyasi
const addVideo = () => {
  const videoUrl = videoText.value.trim(); // Kirilgan video URL-ni olish va bo'sh joylarni olib tashlash
  if (videoUrl === "" || checkVideo(videoUrl)) return; // Agar maydon bo'sh bo'lsa yoki video mavjud bo'lsa, hech narsa qilmaydi

  lastState = videosBox.innerHTML; // So'nggi holatni saqlaymiz

  // Yangi ustun yaratamiz
  const col = document.createElement("div");
  col.className = "col-sm-6 col-md-4 col-lg-3"; // Ustunning bootstrap grid sinflari
  col.id = index; // Ustunga noyob ID beramiz

  // YouTube video iframe'ini qo'shamiz
  const videoBox = document.createElement("div");
  videoBox.className = "rounded shadow video-box mb-2"; // Bootstrap sinflari bilan bezak beramiz
  videoBox.innerHTML = `<iframe width="100%" height="200" src="${convertYouTubeUrl(
    videoUrl
  )}" frameborder="0" allowfullscreen></iframe>`;

  // O'chirish tugmasini qo'shamiz
  videoBox.innerHTML += `<button class="btn btn-danger mt-2" onclick="removeVideo('${index++}')"><i class="fas fa-trash"></i></button>`;

  // Videoni ustunga qo'shamiz
  col.appendChild(videoBox);

  // Ustunni videolar qutisiga qo'shamiz
  videosBox.appendChild(col);

  // Kirish maydonini tozalaymiz
  videoText.value = "";
};

// "Enter" tugmasini bosganimizda video qo'shish
const keyUp = (e) => {
  if (e.key === "Enter") {
    addVideo(); // "Enter" tugmasi bosilganda addVideo funksiyasini chaqiramiz
  }
};

// Videoni o'chirish funksiyasi
const removeVideo = (id) => {
  const element = document.getElementById(id); // O'chiriladigan elementni olish
  element.remove(); // Elementni DOM'dan olib tashlash
};

// Barcha videolarni o'chirish funksiyasi
const deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.onclick = function () {
  lastState = videosBox.innerHTML; // Videolar qutisining hozirgi holatini saqlaymiz
  videosBox.innerHTML = ""; // Videolar qutisini bo'shatamiz
};

// So'nggi holatga qaytarish funksiyasi
const back = () => {
  videosBox.innerHTML = lastState; // Saqlangan so'nggi holatni tiklaymiz
};

// YouTube URL ni iframe formatiga o'zgartirish
const convertYouTubeUrl = (url) => {
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
  return `https://www.youtube.com/embed/${videoId}`;
};
