export async function fetchWithAuth(url, options = {}) {
    //SOLO SIRVE PARA GET!!!!!!!!!!!!!
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    const excludedEndpoints = ["/", "/register"];
    const isExcluded = excludedEndpoints.some((endpoint) =>
      url.includes(endpoint)
    );

    if (!isExcluded) {
      window.location.href = "/";
    }
  }

  return res;
}