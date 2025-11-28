import CreatePostModal from "./HomeComponents/CreatePostModal";
import PostList from "./HomeComponents/PostList";


const Home = () => {
    return (
        <div className="space-y-5">
            <CreatePostModal />
            <PostList />
        </div>
    );
};

export default Home;