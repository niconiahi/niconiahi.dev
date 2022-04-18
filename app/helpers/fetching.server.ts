export async function request<T>(
  query: string,
  variables?: { [key: string]: any },
): Promise<T> {
  return fetch(process.env.SUBGRAPH_MINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      ...(variables ? variables : {}),
    }),
  })
    .then((response) => response.json())
    .then((response) => response.data)
}
