export const fetchApi = async (url: string, search?: string) => {
  try {
    const response = await fetch(`${url}?` + new URLSearchParams(search ? { search: search } : {}), {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("API returned invalid data:", data);
      }
    }
  } catch (error) {
    console.error(`Failed to pull data from API: ${url}`, error);
  }
  return [];
};
