import { Query } from "../index";

const all = () => Query("SELECT * FROM tags")

export default {
    all
}