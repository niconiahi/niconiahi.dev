import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  try {
    const component = await import(`./${params.name}.svx`);
    return {
      component: component.default,
    };
  } catch (_error) {
    if (_error instanceof Error) {
      error(404, `project "${params.name}" not found`);
    }
  }
};
