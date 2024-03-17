import { postivaClient } from "@/libs/postiva";
import Image from "next/image";

export default async function Home() {
  const posts = await postivaClient.contents.getContents();

  return (
    <div>
      <h1>Postiva Playground</h1>

      {posts?.data?.map((post) => (
        <div key={post.id}>
          <span>{post.id}</span>
          <h2>{post.title}</h2>
          <Image
            src={post.thumbnail as string}
            alt={post.title}
            width={200}
            height={200}
          />
          <p>{post.body}</p>
          <p>{post.publishedBy?.user.name}</p>
        </div>
      ))}
    </div>
  );
}
