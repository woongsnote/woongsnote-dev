import { useRouter } from "next/router";
import Page from "../../components/page";

const Project = () => {
  const router = useRouter();
  const { projectId } = router.query;
  return <Page>Project: {projectId}</Page>;
};

export default Project;
