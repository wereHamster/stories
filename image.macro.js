const { join, dirname, basename, extname } = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

/*
 * Third-party dependencies
 */
const { parseExpression } = require("@babel/parser");
const { createMacro } = require("babel-plugin-macros");
const pkgDir = require("pkg-dir");
const mkdirp = require("mkdirp");

/*
 * Configuration
 */
const outputDirectory = pkgDir.sync();
const metadataCacheDirectory = `${outputDirectory}/.cache`;

/*
 * .init section
 */
mkdirp.sync(metadataCacheDirectory);

module.exports = createMacro(({ references, babel }) => {
  const toValue = (referencePath, sourceImage /** @type string */) => {
    /*
     * The fingerprint is constructed entirely using just the 'sourceImage'
     * (relative path or URL).
     */
    const hash = fingerprint(sourceImage);

    /*
     * Load the metadata (fetching the image and generating the metadata
     * if not in cache).
     */
    const metadata = loadMetadata(referencePath, sourceImage, hash);

    const value = {
      hash,

      src: sourceImage,

      width: metadata.width,
      height: metadata.height,

      sqip: {
        src: `data:image/svg+xml;base64,${Buffer.from(metadata.sqip.content).toString("base64")}`,
      },
    };

    return { sourceImage, value };
  };

  if (references.importImage) {
    references.importImage.forEach((referencePath) => {
      const { sourceImage, value } = toValue(referencePath, referencePath.parent.arguments[0].value);

      const replacement = parseExpression(`${JSON.stringify(value)}`);
      referencePath.parentPath.replaceWith(replacement);
    });
  }
});

const fingerprint = (...buffers) => {
  const hash = crypto.createHash("sha256");
  for (const buffer of buffers) {
    hash.update(buffer);
  }
  const ret = hash.digest();
  const alnum = (x) => {
    if (x < 26) return x + 65;
    if (x < 52) return x - 26 + 97;
    if (x < 62) return x - 52 + 48;
    throw new Error(`alnum: value out of range: ${x}`);
  };
  for (const [index, value] of ret.entries()) {
    ret[index] = alnum(value % 62);
  }
  return ret.toString("utf8");
};

function fetchSourceImage(url, path) {
  if (!fs.existsSync(path)) {
    const script = `
  const { get } = require("https");
  const { createWriteStream } = require("fs");
  get("${url}", res => { res.pipe(createWriteStream("${path}")); })
      `;
    execFileSync(process.execPath, ["-e", script]);
  }
}

const loadMetadata = (() => {
  const inMemoryCache = new Map();

  return (referencePath, sourceImage, hash) => {
    /*
     * This small inline module exists for the sole reason so that we can get the image
     * metadata inside synchronous code.
     *
     * The code running in a babel macro must be synchronous (no async code). But
     * the sqip function to get the image metadata is async. There is a 'deasync'
     * node module which one can use to convert async code to sync code, but its
     * use is discouraged.
     *
     * We solve this problem by running the following code in a synchronous subprocess
     * (child_process execFileSync). The code loads the metadata from the image and
     * prints it to stdout, where we can read it from.
     */
    const script = `
(async function main() {
  const input = await (async (sourceImage) => {
    if (sourceImage.startsWith("https://")) {
      return new Promise((resolve) => {
        const { get } = require("https");
        const { createWriteStream } = require("fs");
        get(sourceImage, res => {
          const chunks = []
          res.on('data', chunk => chunks.push(chunk))
          res.on('end', () => resolve(Buffer.concat(chunks)))
        });
      });
    } else {
      const { join, dirname, basename, extname } = require("path");
      const fs = require("fs");
      return fs.readFileSync(join(dirname("${referencePath.hub.file.opts.parserOpts.sourceFileName}"), sourceImage))
    }
  })("${sourceImage}");

  const sqip = await require("sqip").default({
    input,
    plugins: [
        {
          name: 'sqip-plugin-primitive',
          options: {
            numberOfPrimitives: 200,
            mode: 1,
          },
        },
        {
            name: 'sqip-plugin-blur',
            options: {
              blur: 1,
            },
        },
        'sqip-plugin-svgo',
      ],
  });

  process.stdout.write(JSON.stringify({
    width: sqip.metadata.originalWidth,
    height: sqip.metadata.originalHeight,
    sqip,
  }));
})();
`;

    /*
     * The key in the metadata cache is constructed from the source image fingerprint,
     * as well as the script which does the metadata extraction. This is to allow the
     * script to change, in which case we want to use a different cache key.
     */
    const key = `${fingerprint(hash, script)}`;

    const fromCache = inMemoryCache.get(key);
    if (fromCache) {
      return fromCache;
    }

    const cachePath = join(metadataCacheDirectory, key);
    try {
      const metadata = JSON.parse(fs.readFileSync(cachePath, "utf8"));
      inMemoryCache.set(key, metadata);
      return metadata;
    } catch (e) {
      console.log(`Failed to load metadata for ${key}. Running script…`, e.message);

      console.log("loadMetadata", sourceImage, hash);
      const metadata = JSON.parse(execFileSync(process.execPath, ["-e", script]));
      inMemoryCache.set(key, metadata);
      fs.writeFileSync(cachePath, JSON.stringify(metadata));
      return metadata;
    }
  };
})();
