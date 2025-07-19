const express = require('express');
const app = express();
const PORT = 3000;

// middleware แปลงข้อมูล JSON ใน request body
app.use(express.json());

// สร้าง route POST /count-word
app.post('/count-word', (req, res) => {
  const { text } = req.body;

  // เช็คว่ามี text หรือไม่ และเป็น string หรือเปล่า
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid text string.' });
  }

  // ฟังก์ชันนับคำ
  const wordCount = countWords(text);

  // ส่งผลลัพธ์กลับ
  res.json({ wordCount });
});

// ฟังก์ชันนับคำ
function countWords(text) {
  // แยกคำโดยแบ่งจากช่องว่าง และกรองเอาคำที่ไม่ใช่ค่าว่าง
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
