const express = require("express");
const DreamController = require("../controllers/DreamController");

const router = express.Router({ mergeParams: true });

router.use(DreamController.checkCredentials);

router.get("/", DreamController.getDreams);
router.get("/getDream", DreamController.getDream);
router.post("/new", DreamController.createDream);
router.get("/:user", DreamController.getUserDreams);
router.post("/newComment", DreamController.newComment);
router.put("/likeDream", DreamController.likeDream);

//router.get("/test", DreamController.uploadFile);


module.exports = router;
