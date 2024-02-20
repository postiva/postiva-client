import { postivaClient } from "@/libs/postiva";

export default async function Home() {
  const posts = await postivaClient.getContents()

  return (
    <div>
      <h1>Postiva Playground</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
