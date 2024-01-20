import ArrowDown from 'assets/arrow-down.svg';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { AnimatePresence } from 'framer-motion';
import { useInterval, usePrevious, useScrollToHash } from 'hooks';
import RouterLink from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { cssProps } from 'utils/style';
import styles from './Intro.module.css';
import { Bg } from './Bg';
import { Button } from 'components/Button';

export function Intro({ id, sectionRef, disciplines, scrollIndicatorHidden, ...rest }) {
  const theme = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();

  const downloadPDF = (pdfUrl, filename) => {
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(() => {
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = filename || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => console.error('Error downloading PDF:', error));
  };

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme.themeId
  );

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  const handleScrollClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Bg />
      <Transition in key={theme.themeId} timeout={3000}>
        {(visible, status) => (
          <Fragment>
            <header className={styles.text}>
              <Heading level={0} as="h2" className={styles.title}>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    Welcome To GoodWill
                  </span>
                </span>
              </Heading>
            </header>
            <h1 className={styles.name} data-visible={visible} id={titleId}>
              <div className={styles.row}>
                <AnimatePresence>
                  {disciplines.map(item => (
                    <Transition
                      unmount
                      in={item === currentDiscipline}
                      timeout={{ enter: 3000, exit: 2000 }}
                      key={item}
                    >
                      {(visible, status) => (
                        <span
                          aria-hidden
                          className={styles.Movingword}
                          data-plus={true}
                          data-status={status}
                          style={cssProps({ delay: tokens.base.durationL })}
                        >
                          {item}
                        </span>
                      )}
                    </Transition>
                  ))}
                </AnimatePresence>
              </div>
            </h1>
            <div className={styles.buttonParent}>
              <div className={styles.buttons}>
                <Button
                  style={{ width: '100%' }}
                  onClick={() =>
                    downloadPDF(
                      '/GoodWill Games Rule Book.pdf',
                      'GoodWill Games Rule Book.pdf'
                    )
                  }
                  iconHoverShift
                  iconEnd="arrowRight"
                >
                  Rule book
                </Button>
                <Button
                  style={{ width: '100%' }}
                  onClick={() =>
                    downloadPDF(
                      '/GoodWill Games Welcome Package.pdf',
                      'GoodWill Games Welcome Package.pdf'
                    )
                  }
                  iconHoverShift
                  iconEnd="arrowRight"
                >
                  Welcome package
                </Button>
              </div>
            </div>
            <RouterLink href="/#project-1">
              <a
                className={styles.scrollIndicator}
                data-status={status}
                data-hidden={scrollIndicatorHidden}
                onClick={handleScrollClick}
              >
                <VisuallyHidden>Scroll to projects</VisuallyHidden>
              </a>
            </RouterLink>
            <RouterLink href="/#project-1">
              <a
                className={styles.mobileScrollIndicator}
                data-status={status}
                data-hidden={scrollIndicatorHidden}
                onClick={handleScrollClick}
              >
                <VisuallyHidden>Scroll to projects</VisuallyHidden>
                <ArrowDown aria-hidden />
              </a>
            </RouterLink>
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}
