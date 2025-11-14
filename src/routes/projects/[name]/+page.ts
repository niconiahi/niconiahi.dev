import { error } from "@sveltejs/kit";
import type { Component } from "svelte";
import type { PageLoad } from "./$types";

type SvxModule = {
  default: Component;
};

const modules = import.meta.glob("./*.svx", { eager: true }) as Record<
  string,
  SvxModule
>;

export const load: PageLoad = async ({ params }) => {
  const module = modules[`./${params.name}.svx`];
  if (!module) {
    error(404, `project "${params.name}" not found`);
  }
  return {
    component: module.default,
  };
};

export function entries() {
  return Object.keys(modules).map((path) => ({
    name: path.replace("./", "").replace(".svx", ""),
  }));
}
