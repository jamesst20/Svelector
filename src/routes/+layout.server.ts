type SidebarItem = { [key: string]: unknown; path: string; position: number; text: string };

export async function load() {
  const markdownFiles = import.meta.glob("./docs/**/*.{svx,md}", { eager: true });

  const sidebarItems: SidebarItem[] = Object.entries(markdownFiles).map(([path, post]: any, i) => {
    const postPath = path.replaceAll("./", "/").replaceAll("/+page.md", "");
    return {
      ...post.metadata,
      path: postPath,
      position: parseInt(post.metadata.position) || 1000 + i,
      text: post.metadata.sidebar,
    };
  });

  sidebarItems.sort((a, b) => {
    if (a.position < b.position) return -1;
    if (a.position > b.position) return 1;
    return 0;
  });

  return {
    sidebarItems,
  };
}
