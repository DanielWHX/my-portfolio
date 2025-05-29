//引入所需模块
const express = require('express'); 
const path = require('path'); 
const fs = require('fs'); 

const app = express(); //创建express应用

//让服务器访问public目录下的静态文件（作用：让前端页面可以被浏览器打开）
app.use(express.static(path.join(__dirname, '../public')));

//当访问/api/时，返回一个json对象
app.get('/api/projects', (req, res) => {
    //读取项目数据文件
  const filePath = path.join(__dirname, '../data/projects.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading project data:', err);
      return res.status(500).send('Server error');
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(data); // 发送项目数据
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running: http://localhost:${PORT}`);
});