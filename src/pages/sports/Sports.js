import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { useParallax } from 'hooks';
import { useRef } from 'react';
import { clamp } from 'utils/clamp';
import { cssProps, numToMs } from 'utils/style';
import styles from './Sports.module.css';
import { Home } from './Home';

export const Sports = () => {
  const imageRef = useRef();

  useParallax(0.004, value => {
    if (!imageRef.current) return;
    imageRef.current.style.setProperty('--blurOpacity', clamp(value, 0, 1));
  });

  const banner = '/static/hello-world-banner.jpg';
  const title = 'Coming Soon';
  return (
    <article className={styles.post}>
      <Meta title={title} prefix="" description={title} />
      <Section>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <Heading
              level={2}
              as="h1"
              align="center"
              className={styles.title}
              aria-label={title}
            >
              {title.split(' ').map((word, index) => (
                <span className={styles.titleWordWrapper} key={`${word}-${index}`}>
                  <span
                    className={styles.titleWord}
                    style={cssProps({ delay: numToMs(index * 100 + 100) })}
                  >
                    {word}
                    {index !== title.split(' ').length - 1 ? ' ' : ''}
                  </span>
                </span>
              ))}
            </Heading>
            <Home />
          </div>
        </header>
      </Section>
    </article>
  );
};
