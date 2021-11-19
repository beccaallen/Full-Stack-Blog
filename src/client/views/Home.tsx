import * as React from "react";
import BlogPreview from "../components/BlogPreview";
import { IBlog } from "../utils/types";

const Home: React.FC<HomeProps> = (props) => {

const [blogs, setBlogs] = React.useState<IBlog[]>([])

React.useEffect(()=> {
    (async ()=> {
        const res = await fetch("/api/blogs")
        const blogs = await res.json()
        setBlogs(blogs)
    })();
}, [])
return (
    <main className="container">
        <section className="row justify-content-center my-5">
           {blogs.map(blog => (
               <BlogPreview key={`blog-preview-${blog.id}`} blog={blog}/>
           ))}
        </section>
    </main>
)    
}

interface HomeProps {}

export default Home;