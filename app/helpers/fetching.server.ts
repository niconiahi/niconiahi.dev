export enum Project {
  Mint = "MINT",
  Counter = "COUNTER",
}

export async function request<T>(
  query: string,
  project: Project,
  variables?: { [key: string]: any },
): Promise<T> {
  function getEndpoint(project: Project) {
    switch (project) {
      case Project.Mint: {
        return process.env.SUBGRAPH_MINT
      }
      case Project.Counter: {
        return process.env.SUBGRAPH_COUNTER
      }
    }
  }

  return fetch(getEndpoint(project), {
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
