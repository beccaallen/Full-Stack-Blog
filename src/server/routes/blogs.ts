import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/:blogid?", async (req, res) => {
  const blogid = Number(req.params.blogid);

  try {
    if (blogid) {
      const [blog] = await db.blogs.one(blogid);
      res.json(blog);
    } else {
      const blogs = await db.blogs.all();
      res.json(blogs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
  }
});

router.post("/", async (req, res) => {
  const blogDTO = req.body;
  blogDTO.authorid = 1;

  try {
   const result= await db.blogs.insert(blogDTO)
   res.json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
  }
});

router.put("/:blogid", async (req, res) => {
  const blogid= Number(req.params.blogid)
  const editedBlog = req.body;
  
  try {
   const result= await db.blogs.update(editedBlog, blogid)
   res.json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
  }
});

router.delete("/:blogid", async (req, res) => {
  const blogid= Number(req.params.blogid)
  
  try {
   const result= await db.blogs.remove(blogid)
   res.json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "I'm not sure what happened...TTYL", error });
  }
});


export default router;
