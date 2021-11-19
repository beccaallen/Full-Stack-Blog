import moment from "moment";
import * as React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import BlogPreview from "../components/BlogPreview";
import { IBlog, ITag } from "../utils/types";

const Details: React.FC<DetailsProps> = (props) => {
const { blogid } = useParams();
const [blog, setBlog] = React.useState<IBlog>(null);
const [blogtags, setBlogTags] = React.useState<ITag[]>([]);

React.useEffect(()=> {
    (async ()=> {
        const res = await fetch(`/api/blogs/${blogid}`)
        const blog = await res.json()

        const res2 = await fetch(`/api/blogtags/${blogid}`)
        const blogtags = await res2.json()
        
        setBlog(blog)
        setBlogTags(blogtags)
    })();
}, [])

return (
    <main className="container">
        <section className="row justify-content-center">
        <div className="col-md-8">
      <article className="card my-2 shadow">
        <div className="card-body m-lg-4">
          <h4 className="card-title">{blog?.title}</h4>
          <small>
              <h6 className="card-text text-muted mb-2">by <b>{blog?.name}</b></h6>
              <h6 className="card-text text-muted mb-2">
                  {" "}
                  {moment(blog?._created).format("MMM Do, YYYY")}
                </h6>
                <div className="d-flex flex-wrap align-items-center">
                    {blogtags.map(blogtag => (
                        <span  className= "mx-2 bg-light p-2"key={`blogtag-${blogtag.id}`}>{blogtag.name}</span>
                    ))}
                </div>
          </small>
          <div className="card-text m-3">
            {blog?.content.split("\n").map((para, i) => <p key={`p-block-${i}`}>{para}</p>)}
          </div>
      <div className="d-flex justify-content-end mx-3">
          <Link className="btn btn-outline-primary mx-3" to={"/"}>Back to Home</Link>
          <Link className="btn btn-outline-secondary mx-3" to={`/admin/${blogid}`}>Admin</Link>
      </div>
        </div>
      </article>
    </div>     
        </section>
    </main>
)    
}

interface DetailsProps {}

export default Details;