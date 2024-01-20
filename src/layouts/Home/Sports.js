import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { useState } from 'react';
import styles from './Sports.module.css';
import { Heading } from 'components/Heading';
import { Button } from 'components/Button';

// Team Sports
const teamSports = [
  { id: 1, name: 'Football', description: 'Description for Football (Team Sport)' },
  { id: 2, name: 'Basketball', description: 'Description for Basketball (Team Sport)' },
  { id: 3, name: 'Soccer', description: 'Description for Soccer (Team Sport)' },
  { id: 4, name: 'Volleyball', description: 'Description for Volleyball (Team Sport)' },
  { id: 5, name: 'Hockey', description: 'Description for Hockey (Team Sport)' },
  { id: 6, name: 'Cricket', description: 'Description for Cricket (Team Sport)' },
  { id: 7, name: 'Baseball', description: 'Description for Baseball (Team Sport)' },
  { id: 8, name: 'Rugby', description: 'Description for Rugby (Team Sport)' },
  { id: 9, name: 'Handball', description: 'Description for Handball (Team Sport)' },
  { id: 10, name: 'Softball', description: 'Description for Softball (Team Sport)' },
  {
    id: 11,
    name: 'Table Tennis',
    description: 'Description for Table Tennis (Team Sport)',
  },
  { id: 12, name: 'Badminton', description: 'Description for Badminton (Team Sport)' },
];

// Solo Sports
const soloSports = [
  { id: 13, name: 'Tennis', description: 'Description for Tennis (Solo Sport)' },
  { id: 14, name: 'Golf', description: 'Description for Golf (Solo Sport)' },
  { id: 15, name: 'Swimming', description: 'Description for Swimming (Solo Sport)' },
  { id: 16, name: 'Cycling', description: 'Description for Cycling (Solo Sport)' },
  { id: 17, name: 'Athletics', description: 'Description for Athletics (Solo Sport)' },
  { id: 18, name: 'Boxing', description: 'Description for Boxing (Solo Sport)' },
  {
    id: 19,
    name: 'Martial Arts',
    description: 'Description for Martial Arts (Solo Sport)',
  },
  { id: 20, name: 'Gymnastics', description: 'Description for Gymnastics (Solo Sport)' },
  { id: 21, name: 'Swimming', description: 'Description for Swimming (Solo Sport)' },
  { id: 22, name: 'Skiing', description: 'Description for Skiing (Solo Sport)' },
  {
    id: 23,
    name: 'Snowboarding',
    description: 'Description for Snowboarding (Solo Sport)',
  },
  { id: 24, name: 'Surfing', description: 'Description for Surfing (Solo Sport)' },
];

export const Sports = ({ visible: sectionVisible, sectionRef, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const maxItemsToShow = 6;

  const renderDetails = (visible, { name, id }) => (
    <div className={styles.details}>
      <Button
        secondary
        className={styles.button}
        data-visible={visible}
        href={`/sports?id=${id}`}
      >
        <span className={styles.circle} data-visible={visible}>
          •
        </span>
        <Text size="s" className={styles.description} data-visible={visible} as="p">
          {name}
        </Text>
      </Button>
    </div>
  );

  const loadMore = () => {
    setShowAll(true);
  };

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
                      level={4}
                      weight="medium"
                      className={styles.title}
                      data-visible={visible}
                    >
                      Team Sports
                    </Heading>
                    {teamSports
                      .slice(0, showAll ? undefined : maxItemsToShow)
                      .map(sport => (
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
                      level={4}
                      weight="medium"
                      className={styles.title}
                      data-visible={visible}
                    >
                      Solo Sports
                    </Heading>
                    {soloSports
                      .slice(0, showAll ? undefined : maxItemsToShow)
                      .map(sport => (
                        <div key={sport.id}>{renderDetails(visible, sport)}</div>
                      ))}
                  </>
                )}
              </Transition>
            </div>
          </Section>
        </div>
      </div>
      {!showAll && (
        <div className={styles.button} data-visible={sectionVisible}>
          <Button
            className={styles.btn}
            iconHoverShift
            onClick={loadMore}
            iconEnd="arrowRight"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
