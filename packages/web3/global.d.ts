declare namespace NodeJS {
  export interface ProcessEnv {
    RIN_RPC: string
    ETH_RPC: string
    PRIVATE_KEY: string
    NODE_ENV: "production" | "development"
  }
}
