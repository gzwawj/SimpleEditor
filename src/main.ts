import http from "http"
import multer from "multer"
import express from "express"
import { Application } from "tsnode-express"

import "./article.controller"
import "./email.controller"
import { qiniuController } from "./qiniu.controller"

const application = new Application();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
let upload = multer({ storage: storage })

application.use(express.static('public'))

application.use("/qiniu/addFile", upload.single('qiniufile'), qiniuController.setQiniuFile)

application.useConfig((config) => {
    config.test = 'test config field';
});

application.start((express, config) => {
    http.createServer(express).listen(3000, () => {
        console.log("server listening")
    })
})