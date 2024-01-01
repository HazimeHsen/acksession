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
import { theme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';

const disciplines = ['Developer', 'Prototyper', 'Animator', 'Illustrator', 'Modder'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const projectSix = useRef();
  const titleRef = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      projectSix,
      details,
    ];

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

      <section ref={titleRef}>
        <Transition
          in={visibleSections.includes(titleRef.current)}
          key={theme.themeId}
          timeout={3000}
        >
          {visible => (
            <Heading
              level={3}
              align="center"
              weight="medium"
              className={styles.heading}
              data-visible={visible}
            >
              Available Sports
            </Heading>
          )}
        </Transition>
      </section>
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        buttonText="View More"
        buttonLink="/sports"
        index={1}
        title="Designing the future of education"
        description="Designing a platform to help educators build better online courseware"
        model={{
          srcSet: [one, one],
          placeholder: one,
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        buttonText="View More"
        buttonLink="/sports"
        index={2}
        title="Video game progress tracking"
        description="Design and development for a video game tracking app built in React Native"
        model={{
          srcSet: [two, two],
          placeholder: two,
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        buttonText="View More"
        buttonLink="/sports"
        index={3}
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        model={{
          srcSet: [three, three],
          placeholder: three,
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        buttonText="View More"
        buttonLink="/sports"
        index={4}
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        model={{
          srcSet: [four, four],
          placeholder: four,
        }}
      />
      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        buttonText="View More"
        buttonLink="/sports"
        index={5}
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        model={{
          srcSet: [five, five],
          placeholder: five,
        }}
      />
      <ProjectSummary
        id="project-6"
        alternate
        sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)}
        buttonText="View More"
        buttonLink="/sports"
        index={6}
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        model={{
          srcSet: [six, six],
          placeholder: six,
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
    </div>
  );
};
