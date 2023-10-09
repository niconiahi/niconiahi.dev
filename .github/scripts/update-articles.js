const run = require("@jamesives/fetch-api-data-action");
const path = require("path");
const fsp = require("fs/promises");
const crypto = require("crypto");
const invariant = require("tiny-invariant");
const createDOMPurify = require("dompurify");
const { marked } = require("marked");
const { JSDOM } = require("jsdom");
const hljs = require("highlight.js");
require("dotenv").config();
const CLOUDFLARE_PURGE_API =
  "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/purge_cache";

async function main() {
  async function getArticle(slug) {
    // call to get article endpoint with "run"
  }

  async function createArticle(article) {
    // call to create article endpoint with "run"
  }

  async function updateArticle(slug, article) {
    // call to update article endpoint with "run"
  }

  const articlesPath = path.join(process.cwd(), "articles");
  const articles = await fsp.readdir(articlesPath);

  const articlesFileNamesPromises = articles.map(async (fileName) => {
    const slug = getSlug(fileName);
    const articlePath = articlesPath + `/${slug}.md`;
    const article = await fsp.readFile(articlePath, "utf-8");
    const hash = getHash(article);

    function getSlug(fileName) {
      return fileName.split(".md")[0];
    }

    function getHash(string) {
      return crypto.createHash("md5").update(string).digest("hex");
    }

    function getHtml(article) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";

          return hljs.highlight(code, { language }).value;
        },
        langPrefix: "hljs language-",
        pedantic: false,
        gfm: true,
        breaks: false,
      });

      const { window } = new JSDOM("");
      // @ts-expect-error types don't match but it works. I don't know how to coerce it in a way
      //                  that is happy and is clean
      const DOMPurify = createDOMPurify(window);
      // we remove description and title header, used for routing
      const html = DOMPurify.sanitize(marked.parse(article.split("---")[2]));

      return html;
    }

    async function invalidateBySlug(slug) {
      try {
        run(CLOUDFLARE_PURGE_API, {
          body: {
            files: [`https://www.niconiahi.dev/article/${slug}`],
          },
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Key": process.env.CLOUDFLARE_AUTH_KEY,
            "X-Auth-Email": process.env.CLOUDFLARE_AUTH_EMAIL,
          },
        });
      } catch (error) {
        console.log("Error when invalidting by slug =>", error);
        // nothing yet. Would be nice tracking this and being aware each time it happens
      }
    }

    const prevArticle = await getArticle(slug);

    if (!prevArticle) {
      const titleMatch = article.match(/(?<=title:).*/);
      invariant(titleMatch, 'Article should contain a "title"');
      const [title] = titleMatch;

      const descriptionMatch = article.match(/(?<=description:).*/);
      invariant(descriptionMatch, 'Article should contain a "description"');
      const [description] = descriptionMatch;

      await createArticle({
        title: title.trim(),
        description,
        slug,
        html: getHtml(article),
        hash,
      });
      console.log(`Created https://www.niconiahi.dev/article/${slug}`);
      await invalidateBySlug(slug);
      console.log(`Invalidated https://www.niconiahi.dev/article/${slug}`);
    } else if (prevArticle.hash !== hash) {
      await updateArticle(slug, { html: getHtml(article) });
      console.log(`Updated https://www.niconiahi.dev/article/${slug}`);
      await invalidateBySlug(slug);
      console.log(`Invalidated https://www.niconiahi.dev/article/${slug}`);
    }
  });

  await Promise.all(articlesFileNamesPromises);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
