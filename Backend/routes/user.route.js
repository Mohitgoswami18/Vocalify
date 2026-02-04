import {Router} from "express"
import {dashboardController} from "../controllers/user.controller.js"
import { historyFetchController } from "../controllers/user.controller.js";
import { analysisPipelineController } from "../controllers/user.controller.js";
import {upload} from "../middleware/mutler.middleware.js"

const router =Router()

router.route("/user/details").get(dashboardController)
router.route("/user/history").get(historyFetchController)
router.route("/api/analyze-audio-result").post(upload.single("audio"), analysisPipelineController);
export default router;