import { postivaClient } from "@/libs/postiva";

export default async function Home() {
  const posts = await postivaClient.getContents();
  console.log("hop", posts);

  return (
    <div>
      <h1>Postiva Playground</h1>

      <ul>{posts?.data?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
    </div>
  );
}
