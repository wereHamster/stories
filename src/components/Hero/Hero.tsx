import { css, cx } from "@linaria/core";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import * as Icons from "react-feather";
import { importImage } from "../../../image.macro";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  story: {
    id: string;
    title: React.ReactNode;
    lead: React.ReactNode;
  };
}

const image = importImage("https://storage.googleapis.com/stories.caurea.org/one-more-rush/IMG_4340.jpeg");

function Hero(props: Props) {
  const { story, className, ...rest } = props;

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

        <h1 className={classes.title}>{story.title}</h1>
      </div>

      <div>
        <div className={classes.lead}>
          {story.lead}

          <Link href={`/${story.id}`}>
            <a className={classes.read}>
              <Icons.ArrowRight size={"1.1em"} /> read this story
            </a>
          </Link>
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

    margin: 0;
    padding: 24px 24px 20px;

    background: black;
    color: white;

    font-size: 56px;
    line-height: 56px;
    font-weight: inherit;

    min-width: 530px;
  `,

  lead: css`
    background: black;
    color: white;

    padding: 24px 24px;

    font-size: 28px;
    line-height: 38px;

    width: 530px;

    margin-top: -88px;
    margin-left: 116px;

    z-index: 1;
    position: relative;
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
