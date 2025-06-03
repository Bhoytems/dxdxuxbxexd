// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.expand();

// Get user data from Telegram
const user = tg.initDataUnsafe?.user;
const userId = user?.id || Math.floor(Math.random() * 1000000).toString();
const firstName = user?.first_name || 'Telegram User';
const username = user?.username || `user_${userId}`;

// State management
let userData = {
    balance: 0,
    lastBonusClaim: null,
    completedTasks: {},
    referrals: [],
    referralCount: 0,
    referralEarnings: 0
};

// DOM elements
const appContainer = document.getElementById('app-container');
const navTabs = document.querySelectorAll('.nav-tab');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    setupNavigation();
    loadPage('home'); // Load home page by default
});

// Navigation functions
function setupNavigation() {
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadPage(tab.dataset.page);
        });
    });
}

function loadPage(page) {
    fetch(`${page}/${page}.html`)
        .then(response => response.text())
        .then(html => {
            appContainer.innerHTML = html;
            loadScript(`${page}/${page}.js`);
        })
        .catch(error => console.error('Error loading page:', error));
}

function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => console.log(`${src} loaded successfully`);
    script.onerror = () => console.error(`Error loading ${src}`);
    document.body.appendChild(script);
}

// User data functions
function loadUserData() {
    const savedData = localStorage.getItem(`dube_user_${userId}`);
    if (savedData) {
        userData = JSON.parse(savedData);
    }
}

function saveUserData() {
    localStorage.setItem(`dube_user_${userId}`, JSON.stringify(userData));
}

// Shared functions
function updateUI() {
    // This will be implemented in each page's JS
}

export { userData, userId, firstName, username, tg, saveUserData, updateUI };
