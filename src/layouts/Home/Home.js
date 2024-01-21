import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import { Heading } from 'components/Heading';
import { Solo } from './Solo';
import About from './About';
import { Team } from './Teams';
import { Contact } from './Contact';

const disciplines = ['Competitions', 'Sports', 'Fun', 'Meetups'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const solo = useRef();
  const team = useRef();
  const titleRef = useRef();
  const about = useRef();
  const contact = useRef();

  useEffect(() => {
    const sections = [intro, about, titleRef, solo, team, contact];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta title="Acksession" description="" />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      <About
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />

      <section ref={titleRef}>
        <Heading
          level={3}
          align="center"
          weight="medium"
          className={styles.heading}
          data-visible={visibleSections.includes(titleRef.current)}
        >
          Team Sports{' '}
        </Heading>
      </section>

      <Team
        id="team"
        sectionRef={team}
        visible={visibleSections.includes(team.current)}
      />

      <section ref={titleRef}>
        <Heading
          level={3}
          align="center"
          weight="medium"
          className={styles.heading}
          data-visible={visibleSections.includes(titleRef.current)}
        >
          Solo Sports
        </Heading>
      </section>
      <Solo
        id="solo"
        sectionRef={solo}
        visible={visibleSections.includes(solo.current)}
      />
      <Contact
        id="contact"
        sectionRef={contact}
        visible={visibleSections.includes(contact.current)}
      />
    </div>
  );
};
