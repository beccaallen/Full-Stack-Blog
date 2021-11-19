import { Query } from "../";

// Query:
// SELECT * from blogtags
// JOIN tags ON tags.id= blogtags.tagid
// WHERE blogid=blog_id;

const retrieve = (blogid: number) => Query("CALL spBlogTags(?)", [blogid]);

const insert = (blogid: number, tagid: number) =>
  Query("INSERT INTO blogtags (blogid, tagid) VALUES (?, ?)", [blogid, tagid]);

const remove = (blogid: number) => Query("DELETE FROM blogtags WHERE blogid=?", [blogid])

const update = (newTagId: number, oldTagId: number, blogid:number) => Query("UPDATE blogtags SET tagid = ? WHERE blogid = ? AND tagid = ?", [newTagId, blogid,oldTagId])

export default {
  retrieve,
  insert,
  remove,
  update
};
