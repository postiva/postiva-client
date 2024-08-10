"use client";
import { postivaClient } from "@/libs/postiva";
import { Content } from "@postiva/client";
import Image from "next/image";

export default function PostCard({ post }: { post: Content }) {
  const handleClap = async () => {
    const response = await postivaClient.contents.clap(post.id, {count:1});
    console.log("response", response);
  };

  return (
    <div key={post.id}>
      <span>{post.id}</span>
      <h2>{post.title}</h2>
      <Image
        src={post.thumbnail as string}
        alt={post.title}
        width={200}
        height={200}
      />
      <button onClick={handleClap}>Clap</button>
      <p>{post.body}</p>
      <p>{post.publishedBy?.user.name}</p>
    </div>
  );
}
