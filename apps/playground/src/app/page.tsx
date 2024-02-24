import { postivaClient } from "@/libs/postiva";

export default async function Home() {
  const posts = await postivaClient.getContents({query: "test"}).pagination({page: 1, size: 1})

  return (
    <div>
      <h1>Postiva Playground</h1>

      <ul>
        {posts?.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
