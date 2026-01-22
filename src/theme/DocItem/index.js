import React from 'react';
import { DiscussionEmbed } from 'disqus-react'
import DocItem from '@theme-original/DocItem';
import { useLocation } from "@docusaurus/router";

export default function DocItemWrapper(props) {
  const { pathname } = useLocation();

  return (
    <>
      <DocItem {...props} />
        <DiscussionEmbed
          shortname='https-justanother-engineer'
          config={{
            identifier: pathname,
            pathname,
            language: 'en_US',
          }}
        />
    </>
  );
}
