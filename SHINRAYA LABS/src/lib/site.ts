const configuredUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const siteUrl = new URL(configuredUrl);
export const siteDescription =
  "Shinraya Tech Labs is an independent AI research and engineering lab. Explore open experiments, reproducible results, and the systems built to investigate them.";
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Engineering", href: "/engineering" },
  { label: "Publications", href: "/publications" },
  { label: "About", href: "/about" },
  { label: "Contribute", href: "/contribute" },
];
