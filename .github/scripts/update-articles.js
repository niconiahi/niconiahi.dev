import path from 'path'
import fsp from 'fs/promises'
import crypto from 'crypto'
import invariant from 'tiny-invariant'
import createDOMPurify from 'dompurify'
import { marked } from 'marked'
import { JSDOM } from 'jsdom'
import hljs from 'highlight.js'
import dotenv from 'dotenv'

dotenv.config()

const CLOUDFLARE_PURGE_URL =
  "https://api.cloudflare.com/client/v4/zones/identifier/purge_cache";
const NICONIAHI_DEV_URL = "https://niconiahi-dev.pages.dev";
const ROUTES = {
  getArticle(slug) {
    return `/article/get/${slug}`;
  },
  createArticle() {
    return `/article/create`;
  },
  updateArticle(slug) {
    return `/article/update/${slug}`;
  },
};

async function main() {
  async function getArticle(slug) {
      try {
        const response = await fetch(`${NICONIAHI_DEV_URL}${ROUTES.getArticle(slug)}`, {
          headers: { "Content-Type": "application/json" },
        })
        console.log('fetched article from "getArticle" => transformed to text =>', await response.text())
        console.log('fetched article from "getArticle" =>', await response.json())
      } catch (error) {
        console.log("Error when getting by slug =>", error);
        // nothing yet. It would be nice to track this and being aware each time it happens
      }
  }

  async function createArticle(article) {
      try {
        const response = await fetch(`${NICONIAHI_DEV_URL}${ROUTES.createArticle()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ article })
        })
        console.log('created article from "createArticle" =>', response.json())
      } catch (error) {
        console.log("Error when creating article =>", error);
        // nothing yet. It would be nice to track this and being aware each time it happens
      }
  }

  async function updateArticle(slug, article) {
      try {
        const response = await fetch(`${NICONIAHI_DEV_URL}${ROUTES.updateArticle(slug)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ article })
        })
        console.log('updated article from "updateArticle" =>', response.json())
      } catch (error) {
        console.log("Error when updating by slug =>", error);
        // nothing yet. It would be nice to track this and being aware each time it happens
      }
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
        fetch(CLOUDFLARE_PURGE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prefixes: [`${NICONIAHI_DEV_URL}/article/${slug}`],
          })
        })
      } catch (error) {
        console.log("Error when invalidating by slug =>", error);
        // nothing yet. It would be nice to track this and being aware each time it happens
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
