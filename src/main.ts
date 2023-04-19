import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkExternalLinks from "remark-external-links";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const target = path.join(process.cwd(), "src/example.md");
const contents = fs.readFileSync(target, "utf8");

const getmarkup = async () => {
  const matterResult = matter(contents);

  const processedContent = await remark()
    .use(remarkExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(remarkParse)
    .use(html)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);

  return processedContent.toString();
};

getmarkup().then((data) => console.log(data));
