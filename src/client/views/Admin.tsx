import { application } from "express";
import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ITag } from "../utils/types";

let oldId: number = null;

const Admin: React.FC<AdminProps> = (props) => {
  const navigate = useNavigate();
  const { blogid } = useParams();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("0");

  const [tags, setTags] = React.useState<ITag[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/tags");
      const tags = await res.json();
      setTags(tags);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const res = await fetch(`/api/blogs/${blogid}`);
      const blog = await res.json();

      const res2 = await fetch(`/api/blogtags/${blogid}`);
      const blogtags = await res2.json();
      oldId = blogtags[0].id;

      setTitle(blog.title);
      setContent(blog.title);
      setSelectedTag(blogtags[0].id);
    })();
  }, [blogid]);

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ title, content });
    const res = await fetch(`/api/blogs/${blogid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    const resultBlog = await res.json();

    if (oldId !== Number(selectedTag)) {
      const res2 = await fetch(`/api/blogtags/${blogid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldId, newId: Number(selectedTag) }),
      });
      const resultBlogtag = await res2.json();
    }
    navigate(`/details/${blogid}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${blogid}`, {
      method: "DELETE",
    });
    const res2 = await fetch(`/api/blogtags/${blogid}`, {
      method: "DELETE",
    });
    if (res.ok && res2.ok) {
      navigate("/");
    }
  };

  return (
    <main className="container">
      <section className="row justify-content-center my-5">
        <div className="col-lg-6">
          <form className="form-group p-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Your title here"
            />
            <label htmlFor="tagid">Select a categoty</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="form-select w-50"
            >
              <option disabled className="" value="0">
                Select a tag...
              </option>
              {tags.map((tag) => (
                <option key={`tag-${tag.id}`} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>

            <label htmlFor="content">Content</label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
              rows={20}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Eu scelerisque felis imperdiet proin fermentum. Blandit cursus risus at ultrices mi tempus imperdiet. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Mattis vulputate enim nulla aliquet porttitor lacus. Hac habitasse platea dictumst quisque sagittis purus. Dolor sed viverra ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Vulputate sapien nec sagittis aliquam. Erat imperdiet sed euismod nisi porta lorem. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Lectus magna fringilla urna porttitor rhoncus dolor. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Feugiat pretium nibh ipsum consequat nisl. Id donec ultrices tincidunt arcu non sodales neque sodales. Eleifend quam adipiscing vitae proin sagittis..."
            ></textarea>
            <div className="d-flex justify-content-end my-3">
              <Link
                className="btn btn-outline-primary mx-3"
                to={`/details/${blogid}`}
              >
                Discard Changes
              </Link>
              <div>
                <button onClick={handleDelete} className="btn btn-danger mx-3">
                  Delete
                </button>
                <button onClick={handleEdit} className="btn btn-success mx-3">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

interface AdminProps {}

export default Admin;
