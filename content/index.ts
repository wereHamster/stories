import dynamic from "next/dynamic";

export default {
  "where-i-was-meant-to-be": {
    Card: dynamic(() => import(`./where-i-was-meant-to-be/card`)),
    meta: require("./where-i-was-meant-to-be/meta").default,
    Header: dynamic(() => import(`./where-i-was-meant-to-be/header`)),
    Body: dynamic(() => import(`./where-i-was-meant-to-be/body.mdx`)),
    Image: dynamic(() => import(`./where-i-was-meant-to-be/image`)),
  },
  "one-more-rush": {
    Card: dynamic(() => import(`./one-more-rush/card`)),
    meta: require("./one-more-rush/meta").default,
    Header: dynamic(() => import(`./one-more-rush/header`)),
    Body: dynamic(() => import(`./one-more-rush/body.mdx`)),
    Image: dynamic(() => import(`./one-more-rush/image`)),
  },
} as const;
