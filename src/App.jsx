import { useEffect, useMemo, useState } from 'react'
import { A } from './assets.js'
import { useCountUp, useReveal } from './useReveal.jsx'

const navItems = [
  ['Home', 'home'], ['About Us', 'about'], ['Features', 'features'],
  ['Admissions', 'admissions'], ['Gallery', 'gallery'], ['Contact', 'contact'],
]

const featureCards = [
  ['01','Safety Our First Priority','Comprehensive CCTV surveillance and rigorous sanitization protocols ensuring a secure sanctuary for learning.'],
  ['02','Spoken Language','Advanced Phonics programs and Public Speaking modules designed to craft eloquent future communicators.'],
  ['03','Intellectual Development','A bespoke curriculum integrated with modern teaching aids to stimulate cognitive excellence.'],
  ['04','Ethical & Social Growth','Nurturing character through storytelling and roleplays that cultivate deep emotional intelligence.'],
  ['05','Physical & Spiritual','Holistic wellness featuring Yoga, Classical Dance, and a vibrant Splash Pool for active development.'],
  ['06','Culture & Traditions','Immersive festive celebrations that ground our students in rich heritage and global inclusivity.'],
  ['07','Transportation Facilities','GPS-enabled fleet ensuring safe, timely, and comfortable commutes for all our pupils.'],
  ['08','Parental Guidance','Expert-led Child Development seminars building a bridge between school and home.'],
  ['09','Elite Faculty','Highly experienced mentors utilizing innovative teaching methodologies to inspire curiosity.'],
  ['10','Specialized Laboratories','Dedicated spaces for Science, Computing, and Mathematics for hands-on empirical learning.'],
  ['11','State of the Art Facilities','Premium resources and world-class infrastructure designed for an elite academic experience.'],
  ['12','Interactive Technology','Digital smart boards and upgraded technological suites integrated into every classroom.'],
  ['13','Continuous Evolution','Rigorous and regular training programs for our faculty to maintain pedagogical leadership.'],
  ['14','Eco-Centric Design','Spacious, child-centric, and environmentally sustainable campus infrastructure.'],
]

const legacyGalleryItems = [
  ['gallery1','Teachers Training Program'],['gallery2','Celebration of Festivals and Events'],['gallery3','Sneha Sadan And Blind School'],
  ['gallery4','Chandrayaan-3 Safe Landing'],['gallery5','Independence Day Celebration'],['gallery6','Children’s Day Celebration'],
  ['gallery7','National Sports Day'],['gallery8','Yoga Day Celebration'],['gallery9','School Election'],
  ['gallery10','Visit to Supermarket'],['gallery11','Investiture Ceremony'],['gallery12','Chemistry laboratory'],
  ['gallery13','Fancy Dress Competition'],['gallery14','Model Making Exhibition'],['gallery15','Pre-School Play Area'],
  ['gallery1','Teachers Training Program'],['gallery2','Celebration of Festivals and Events'],['gallery3','Sneha Sadan And Blind School'],
  ['gallery16','Visit to Airport'],['gallery8','Yoga and Meditation'],['gallery17','Music classes from 1st to 8th std'],
  ['gallery1','Teachers Training Program'],['gallery2','Celebration of Festivals and Events'],['gallery3','Sneha Sadan And Blind School'],
  ['gallery6','Visit to Bank by 4th to 7th std students'],['gallery18','Maths laboratory'],['gallery19','Cultural Programme'],
]

const galleryItems = [
  ['gallery1','Teachers Training Program'],['gallery2','Celebration of Festivals and Events'],['gallery3','Sneha Sadan And Blind School'],
  ['gallery4','Chandrayaan-3 Safe Landing'],['gallery5','Independence Day Celebration'],['gallery6',"Children's Day"],
  ['gallery7','National Sports Day'],['gallery8','Yoga Day Celebration'],['gallery9','School Election'],
  ['gallery10','Visit to Supermarket'],['gallery11','Investiture Ceremony'],['gallery12','Chemistry laboratory'],
  ['gallery13','Fancy Dress Competition-Community Helpers'],['gallery14','Model Making Exhibition'],['gallery15','Pre-School Play Area'],
  ['gallery16','Visit to Airport'],['gallery17','Yoga and Meditation'],['gallery18','Music classes from 1st to 8th std'],
  ['gallery19','Visit to Bank by 4th to 7th std students'],['gallery20','Maths laboratory'],['gallery21','Cultural Programme'],
]

