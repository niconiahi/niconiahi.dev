import type {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import highlightCss from "highlight.js/styles/a11y-dark.css";
import articleCss from "~/styles/article.css";
// import { getArticle } from "~/models/article.server";
import IconLink from "~/components/icon-link";
import ArrowLeftIcon from "~/icons/arrow-left";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: articleCss },
    { rel: "stylesheet", href: highlightCss },
    {
      rel: "preload",
      href: "https://www.niconiahi.dev/fonts/JetBrainsMono-Regular.ttf",
      as: "font",
      type: "font/ttf",
      crossorigin: "anonymous",
    },
  ];
};

export const meta: V2_MetaFunction = ({ data }) => {
  return [
    {
      title: `${data.title} by niconiahi`,
      description: data.description,
    },
  ];
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "no-cache",
});

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, `params.slug is required`);

  // const article = await getArticle(params.slug);
  // invariant(article, `Article not found: ${params.slug}`);

  return json(
    {
      // title: article.title,
      // html: article.html,
      // description: article.description,
      title: 'title',
      html: 'html',
      description: 'description',
    },
    {
      headers: {
        // https://stackoverflow.com/questions/7071763/max-value-for-cache-control-header-in-http
        "Cache-Control": "s-maxage=31536000",
      },
    }
  );
}

export default function ArticleSlug() {
  const { html } = useLoaderData<typeof loader>();

  return (
    <>
      <IconLink
        to={"/"}
        className="fixed bottom-4 right-0 w-min rounded-r-none border-y-2 border-l-2 border-gray-500 bg-gray-50 pr-4 md:p-3 md:pr-6"
      >
        <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
      </IconLink>
      <main
        className="mx-auto w-[48rem] max-w-full space-y-4 px-4 py-4 md:max-w-4xl md:space-y-6 md:py-20"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}