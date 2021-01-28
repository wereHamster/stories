import * as React from "react";
import styled from "styled-components";
import Image from 'next/image';
import { useBlurHash } from "@/hooks/useBlurHash";
// import { Meta } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.header`
  display: grid;
  
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content 1fr;

  justify-items: center;

  min-height: 100vh;

  position: relative;

  .bg {
    position: absolute;
    z-index: -1;
    inset: 0;
    pointer-events: none;
    transition: opacity .5s ease-out .1s;
    background-size: cover;
    background-position: 50% 50%;
  }

  & > div:first-child {
    z-index: -2;
  }

  .title {
    margin: 0;
    font-size: 4rem;
    text-align: center;
    color: #fff;
    padding: 8px 30px;
    background: rgba(0,0,0,.7);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 50vh;
    border-radius: 4px;
  }

  .subtitle {
    font-size: 1.5rem;
    color: #fff;
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
    margin-top: 8px;
  }

  .meta {
    grid-row: 3;
    text-align: center;
    align-self: end;
    margin: 15vh 0 24px;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blurHash?: string
  image: string

  title: React.ReactNode
  subtitle?: React.ReactNode
  date: Date
}

function Header(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { blurHash, image, title, subtitle, date, ...rest } = props;

  const [loaded, setLoaded] = React.useState(false);
  const blurHashURL = useBlurHash(blurHash);
  React.useEffect(() => {
    const i = new window.Image()
    i.addEventListener("load", () => 
    setTimeout(() => {
      setLoaded(true)
    }, 500), { once: true });
    i.src = image
  }, [image])

  return (
    <Root ref={ref as any} {...rest}>
      <Image src={image} layout="fill" objectFit="cover" />
      {/* {blurHashURL && <div className="bg" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url("${blurHashURL}")` }} />} */}
      <div className="bg" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQwIDIxNjAiPjxmaWx0ZXIgaWQ9ImIiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEiIC8+PC9maWx0ZXI+PHBhdGggZmlsbD0iI2IwYzBjOCIgZD0iTTAgMGgzODQwdjIxNjBIMHoiLz48ZyBmaWx0ZXI9InVybCgjYikiIHRyYW5zZm9ybT0ibWF0cml4KDE1IDAgMCAxNSA3LjUgNy41KSIgZmlsbC1vcGFjaXR5PSIuNSI+PGVsbGlwc2UgZmlsbD0iIzUzNjM3MiIgcng9IjEiIHJ5PSIxIiB0cmFuc2Zvcm09Im1hdHJpeCgtMTU1LjYxOTMyIDE1LjUzMjg3IC0yLjgzNzMgLTI4LjQyNjExIDIwMyAxMzUuMSkiLz48ZWxsaXBzZSBmaWxsPSIjZjNmYWY5IiByeD0iMSIgcnk9IjEiIHRyYW5zZm9ybT0ibWF0cml4KDEyOS44ODU0NCAxNi4wNjQ3NyAtNC40NDU5NSAzNS45NDU5NiAxMjAuNyA1Mi41KSIvPjxlbGxpcHNlIGZpbGw9IiM2NTc5ODUiIHJ4PSIxIiByeT0iMSIgdHJhbnNmb3JtPSJtYXRyaXgoMy4xNTQyMiAtMzEuMTk4MzYgNTMuMTMxMDcgNS4zNzE2NyAyMi41IDk5LjQpIi8+PGVsbGlwc2UgZmlsbD0iI2ZmZiIgcng9IjEiIHJ5PSIxIiB0cmFuc2Zvcm09Im1hdHJpeCgtNy42OTQ2NSAzLjA5NTkyIC0xNi42MjkyNSAtNDEuMzMwNiAxMDYuNSAxMjguNikiLz48cGF0aCBmaWxsPSIjZmZmZmZkIiBkPSJNMTg2IDEyMWw4NS04Ni0xMjEgNDZ6Ii8+PGVsbGlwc2UgZmlsbD0iIzZiN2Q4ZiIgcng9IjEiIHJ5PSIxIiB0cmFuc2Zvcm09Im1hdHJpeCgtMjcuNzI2NjUgMjQuNzkyNDggLTE4Ljc3NTUgLTIwLjk5NzU2IDI1NSA5MSkiLz48cGF0aCBmaWxsPSIjNTE2Nzc0IiBkPSJNMTIxIDk4aDQ3djIyaC00N3oiLz48cGF0aCBmaWxsPSIjMmIyMTE4IiBkPSJNNjYuNyAxNTlsMTEuNS0zNS41IDIzLjIgNy44LTguNiAxMy42eiIvPjxlbGxpcHNlIGZpbGw9IiM4OGJlZGMiIHJ4PSIxIiByeT0iMSIgdHJhbnNmb3JtPSJtYXRyaXgoLTE4NC4yMTM2OSAtMy4yMTU0NiAuMjQ3ODYgLTE0LjE5OTY4IDE0MC43IDEzLjQpIi8+PHBhdGggZmlsbD0iIzQ4NWM2ZSIgZD0iTTIxOSAxNTBsLTU5LTU0LTE1IDMweiIvPjxlbGxpcHNlIGZpbGw9IiNiMWMxYzciIHJ4PSIxIiByeT0iMSIgdHJhbnNmb3JtPSJtYXRyaXgoLTIwLjgzODc5IDIzLjQ1Mjk0IC0xMS40Njg2MyAtMTAuMTkwMjkgMTg5IDY4LjIpIi8+PHBhdGggZmlsbD0iI2ZkZjFlMSIgZD0iTTcxLjEgMTQ5LjNsLTMyLjEgMTEtOC4xLTIzLjYgMzIuMS0xMXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAxLjQgMTA4LjZsMzEtMjYtNjUuMyAxOS4xIDYgMTAuMnoiLz48ZWxsaXBzZSBmaWxsPSIjZTlmMGVlIiBjeD0iMTY4IiBjeT0iMzgiIHJ4PSIyNTUiIHJ5PSI4Ii8+PHBhdGggZmlsbD0iI2E2OTk4YSIgZD0iTTEwMCA3MWwtMjIgNDgtNTggMjJ6Ii8+PHBhdGggZmlsbD0iI2ZmZmZmYSIgZD0iTTEwNyAxMDhsLTIzIDE2LS4yLTMxLjQgMTUuNS0zLjR6Ii8+PHBhdGggZmlsbD0iI2ZhZjhmMiIgZD0iTTE0MyAxMDBsNDAtMzEtMTA1LTJ6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwNC44IDEyOC40bC0uMy0zMy43IDEzLjUgNTEtMTkuNi0uMnoiLz48cGF0aCBmaWxsPSIjODE5YWE3IiBkPSJNMTA0IDgzbDU4IDQyLTQ0IDEzeiIvPjxwYXRoIGZpbGw9IiNmYmZkZjciIGQ9Ik05MiA4MC4zTDc4LjQgOTEgNTcuMiA4MGw4LjYtMTcuMnoiLz48cGF0aCBmaWxsPSIjNWI3NTg5IiBkPSJNMCA3MGg1MHYxOEgweiIvPjxwYXRoIGZpbGw9IiM1ZDAyMjEiIGQ9Ik05NCA4NGwzLTExaC02eiIvPjxwYXRoIGZpbGw9IiM2YjlhYmUiIGQ9Ik0yNTYuOC0xNkwxOTMuOSA1LjdsLTc2LjItNy4yIDg2LjUgMTkuMnoiLz48ZWxsaXBzZSBmaWxsPSIjYWFiZmM1IiByeD0iMSIgcnk9IjEiIHRyYW5zZm9ybT0ibWF0cml4KC0uOTY5MzMgLTUuOTcxMzkgNjAuMTA5ODggLTkuNzU3NiA4Mi44IDU4LjMpIi8+PHBhdGggZmlsbD0iIzhkYTViMCIgZD0iTTE0MC45IDQ3bDIuOSAxMSAxLjQgMTMuOSAxNi43LTE1LjZ6Ii8+PHBhdGggZmlsbD0iIzhlYTRiMiIgZD0iTTE3NSA2NmwyNS0yMiAzMyAyeiIvPjxwYXRoIGZpbGw9IiM4NjgxNzgiIGQ9Ik03MyAxMjJoMjl2OEg3M3oiLz48cGF0aCBmaWxsPSIjNGQ1MDRkIiBkPSJNNjcuNyAxMDIuNUw4OSA4NmwxLjMgMS42TDY5IDEwNHoiLz48ZWxsaXBzZSBmaWxsPSIjYWFiOGI5IiBjeD0iNTQiIGN5PSIxMDciIHJ4PSIzMSIgcnk9IjExIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE4OCA1OGg0NXYxM2gtNDV6Ii8+PHBhdGggZmlsbD0iI2U4ZWNlYSIgZD0iTTIyLjMgNzAuNkwtMTMuNCA2MWwxMS00MS42TDMzLjUgMjl6Ii8+PHBhdGggZmlsbD0iIzlkYWViNiIgZD0iTTEyOCA4NWwyMiAxNS0zNyAzMHoiLz48ZWxsaXBzZSBmaWxsPSIjNjI3ODhhIiBjeD0iMTc3IiBjeT0iMTM3IiByeD0iMzEiIHJ5PSIyMiIvPjxlbGxpcHNlIGZpbGw9IiMzYjQ2NTUiIHJ4PSIxIiByeT0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEzNy44IDEyNy44IDMyLjgpIHNjYWxlKDM4LjgyODEzIDMuNzU4MjkpIi8+PHBhdGggZmlsbD0iIzRiNDk0NCIgZD0iTTM5IDEyMmw0IDctMTQgMnoiLz48cGF0aCBmaWxsPSIjM2Y0MjQ1IiBkPSJNODUuMiAxMTkuOUw3My45IDE0NGwyMS41LTMuNiAyLjEtNC4zeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOTIgMTE0bDExLTM2LTI4IDMzeiIvPjxwYXRoIGZpbGw9IiNlY2VlZWIiIGQ9Ik04Ny4xIDcyLjdsNDcuNyAyNS4yLTIxLjItNUwxMzUuMyA1M3oiLz48cGF0aCBmaWxsPSIjYTNiN2JmIiBkPSJNMTg0LjcgNzMuN2wyNS45LTIuMy43IDktMjUuOSAyLjJ6Ii8+PHBhdGggZmlsbD0iI2RmZGZkYSIgZD0iTTYwIDE1OWgtNzEuMmwzOS0xOS4zIDI3LTE4eiIvPjxwYXRoIGZpbGw9IiNiZGMzYzMiIGQ9Ik05MiAxMjBsLTEwIDE0IDE3LTd6Ii8+PHBhdGggZmlsbD0iIzlmYWNiOCIgZD0iTTIxNiAxMjIuOGwyOS4yIDMxLjgtNTUuNC00MC41IDMzLTIxLjF6Ii8+PGVsbGlwc2UgZmlsbD0iI2UyZWNlZCIgcng9IjEiIHJ5PSIxIiB0cmFuc2Zvcm09Im1hdHJpeCgtOS42MDgwMSA2LjU5MDMyIC0xNy40MTQwNCAtMjUuMzg3ODggNjIuNSAzNi40KSIvPjxlbGxpcHNlIGZpbGw9IiM3MTY4NWMiIGN4PSI3NiIgY3k9IjExMiIgcng9IjYiIHJ5PSI2Ii8+PGVsbGlwc2UgZmlsbD0iIzY1OTdiYyIgY3g9IjI1NSIgY3k9IjE3IiByeD0iMjciIHJ5PSI2Ii8+PGVsbGlwc2UgZmlsbD0iIzdjOGU5ZiIgcng9IjEiIHJ5PSIxIiB0cmFuc2Zvcm09Im1hdHJpeCgyMS40NTQzIC00LjIyNjQ1IDYuMDkwOCAzMC45MTgxOCAyNDEgMTEyLjMpIi8+PHBhdGggZmlsbD0iI2U5ZWZlYiIgZD0iTTg2LjggMTQwbDMzIDE5LTUuNS0yNS4zLTM4LjUgMjJ6Ii8+PHBhdGggZmlsbD0iIzNiM2UzZSIgZD0iTTEwMCA4OWw5LTUgMyA0eiIvPjxwYXRoIGZpbGw9IiNlYmVmZWUiIGQ9Ik0xNjMuMyA2Ny40bC0xMy43LTQ2LjYgMzIuOSAxNS41IDcuMSAxNHoiLz48cGF0aCBmaWxsPSIjZjlmOGYzIiBkPSJNMTAzLjEgMTA2LjhsLTI2LjUgMy43IDMyLjMgMTUtMjguNy01LjZ6Ii8+PC9nPjwvc3ZnPg==)` }} />

      <div style={{ gridRow: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="title">{title}</h1>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>

      {/* <Meta
        className="meta"
        avatar="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/D45DBA64-743E-43CB-9D73-9CBEF228A3A0.jpg"
        author="Tomáš Čarnecký"
        date={date}
      /> */}
    </Root>
  );
}

export default React.forwardRef(Header)
