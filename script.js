// Mock data for manga (in a real app, this would come from an API)
const mangaData = [
    {
        id: 1,
        title: "ون بيس",
        cover: "http://static.photos/anime/320x240/1",
        latestChapter: 1045,
        rating: 4.9,
        categories: ["أكشن", "مغامرة"]
    },
    {
        id: 2,
        title: "ناروتو",
        cover: "http://static.photos/anime/320x240/2",
        latestChapter: 700,
        rating: 4.8,
        categories: ["أكشن", "فنون قتالية"]
    },
    {
        id: 3,
        title: "هجوم العمالقة",
        cover: "http://static.photos/anime/320x240/3",
        latestChapter: 139,
        rating: 4.9,
        categories: ["أكشن", "دراما"]
    },
    {
        id: 4,
        title: "بليتش",
        cover: "http://static.photos/anime/320x240/4",
        latestChapter: 686,
        rating: 4.7,
        categories: ["أكشن", "خيالي"]
    },
    {
        id: 5,
        title: "ديمون سلاير",
        cover: "http://static.photos/anime/320x240/5",
        latestChapter: 205,
        rating: 4.8,
        categories: ["أكشن", "خيالي"]
    }
];

const chaptersData = [
    {
        mangaId: 1,
        title: "ون بيس",
        chapterNumber: 1045,
        date: "2023-05-15",
        views: 125000
    },
    {
        mangaId: 2,
        title: "ناروتو",
        chapterNumber: 700,
        date: "2023-05-10",
        views: 98000
    },
    {
        mangaId: 3,
        title: "هجوم العمالقة",
        chapterNumber: 139,
        date: "2023-05-05",
        views: 150000
    }
];

function loadPopularManga() {
    const container = document.querySelector('main section:first-child div');
    container.innerHTML = mangaData.map(manga => `
        <div class="manga-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <a href="/manga.html?id=${manga.id}">
                <img src="${manga.cover}" alt="${manga.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-2 truncate">${manga.title}</h3>
                    <div class="flex items-center text-yellow-500 mb-2">
                        ${'<i data-feather="star" class="w-4 h-4 fill-current"></i>'.repeat(Math.floor(manga.rating))}
                        <span class="text-gray-600 dark:text-gray-400 ml-2">${manga.rating}</span>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        ${manga.categories.map(cat => `<span class="text-xs bg-primary/10 text-primary dark:text-secondary dark:bg-secondary/10 px-2 py-1 rounded">${cat}</span>`).join('')}
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">الفصل ${manga.latestChapter}</p>
                </div>
            </a>
        </div>
    `).join('');
    feather.replace();
}

function loadLatestChapters() {
    const container = document.querySelector('main section:last-child div');
    container.innerHTML = chaptersData.map(chapter => `
        <div class="chapter-card bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div class="flex items-start">
                <div class="flex-1">
                    <h3 class="font-bold text-lg">${chapter.title}</h3>
                    <p class="text-primary dark:text-secondary">الفصل ${chapter.chapterNumber}</p>
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <i data-feather="calendar" class="w-4 h-4 mr-1"></i>
                        ${chapter.date}
                        <i data-feather="eye" class="w-4 h-4 mr-1 ml-3"></i>
                        ${chapter.views.toLocaleString()}
                    </div>
                </div>
                <a href="/reader.html?manga=${chapter.mangaId}&chapter=${chapter.chapterNumber}" class="bg-primary dark:bg-secondary text-white px-3 py-1 rounded text-sm hover:opacity-90">
                    قراءة
                </a>
            </div>
        </div>
    `).join('');
    feather.replace();
}

// Admin functions
function checkAdminAuth() {
    return localStorage.getItem('adminAuthenticated') === 'true';
}

function adminLogin() {
    const password = prompt('أدخل كلمة المرور الإدارية:');
    if (password === 'MangaQAdmin123') { // In real app, use proper auth
        localStorage.setItem('adminAuthenticated', 'true');
        window.location.href = '/admin.html';
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}
