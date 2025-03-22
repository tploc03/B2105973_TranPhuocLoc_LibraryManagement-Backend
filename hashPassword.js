// hashPassword.js
const bcrypt = require('bcrypt');

const password = 'admin123';
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Mật khẩu đã mã hóa:', hash);
});