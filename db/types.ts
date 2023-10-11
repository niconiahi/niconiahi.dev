import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface _CfKV {
  key: string;
  value: Buffer | null;
}

export interface Article {
  slug: string;
  hash: string;
  title: string;
  description: string;
  html: string;
  createdAt: Generated<string | null>;
  updatedAt: string | null;
}

export interface D1Migrations {
  id: Generated<number | null>;
  name: string | null;
  applied_at: Generated<string>;
}

export interface DB {
  _cf_KV: _CfKV;
  article: Article;
  d1_migrations: D1Migrations;
}
