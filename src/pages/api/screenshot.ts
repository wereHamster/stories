import chrome from "chrome-aws-lambda";
import { either, pipeable } from "fp-ts";
import * as t from "io-ts";
import { NumberFromString } from "io-ts-types/lib/NumberFromString";
import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

/**
 * The shape of the query params. If the params can not be parsed
 * into this shape we fail the request.
 */
const Query = t.strict({
  path: t.string,
  deviceScaleFactor: t.union([t.undefined, NumberFromString]),
  element: t.union([t.undefined, t.string]),
  download: t.union([t.undefined, t.string]),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { status, body, headers } = await pipeable.pipe(
      Query.decode(req.query),
      either.fold(
        /**
         * Decoding the query params failed, return 400.
         */
        async (errors: unknown) => ({
          status: 400,
          body: JSON.stringify({ errors }),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        async (query) => {
          /*
           * We have a valid request, and can proceed with launching the browser,
           * and capturing the image.
           */
          const browser = await puppeteer.launch({
            dumpio: true,
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
          });
          const deviceScaleFactor = query.deviceScaleFactor || 1;
          const page = await browser.newPage();
          await page.setViewport({ width: 1200, height: 630, deviceScaleFactor });
          await page.goto(`http://${req.headers.host}${query.path}`, {
            waitUntil: process.env.NODE_ENV === "production" ? "networkidle0" : "load",
          });

          /*
           * Wait a bit longer still to give the page chance to finish rendering.
           */
          await new Promise((resolve) => setTimeout(resolve, 500));

          const headers: Record<string, string> = { "Content-Type": "image/png" };
          if (query.download) {
            headers["Content-Disposition"] = `attachment; filename=${query.download}.png`;
          }

          if (query.element) {
            /*
             * The request is for a screenshot of a specific element. This elment may not
             * exist though. If it doesn't it's treated as a client error (status 400).
             */
            await page.waitForSelector(query.element);
            const elementHandle = await page.$(query.element);
            if (!elementHandle) {
              return {
                status: 400,
                body: JSON.stringify({ error: `Element ${query.element} not found` }),
                headers: {
                  "Content-Type": "application/json",
                },
              };
            } else {
              return {
                status: 200,
                body: await elementHandle.screenshot({ type: "png" }),
                headers,
              };
            }
          } else {
            /*
             * Full-page screenshot.
             */
            return {
              status: 200,
              body: await page.screenshot({ type: "png", fullPage: true }),
              headers,
            };
          }
        }
      )
    );

    res.statusCode = status;
    for (const [k, v] of Object.entries(headers)) {
      res.setHeader(k, v as any);
    }
    res.end(body);
  } catch (error) {
    /*
     * This catches any unhandled exception that happen during processing
     * of the request. These are treated as internal errors (status 500).
     */

    console.error(error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error }));
  }
};
