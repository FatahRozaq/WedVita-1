import React from 'react'
import { Link } from 'react-router-dom'

import Script from 'dangerous-html/react'

import Features from './features'
import Practice from './practice'
import Doctor from './doctor'
import projectStyles from '.style.module.css'
import styles from './home.module.css'

const Home = (props) => {
  return (
    <div className={styles['container']}>
      <div data-modal="practices" className={styles['modal']}>
        <div className={styles['practices']}>
          <div className={styles['heading']}>
            <span className={styles['header']}>Our practices</span>
            <svg
              viewBox="0 0 1024 1024"
              data-close="practices"
              className={styles['close']}
            >
              <path d="M225.835 286.165l225.835 225.835-225.835 225.835c-16.683 16.683-16.683 43.691 0 60.331s43.691 16.683 60.331 0l225.835-225.835 225.835 225.835c16.683 16.683 43.691 16.683 60.331 0s16.683-43.691 0-60.331l-225.835-225.835 225.835-225.835c16.683-16.683 16.683-43.691 0-60.331s-43.691-16.683-60.331 0l-225.835 225.835-225.835-225.835c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331z"></path>
            </svg>
          </div>
          <div className={styles['grid']}>
            <div className={styles['section']}>
              <div className={styles['heading01']}>
                <span className={styles['header01']}>Cardiology</span>
                <span className={styles['caption']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image']}
                />
              </div>
            </div>
            <div className={styles['section1']}>
              <div className={styles['heading02']}>
                <span className={styles['header02']}>Orthopedics</span>
                <span className={styles['caption1']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text01']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image01']}
                />
              </div>
            </div>
            <div className={styles['section2']}>
              <div className={styles['heading03']}>
                <span className={styles['header03']}>Ophtalmology</span>
                <span className={styles['caption2']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text02']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image02']}
                />
              </div>
            </div>
            <div className={styles['section3']}>
              <div className={styles['heading04']}>
                <span className={styles['header04']}>Pediatrics</span>
                <span className={styles['caption3']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text03']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image03']}
                />
              </div>
            </div>
            <div className={styles['section4']}>
              <div className={styles['heading05']}>
                <span className={styles['header05']}>Nutrition</span>
                <span className={styles['caption4']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text04']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image04']}
                />
              </div>
            </div>
            <div className={styles['section5']}>
              <div className={styles['heading06']}>
                <span className={styles['header06']}>General</span>
                <span className={styles['caption5']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text05']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image05']}
                />
              </div>
            </div>
          </div>
          <div className={styles['container01']}></div>
        </div>
      </div>
      <section className={styles['hero']}>
        <header data-thq="thq-navbar" className={styles['navbar']}>
          <div className={styles['left']}>
            <img alt="image" src="/logo-1500h.png" className={styles['logo']} />
            <nav className={styles['links']}>
              <a href="#features" className={styles['link']}>
                Features
              </a>
              <a href="#how-it-works" className={styles['link01']}>
                How it works
              </a>
              <span className={styles['link02']}>Prices</span>
              <a href="#schedule" className={styles['link03']}>
                Contact
              </a>
            </nav>
          </div>
          <div data-thq="thq-navbar-btn-group" className={styles['right']}>
            <button
              className={` ${styles['phone']} ${projectStyles['button']} `}
            >
              <img alt="image" src="/phone.svg" className={styles['image06']} />
              <span className={styles['text06']}>+0 123-456-789</span>
            </button>
            <a
              href="#book"
              className={` ${styles['book']} ${projectStyles['button']} ${projectStyles['button-main']} `}
            >
              <img
                alt="image"
                src="/calendar.svg"
                className={styles['image07']}
              />
              <span className={styles['text07']}>Book an appointment</span>
            </a>
          </div>
          <div data-thq="thq-burger-menu" className={styles['burger-menu']}>
            <svg viewBox="0 0 1024 1024" className={styles['icon1']}>
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-thq="thq-mobile-menu" className={styles['mobile-menu']}>
            <div
              data-thq="thq-mobile-menu-nav"
              data-role="Nav"
              className={styles['nav']}
            >
              <div className={styles['container02']}>
                <img
                  alt="image"
                  src="/logo-1500h.png"
                  className={styles['image08']}
                />
                <div data-thq="thq-close-menu" className={styles['menu-close']}>
                  <svg viewBox="0 0 1024 1024" className={styles['icon3']}>
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <nav
                data-thq="thq-mobile-menu-nav-links"
                data-role="Nav"
                className={styles['nav1']}
              >
                <span className={styles['text08']}>Features</span>
                <span className={styles['text09']}>How it works</span>
                <span className={styles['text10']}>Prices</span>
                <span className={styles['text11']}>Contact</span>
                <a
                  href="#book"
                  className={` ${styles['book1']} ${projectStyles['button']} ${projectStyles['button-main']} `}
                >
                  <img
                    alt="image"
                    src="/calendar.svg"
                    className={styles['image09']}
                  />
                  <span className={styles['text12']}>Book an appointment</span>
                </a>
              </nav>
            </div>
          </div>
        </header>
        <div className={styles['main']}>
          <div className={styles['content']}>
            <div className={styles['heading07']}>
              <h1 className={styles['header07']}>
                Experienced general practitioners who have an eye for your care
              </h1>
              <p className={styles['caption6']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <button
              className={` ${projectStyles['button']} ${projectStyles['button-main']} ${styles['book2']} `}
            >
              <img
                alt="image"
                src="/calendar.svg"
                className={styles['image10']}
              />
              <span>Book an appointment</span>
            </button>
          </div>
          <div className={styles['image11']}>
            <img
              alt="image"
              src="/doctor-image-1500w.png"
              className={styles['image12']}
            />
          </div>
        </div>
        <div id="features" className={styles['features']}>
          <div className={styles['content01']}>
            <Features></Features>
            <Features Title="Virtual Clinic"></Features>
            <Features Title="Clinical results"></Features>
          </div>
        </div>
        <div className={styles['background']}></div>
      </section>
      <section className={styles['practices1']}>
        <div className={styles['heading08']}>
          <h2 className={styles['text14']}>Our practices</h2>
          <p className={styles['text15']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
        <div className={styles['content02']}>
          <div className={styles['grid1']}>
            <Link to="/home">
              <div className={styles['practice-wrapper']}>
                <Practice></Practice>
              </div>
            </Link>
            <Link to="/home">
              <div className={styles['practice-wrapper1']}>
                <Practice Title="Orthopedics"></Practice>
              </div>
            </Link>
            <Link to="/home">
              <div className={styles['practice-wrapper2']}>
                <Practice Title="Ophtalmology"></Practice>
              </div>
            </Link>
            <Link to="/home">
              <div className={styles['practice-wrapper3']}>
                <Practice Title="Pediatrics"></Practice>
              </div>
            </Link>
            <Link to="/home">
              <div className={styles['practice-wrapper4']}>
                <Practice Title="Nutrition"></Practice>
              </div>
            </Link>
            <Link to="/home">
              <div className={styles['practice-wrapper5']}>
                <Practice Title="General"></Practice>
              </div>
            </Link>
          </div>
          <button
            data-open="practices"
            className={` ${projectStyles['button']} ${projectStyles['button-main']} `}
          >
            <span>All practices</span>
          </button>
        </div>
      </section>
      <section id="how-it-works" className={styles['why']}>
        <div className={styles['heading09']}>
          <h2 className={styles['header08']}>Why choose us</h2>
          <p className={styles['header09']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
        <div className={styles['content03']}>
          <div className={styles['video']}>
            <video
              src
              poster="/video-1500w.png"
              className={styles['video1']}
            ></video>
            <div className={styles['play']}>
              <img alt="image" src="/play.svg" className={styles['image13']} />
            </div>
          </div>
          <div className={styles['caption7']}>
            <h3 className={styles['header10']}>
              Consectetur adipiscing elit, sed do eiusmod tempor
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </h3>
            <p className={styles['header11']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
        </div>
      </section>
      <section className={styles['features1']}>
        <div className={styles['section6']}>
          <div className={styles['content04']}>
            <div className={styles['header12']}>
              <h2 className={styles['heading10']}>
                Dedicated doctors with the core mission to help.
              </h2>
              <p className={styles['capton']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className={projectStyles['read-more']}>
              <span className={styles['text17']}>See our doctors</span>
              <img
                alt="image"
                src="/arrow-2.svg"
                className={styles['image14']}
              />
            </div>
          </div>
          <img
            alt="image"
            src="/xray-1500w.png"
            className={styles['image15']}
          />
        </div>
        <div className={styles['section7']}>
          <div className={styles['content05']}>
            <div className={styles['header13']}>
              <h2 className={styles['heading11']}>
                Get access to specialty tests and breakthrough information.
              </h2>
              <p className={styles['capton1']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className={projectStyles['read-more']}>
              <span className={styles['text18']}>Find test</span>
              <img
                alt="image"
                src="/arrow-2.svg"
                className={styles['image16']}
              />
            </div>
          </div>
          <img alt="image" src="/lab-1500w.png" className={styles['image17']} />
        </div>
        <div className={styles['section8']}>
          <div className={styles['content06']}>
            <div className={styles['header14']}>
              <h2 className={styles['heading12']}>
                Find out how we can help you help you.
              </h2>
              <p className={styles['capton2']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <button
              className={` ${projectStyles['button']} ${projectStyles['button-main']} ${styles['book3']} `}
            >
              <span>Book a virtual appointment</span>
            </button>
          </div>
          <img
            alt="image"
            src="/examination-1500w.png"
            className={styles['image18']}
          />
        </div>
        <button
          className={` ${styles['book4']} ${projectStyles['button']} ${projectStyles['button-main']} `}
        >
          <span>Book a virtual appointment</span>
        </button>
      </section>
      <section id="schedule" className={styles['schedule']}>
        <div className={styles['content07']}>
          <div className={styles['header15']}>
            <h2 className={styles['heading13']}>
              Schedule an in person or virtual appointment today
            </h2>
            <p className={styles['caption8']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
          <div className={styles['types']}>
            <a
              href="#book"
              className={` ${styles['book-person']} ${projectStyles['button']} ${projectStyles['button-main']} ${projectStyles['button-white']} `}
            >
              <span>Book in person appointment</span>
            </a>
            <button
              className={` ${projectStyles['button']} ${projectStyles['button-main']} ${projectStyles['button-white']} ${styles['book-person1']} `}
            >
              <span>Book virtual appointment</span>
            </button>
          </div>
        </div>
      </section>
      <div className={styles['search']}>
        <div className={styles['heading14']}>
          <h2 className={styles['text23']}>Search diseases &amp; conditions</h2>
          <p className={styles['text24']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
        <div className={styles['content08']}>
          <div className={styles['type-one']}>
            <div className={styles['alphabet']}>
              <div data-letter="a" className={projectStyles['letter']}>
                <span className={styles['text25']}>A</span>
              </div>
              <div data-letter="b" className={projectStyles['letter']}>
                <span className={styles['text26']}>B</span>
              </div>
              <div data-letter="c" className={projectStyles['letter']}>
                <span className={styles['text27']}>C</span>
              </div>
              <div data-letter="d" className={projectStyles['letter']}>
                <span className={styles['text28']}>D</span>
              </div>
              <div data-letter="e" className={projectStyles['letter']}>
                <span className={styles['text29']}>E</span>
              </div>
              <div data-letter="f" className={projectStyles['letter']}>
                <span className={styles['text30']}>F</span>
              </div>
              <div data-letter="g" className={projectStyles['letter']}>
                <span className={styles['text31']}>G</span>
              </div>
              <div data-letter="h" className={projectStyles['letter']}>
                <span className={styles['text32']}>H</span>
              </div>
              <div data-letter="i" className={projectStyles['letter']}>
                <span className={styles['text33']}>I</span>
              </div>
              <div data-letter="j" className={projectStyles['letter']}>
                <span className={styles['text34']}>J</span>
              </div>
              <div data-letter="k" className={projectStyles['letter']}>
                <span className={styles['text35']}>K</span>
              </div>
              <div data-letter="l" className={projectStyles['letter']}>
                <span className={styles['text36']}>L</span>
              </div>
              <div data-letter="m" className={projectStyles['letter']}>
                <span className={styles['text37']}>M</span>
              </div>
              <div data-letter="n" className={projectStyles['letter']}>
                <span className={styles['text38']}>N</span>
              </div>
              <div data-letter="o" className={projectStyles['letter']}>
                <span className={styles['text39']}>O</span>
              </div>
              <div data-letter="p" className={projectStyles['letter']}>
                <span className={styles['text40']}>P</span>
              </div>
              <div data-letter="q" className={projectStyles['letter']}>
                <span className={styles['text41']}>Q</span>
              </div>
              <div data-letter="r" className={projectStyles['letter']}>
                <span className={styles['text42']}>R</span>
              </div>
              <div data-letter="s" className={projectStyles['letter']}>
                <span className={styles['text43']}>S</span>
              </div>
              <div data-letter="t" className={projectStyles['letter']}>
                <span className={styles['text44']}>T</span>
              </div>
              <div data-letter="u" className={projectStyles['letter']}>
                <span className={styles['text45']}>U</span>
              </div>
              <div data-letter="v" className={projectStyles['letter']}>
                <span className={styles['text46']}>V</span>
              </div>
              <div data-letter="w" className={projectStyles['letter']}>
                <span className={styles['text47']}>W</span>
              </div>
              <div data-letter="x" className={projectStyles['letter']}>
                <span className={styles['text48']}>X</span>
              </div>
              <div data-letter="y" className={projectStyles['letter']}>
                <span className={styles['text49']}>Y</span>
              </div>
              <div data-letter="z" className={projectStyles['letter']}>
                <span className={styles['text50']}>Z</span>
              </div>
            </div>
            <p className={styles['text51']}>
              You don’t know it’s name? Check out symptom checker below
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
            <div data-teleport="results" className={styles['results']}>
              <span className={styles['heading15']}>Results:</span>
              <div data-results="letters" className={styles['list']}></div>
            </div>
          </div>
          <div className={styles['type-two']}>
            <div className={styles['heading16']}>
              <h3 className={styles['text52']}>Symptom checker</h3>
              <p className={styles['text53']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className={styles['symptoms']}>
              <div className={styles['row']}>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text54']}>Abdominal pain</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text55']}>Chest pain</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text56']}>Constipation</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text57']}>Cough</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text58']}>Breath difficulty</span>
                </div>
              </div>
              <div className={styles['row1']}>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text59']}>Red eye</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text60']}>Foot pain</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text61']}>Foot swelling</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text62']}>Headache</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text63']}>Heart palpitation</span>
                </div>
              </div>
              <img
                alt="image"
                src="https://i.ytimg.com/an_webp/1DIymWdu_Fg/mqdefault_6s.webp?du=3000&amp;sqp=CMj04qkG&amp;rs=AOn4CLCgfcal6CwZBM5J6D-t878NKL8IOA"
                className={styles['image19']}
              />
              <div className={styles['row2']}>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text64']}>Knee pain</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text65']}>Hip pain</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text66']}>Low back pain</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text67']}>Nasal congestion</span>
                </div>
                <div className={projectStyles['symptom']}>
                  <span className={styles['text68']}>Neck pain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          alt="image"
          src="https://play.teleporthq.io/static/svg/default-img.svg"
          className={styles['image20']}
        />
      </div>
      <section id="book" className={styles['book5']}>
        <div className={styles['heading17']}>
          <h2 className={styles['text69']}>Book an appointment</h2>
          <p className={styles['text70']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
        <div className={styles['form']}>
          <div className={styles['types1']}>
            <div className={projectStyles['book-type']}>
              <span className={styles['text71']}>In person appointment</span>
            </div>
            <div className={projectStyles['book-type']}>
              <span className={styles['text72']}>Virtual appointment</span>
            </div>
          </div>
          <div className={styles['inputs']}>
            <input
              type="text"
              placeholder="Name"
              autoComplete="name"
              className={` ${projectStyles['input']} ${projectStyles['book-input']} `}
            />
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className={` ${projectStyles['input']} ${projectStyles['book-input']} `}
            />
            <input
              type="tel"
              placeholder="Phone"
              autoComplete="tel"
              className={` ${projectStyles['input']} ${projectStyles['book-input']} `}
            />
            <div className={styles['date']}>
              <input
                type="date"
                placeholder="Date"
                className={` ${projectStyles['input']} ${projectStyles['book-input']} `}
              />
              <img
                alt="image"
                src="/calendar-2.svg"
                className={styles['image21']}
              />
            </div>
            <input
              type="text"
              placeholder="Practice"
              className={` ${projectStyles['input']} ${projectStyles['book-input']} `}
            />
            <div className={styles['lower']}>
              <p className={styles['text73']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <div className={styles['button']}>
                <button
                  className={` ${styles['book6']} ${projectStyles['button']} ${projectStyles['button-main']} `}
                >
                  <span>Book</span>
                </button>
                <p className={styles['text75']}>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className={styles['text77']}>adipiscing elit</span>
                  <span>
                    , sed do eiusmod tempor
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className={styles['text79']}>incididunt</span>
                  <span>.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['container03']}></div>
      </section>
      <section className={styles['meet']}>
        <div className={styles['heading18']}>
          <h2 className={styles['text81']}>Meet our doctors</h2>
          <p className={styles['text82']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
        <div className={styles['list1']}>
          <div className={styles['controls']}>
            <img
              alt="image"
              src="/circle-arrow.svg"
              data-doctors="previous"
              className={projectStyles['arrow']}
            />
            <img
              alt="image"
              src="/circle-arrow.svg"
              data-doctors="next"
              className={` ${styles['forward']} ${projectStyles['arrow']} `}
            />
          </div>
          <div data-teleport="doctors" className={styles['doctors']}>
            <Doctor></Doctor>
            <Doctor image_src="/doctor-2-300w.png"></Doctor>
            <Doctor image_src="/doctor-3-300w.png"></Doctor>
            <Doctor image_src="/doctor-4-300w.png"></Doctor>
          </div>
        </div>
        <div className={styles['search1']}>
          <input
            type="text"
            placeholder="Search by name"
            className={` ${styles['textinput5']} ${projectStyles['input']} ${projectStyles['book-input']} `}
          />
          <button
            className={` ${projectStyles['button']} ${projectStyles['button-main']} ${styles['book7']} `}
          >
            <span>Search doctor</span>
          </button>
        </div>
      </section>
      <section className={styles['news']}>
        <div className={styles['heading19']}>
          <h2 className={styles['text84']}>Read our latest news</h2>
          <p className={styles['text85']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
        <div className={styles['list2']}>
          <div className={styles['item']}>
            <div className={styles['image22']}>
              <img
                alt="image"
                src="/news-logo-1500w.png"
                className={styles['image23']}
              />
            </div>
            <div className={styles['content09']}>
              <div className={styles['details']}>
                <span className={styles['date1']}>November 23, 2022</span>
                <p className={styles['quick-description']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text86']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow.svg"
                  className={styles['image24']}
                />
              </div>
            </div>
          </div>
          <div className={styles['item1']}>
            <div className={styles['image25']}>
              <img
                alt="image"
                src="/news-1-1500w.png"
                className={styles['image26']}
              />
            </div>
            <div className={styles['content10']}>
              <div className={styles['details1']}>
                <span className={styles['date2']}>November 23, 2022</span>
                <p className={styles['quick-description1']}>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text87']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image27']}
                />
              </div>
            </div>
          </div>
          <div className={styles['item2']}>
            <div className={styles['image28']}>
              <img
                alt="image"
                src="/news-2-1500w.png"
                className={styles['image29']}
              />
            </div>
            <div className={styles['content11']}>
              <div className={styles['details2']}>
                <span className={styles['date3']}>November 23, 2022</span>
                <p className={styles['quick-description2']}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore.
                </p>
              </div>
              <div className={projectStyles['read-more']}>
                <span className={styles['text88']}>Read more</span>
                <img
                  alt="image"
                  src="/arrow-2.svg"
                  className={styles['image30']}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles['download']}>
        <div className={styles['main1']}>
          <img
            alt="image"
            src="/phone-1500w.png"
            className={styles['image31']}
          />
          <div className={styles['content12']}>
            <h2 className={styles['text89']}>
              Download our mobile app and book your next appointment
            </h2>
            <div className={styles['buttons']}>
              <button
                className={` ${styles['i-os']} ${projectStyles['button']} ${projectStyles['button-main']} `}
              >
                <img
                  alt="image"
                  src="/apple.svg"
                  className={styles['image32']}
                />
                <span>Download for iOS</span>
              </button>
              <button
                className={` ${projectStyles['button']} ${projectStyles['button-main']} ${styles['android']} `}
              >
                <img
                  alt="image"
                  src="/android.svg"
                  className={styles['image33']}
                />
                <span>Download for Android</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['footer']}>
        <div className={styles['left1']}>
          <div className={styles['brand']}>
            <img alt="image" src="/logo-2.svg" className={styles['image34']} />
            <p className={styles['text92']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className={styles['socials']}>
            <div className={projectStyles['social']}>
              <img
                alt="image"
                src="/insider.svg"
                className={styles['image35']}
              />
            </div>
            <div className={projectStyles['social']}>
              <img
                alt="image"
                src="/instagram.svg"
                className={styles['image36']}
              />
            </div>
            <div className={projectStyles['social']}>
              <img
                alt="image"
                src="/twitter.svg"
                className={styles['image37']}
              />
            </div>
          </div>
          <div className={styles['legal']}>
            <span className={styles['copyright']}>
              © 2022 finbest. All Rights Reserved.
            </span>
            <span className={projectStyles['legal-link']}>Privacy Policy</span>
            <span className={projectStyles['legal-link']}>Terms of Use</span>
          </div>
        </div>
        <div className={styles['right1']}>
          <div className={styles['list3']}>
            <span className={styles['header16']}>Menu</span>
            <div className={styles['links1']}>
              <span className={styles['link04']}>Home</span>
              <span className={styles['link05']}>About</span>
              <span className={styles['link06']}>Services</span>
              <span className={styles['link07']}>Blog</span>
              <span className={styles['link08']}>Support</span>
            </div>
          </div>
          <div className={styles['list4']}>
            <span className={styles['header17']}>Resources</span>
            <div className={styles['links2']}>
              <span className={styles['link09']}>Test Results</span>
              <span className={styles['link10']}>Patients</span>
              <span className={styles['link11']}>Doctors</span>
              <span className={styles['link12']}>Health</span>
            </div>
          </div>
          <div className={styles['list5']}>
            <span className={styles['header18']}>Contact</span>
            <div className={styles['links3']}>
              <span className={styles['link13']}>
                24 Street Name, City FI 01234, RO
              </span>
              <a
                href="mailto:contact@template.new?subject=Main"
                className={styles['link14']}
              >
                contact@template.new
              </a>
              <a href="tel:(004) 234 - 5678" className={styles['link15']}>
                (004) 234 - 5678
              </a>
            </div>
          </div>
        </div>
        <div className={styles['legal1']}>
          <div className={styles['row3']}>
            <span className={projectStyles['legal-link']}>Privacy Policy</span>
            <span className={projectStyles['legal-link']}>Terms of Use</span>
          </div>
          <span className={styles['copyright5']}>
            © 2022 finbest. All Rights Reserved.
          </span>
        </div>
      </div>
      <div>
        <div className={styles['container05']}>
          <Script
            html={`<script>
const modalOpen = document.querySelectorAll('[data-open]');
const modalClose = document.querySelectorAll('[data-close]');

modalOpen.forEach(button => {
    button.addEventListener('click', event => {
        const modal = document.querySelector(\`[data-modal="\${event.target.dataset.open}"]\`);
        modal.style.display = "flex";
    });
});

modalClose.forEach(button => {
    button.addEventListener('click', event => {
        const modal = document.querySelector(\`[data-modal="\${event.target.dataset.close}"]\`);
        modal.style.display = "none";
    });
});
</script>
`}
          ></Script>
        </div>
      </div>
      <div>
        <div className={styles['container07']}>
          <Script
            html={`<script>
const dataLetters = document.querySelectorAll("[data-letter]");
let activeLetters = [];
const maxResults = 6;

dataLetters.forEach(letter => {
  letter.addEventListener("click", function() {
    if (this.classList.contains("letter-active")) {
      this.classList.remove("letter-active");
      activeLetters = activeLetters.filter(a => a !== this.dataset.letter);
    } else {
      this.classList.add("letter-active");
      activeLetters.push(this.dataset.letter);
    }
    if (activeLetters.length == 0) {
      document.querySelector("[data-teleport='results']").style.display = "none";
      return;
    }
    showResults();
  });
});

const showResults = () => {
  fetch("https://raw.githubusercontent.com/Shivanshu-Gupta/web-scrapers/master/medical_ner/medicinenet-diseases.json")
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(item => {
        const firstLetter = item.disease.charAt(0).toLowerCase();
        if (activeLetters.includes(firstLetter)) {
          return true;
        }
        return false;
      });

      document.querySelector("[data-teleport='results']").style.display = "flex";
      const resultsContainer = document.querySelector("[data-results='letters']");
      resultsContainer.innerHTML = "";

      let counter = 0;
      const diseaseGroups = {};
      const totalActiveLetters = activeLetters.length;

      filteredData.forEach(disease => {
        const firstLetter = disease.disease[0].toLowerCase();
        if (diseaseGroups[firstLetter]) {
          diseaseGroups[firstLetter].push(disease);
        } else {
          diseaseGroups[firstLetter] = [disease];
        }
      });

      Object.keys(diseaseGroups).sort().forEach((firstLetter, index) => {
        const diseasesForThisLetter = diseaseGroups[firstLetter];
        const diseasesToShow = diseasesForThisLetter.slice(0, Math.ceil(maxResults / totalActiveLetters));

        diseasesToShow.forEach(disease => {
          const resultContainer = document.createElement("div");
          resultContainer.classList.add("search-result");
          resultContainer.classList.add("invisible");
          resultContainer.style.animationDelay = \`\${counter * 0.25}s\`;

          const resultText = document.createElement("span");
          resultText.classList.add("result-text");
          resultText.textContent = disease.disease;

          resultContainer.appendChild(resultText);
          resultsContainer.appendChild(resultContainer);
          counter++;

          if (counter === maxResults) {
            const moreContainer = document.createElement("div");
            moreContainer.classList.add("search-result");
            moreContainer.classList.add("more-results");

            const moreText = document.createElement("span");
            moreText.classList.add("result-text");
            moreText.textContent = "More";

            moreContainer.appendChild(moreText);
            resultsContainer.appendChild(moreContainer);
            addedMoreContainer = true;
            return;
          }
        });
      });
    });
};
</script>
`}
          ></Script>
        </div>
      </div>
      <div>
        <div className={styles['container09']}>
          <Script
            html={`<script>
function scroll(direction) {
  const doctorsDiv = document.querySelector('[data-teleport="doctors"]');
  const scrollAmount = 300;
  if (direction === 'previous') {
    doctorsDiv.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  } else if (direction === 'next') {
    doctorsDiv.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}

const buttons = document.querySelectorAll('[data-doctors]');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.dataset.doctors;
    scroll(direction);
  });
});
</script>`}
          ></Script>
        </div>
      </div>
      <span>kjjkn</span>
    </div>
  )
}

export default Home
