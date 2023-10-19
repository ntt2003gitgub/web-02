import express from "express";
import homeController from '../controller/homeController.js'
let router= express.Router();

const initWebRoute= (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/dangnhap', homeController.getDangNhap);
    router.get('/dangky',homeController.getDangKy);
    router.get('/trangbaihoc',homeController.gettrangbaihoc);
    return app.use('/', router)
};
export default initWebRoute;

