import React from "react";
import styled from "styled-components";
import NextImage from 'next/image'

export default ({ ...props }: any) => {
  return (
    <Space>
      <NextImage {...props} />
    </Space>
  );
};

const Space = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
