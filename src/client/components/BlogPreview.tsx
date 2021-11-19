import * as React from "react";
import { IBlog } from "../utils/types";
import * as moment from "moment";
import { Link } from "react-router-dom";

const BlogPreview: React.FC<BlogPreviewProps> = ({ blog }) => {
  return (
    <div className="col-md-8">
      <article className="card my-2 shadow">
        <div className="card-body">
          <h4 className="card-title">{blog.title}</h4>
          <p className="card-text text-muted mb-2">by {blog.name}</p>
          <p className="card-text mb-2">
            {blog.content.substring(0, 300)}...{" "}
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <p className="card-text text-muted mb-2">
              {" "}
              {moment(blog._created).format("MMM Do, YYYY")}
            </p>
            <Link className="btn btn-primary" to={`/details/${blog.id}`}>Read More</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

interface BlogPreviewProps {
  blog: IBlog;
}

export default BlogPreview;
