import { userData, userId, tg } from '../app.js';

// DOM elements
const referralLinkEl = document.getElementById('referral-link');
const copyBtn = document.getElementById('copy-btn');
const totalReferralsEl = document.getElementById('total-referrals');
const referralEarningsEl = document.getElementById('referral-earnings');
const referralsListEl = document.getElementById('referrals-list');

// Initialize referral page
document.addEventListener('DOMContentLoaded', () => {
    const referralLink = `https://t.me/DubeAirdropBot?start=${userId}`;
    referralLinkEl.textContent = referralLink;
    updateReferralUI();
    setupEventListeners();
});

function updateReferralUI() {
    totalReferralsEl.textContent = userData.referralCount;
    referralEarningsEl.textContent = userData.referralEarnings;
    updateReferralsList();
}

function updateReferralsList() {
    if (userData.referrals.length === 0) {
        referralsListEl.innerHTML = '<div class="empty-state">No referrals yet</div>';
        return;
    }
    
    referralsListEl.innerHTML = '';
    userData.referrals.forEach(ref => {
        const referralItem = document.createElement('div');
        referralItem.className = 'referral-item';
        referralItem.innerHTML = `
            <div>${ref.name}</div>
            <div>+${ref.amount} DUBE</div>
        `;
        referralsListEl.appendChild(referralItem);
    });
}

function setupEventListeners() {
    copyBtn.addEventListener('click', () => {
        const link = referralLinkEl.textContent;
        navigator.clipboard.writeText(link).then(() => {
            tg.showAlert('Referral link copied to clipboard!');
        });
    });
  }
