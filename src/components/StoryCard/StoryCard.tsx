import { css, cx } from "@linaria/core";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import * as Icons from "react-feather";

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

  story: {
    id: string;
  };

  blocks?: Array<Props["image"]>;

  caption: React.ReactNode;

  teaser?: React.ReactNode;

  layout?: "regular" | "inverted";
}

function StoryCard(props: Props) {
  const { story, blocks = [], image, caption, teaser, layout = "regular", ...rest } = props;

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

      <div className={cx(classes.image)}>
        <Image src={image.src} layout="fill" objectFit="cover" />
        <div className="sqip" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${image.sqip.src})` }} />
      </div>

      <div className={classes.teaser}>
        <div>
          {teaser}

          <Link href={`/${story.id}`}>
            <a className={classes.read}>
              <Icons.ArrowRight size={"1.1em"} /> read this story
            </a>
          </Link>
        </div>
      </div>

      <div className={cx(classes.image2)}>
        <Image src={(blocks[0] ?? image).src} layout="fill" objectFit="cover" />
        <div
          className="sqip"
          style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${(blocks[0] ?? image).sqip.src})` }}
        />
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

    grid-template-rows: min-content minmax(0, min-content) 1fr;

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
    height: 0;
    padding-bottom: calc((11 / 16) * 100%);

    grid-row: 2 / span 2;
    grid-column: xs / me;
    ${tweaks.inverted} & {
      grid-column: ms / xe;
    }
  `,

  image2: css`
    position: relative;
    height: calc(100% - 32px + 10vh);

    margin: 32px;

    grid-row: 3 / span 1;
    grid-column: me / ve;
    ${tweaks.inverted} & {
      grid-column: vs / ms;
    }
  `,

  title: css`
    font-size: 56px;
    line-height: 56px;
    font-weight: inherit;

    margin: 0 0 32px 0;
    padding: 24px 24px 20px;

    background: black;
    color: white;

    grid-column: ns / ve;
    ${tweaks.inverted} & {
      grid-column: ms / ve;
    }
  `,

  teaser: css`
    margin: 0 32px;
    font-size: 24px;
    line-height: 34px;

    & > div {
      max-width: 530px;

      background: black;
      color: white;

      padding: 24px 24px;
    }

    grid-column: me / ve;
    ${tweaks.inverted} & {
      grid-column: vs / ms;
      display: flex;
      justify-content: flex-end;
    }
  `,

  read: css`
    display: block;
    margin-top: 56px;
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 6px;

    color: inherit;
    text-decoration: none;

    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    & > svg {
      margin: 0 8px 0 0;
    }
  `,
};