function useRoute() {
  const get = () => (location.hash.replace('#/','').replace('#','') || 'home').split('?')[0]
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const onHash = () => { setRoute(get()); window.scrollTo({top:0, behavior:'instant'}) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

function Header({ active }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [active])
  return <header className="site-header">
    <div className="header-inner">
      <a href="#/home" className="brand"><img src={A.logoVeda} alt="Veda International School" /></a>
      <button className="menu-toggle" onClick={() => setOpen(v => !v)} aria-label="Toggle menu"><span/><span/><span/></button>
      <nav className={open ? 'nav open' : 'nav'}>
        {navItems.map(([label,key]) => <a key={key} className={active === key ? 'active' : ''} href={`#/${key}`}>{label}</a>)}
      </nav>
      <a className="call-btn" href="tel:+918362214455">Call Now</a>
      <img className="foundation-logo" src={A.logoFoundation} alt="S S Shettar Foundation" />
    </div>
  </header>
}

function LegacyFooter() {
  return <footer className="footer">
    <div className="footer-grid container">
      <div><h3>Veda International School</h3><p>Pioneering a new era of global education where every child is empowered to lead with integrity and wisdom.</p><a className="footer-location" href="https://share.google/RTI24MNAMDn5AGOOY" target="_blank" rel="noreferrer">📍 View our location on Google Maps</a><div className="socials"><span>f</span><span>↗</span></div></div>
      <div><h4>Quick Links</h4>{navItems.map(([l,k]) => <a key={k} href={`#/${k}`}>{l}</a>)}</div>
      <div><h4>Explore</h4><a href="#/home">Sitemap</a><a href="#/home">Global Campuses</a><a href="#/home">Student Portal</a><a href="#/home">Parent App</a></div>
      <div><h4>Newsletter</h4><p>Stay updated with our latest news and events.</p><form className="newsletter" onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Email"/><button aria-label="Subscribe">➤</button></form></div>
    </div>
    <div className="copyright">© 2026 Veda International School. All rights reserved. Designed by Spitel</div>
  </footer>
}

function Footer() {
  return <footer className="footer">
    <div className="footer-grid container">
      <div><h3>Veda International School</h3><p>Pioneering a new era of global education where every child is empowered to lead with integrity and wisdom.</p><div className="socials"><a href="https://www.instagram.com/vedainternational/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a><a href="https://www.facebook.com/p/Veda-International-School-100063178421963/" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.8v8H14Z" fill="currentColor" stroke="none"/></svg></a><a href="https://wa.me/918362214455" target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a12 12 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.4-8.3Z" fill="currentColor" stroke="none"/></svg></a></div></div>
      <div><h4>Quick Links</h4>{navItems.map(([l,k]) => <a key={k} href={`#/${k}`}>{l}</a>)}</div>
      <div><h4>Explore</h4><a href="#/home">Sitemap</a><a href="#/home">Global Campuses</a><a href="#/home">Student Portal</a><a href="#/home">Parent App</a></div>
      <div><h4>Newsletter</h4><p>Stay updated with our latest news and events.</p><form className="newsletter" onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Email"/><button aria-label="Subscribe">âž¤</button></form></div>
    </div>
    <div className="copyright">Â© 2026 Veda International School. All rights reserved. Designed by Spitel</div>
  </footer>
}

function PageHero({ active, image, badge, title, description }) {
  return <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.76),rgba(0,22,43,.42) 67%,rgba(0,0,0,.08)), url(${image})`}}>
    <Header active={active}/>
    <div className="container page-hero-content" data-reveal="left"><span className="eyebrow pill">{badge}</span><h1>{title}</h1><p>{description}</p></div>
  </section>
}

function SectionTitle({ eyebrow, title, centered=false, description }) {
  return <div data-reveal="left" className={centered ? 'section-title centered' : 'section-title'}>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2><i></i>{description && <p>{description}</p>}</div>
}

function AdmissionsCTA() {
  return <section className="admissions-cta" style={{backgroundImage:`linear-gradient(rgba(0,22,43,.76),rgba(0,22,43,.76)), url(${A.admissionsCta})`}}>
    <div className="container cta-wrap"><div className="cta-copy"><span className="eyebrow pill dark-pill">Admissions for 2026-27</span><h2>Start Your Child's<br/><em>Journey at Veda.</em></h2><p>Join a community that celebrates curiosity, cultivates excellence, and prepares the next generation of global leaders.</p><div className="btn-row"><a className="btn pink" href="#/admissions">Admission Process</a><a className="btn white" href="#/admissions">Eligibility Documents</a></div></div><div className="intake"><b>2026</b><span>Intake Open</span></div></div>
  </section>
}

function Home() {
  const [heroVideoEnded, setHeroVideoEnded] = useState(false)
  const branches = [
    [A.branch1,'Play Home and Nursery','#29, Madhura Estate, Badaminagar, Nagashettykoppa, Keshwapur, Hubballi - 580023'],
    [A.branch2,'LKG to 8th Std.','Plot No: 758/2, Kusugal Road, Hubballi - 580023'],
    [A.branch3,'Playhome, Nursery & Pre-primary','Plot No: 39, Pragati Colony, Shirur Park Road, Vidya Nagar, Hubballi - 580021'],
  ]
  const programs = [
    ['01','Play Home & Nursery','A safe, playful environment where early learners begin their journey of social interaction and curiosity through sensory exploration.'],
    ['02','LKG to 8th STD','Rigorous foundational curriculum focused on literacy, STEM, and critical thinking designed to create independent thinkers.'],
    ['03','Pre-Primary','Advanced Montessori-inspired methodology preparing students for formal schooling with an emphasis on emotional intelligence.'],
  ]
  const events = [[A.event1,'Chandrayaan 3','August 23RD'],[A.event2,'Visit to Sneha Sadan & Govt. Blind School','August 26TH'],[A.event3,'Blue Day Celebration','August 18TH'],[A.event4,'Independence Day Celebration','August 15TH'],[A.event5,'Fancy Dress Competition','August 11']]
  const facilities = [[A.facility1,'Assembly Hall'],[A.facility2,'Subject Specific Laboratories'],[A.facility3,'Indoor & Outdoor Sports'],[A.facility4,'Grand Auditorium']]
  return <>
    <section className="home-hero"><video className="hero-video" autoPlay muted playsInline onEnded={() => setHeroVideoEnded(true)}><source src={A.mobileHeroVideo} type="video/mp4" media="(max-width: 600px)" /><source src={A.heroVideo} type="video/mp4" /></video><Header active="home"/><div className={heroVideoEnded ? 'home-hero-copy hero-copy-visible' : 'home-hero-copy'}><h1><span>Veda</span> International School</h1><p>Veda International School blends traditional academic rigor with modern<br/>creative inquiry to nurture the next generation of global citizens.</p><div className="hero-actions"><a className="btn white" href="#/admissions">Register <b>→</b></a><a className="hero-outline-btn" href="#/about">About Us</a></div></div></section>
    <div className="announcement"><span className="announcement-icon">⚒</span><b>Important Announcements :</b> Fancy Dress Competition Winner Announcements are scheduled on 13.06.2024</div>
    <section className="section"><div className="container intro-grid"><div><SectionTitle eyebrow="Nurturing Excellence" title="Where tradition meets intentional curiosity."/><p>At Veda, we don't just teach; we curate experiences. Our curriculum is a living tapestry of sciences, arts, and ethics, designed to provoke thought rather than just provide answers.</p><p>We believe excellence is not a destination but a habitual state of being. Through small class sizes and mentorship, we ensure every student's journey is unique.</p><div className="stats"><div><b>12:1</b><span>Student Ratio</span></div><div><b>24+</b><span>Extracurriculars</span></div></div></div><div className="intro-image"><img src={A.homeIntro} alt="Veda school"/></div></div></section>
    <section className="section soft"><div className="container"><SectionTitle eyebrow="Across Our City" title="Our Branches" centered/><div className="branches-grid">{branches.map(([img,title,address])=><article className="branch-card" key={title}><img src={img} alt={title}/><div><h3>{title}</h3><p>{address}</p><a href="#/contact">Get Directions →</a></div></article>)}</div></div></section>
    <section className="section"><div className="container"><SectionTitle eyebrow="Education Pillars" title="Academic Programs" centered/><div className="program-grid">{programs.map(([n,t,d])=><article className="program-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="#/features">Explore Program →</a></article>)}</div></div></section>
    <section className="section soft"><div className="container"><SectionTitle eyebrow="Student Life" title="Life at Veda"/><div className="events-grid">{events.map(([img,t,date])=><article className="event-card" key={t}><img src={img} alt={t}/><small>{date}</small><h3>{t}</h3></article>)}<article className="event-note pink-note"><span>Upcoming</span><h3>Science Expo</h3><p>Discover student-led experiments, innovation and curiosity in action.</p></article><article className="event-note navy-note"><h3>A Legacy of Creative Thinking</h3><p>Our students aren't just memorizing facts; they're solving real-world problems.</p></article></div></div></section>
    <section className="section"><div className="container"><div className="title-row"><SectionTitle eyebrow="Amenities and Features" title="Facilities designed to fuel passion and performance."/><a className="text-link" href="#/features">View Full Facility List →</a></div><div className="facility-grid">{facilities.map(([img,t])=><article key={t}><img src={img} alt={t}/><h3>{t}</h3></article>)}</div></div></section>
    <section className="section soft"><div className="container"><SectionTitle title="Why Veda International?" centered/><div className="why-grid"><article><b>01</b><h3>Future-Ready</h3><p>Integrated coding, robotics, and global exchange programs to ensure our students are ready for the 22nd century.</p></article><article><b>02</b><h3>Safety First</h3><p>24/7 CCTV surveillance, biometric access, and trained medical staff to provide a secure environment for every child.</p></article><article><b>03</b><h3>Elite Faculty</h3><p>Mentors with international teaching certifications and a passion for personalized learning and student growth.</p></article></div></div></section>
    <AdmissionsCTA/><Footer/>
  </>
}

function About() {
  const messages = [
    {type:'Vice Chairperson’s Message',img:A.viceChairperson,name:'Vice Chairperson',text:'Dear Budding Achievers, Seasons Greetings and a warm welcome to this academic year. We, at Veda International wish to align ourselves with a motto to make our institution a “Deemed One” with respect to the all round development of our students. We have a new outlook of satiating thirst to knowledge by imparting quality education, with multi-faceted teaching concepts. With the paradigm shift in the present era, we facilitate our learners to exhibit their hidden potential to the core. Our students of Veda International School shall succeed in setting global standards. We motivate our students to enhance their talent and skills to synchronize the pace of the present competitive world. Let’s move ahead soaring towards the pinnacle of excellence, following the dictum. “Be the change you wish to see”. Wish You All an Amazing Future!'},
    {type:"Trustee's Message",img:A.trustee,name:'Mrs. Shradha Angadi',text:'Dear Students, It is a great pleasure to welcome you all to Veda International School. I hope you all are refreshed and energized for another good academic year. Education is a passion driven journey. We at Veda International School strive to provide a quality education through state-of-the-art infrastructure and well qualified staff to cater to the needs of the students. The purpose of education is not just imparting academic knowledge but to inculcate humanitarian values like wisdom, compassion, courage, humility and integrity. My dear students always follow the 3 D’s i.e. Discipline, Dedication and Determination in your life at every stage. This will help you to achieve your goals and be successful. Wishing you all the best for the new academic year.'},
    {type:"Principal's Message",img:A.principal,name:'Mrs. Beena A John',text:'In today’s pursuit of holistic education, our S S Shettar Foundation’s Veda International School has emerged as a key influence in shaping a child’s overall development. Holistic education, acknowledging a student’s emotional, physical, social and spiritual growth, is a central tenet of our school. This approach, in line with the New Education Policy of 2020 in India, emphasizes a blend of academics with social responsibilities and humanitarian values. Our school stands out through distinctive teaching methodologies and curriculum design, supported by state-of-the-art infrastructure, modern technologies, teacher training, sports, public speaking, inter-school competitions, laboratories, library, transportation, medical aids, music and dance.'},
  ]
  return <><PageHero active="about" image={A.aboutHero} badge="Our Story" title="About Us" description="Combining strong academics and values, and to prepare students for the future."/>
    <section className="section"><div className="container"><SectionTitle title="About our Institution"/><div className="legacy-grid"><div><span className="eyebrow">Our Legacy</span><h2 className="display-heading">Crafting the <span>Scholars</span> of Tomorrow.</h2><p>At Veda, we believe education is not merely the delivery of facts, but the curated cultivation of a curious mind. Our heritage is rooted in the pursuit of absolute excellence.</p></div><div className="legacy-image"><img src={A.aboutLegacy} alt="Veda International School building"/><div className="years"><b>25+</b><span>Years of Elite Pedagogy</span></div></div></div></div></section>
    <section className="section soft"><div className="container mission-grid"><article><span className="eyebrow">Mission</span><h3>To cultivate intellectual curiosity and moral character.</h3><p>We empower students to become critical thinkers and compassionate leaders who navigate the complexities of a changing world with integrity and vision.</p></article><article><span className="eyebrow">Vision</span><h3>Defining the standard of elite international education.</h3><p>Our vision is to be recognized globally as a center of pedagogical innovation where tradition meets futuristic learning frameworks.</p></article><article><span className="eyebrow">Values</span><ul><li>Uncompromising Rigor</li><li>Cultural Intelligence</li><li>Ethical Stewardship</li><li>Creative Courage</li></ul></article></div></section>
    <section className="chair-quote section"><div className="container narrow"><div className="quote-mark">❞</div><p>Dear Learners,<br/>It is rightly said ‘Education is the powerful weapon that can change the whole world’. Our country is the land of knowledge in abundance, rich Culture and Heritage. Scholars are born here and have spread the light of knowledge far and wide. I advise the learners of our institution to acquire knowledge and become better individuals and live an ‘Enlightened Life’. Serve your Nation by rendering your whole-hearted service in all your endeavors. I wish you a bright and successful future!<br/>Good Luck<br/>Jai Hind ! Vande Mataram !</p><hr/><h3>Mrs. Shilpa Shettar</h3><span>Chairperson, S S Shettar Foundation</span></div></section>
    {messages.map((m,i)=><section className={`section message-section ${i%2===0?'soft':''}`} key={m.type}><div className={`container message-grid ${i%2===1?'reverse':''}`}><div className="portrait"><img src={m.img} alt={m.name}/></div><div><span className="eyebrow">{m.type}</span><p>{m.text}</p><h3>{m.name}</h3></div></div></section>)}
    <Footer/></>
}

function Features() {
  const ecosystem = ['Subject Specific Laboratories','Assembly Hall','Canteen & Transport','Library & Hall','Activity Room','Play Area','Auditorium','Informal Open Spaces','Dance & Music Classes','Public Speaking Classes','Outdoor & Indoor Sports','Interactive & Smart Classes']
  return <><PageHero active="features" image={A.featuresHero} badge="Curated Excellence" title="Our Features" description="Defining the future of education through innovative pedagogy, world-class facilities, and holistic child development."/>
    <section className="section"><div className="container feature-grid">{featureCards.map(([n,t,d],i)=><article className={i%2?'feature-card muted':'feature-card'} key={n}><div className="feature-top"><span>{n}</span><b>{['⌾','⌁','◎','⌘','♨','◆'][i%6]}</b></div><h3>{t}</h3><p>{d}</p></article>)}</div></section>
    <section className="ecosystem section"><div className="container"><SectionTitle title="The Campus Ecosystem" description="Explore the detailed resources available within our curated grounds." centered/><div className="ecosystem-grid">{ecosystem.map((x,i)=><article key={x}><span>{['⌁','▥','♨','▤','⌂','✧','◫','⌖','♪','⌁','◉','▣'][i]}</span><p>{x}</p></article>)}</div></div></section>
    <section className="section"><div className="container campus-split"><div><h2>A Campus Built for <em>Curiosity.</em></h2><p>Beyond the numbers, our academy is a living, breathing space designed to evoke wonder. From the soft morning light in our libraries to the energetic hum of our laboratories, every corner of The Curator Academy is intentional.</p><a className="text-link" href="#/admissions">View Admission Process →</a></div><div className="campus-collage"><img src={A.campus1} alt="Student engagement"/><img src={A.campus2} alt="Library reading area"/></div></div></section>
    <Footer/></>
}

function Admissions() {
  const [branch,setBranch] = useState('')
  const [admissionStatus, setAdmissionStatus] = useState({ type: '', text: '' })

  async function submitAdmission(event) {
    event.preventDefault()
    setAdmissionStatus({ type: 'sending', text: 'Submitting application...' })

    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())
    payload.branch = branch

    try {
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to submit application.')
      form.reset()
      setBranch('')
      setAdmissionStatus({ type: 'success', text: result.message })
    } catch (error) {
      setAdmissionStatus({ type: 'error', text: error.message })
    }
  }

  return <><PageHero active="admissions" image={A.admissionsHero} badge="Enrollment Open 2026-27" title="Admissions" description="Join an elite community where excellence meets creative innovation."/>
    <section className="section"><div className="container admissions-layout"><aside><SectionTitle title="Admission Journey"/><ol className="journey"><li><b>01</b><div><h4>Submit Profile</h4><p>Complete the digital enrollment form with accurate student and guardian details.</p></div></li><li><b>02</b><div><h4>Campus Selection</h4><p>Choose the specific branch that fits your academic grade and location preference.</p></div></li><li><b>03</b><div><h4>Secure Enrollment</h4><p>Complete the registration fee via our secure payment gateway to finalize the application.</p></div></li></ol><blockquote>“Our admission process is designed to find the unique potential in every student, ensuring a perfect fit for our holistic curriculum.”</blockquote></aside>
      <form className="admission-form" onSubmit={submitAdmission}><h3>Student Information</h3><div className="form-grid"><label>Students Name<input name="studentName" required placeholder="Full Legal Name"/></label><label>Student's Parent's Name<input name="parentName" required placeholder="Guardian Name"/></label><label>Email Address<input name="email" type="email" required placeholder="example@veda.edu"/></label><label>Phone Number<input name="phone" required placeholder="+91 00000 00000"/></label><label>City<input name="city" required placeholder="Current Residence"/></label><label>Admission for which class<select name="className" required defaultValue=""><option value="" disabled>Select Class</option><option>Play Home</option><option>Nursery</option><option>LKG</option><option>UKG</option><option>1st to 8th Std</option></select></label></div>
      <div className="branch-select"><h3>Select Preferred Branch</h3>{[['Madhura Estate Keshwapur','PLAY HOME & NURSERY'],['Vidya Nagar','PLAY HOME, NURSERY & PRE-PRIMARY'],['Kusugal Road Hubballi','L.KG to 8th Std']].map(([loc,name])=><label className={branch===name?'selected':''} key={name}><input type="radio" name="branch" value={name} checked={branch===name} onChange={()=>setBranch(name)}/><span><b>{name}</b><small>{loc}</small></span><i>›</i></label>)}</div>
      <div className="payment"><div><h3>Registration Summary</h3><p>Secure your application by paying the registration processing fee.</p><button type="submit" className="btn navy">Apply Now</button>{admissionStatus.text && <small className={`form-status ${admissionStatus.type}`}>{admissionStatus.text}</small>}<small>🔒 Secure payment gateway confirmation</small></div><div className="qr-card"><span>Scan & Pay</span><img src={A.qr} alt="Payment QR"/><div>VISA &nbsp; UPI &nbsp; RUPAY</div></div></div></form></div></section>
    <section className="section admission-info"><div className="container info-grid"><article><span>▤</span><h3>Required Documents</h3><ul><li>Birth Certificate</li><li>Previous Year Report Cards</li><li>Passport sized photographs (4)</li><li>Address Proof</li></ul></article><article className="dark"><span>▣</span><h3>Academic Calendar</h3><p>Explore our seasonal breaks, examination periods, and culturally rich event schedules for the 2026-27 year.</p><a href="/academic-calendar.pdf" download="veda-academic-calendar-2026-27.pdf">Download PDF →</a></article><article><span>◉</span><h3>Admission Helpdesk</h3><p>Our dedicated admission counselors are here to help you through every step of the process.</p><b>+91 836 221 4455</b><small>admissions@veda.edu</small></article></div></section>
    <Footer/></>
}

function Gallery() {
  return <><PageHero active="gallery" image={A.galleryHero} badge="Archival Collection" title="Gallery" description="Capturing moments of learning, creativity, achievement, and joyful experiences that define life at our institution."/>
    <section className="section"><div className="container"><SectionTitle title="Our Virtual Gallery"/><div className="gallery-grid">{galleryItems.map(([key,title],i)=><article key={`${title}-${i}`}><img src={A[key]} alt={title}/><h3>{title}</h3></article>)}</div></div></section><AdmissionsCTA/><Footer/></>
}

function Contact() {
  const [contactStatus, setContactStatus] = useState({ type: '', text: '' })

  async function handleContactSubmit(event) {
    event.preventDefault()
    setContactStatus({ type: 'sending', text: 'Sending message...' })

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send message.')
      form.reset()
      setContactStatus({ type: 'success', text: result.message })
    } catch (error) {
      setContactStatus({ type: 'error', text: error.message })
    }
  }

  return <><PageHero active="contact" image={A.contactHero} badge="We're Here to Help" title="Contact Us" description="Our team is always ready to assist you. Reach out to us and we’ll make your experience smooth, clear, and hassle-free."/>
    <section className="section"><div className="container contact-grid"><div><h2>Get in touch with us</h2><p>Whether you have questions about admissions, academics, or campus life, our team is always ready to assist you.</p><div className="contact-list"><div><i>⌕</i><span><b>Phone</b><a href="tel:+911234567890">+91 123 456 7890</a></span></div><div><i>✉</i><span><b>Email</b><a href="mailto:veda@gmail.com">veda@gmail.com</a></span></div><div><i>⌖</i><span><b>School Location</b><a className="map-link" href="https://share.google/RTI24MNAMDn5AGOOY" target="_blank" rel="noreferrer">View Veda International School on Google Maps →</a></span></div></div></div>
      <form className="contact-form" onSubmit={handleContactSubmit}><h3>Send us a message</h3><div className="form-grid"><label>First Name<input name="firstName" required placeholder="Enter Your First Name"/></label><label>Last Name<input name="lastName" placeholder="Enter Your Last Name"/></label><label>Email Address<input name="email" type="email" required placeholder="Enter Your Email"/></label><label>Phone Number<input name="phone" placeholder="Enter Your Phone Number"/></label><label className="full">Message<textarea name="message" required placeholder="Please provide details about your requirements..."/></label></div><button className="btn navy" type="submit" disabled={contactStatus.type === 'sending'}>{contactStatus.type === 'sending' ? 'Sending...' : 'Send Message'}</button>{contactStatus.text && <p className={`contact-form-status ${contactStatus.type}`}>{contactStatus.text}</p>}</form></div></section><Footer/></>
}

export default function App() {
  const route = useRoute()
  useReveal()
  useCountUp()
  const pages = useMemo(() => ({home:<Home/>,about:<About/>,features:<Features/>,admissions:<Admissions/>,gallery:<Gallery/>,contact:<Contact/>}), [])
  return pages[route] || <Home/>
}
