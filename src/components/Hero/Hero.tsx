import { Brandmark } from "@/components/Brandmark";
import { css, cx } from "@linaria/core";
import * as React from "react";
import { importImage } from "../../../image.macro";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

const image = importImage("https://storage.googleapis.com/stories.caurea.org/one-more-rush/IMG_4340.jpeg");

function Hero(props: Props) {
  const { className, ...rest } = props;

  return (
    <Root className={cx(classes.root, className)} {...rest}>
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
};
