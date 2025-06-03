import { userData, userId, firstName } from '../app.js';

// DOM elements
const leaderboardContentEl = document.getElementById('leaderboard-content');

// Initialize leaderboard page
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
});

function updateLeaderboard() {
    // In a real app, you would fetch this from your backend
    const dummyUsers = [
        { id: '123', name: 'CryptoKing', balance: 1250 },
        { id: '456', name: 'BlockchainQueen', balance: 980 },
        { id: '789', name: 'DubeMaster', balance: 750 },
        { id: userId, name: firstName, balance: userData.balance },
        { id: '101', name: 'AirdropHunter', balance: 420 }
    ];
    
    dummyUsers.sort((a, b) => b.balance - a.balance);
    
    leaderboardContentEl.innerHTML = '';
    dummyUsers.forEach((user, index) => {
        const isCurrentUser = user.id === userId;
        const userItem = document.createElement('div');
        userItem.className = `leaderboard-item ${isCurrentUser ? 'current-user' : ''}`;
        userItem.innerHTML = `
            <div class="user-rank">${index + 1}</div>
            <div class="user-info">
                <div class="user-name">${user.name} ${isCurrentUser ? '(You)' : ''}</div>
            </div>
            <div class="user-balance">${user.balance} DUBE</div>
        `;
        leaderboardContentEl.appendChild(userItem);
    });
         }
