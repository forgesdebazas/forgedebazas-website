const { createClient } = require("@sanity/client");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pmu0ecrc";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;
const shouldWrite = process.argv.includes("--write");

const fields = ["content", "contentEn", "contentEs"];

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

function key(prefix = "k") {
  return `${prefix}${Math.random().toString(36).slice(2, 10)}`;
}

function span(text, marks = []) {
  return {
    _key: key("s"),
    _type: "span",
    marks,
    text,
  };
}

function block(text, style = "normal", listItem) {
  const value = {
    _key: key("b"),
    _type: "block",
    style,
    markDefs: [],
    children: [span(text)],
  };

  if (listItem) {
    value.listItem = listItem;
    value.level = 1;
  }

  return value;
}

function looksLikeListLine(line) {
  return /^([-*•]\s+|\d+[.)]\s+)/.test(line);
}

function stripListMarker(line) {
  return line.replace(/^([-*•]\s+|\d+[.)]\s+)/, "").trim();
}

function textToPortableText(value) {
  return value
    .split(/\n{2,}/)
    .flatMap((section) => {
      const lines = section
        .split(/\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length === 0) return [];

      if (lines.length > 1 && lines.slice(1).some(looksLikeListLine)) {
        const [heading, ...items] = lines;
        return [
          block(heading, "h3"),
          ...items.map((item) =>
            block(stripListMarker(item), "normal", /^\d+[.)]\s+/.test(item) ? "number" : "bullet"),
          ),
        ];
      }

      if (lines.length === 1 && lines[0].length <= 80 && !/[.!?]$/.test(lines[0])) {
        return [block(lines[0], "h3")];
      }

      return [block(lines.join("\n"))];
    });
}

async function run() {
  const docs = await client.fetch(
    `*[_type == "actualite"]{
      _id,
      title,
      content,
      contentEn,
      contentEs
    }`,
  );

  const updates = docs
    .map((doc) => {
      const set = {};

      for (const field of fields) {
        if (typeof doc[field] === "string" && doc[field].trim() !== "") {
          set[field] = textToPortableText(doc[field]);
        }
      }

      return { doc, set };
    })
    .filter(({ set }) => Object.keys(set).length > 0);

  console.log(
    `${shouldWrite ? "Migrating" : "Dry run:"} ${updates.length} actualite document(s) need Portable Text conversion.`,
  );

  for (const { doc, set } of updates) {
    console.log(`- ${doc._id} ${doc.title || ""}: ${Object.keys(set).join(", ")}`);

    if (shouldWrite) {
      await client.patch(doc._id).set(set).commit();
    }
  }

  if (!shouldWrite) {
    console.log("No documents were changed. Re-run with --write and SANITY_API_WRITE_TOKEN to apply.");
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
