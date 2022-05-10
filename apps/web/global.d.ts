declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: "production" | "development"
    SUBGRAPH_MINT: string
    SUBGRAPH_WAVER: string
    SUBGRAPH_COUNTER: string
  }
}
