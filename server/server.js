//引入所需模块
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

//让服务器能发个问public文件夹下的index.html和其他资源
app.use(express.static(path.join(__dirname, '../public')));

//当访问/api/时，返回一个json对象
app.get('/api/projects', (req, res) => {
  const filePath = path.join(__dirname, '../data/projects.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading project data:', err);
      return res.status(500).send('Server error');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running: http://localhost:${PORT}`);
});