import { DocsLayout } from "fumadocs-ui/layout";
import { Suspense, type ReactNode } from "react";
import { Logo } from "../../components/logo";
import { pageTree } from "../../utils/source";

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={pageTree}
      nav={{
        title: <Logo />,
        url: "https://postiva.app",
        enabled: true,
        transparentMode: "top",
        githubUrl: "https://github.com/postiva/postiva-client",
      }}
      links={[
        {
          text: "Documentation",
          url: "/",
        },
      ]}
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
