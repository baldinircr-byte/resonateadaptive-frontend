import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "resonateadaptive-frontend";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: isGitHubPages ? `/${repoName}` : undefined,
  basePath: isGitHubPages ? `/${repoName}` : undefined,
};

export default nextConfig;
