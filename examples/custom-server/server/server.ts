import express from "express";

import { nextServer } from "./nextServer/nextServer";
import setup from "./setup";
import { port } from "../config/constant";

console.log("TARO_ENV", process.env.TARO_ENV);

Promise.all([
    // 依赖next服务
    nextServer.prepare()
])
    .then(() => {
        return setup(express());
    })
    .then(app => {
        process.on("uncaughtException", () => {
            // 等待20秒发送日志并退出进程
            setTimeout(() => {
                process.exit();
            }, 20 * 1000);
        });
        app.listen(port, () => {
            console.log(`server start at port ${port}`, {
                type: "server"
            });
        });
    })
    .catch(error => {
        console.error("应用启动异常", { error });
        setTimeout(() => {
            process.exit(-1);
        }, 2000);
    });
