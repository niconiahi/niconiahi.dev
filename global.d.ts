declare namespace NodeJS {
  export type ProcessEnv = {
    RIN_RPC: string
    ETH_RPC: string
    NODE_ENV: "production" | "development"
    PRIVATE_KEY: string
    SUBGRAPH_MINT: string
    SUBGRAPH_WAVER: string
    SUBGRAPH_COUNTER: string
  }
}
