# 📝 Test Todolist

[![Node.js](https://img.shields.io/badge/Node.js-16+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3+-cyan)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

**To-Do List Fullstack**  
Backend: **Express.js + MySQL**  
Frontend: **React.js + Tailwind CSS**

---

## ✨ ฟีเจอร์หลัก
- เพิ่ม, แก้ไข, ลบรายการงาน  
- กรองตาม **status** และ **priority**  
- ค้นหางานตามชื่อรายการ **debonce**  
- Soft delete (เก็บข้อมูลรายการที่ถูกลบ)  
- รองรับ **Pagination**

---

## 🛠 การติดตั้ง

1. **Clone โค้ด**
```bash
git clone https://github.com/EnvyByRatcha/test-todolist.git
cd test-todolist
```

2. **ติดตั้ง dependencies**
```bash
cd api
npm install

cd app
npm install
```

3. **ตั้งค่าไฟล์ .env**
Backend: api/.env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)

4. **รันแอป**
```bash
cd api
npm start
cd app
npm run dev
```
