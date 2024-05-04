import { DocsLayout } from "fumadocs-ui/layout";
import { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Logo } from "../../components/logo";
import { pageTree } from "../../utils/source";

export const metadata: Metadata = {
  title: {
    default: "Postiva Client Documentation",
    template: "%s - Postiva",
  },
  openGraph: {
    title: "Postiva Client Documentation",
    type: "website",
    url: "https://docs.postiva.app/",
    images: [
      {
        url: "/images/og_image.png",
        width: 1200,
        height: 630,
        alt: "Postiva Client Documentation",
      },
    ],
    description: "Postiva Client Documentation",
    siteName: "Postiva",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Postiva",
    title: "Postiva - Content Creation and Sharing Made Easy",
    description:
      "Discover Postiva's intuitive platform that simplifies content creation, management, and sharing for creators and businesses alike.",
    images: ["/images/og_image.png"],
    creator: "@postivaapp",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.ico",
    },
  ],
  metadataBase: new URL("https://docs.postiva.app"),
};

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={pageTree}
      nav={{
        title: <Logo />,
        url: "/",
        enabled: true,
        transparentMode: "always",
        githubUrl: "https://github.com/postiva/postiva-client",
      }}
      sidebar={{
        collapsible: false,
        footer: (
          <Suspense>
            <SidebarFooter />
          </Suspense>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}

async function SidebarFooter() {
  const version = await getLatestVersion();
  return (
    <footer className="flex w-full items-baseline gap-2 text-zinc-600 dark:text-zinc-400">
      <a
        href={`https://npmjs.com/package/@postiva/client/v/${version}`}
        className="hover:underline"
        tabIndex={-1}
      >
        <pre className="text-xs">@postiva/client@{version}</pre>
      </a>
    </footer>
  );
}

async function getLatestVersion() {
  try {
    const res = await fetch("https://registry.npmjs.org/@postiva/client", {
      next: {
        tags: ["npm"],
      },
    }).then((r) => r.json());
    return res["dist-tags"].latest;
  } catch {
    return "latest";
  }
}
