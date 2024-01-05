import React, { useState } from 'react';
import styles from './About.module.css';
import Image from 'next/image';
import { Section } from 'components/Section';
import { Transition } from 'components/Transition';
import { Text } from 'components/Text';
import { Heading } from 'components/Heading';

const aboutData = [
  {
    id: 1,
    title: 'About One',
    description: 'Description for About One. This is just a placeholder text.',
    imageSrc: '/1.gif',
  },
  {
    id: 2,
    title: 'About Two',
    description: 'Description for About Two. This is just a placeholder text.',
    imageSrc: '/2.gif',
  },
];

const About = ({ sectionRef, visible, id }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;
  return (
    <Section
      className={styles.aboutListContainer}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div data-visible={visible} className={styles.parentContainer}>
            <Heading
              level={3}
              align="center"
              weight="medium"
              className={styles.heading}
              data-visible={visible}
            >
              Available Sports
            </Heading>
            <div className={styles.container}>
              {aboutData.map(aboutItem => (
                <div
                  data-visible={visible}
                  key={aboutItem.id}
                  className={styles.aboutCard}
                >
                  <AboutCard
                    title={aboutItem.title}
                    description={aboutItem.description}
                    imageSrc={aboutItem.imageSrc}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

export default About;

const AboutCard = ({ title, description, imageSrc }) => {
  return (
    <div className={styles.aboutContainer}>
      <Image width={60} height={60} className={styles.image} src={imageSrc} alt="About" />
      <Heading level="5" className={styles.title}>
        {title}
      </Heading>
      <Text className={styles.description} size="s">
        {description}
      </Text>
    </div>
  );
};
