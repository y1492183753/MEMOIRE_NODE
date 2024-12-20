const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3000;
const imagesDir = path.join(__dirname, 'public', 'images');

app.use(express.static('public')); // 服务静态文件

// 获取图片列表的接口
app.get('/images', (req: any, res: any) => {
  fs.readdir(imagesDir, (err: any, files: any) => {
    if (err) {
      res.status(500).json({ error: 'Error reading images directory' });
      return;
    }
    const images = files
      .filter((file: any) => /\.(jpg|jpeg|png|gif)$/i.test(file)) // 确保只包含图片文件
      .map((file: any) => `/images/${file}`); // 生成图片的 URL
    res.status(200).json(images);
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
