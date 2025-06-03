const crypto = require('crypto');

function verifyTelegramData(data) {
  const secretKey = crypto.createHash('sha256')
    .update(process.env.TELEGRAM_BOT_TOKEN)
    .digest();
  
  const checkString = Object.keys(data)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  
  const hash = crypto.createHmac('sha256', secretKey)
    .update(checkString)
    .digest('hex');
  
  return data.hash === hash;
}

module.exports = { verifyTelegramData };
