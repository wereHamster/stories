import { Brandmark } from "@/components/Brandmark";
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

  title: string;
}

function Header(props: Props) {
  const { image, title, className, ...rest } = props;

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
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      <Brandmark className={classes.brandmark} />

      <div className={classes.image}>
        <Image src={image.src} layout="fill" objectFit="cover" />
        <div
          className="sqip"
          style={{
            opacity: loaded ? 0 : 1,
            backgroundImage: `url(${image.sqip.src})`,
          }}
        />
      </div>

      <h1 className={classes.title}>{title}</h1>
    </Root>
  );
}

export default Header;

const classes = {
  root: css`
    height: 100vh;
    position: relative;
  `,

  brandmark: css`
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 2;
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
};
