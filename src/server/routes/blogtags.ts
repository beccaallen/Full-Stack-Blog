import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/:blogid", async (req, res) => {
  const blogid = Number(req.params.blogid);

  try {
      const [blogtags] = await db.blogtags.retrieve(blogid);
      res.json(blogtags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
  }
});

router.post("/", async (req,res)=>{
  const newBlogtag = req.body;
  try {
    const result = await db.blogtags.insert(newBlogtag.blogid, newBlogtag.tagid);
    res.json({msg: "blogtag inserted", ...result});
} catch (error) {
  console.log(error);
  res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
}
});

router.delete("/:blogid", async (req,res)=>{
  const blogid = Number(req.params.blogid);
  try {
    const result = await db.blogtags.remove(blogid);
    res.json({msg: "blogtag(s) removed", ...result});
} catch (error) {
  console.log(error);
  res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
}
});


router.put("/:blogid", async (req,res)=>{
  const tags = req.body
  const blogid = Number(req.params.blogid);
  try {
    const result = await db.blogtags.update(tags.newTagId, tags.oldTagId, blogid);
    res.json({msg: "blogtag(s) updated", ...result});
} catch (error) {
  console.log(error);
  res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
}
});



export default router;
