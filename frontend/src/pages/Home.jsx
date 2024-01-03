import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();

  const [posts, setPosts] = useState([]);
  const [noresults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) setNoResults(true);
      else setNoResults(false);
      console.log(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <>
      <Navbar />
      <div className="px-8 px=[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noresults ? (
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
