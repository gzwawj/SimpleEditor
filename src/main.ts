import http from "http"
import express from "express"
import { Application } from "tsnode-express"

import "./article.controller"
import "./email.controller"

const application = new Application();

application.use(express.static('public'))

application.useConfig((config) => {
    config.test = 'test config field';
});

application.start((express, config) => {
    http.createServer(express).listen(3000, () => {
        console.log("server listening")
    })
})