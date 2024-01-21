import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { useState } from 'react';
import styles from './Solo.module.css';
import { Heading } from 'components/Heading';

const solo1 = [
  { id: 1, name: 'Tennis', description: 'Description for Football (Team Sport)' },
  { id: 2, name: 'Ping Pong', description: 'Description for Basketball (Team Sport)' },
  { id: 3, name: 'Badminton', description: 'Description for Soccer (Team Sport)' },
];
const solo2 = [
  { id: 1, name: 'Front Crawl', description: 'Description for Football (Team Sport)' },
  { id: 2, name: 'Backstroke', description: 'Description for Basketball (Team Sport)' },
  { id: 3, name: 'Breaststroke', description: 'Description for Soccer (Team Sport)' },
  { id: 4, name: 'Butterfly', description: 'Description for Soccer (Team Sport)' },
  { id: 5, name: 'Medley', description: 'Description for Soccer (Team Sport)' },
];
const solo3 = [
  { id: 1, name: '100m', description: 'Description for Football (Team Sport)' },
  { id: 2, name: '200m', description: 'Description for Basketball (Team Sport)' },
  { id: 3, name: '400m Relay', description: 'Description for Soccer (Team Sport)' },
  { id: 4, name: '800m Relay', description: 'Description for Soccer (Team Sport)' },
];

const solo4 = [
  { id: 4, name: 'Long Jump', description: 'Description for Volleyball (Team Sport)' },
  { id: 5, name: 'High Jump', description: 'Description for Hockey (Team Sport)' },
  { id: 6, name: 'Shot Put', description: 'Description for Cricket (Team Sport)' },
  { id: 7, name: 'Cross Country', description: 'Description for Baseball (Team Sport)' },
  { id: 10, name: 'Cycling', description: 'Description for Softball (Team Sport)' },
  {
    id: 11,
    name: 'Triathlon',
    description: 'Description for Table Tennis (Team Sport)',
  },
  {
    id: 12,
    name: 'Three points competition',
    description: 'Description for Badminton (Team Sport)',
  },
  { id: 13, name: 'Parkour', description: 'Description for Badminton (Team Sport)' },
  { id: 14, name: 'Karting', description: 'Description for Badminton (Team Sport)' },
  { id: 15, name: 'Spikeball', description: 'Description for Badminton (Team Sport)' },
];
export const Solo = ({ visible: sectionVisible, sectionRef, ...rest }) => {
  const [focused, setFocused] = useState(false);

  const renderDetails = (visible, { name }) => (
    <div className={styles.details}>
      <span className={styles.circle} data-visible={visible}>
        •
      </span>
      <Text size="s" className={styles.description} data-visible={visible} as="p">
        {name}
      </Text>
    </div>
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sportsContainer}>
        <div className={styles.sportsColumn}>
          <Section
            className={styles.summary}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-labelledby={`title`}
            ref={sectionRef}
            tabIndex={-1}
            {...rest}
          >
            <div className={styles.content}>
              <Transition in={sectionVisible || focused}>
                {visible => (
                  <>
                    <Heading
                      level={6}
                      weight="medium"
                      className={styles.title}
                      data-visible={visible}
                    >
                      Playable by solo and due{' '}
                    </Heading>
                    {solo1.map(sport => (
                      <div key={sport.id}>{renderDetails(visible, sport)}</div>
                    ))}
                    <Heading
                      level={6}
                      weight="medium"
                      className={styles.title2}
                      data-visible={visible}
                    >
                      Swimming
                    </Heading>
                    {solo2.map(sport => (
                      <div key={sport.id}>{renderDetails(visible, sport)}</div>
                    ))}
                    <Heading
                      level={6}
                      weight="medium"
                      className={styles.title2}
                      data-visible={visible}
                    >
                      Running
                    </Heading>
                    {solo3.map(sport => (
                      <div key={sport.id}>{renderDetails(visible, sport)}</div>
                    ))}
                  </>
                )}
              </Transition>
            </div>
          </Section>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.sportsColumn}>
          <Section
            className={styles.summary}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-labelledby={`title`}
            ref={sectionRef}
            tabIndex={-1}
            {...rest}
          >
            <div className={styles.content}>
              <Transition in={sectionVisible || focused}>
                {visible => (
                  <>
                    <Heading
                      level={6}
                      weight="medium"
                      className={styles.title}
                      data-visible={visible}
                    >
                      Available in solo only{' '}
                    </Heading>
                    {solo4.map(sport => (
                      <div key={sport.id}>{renderDetails(visible, sport)}</div>
                    ))}
                  </>
                )}
              </Transition>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};
