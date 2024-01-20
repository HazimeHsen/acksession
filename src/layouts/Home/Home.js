import one from 'assets/1.jpg';
import two from 'assets/2.jpg';
import three from 'assets/3.jpg';
import four from 'assets/4.jpg';
import five from 'assets/5.jpg';
import six from 'assets/6.jpg';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import { Heading } from 'components/Heading';
import { Sports } from './Sports';
import About from './About';

const disciplines = ['Competitions', 'Sports', 'Fun', 'Meetups'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const sports = useRef();
  const titleRef = useRef();
  const about = useRef();

  useEffect(() => {
    const sections = [intro, about, titleRef, sports];

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
          Sports Available
        </Heading>
      </section>

      <Sports
        id="sport1"
        sectionRef={sports}
        visible={visibleSections.includes(sports.current)}
      />
    </div>
  );
};
