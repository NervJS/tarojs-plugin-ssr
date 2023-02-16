import express from "express";
import path from "path";

import { nextRouter } from "./nextServer/nextRouter";
import { nextServer } from "./nextServer/nextServer";
import { basePath } from "../config/constant";

export default app => {
    app.get(`${basePath}/_+next*`, nextServer.getRequestHandler());

    // 静态文件，提供一些无需node介入的内容
    app.use(basePath, express.static(path.join(__dirname, "../public")));

    app.use(nextRouter);

    return app;
};
