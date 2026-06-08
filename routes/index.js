const express = require("express");
const router = express.Router();
const TodoRoutes = require("./todos");
const UserController = require("../controllers/user");
const QuotesApiController = require("../controllers/quotesApi");
const ImageApiController = require("../controllers/imageApi");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/googleSignIn", UserController.googleSignIn);
router.get("/quotes", QuotesApiController);
router.get("/images", ImageApiController);
// router.use('/googleCalender',googleCalenderAPI)
router.use("/todos", TodoRoutes);

router.use(errorHandler);

module.exports = router;
