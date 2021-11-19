import { Router } from "express"; 
import blogsRouter from "./blogs"
import blogtagsRouter from "./blogtags"
import tagsRouter from "./tags";

const router = Router();

router.use("/blogs", blogsRouter)
router.use("/blogtags", blogtagsRouter)
router.use("/tags", tagsRouter)


export default router;