import {Router} from "express"
import {dashboardController} from "../controllers/user.controller.js"
import { historyFetchController } from "../controllers/user.controller.js";

const router =Router()

router.route("/user/details").get(dashboardController)
router.route("/user/history").get(historyFetchController)
export default router;