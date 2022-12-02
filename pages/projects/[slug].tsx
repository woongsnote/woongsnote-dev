import { allProjects, Project } from "contentlayer/generated";
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsResult,
} from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import DetailHeader from "../../components/DetailHeader";
import Layout from "../../components/Layout";

export async function getStaticPaths() {
  const paths = allProjects.map((project) => ({
    params: { slug: project.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<{ project: Project }>> {
  const project = allProjects.find((project) => project.slug === params!.slug);
  return typeof project === "undefined"
    ? {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    : {
        props: {
          project,
        },
      };
}

const PostDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  project,
}) => {
  const Component = useMDXComponent(project.body.code);

  return (
    <Layout>
      <DetailHeader data={project} />
      <article className="prose prose-neutral lg:prose-xl dark:prose-invert">
        <Component />
      </article>
    </Layout>
  );
};

export default PostDetail;
