import { application } from "express";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ITag } from "../utils/types";

const Compose: React.FC<ComposeProps> = (props) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("0");

  const [tags, setTags] = React.useState<ITag[]>([])

  React.useEffect(()=>{
      (async () => {
          const res = await fetch ("/api/tags")
          const tags = await res.json()
          setTags(tags)
      })();
  }, []);

  let navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ title, content });
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    const blogResult = await res.json();
    
    const res2 = await fetch("/api/blogtags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogid: blogResult.insertId, tagid: selectedTag }),
    });
    const blogtagResutls = await res2.json();
    console.log(blogtagResutls)


    navigate("/");
  };

  return (
    <main className="container">
      <section className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <form className="form-group p-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control w-75"
              placeholder="Your title here"
            />
            <label htmlFor="tagid">Select a categoty</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="form-select w-50"
            >
              <option disabled className="" value="0">Select a tag...</option>
              {tags.map(tag => (
                  <option key={`tag-${tag.id}`} value={tag.id}>{tag.name}</option>
              ))}
            </select>

            <label htmlFor="content">Content</label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
              rows={20}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Eu scelerisque felis imperdiet proin fermentum. Blandit cursus risus at ultrices ..."
            ></textarea>
            <div className="d-flex justify-content-end mt-3">
              <button onClick={handleSubmit} className="btn btn-primary">
                Post
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

interface ComposeProps {}

export default Compose;
