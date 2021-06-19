import { Brandmark } from "@/components/Brandmark";
import { css, cx } from "@linaria/core";
import Image from "next/image";
import * as React from "react";
import { importImage } from "../../../image.macro";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

const image = importImage("https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/DJI_0079.jpg");

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
    <Root className={cx(classes.root, className)} {...rest}>
      <div ref={ref} className={classes.image}>
        <Image src={image.src} layout="fill" objectFit="cover" />
        <div
          className="sqip"
          style={{
            opacity: loaded ? 0 : 1,
            backgroundImage: `url(${image.sqip.src})`,
          }}
        />
      </div>

      <div className={classes.box}>
        <Brandmark className={classes.brandmark} />
        <div className={classes.lead}>Nothing remains of us but the vibrations we leave behind.</div>
      </div>
    </Root>
  );
}

export default Hero;

const classes = {
  root: css`
    height: 100vh;
    display: grid;
    place-items: center;
    justify-items: center;
  `,

  box: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  `,

  brandmark: css`
    font-size: 5vw;
  `,

  lead: css`
    background: black;
    color: white;
    text-align: center;

    padding: 0.7em 1em;

    font-size: 2vw;
    line-height: 1.3;

    max-width: 600px;

    margin-top: 50px;
  `,

  image: css`
    position: relative;
    z-index: -1;
    width: calc(100vw - 176px);
    height: calc(100vh - 140px);

    grid-column: 1 / span 1;
    grid-row: 1 / span 1;

    .sqip {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      transition: opacity 0.8s ease-out 0.2s;
      background-size: cover;
      background-position: 50% 50%;

      z-index: 1;
    }
  `,
};
