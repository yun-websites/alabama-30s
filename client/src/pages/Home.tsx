/**
 * Design reminder — County School Archive: evidence-first 1930s school-folder aesthetic.
 * Warm paper, railway-brick-red labels, pine-green actions, serif editorial headings,
 * restrained paper-motion, uneven archival layout. Never romanticize poverty or segregation.
 */
import { useMemo, useState } from "react";
import {
    ArrowDown,
    ArrowUpRight,
    BookOpen,
    ChevronRight,
    CircleHelp,
    Clock3,
    Footprints,
    HeartHandshake,
    Home as HomeIcon,
    Landmark,
    Lightbulb,
    Menu,
    Radio,
    Shirt,
    Sparkles,
    X,
} from "lucide-react";

const heroImage = "/assets/alabama-1930s-hero.png";
const schoolImage = "/assets/alabama-school-1930s.png";
const leisureImage = "/assets/alabama-leisure-1930s.png";
const markImage = "/assets/field-notes-mark.png";

type Moment = {
    time: string;
    label: string;
    title: string;
    body: string;
    note: string;
    image?: string;
};

const moments: Moment[] = [
    {
        time: "06:00",
        label: "Before class",
        title: "The workday often started before the school day.",
        body: "In a farming household, feeding animals, carrying water, helping younger children, or tending a garden could come before the walk to school. What you did depended greatly on your family, race, income, and whether you lived in town or the countryside.",
        note: "Field note: a family’s labour needs could shape whether and how long a young person attended school.",
    },
    {
        time: "08:00",
        label: "At school",
        title: "A school term could be short — or vanish altogether.",
        body: "Many Alabama districts struggled to keep their doors open during the Depression. In 1932–33, about 227,000 Alabama children attended school for five months or less. Schools were segregated by law, and resources were deeply unequal.",
        note: "Evidence file: only 16 of 116 Alabama school systems paid teachers in full in 1932.",
        image: schoolImage,
    },
    {
        time: "16:00",
        label: "After school",
        title: "Free time was usually low-cost and close to home.",
        body: "A porch, church social, ball game, library book, radio programme, card game, or visit with neighbours could provide recreation. These were ordinary possibilities, not a single universal routine.",
        note: "Look closely: the items in a home — a radio, a book, a garden — can reveal both pleasure and limits.",
        image: leisureImage,
    },
    {
        time: "19:00",
        label: "Evening",
        title: "Family resourcefulness mattered every night.",
        body: "During hard years, families stretched food, repaired clothes, shared work, and relied on relatives, neighbours, churches, and relief where it was available. Teenagers were expected to contribute, even while they still made room for friendships and play.",
        note: "Context, not stereotype: the Depression did not affect every Alabama household in the same way.",
    },
];

const survivalFiles = [
    {
        id: "01",
        eyebrow: "What you would wear",
        title: "Make it last.",
        icon: Shirt,
        color: "blue",
        body: "Practical, mended clothing mattered more than fashion for many families. A school outfit might be a simple cotton dress or shirt, overalls or trousers, sturdy shoes, and a sweater or coat when needed. Some rural families remade feed or fertilizer sacks into clothing when money was scarce.",
        prompt: "Archive question: Which details would show that a garment was made to be repaired rather than replaced?",
    },
    {
        id: "02",
        eyebrow: "What school could be like",
        title: "Learning had limits beyond the classroom.",
        icon: BookOpen,
        color: "green",
        body: "You might walk a long distance to a small school, share worn books, or miss class for work or because the school term was short. Alabama’s schools were legally segregated, so Black and white students did not share one public school system — and funding was not equal.",
        prompt: "Reading link: Notice who has access to authority, safety, and education in Maycomb.",
    },
    {
        id: "03",
        eyebrow: "How you might spend free time",
        title: "Fun did not have to cost much.",
        icon: Radio,
        color: "red",
        body: "Listening to radio programmes, playing ball or marbles, visiting neighbours, reading, fishing, church gatherings, and porch games were all possible ways to spend time. Travel, cinemas, and new purchases depended on family money and where you lived.",
        prompt: "Field test: How could a radio connect a rural home to the wider country?",
    },
    {
        id: "04",
        eyebrow: "What family life was like",
        title: "Everybody’s work counted.",
        icon: HomeIcon,
        color: "orange",
        body: "Families often cooked from gardens, canned food, repaired what they owned, and leaned on extended kin. When income disappeared, teenage children could help with chores, care, farm work, or searches for paid work. Home could mean security, but also pressure.",
        prompt: "Reading link: Which kinds of responsibility fall on children in the novel — and why?",
    },
    {
        id: "05",
        eyebrow: "Rules and expectations",
        title: "Your choices were shaped by adults — and by the law.",
        icon: Landmark,
        color: "ink",
        body: "Young people were generally expected to respect parents, teachers, elders, church and community rules. But rules were not neutral: Jim Crow laws enforced racial separation in schools and many public spaces, placing harsh restrictions on Black Alabamians.",
        prompt: "Important distinction: a custom can feel ordinary while still being unfair and enforced by power.",
    },
];

