import multer from 'multer'
import path  from 'path'
import express from 'express'

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
});

export const upload = multer ({storage:storage})
