# PDF Auth Dashboard

A small **Node.js** project to play with PDF-based authentication and file uploads. Just for learning/timepass!  

## Features
- Register & login via **PDF** (hash-based auth).  
- **Protected dashboard** for logged-in users.  
- Upload, **preview**, and download files.  
- Files stored locally in `uploads/`.  
- Simple **SQLite** database to store users & files.  

## Tech
Node.js, Express, SQLite, Multer, HTML/CSS/JS  

## Usage
1. `npm install` & `npm run dev`  
2. Visit `http://localhost:3000`  
3. Register with PDF → Login → Dashboard → Upload files  

> ⚠️ For learning/timepass only — not production-ready.
<br>
Login with pdf is not a feasible option due to lossing of file or devices having large no. of files