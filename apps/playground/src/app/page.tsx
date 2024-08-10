import PostCard from "@/components/post";
import { postivaClient } from "@/libs/postiva";

export default async function Home() {
  const posts = await postivaClient.contents.getContents();

  return (
    <div>
      <h1>Postiva Playground</h1>
      {posts?.data?.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
