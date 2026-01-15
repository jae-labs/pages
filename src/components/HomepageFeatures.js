import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Simple',
    Svg: require('../../static/img/simple.svg').default,
    description: (
      <>
      The digital equivalent of a comfy chair.
      </>
    ),
  },
  {
    title: 'Fast',
    Svg: require('../../static/img/fast.svg').default,
    description: (
      <>
      Loads faster than a pizza delivery on rollerblades.
      </>
    ),
  },
  {
    title: 'Searchable',
    Svg: require('../../static/img/searchable.svg').default,
    description: (
      <>
      A well-lit path through the jungle of data.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
