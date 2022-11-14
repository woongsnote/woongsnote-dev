import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;
  return <div>Post: {postId}</div>;
};

export default Post;
