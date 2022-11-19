import { useRouter } from "next/router";
import Page from "../../components/page";

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;
  return <Page>Post: {postId}</Page>;
};

export default Post;
