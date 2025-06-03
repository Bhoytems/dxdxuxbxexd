const User = require('../models/User');
const Task = require('../models/Task');

async function claimDailyBonus(userId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Check if already claimed today
  const lastClaim = await Task.findOne({
    userId,
    taskType: 'daily_bonus',
    completedAt: { $gte: today }
  });

  if (lastClaim) {
    throw new Error('Daily bonus already claimed');
  }

  // Credit user
  user.balance += 20;
  await user.save();

  // Record task
  const task = new Task({
    userId,
    taskType: 'daily_bonus',
    reward: 20
  });
  await task.save();

  return user;
}

async function completeTask(userId, taskType) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Check if task already completed today
  const existingTask = await Task.findOne({
    userId,
    taskType,
    completedAt: { $gte: today }
  });

  if (existingTask) {
    throw new Error('Task already completed today');
  }

  // Determine reward amount
  const rewards = {
    telegram: 50,
    twitter: 70,
    retweet: 50,
    referral: 100
  };

  const reward = rewards[taskType] || 0;
  if (reward === 0) throw new Error('Invalid task type');

  // Credit user
  user.balance += reward;
  await user.save();

  // Record task
  const task = new Task({
    userId,
    taskType,
    reward
  });
  await task.save();

  return user;
}

module.exports = { claimDailyBonus, completeTask };
