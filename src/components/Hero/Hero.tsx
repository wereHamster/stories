import { css, cx } from "@linaria/core";
import * as React from "react";
import Image from "next/image";
import { importImage } from "../../../image.macro";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

const image = importImage("https://storage.googleapis.com/stories.caurea.org/one-more-rush/IMG_3676.jpeg");

function Hero(props: Props) {
  const { className, ...rest } = props;

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
    <Root ref={ref} className={cx(classes.root, className)} {...rest}>
      <div className={classes.brandmark}>
        <div>Stories</div>
        <div>by Tomas Carnecky</div>
      </div>

      <div className={classes.top}>
        <div className={classes.image}>
          <Image src={image.src} layout="fill" objectFit="cover" />
          <div className="sqip" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${image.sqip.src})` }} />
        </div>

        <div className={classes.title}>Semper viverra nam libero justo laoreet</div>
      </div>

      <div>
        <div className={classes.teaser}>
          Suspendisse ultrices gravida dictum fusce ut. Vestibulum lectus mauris ultrices eros in cursus turpis massa
          tincidunt. Amet cursus sit amet dictum sit amet justo donec enim. Ut tortor pretium viverra suspendisse
          potenti.
        </div>
      </div>
    </Root>
  );
}

export default Hero;

const classes = {
  root: css`
    overflow: hidden;
    position: relative;
  `,

  brandmark: css`
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 2;

    padding: 22px 28px;

    background: black;
    color: white;

    & > *:first-child {
      font-weight: 900;
      font-size: 36px;
      line-height: 36px;
      letter-spacing: 0.11em;
    }
    & > *:last-child {
      font-size: 16px;
      line-height: 16px;

      padding-top: 4px;
      opacity: 0.75;
    }
  `,

  top: css`
    height: 100vh;
    position: relative;
  `,

  image: css`
    position: relative;
    height: 100%;

    & > div:first-child {
      margin: 56px 0 56px 88px !important;
    }

    .sqip {
      position: absolute;
      top: 56px;
      right: 0;
      bottom: 56px;
      left: 88px;
      pointer-events: none;
      transition: opacity 0.8s ease-out 0.2s;
      background-size: cover;
      background-position: 50% 50%;

      z-index: 1;
    }
  `,

  title: css`
    position: absolute;
    bottom: 112px;
    left: 116px;
    z-index: 2;

    padding: 20px;

    background: black;
    color: white;

    font-size: 56px;
    line-height: 56px;
  `,

  teaser: css`
    background: black;
    color: white;

    padding: 24px 20px;

    font-size: 28px;
    line-height: 34px;

    max-width: 530px;

    margin-top: -88px;
    margin-left: 116px;

    z-index: 1;
    position: relative;
  `,
};
