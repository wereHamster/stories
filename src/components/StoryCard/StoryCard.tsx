import { css, cx } from "@linaria/core";
import Image from "next/image";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  image: {
    src: string;

    width: number;
    height: number;

    sqip: {
      src: string;
    };
  };

  caption: React.ReactNode;

  teaser?: React.ReactNode;

  layout?: "regular" | "inverted";
}

function StoryCard(props: Props) {
  const { image, caption, teaser, layout = "regular", ...rest } = props;

  const ref = React.useRef<null | HTMLDivElement>(null);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector('img[decoding="async"]');
    if (img) {
      {
        img.addEventListener(
          "load",
          () => {
            setLoaded(true);
          },
          { once: true }
        );
      }
    }
  }, []);

  return (
    <div ref={ref as any} {...rest} className={cx(classes.root, tweaks[layout])}>
      <h2 className={classes.title}>{caption}</h2>
      <div className={classes.byline}>Duis aute irure dolor in reprehenderit in voluptate.</div>

      <div
        className={cx(classes.image)}
        style={({ regular: { gridColumn: "ns / me" }, inverted: { gridColumn: "ms / ne" } } as const)[layout]}
      >
        <Image src={image.src} layout="fill" objectFit="cover" />
        <div className="sqip" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${image.sqip.src})` }} />
      </div>

      <div className={classes.teaser}>
        <div>{teaser}</div>
      </div>
    </div>
  );
}

export default StoryCard;

const tweaks = {
  regular: css``,
  inverted: css``,
};

const classes = {
  root: css`
    display: grid;

    color: black;
    text-decoration: none;

    --nc-w: 384px;
    --mc-w: 160px;
    --xc-w: 192px;

    grid-template-columns:
      [vs]
      1fr
      max(16px, env(safe-area-inset-left))
      [xs]
      minmax(0, var(--xc-w))
      [ms]
      var(--mc-w)
      [ns]
      var(--nc-w)
      [ne]
      var(--mc-w)
      [me]
      minmax(0, var(--xc-w))
      [xe]
      max(16px, env(safe-area-inset-right))
      1fr
      [ve];

    .sqip {
      position: absolute;
      inset: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      transition: opacity 0.8s ease-out 0.5s;
      background-size: cover;
      background-position: 50% 50%;

      z-index: 1;
    }
  `,

  image: css`
    position: relative;
    grid-column: ns / me;
    grid-row: 3 / span 2;
    min-height: 300px;
  `,

  title: css`
    font-size: 40px;
    line-height: 1.3;
    color: black;
    margin: 0;

    grid-column: ns / ve;
    ${tweaks.inverted} & {
      grid-column: ms / ve;
    }
  `,

  byline: css`
    font-size: 0.8rem;
    color: #666;
    margin: 0 0 32px;

    grid-column: ns / ve;
    ${tweaks.inverted} & {
      grid-column: ms / ve;
    }
  `,

  teaser: css`
    padding: 0 32px;
    margin-top: -0.2em;
    font-size: 18px;
    line-height: 1.5;

    & > div {
      max-width: 320px;
    }

    grid-column: me / ve;
    ${tweaks.inverted} & {
      grid-column: vs / ms;
      display: flex;
      justify-content: flex-end;
    }
  `,
};
