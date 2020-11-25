const { Router } = require("express");
import uploadController from "../../controller/upload";

const uploadRoute = Router();

const UPLOAD_ROUTE = "/";

uploadRoute.use(UPLOAD_ROUTE, uploadController);

module.exports  = uploadRoute;