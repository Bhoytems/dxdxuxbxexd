import { userData, userId, firstName, username, tg, saveUserData, updateUI } from '../app.js';

// DOM elements
const dailyBonusBtn = document.getElementById('daily-bonus-btn');
const taskButtons = document.querySelectorAll('.task-btn');
const userBalanceEl = document.getElementById('user-balance');

// Initialize home page
document.addEventListener('DOMContentLoaded', () => {
    updateHomeUI();
    setupEventListeners();
});

function updateHomeUI() {
    userBalanceEl.textContent = `${userData.balance} DUBE`;
    updateDailyBonusButton();
    updateTaskButtons();
}

function updateDailyBonusButton() {
    const today = new Date().toDateString();
    if (userData.lastBonusClaim === today) {
        dailyBonusBtn.textContent = 'Already Claimed';
        dailyBonusBtn.disabled = true;
    } else {
        dailyBonusBtn.textContent = 'Claim 20 DUBE';
        dailyBonusBtn.disabled = false;
    }
}

function updateTaskButtons() {
    taskButtons.forEach(button => {
        const task = button.dataset.task;
        if (userData.completedTasks[task] === new Date().toDateString()) {
            button.textContent = 'Completed';
            button.classList.add('completed');
            button.disabled = true;
        } else {
            button.textContent = 'Start';
            button.classList.remove('completed');
            button.disabled = false;
        }
    });
}

function setupEventListeners() {
    dailyBonusBtn.addEventListener('click', () => {
        const today = new Date().toDateString();
        if (userData.lastBonusClaim !== today) {
            userData.balance += 20;
            userData.lastBonusClaim = today;
            saveUserData();
            updateHomeUI();
            tg.showAlert('Daily bonus claimed! You earned 20 DUBE.');
        }
    });

    taskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const task = button.dataset.task;
            const reward = parseInt(button.dataset.reward);
            const today = new Date().toDateString();
            
            if (userData.completedTasks[task] !== today) {
                let taskUrl = '';
                switch (task) {
                    case 'telegram': taskUrl = 'https://t.me/DubeAirdropChannel'; break;
                    case 'twitter': taskUrl = 'https://twitter.com/DubeAirdrop'; break;
                    case 'retweet': taskUrl = 'https://twitter.com/DubeAirdrop/status/123456789'; break;
                    case 'referral':
                        tg.showAlert('Share your referral link to earn 100 DUBE per friend who joins!');
                        return;
                }
                
                if (taskUrl) window.open(taskUrl, '_blank');
                
                userData.completedTasks[task] = today;
                userData.balance += reward;
                saveUserData();
                updateHomeUI();
                tg.showAlert(`Task completed! You earned ${reward} DUBE.`);
            }
        });
    });
                                }