const facts = [
    {
        number: "01",
        fact: "Around 25%",
        label: "Alabama unemployment at its 1933 peak",
        source: "Encyclopedia of Alabama",
    },
    {
        number: "02",
        fact: "$311 → $194",
        label: "fall in Alabama personal annual income, 1929–1935",
        source: "Encyclopedia of Alabama",
    },
    {
        number: "03",
        fact: "227,000",
        label: "children attended school for five months or less in 1932–33",
        source: "Encyclopedia of Alabama",
    },
    {
        number: "04",
        fact: "16 / 116",
        label: "school systems paid teachers in full in 1932",
        source: "Encyclopedia of Alabama",
    },
    {
        number: "05",
        fact: "Under 5¢",
        label: "cotton price per pound by 1932, after a sharp fall",
        source: "Encyclopedia of Alabama",
    },
    {
        number: "06",
        fact: "1935",
        label: "Alabama began free textbooks for grades 1–3",
        source: "Encyclopedia of Alabama",
    },
    {
        number: "07",
        fact: "256",
        label: "of the 1901 Alabama Constitution established a segregated school system",
        source: "Encyclopedia of Alabama",
    },
];

const sources = [
    {
        id: "[1]",
        name: "Great Depression in Alabama",
        publisher: "Encyclopedia of Alabama",
        href: "https://encyclopediaofalabama.org/article/great-depression-in-alabama/",
    },
    {
        id: "[2]",
        name: "Public Education in the Early Twentieth Century",
        publisher: "Encyclopedia of Alabama",
        href: "https://encyclopediaofalabama.org/article/public-education-in-the-early-twentieth-century/",
    },
    {
        id: "[3]",
        name: "Segregation",
        publisher: "Encyclopedia of Alabama",
        href: "https://encyclopediaofalabama.org/article/segregation-jim-crow/",
    },
    {
        id: "[4]",
        name: "Everyday Life during the Depression",
        publisher: "University of Washington Great Depression Project",
        href: "https://depts.washington.edu/depress/everyday_life.shtml",
    },
    {
        id: "[5]",
        name: "1930–1939 Fashion History Timeline",
        publisher: "Fashion Institute of Technology",
        href: "https://fashionhistory.fitnyc.edu/1930-1939/",
    },
];

