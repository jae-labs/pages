import React from 'react';
import Particles from 'react-particles-js';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

import Typed from 'react-typed';

import * as Scroll from 'react-scroll';
import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div id="particles-js">
        <Particles
          params={{
            particles: {
              number: {
                value: 10,
                density: {
                  enable: true,
                  value_area: 100
                }
              },
              size: {
                value: 1,
              },
            },
          }}
        />
      </div>
      <div className="container">
        <h1 className="hero__title">
              <Typed
                strings={['>_' + siteConfig.tagline]}
                typeSpeed={10}
              >
              </Typed>
        </h1>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
