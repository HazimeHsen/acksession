import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { useState } from 'react';
import styles from './Teams.module.css';
import { Button } from 'components/Button';

const teamSports = [
  { id: 1, name: 'Football', description: 'Description for Football (Team Sport)' },
  { id: 2, name: 'Basketball', description: 'Description for Basketball (Team Sport)' },
  { id: 4, name: 'Volleyball', description: 'Description for Volleyball (Team Sport)' },
  { id: 5, name: 'Handball', description: 'Description for Hockey (Team Sport)' },
  { id: 6, name: 'Dodgeball', description: 'Description for Cricket (Team Sport)' },
  {
    id: 7,
    name: 'Ultimate Frisbee',
    description: 'Description for Cricket (Team Sport)',
  },
  {
    id: 8,
    name: 'Running',
    description: 'Description for Cricket (Team Sport)',
  },
];

export const Team = ({ visible: sectionVisible, sectionRef, ...rest }) => {
  const [focused, setFocused] = useState(false);

  const renderDetails = (visible, { name, id }) => (
    <Button
      secondary
      className={styles.button}
      data-visible={visible}
      href={`/sports?id=${id}`}
      iconEnd="arrowRight"
      iconHoverShift
    >
      <Text
        size="s"
        align="center"
        className={styles.description}
        data-visible={visible}
        as="p"
      >
        {name}
      </Text>
    </Button>
  );

  return (
    <div className={styles.sportsColumn}>
      <Text className={styles.text} as="p" size="s" align="center">
        Press on each sport to get additional info.
      </Text>
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
                {teamSports.map(sport => (
                  <div key={sport.id}>{renderDetails(visible, sport)}</div>
                ))}
              </>
            )}
          </Transition>
        </div>
      </Section>
    </div>
  );
};