export default function Home() {
    const [activeMoment, setActiveMoment] = useState(0);
    const [activeFact, setActiveFact] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const currentMoment = useMemo(() => moments[activeMoment], [activeMoment]);

    const scrollToGuide = () => {
        document.getElementById("guide")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <main className="archive-page">
            <header className="archive-nav" aria-label="Page navigation">
                <a className="brand-lockup" href="#top" aria-label="Alabama '30s Field Notes home">
                    <img src={markImage} alt="" className="brand-mark" />
                    <span>
                        <b>ALABAMA ’30s</b>
                        <em>field notes</em>
                    </span>
                </a>

                <nav className="desktop-nav" aria-label="Guide sections">
                    <a href="#guide">The guide</a>
                    <a href="#hard-times">Hard times</a>
                    <a href="#facts">Fact file</a>
                    <a href="#sources">Sources</a>
                </nav>

                <button
                    className="menu-button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
                    {menuOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
                {menuOpen && (
                    <div id="mobile-menu" className="mobile-menu">
                        <a href="#guide" onClick={() => setMenuOpen(false)}>
                            The guide
                        </a>
                        <a href="#hard-times" onClick={() => setMenuOpen(false)}>
                            Hard times
                        </a>
                        <a href="#facts" onClick={() => setMenuOpen(false)}>
                            Fact file
                        </a>
                        <a href="#sources" onClick={() => setMenuOpen(false)}>
                            Sources
                        </a>
                    </div>
                )}
            </header>

            <section id="top" className="hero-section" aria-labelledby="hero-title">
                <img
                    className="hero-image"
                    src={heroImage}
                    alt="A rural Alabama road, schoolhouse, bicycle and cotton field in the 1930s"
                />
                <div className="hero-overlay" />
                <div className="hero-papergrain" aria-hidden="true" />
                <div className="hero-content">
                    <p className="archive-kicker">
                        <span>1930s</span> Alabama, USA <i /> Student background file
                    </p>
                    <h1 id="hero-title">
                        A teenager’s
                        <br />
                        <i>survival guide</i>
                    </h1>
                    <p className="hero-intro">
                        Open this field notebook before you enter the world of <em>To Kill a Mockingbird</em>. Look past the
                        fiction to the pressures, routines, hopes, and injustices that shaped real Alabama lives.
                    </p>
                    <div className="hero-actions">
                        <button className="primary-action" onClick={scrollToGuide}>
                            Open the files <ArrowDown size={17} />
                        </button>
                        <a className="text-action" href="#facts">
                            7 facts to carry <ChevronRight size={17} />
                        </a>
                    </div>
                </div>
                <aside className="hero-stamp" aria-label="Historical context note">
                    <Sparkles size={18} />
                    <span>
                        HISTORY IS NOT ONE
                        <br />
                        SINGLE STORY.
                    </span>
                </aside>
            </section>

            <section className="context-strip" aria-label="How to use this guide">
                <div className="context-symbol">
                    <CircleHelp size={22} />
                </div>
                <p>
                    <b>Read with care.</b> Experiences in 1930s Alabama differed sharply by race, class, family, and whether
                    people lived in a city or in the countryside. 
                    {/* <br /> */}
                    {/* This guide uses evidence to give context — it does not treat the novel as a history book. */}
                </p>
                <a href="#sources">
                    Check the sources <ArrowUpRight size={16} />
                </a>
            </section>

            <section className="day-section" aria-labelledby="day-heading">
                <div className="section-heading split-heading">
                    <div>
                        <p className="eyebrow">A day, in fragments</p>
                        <h2 id="day-heading">
                            Follow the <i>trail</i>
                            <br />
                            of an ordinary day.
                        </h2>
                    </div>
                    <p className="heading-note">
                        <Clock3 size={18} /> Choose a time stamp. Each clue shows one possibility, not every teenager’s story.
                    </p>
                </div>

                <div className="day-layout">
                    <div className="time-rail" role="tablist" aria-label="Parts of a day">
                        {moments.map((moment, index) => (
                            <button
                                key={moment.time}
                                role="tab"
                                aria-selected={activeMoment === index}
                                className={`time-button ${activeMoment === index ? "active" : ""}`}
                                onClick={() => setActiveMoment(index)}>
                                <span>{moment.time}</span>
                                <b>{moment.label}</b>
                            </button>
                        ))}
                    </div>

                    <article className="day-card" role="tabpanel">
                        <div className={`day-card-inner ${currentMoment.image ? "has-image" : ""}`}>
                            <div className="day-card-copy">
                                <p className="file-label">FIELD NOTE / {String(activeMoment + 1).padStart(2, "0")}</p>
                                <h3>{currentMoment.title}</h3>
                                <p>{currentMoment.body}</p>
                                <div className="pencil-note">
                                    <Footprints size={18} /> {currentMoment.note}
                                </div>
                            </div>
                            {currentMoment.image ? (
                                <img src={currentMoment.image} alt="An archival-style illustration of 1930s Alabama life" />
                            ) : (
                                <div className="day-card-ornament" aria-hidden="true">
                                    <span>AL</span>
                                    <i />
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            </section>

            <section id="guide" className="guide-section" aria-labelledby="guide-heading">
                <div className="guide-heading-row">
                    <div>
                        <p className="eyebrow">The survival guide</p>
                        <h2 id="guide-heading">
                            Five files to keep
                            <br />
                            <i>close to hand.</i>
                        </h2>
                    </div>
                    <p>
                        These are lenses for noticing setting, people, and power in Harper Lee’s novel. Open them like a
                        classroom archive: one evidence file at a time.
                    </p>
                </div>

                <div className="files-list">
                    {survivalFiles.map((file, index) => {
                        const Icon = file.icon;
                        return (
                            <article className={`survival-file ${file.color}`} key={file.id}>
                                <div className="file-tab">
                                    FILE
                                    <br />
                                    {file.id}
                                </div>
                                <div className="file-icon">
                                    <Icon size={24} strokeWidth={1.7} />
                                </div>
                                <div className="file-main">
                                    <p className="eyebrow">{file.eyebrow}</p>
                                    <h3>{file.title}</h3>
                                    <p>{file.body}</p>
                                </div>
                                <aside className="file-prompt">
                                    {/* <Lightbulb size={17} />
                                    <span>{file.prompt}</span> */}
                                </aside>
                                <div className="file-index" aria-hidden="true">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section id="hard-times" className="hard-times-section" aria-labelledby="hard-times-heading">
                <div className="hard-times-grid">
                    <div className="hard-times-title">
                        <p className="eyebrow">The weight of hard times</p>
                        <h2 id="hard-times-heading">
                            The Great Depression
                            <br />
                            was already at the door.
                        </h2>
                        <p>
                            Alabama’s economy was in trouble before 1929. Falling cotton prices, tenancy, debt, and then
                            widespread job loss left many homes with fewer choices. The effects lasted across the 1930s.
                        </p>
                    </div>
                    <div className="evidence-board" aria-label="Great Depression evidence">
                        <div className="evidence-pair">
                            <strong>25%</strong>
                            <span>unemployment at the state’s 1933 peak</span>
                        </div>
                        <div className="evidence-pair brick">
                            <strong>$194</strong>
                            <span>Alabama personal annual income in 1935, down from $311 in 1929</span>
                        </div>
                        <div className="evidence-pair">
                            <strong>65%</strong>
                            <span>of farms worked by tenants in 1930, up from 58% a decade earlier</span>
                        </div>
                        <div className="evidence-caption">
                            All figures from{" "}
                            <a
                                href="https://encyclopediaofalabama.org/article/great-depression-in-alabama/"
                                target="_blank"
                                rel="noreferrer">
                                Encyclopedia of Alabama [1]
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="facts" className="facts-section" aria-labelledby="facts-heading">
                <div className="facts-topline">
                    <div>
                        <p className="eyebrow">The pocket fact file</p>
                        <h2 id="facts-heading">
                            Seven things to <i>remember.</i>
                        </h2>
                    </div>
                    <p>
                        Tap a numbered tab to pull one fact from the folder. These are Alabama-specific evidence points to carry
                        into your reading.
                    </p>
                </div>
                <div className="fact-interface">
                    <div className="fact-tabs" role="tablist" aria-label="Historical facts">
                        {facts.map((fact, index) => (
                            <button
                                key={fact.number}
                                role="tab"
                                aria-selected={activeFact === index}
                                onClick={() => setActiveFact(index)}
                                className={activeFact === index ? "selected" : ""}>
                                {fact.number}
                            </button>
                        ))}
                    </div>
                    <article className="fact-card" role="tabpanel">
                        <p className="fact-card-label">FACT / {facts[activeFact].number}</p>
                        <strong>{facts[activeFact].fact}</strong>
                        <p>{facts[activeFact].label}</p>
                        <span>
                            <HeartHandshake size={16} /> Source: {facts[activeFact].source}
                        </span>
                    </article>
                    <div className="fact-corner" aria-hidden="true">
                        AL
                        <br />
                        <i>1930s</i>
                    </div>
                </div>
            </section>

            {/* <section className="reading-section" aria-labelledby="reading-heading">
                <div className="reading-side-note">
                    <span>
                        READ
                        <br />
                        THEN QUESTION
                        <br />
                        THEN READ AGAIN
                    </span>
                </div>
                <div className="reading-main">
                    <p className="eyebrow">Carry this into the novel</p>
                    <h2 id="reading-heading">
                        Three better questions
                        <br />
                        for <i>Maycomb.</i>
                    </h2>
                    <ol>
                        <li>
                            <span>01</span>
                            <p>Who has enough money, time, or safety to make a “choice” — and who does not?</p>
                        </li>
                        <li>
                            <span>02</span>
                            <p>Which social rules are only customs, and which are backed by law or fear?</p>
                        </li>
                        <li>
                            <span>03</span>
                            <p>
                                When a character is judged, what might their family’s work, schooling, race, or place in town
                                have to do with it?
                            </p>
                        </li>
                    </ol>
                </div>
            </section> */}

            <footer id="sources" className="sources-footer" aria-labelledby="sources-heading">
                <div className="source-intro">
                    <img src={markImage} alt="" />
                    <div>
                        <p className="eyebrow">Research desk</p>
                        <h2 id="sources-heading">Sources &amp; method</h2>
                    </div>
                    <p style={{ marginLeft: "5rem" }}>
                        This site synthesises published historical background for a school assignment. It uses original
                        illustrative artwork rather than presenting generated images as archival photographs.
                    </p>
                </div>
                <div className="sources-list">
                    {sources.map((source) => (
                        <a className="source-row" href={source.href} key={source.id} target="_blank" rel="noreferrer">
                            <span>{source.id}</span>
                            <b>{source.name}</b>
                            <em>{source.publisher}</em>
                            <ArrowUpRight size={17} />
                        </a>
                    ))}
                </div>
                <div className="footer-bottom">
                    <span>
                        <em>To Kill a Mockingbird</em> - Introduction
                    </span>
                    <a href="#top">
                        Return to cover <ArrowUpRight size={15} />
                    </a>
                </div>
            </footer>
        </main>
    );
}
