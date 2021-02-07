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
const imageCacheDirectory = `${outputDirectory}/node_modules/.cache/zhif`;
const metadataCacheDirectory = `${outputDirectory}/.cache`;

/*
 * .init section
 */

mkdirp.sync(imageCacheDirectory);
mkdirp.sync(metadataCacheDirectory);

module.exports = createMacro(({ references, babel }) => {
  const toValue = (referencePath, sourceImage) => {
    /*
     * Resolve the path to the source image and make it absolute. We also
     * get the filename (without the extension).
     */
    const { path, name } = (() => {
      const ext = extname(sourceImage);
      const name = basename(sourceImage, ext);

      if (sourceImage.startsWith("https://")) {
        const path = join(imageCacheDirectory, `${fingerprint(sourceImage, "source")}`);
        fetchSourceImage(sourceImage, path);
        return { name, path };
      } else {
        const { sourceFileName } = referencePath.hub.file.opts.parserOpts;
        return { name, path: join(dirname(sourceFileName), sourceImage) };
      }
    })();

    /*
     * Read the file so we can construct its hash, which we use to generate
     * the output filenames. This needs to happen synchronously, because we
     * use this hash in the generated code.
     */
    const hash = fingerprint(fs.readFileSync(path));

    /*
     * Synchronously get the metadata.
     */
    const metadata = loadMetadata(path, hash);

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

  return (path, hash) => {
    const key = `${fingerprint(hash, "metadata")}`;

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
      console.log(`Failed to load metadata for ${key}. Running script…`, e);

      /*
       * This small inline module exists for the sole reason so that we can get the image
       * metadata inside synchronous code.
       *
       * The code running in a babel macro must be synchronous (no async code). But
       * the sharp function to get the image metadata is async. There is a 'deasync'
       * node module which one can use to convert async code to sync code, but its
       * use is discouraged.
       *
       * We solve this problem by running the following code in a synchronous subprocess
       * (child_process execFileSync). The code loads the metadata from the image and
       * prints it to stdout, where we can read it from.
       */
      const script = `
const sqip = require("sqip").default;
Promise.all([
  sqip({
    input: "${path}",
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
  }),
]).then(([sqip]) => {
  process.stdout.write(JSON.stringify({
    width: sqip.metadata.originalWidth,
    height: sqip.metadata.originalHeight,
    sqip,
  }));
})
`;

      console.log("loadMetadata", path, "->", cachePath);
      const metadata = JSON.parse(execFileSync(process.execPath, ["-e", script]));
      inMemoryCache.set(key, metadata);
      fs.writeFileSync(cachePath, JSON.stringify(metadata));
      return metadata;
    }
  };
})();
