// Timeline data structure for the new timeline component
// This matches the format expected by timeline.html component

// Import all images to ensure they're processed by Vite
import scotlandImg from '../assets/img/scotland.jpg'
import greenlandImg from '../assets/img/greenland.jpg'
import ctedImg from '../assets/img/CTED.jpg'
import blitzImg from '../assets/img/blitz.jpg'
import designImg from '../assets/img/design.png'
import droneImg from '../assets/img/drone.png'
import workshopImg from '../assets/img/workshop.jpg'
import genderImg from '../assets/img/gender.png'
import bubbleImg from '../assets/img/bubble.jpg'
import goldmanImg from '../assets/img/goldman.jpg'
import mozillaImg from '../assets/img/mozilla.jpg'
import thermostatImg from '../assets/img/thermostat.jpg'
import doorbellImg from '../assets/img/doorbell.webp'
import daplinkImg from '../assets/img/daplink.webp'
import urbanaiImg from '../assets/img/urbanai.jpg'
import cshotImg from '../assets/img/cshot.jpg'
import tripImg from '../assets/img/3d_trip.png'
import beamImg from '../assets/img/beam.png'
import datasetImg from '../assets/img/dataset-curation.jpg'
import annotationImg from '../assets/img/annotation.png'
import dataCollectionImg from '../assets/img/data-collection.png'
import robustnessImg from '../assets/img/robustness.png'

// Timeline data in the new format expected by timeline component
export const chapters = [
  {
    id: 'university',
    title: 'University in Abu Dhabi',
    years: '2014-18',
    description: 'I earned my Computer Science degree from NYU Abu Dhabi, with semesters at the New York and Shanghai campuses. These years were defined by constant moving, adventure and amazing friendships. I built apps in Ghana, joined arctic expeditions, and made lasting friendships on desert camping trips.',
    projects: [
      {
        type: 'Internship',
        title: 'Data Scientist',
        company: 'Sociovestix',
        year: 'Summer 2017',
        description: 'I reached out to SocioVestix Labs, Scotland\'s first responsible investment consulting firm. Their most painful bottleneck was manual PDF data extraction that took 2 months. I built an automated language processing pipeline that delivered results in one week.',
        image: scotlandImg
      },
      {
        type: 'Internship',
        title: 'Data Visualization',
        company: 'CSLC',
        year: 'Fall 2016',
        description: 'I approached the Center for Sea Level Change and built the first successful visualization of 300,000 oceanographic data points collected by sensor-tagged seals in Greenland\'s fjords. The D3.js visualization revealed hidden patterns in polar water dynamics, earning me a spot on the actual research expedition to Greenland.',
        image: greenlandImg
      },
      {
        type: 'Internship',
        title: 'Software Engineer',
        company: 'CTED',
        year: 'Summer 2016',
        description: 'At NYU\'s Center for Technology and Economic Development, I explored how simple tech could spark economic growth in rural Africa. In Ghana, I prototyped an SMS-based taxi dispatch system that brought Uber-like coordination to areas without smartphones. I also extended a road network analysis tool that helped governments identify critical infrastructure gaps.',
        image: ctedImg
      },
      {
        type: 'Internship',
        title: 'Web Developer',
        company: 'BlitzBringer',
        year: 'Summer 2015',
        description: 'I landed in Frankfurt with zero contacts and barely enough euros for ramen. While designing the website for BlitzBringer (a crowdsourced delivery startup), I learned that surviving in a foreign city teaches you resourcefulness no coding bootcamp ever could.',
        image: blitzImg
      },
      {
        type: 'Independent',
        title: 'Freelance Web Design',
        company: 'Various Clients',
        year: '2014–2018',
        description: 'I built websites for artists who had incredible work but zero web presence, including digital art archives and an internal news portal for NYUAD. These evolved into broader design work: <a href="https://photos.app.goo.gl/J8eUKNiDyTpjZrx86" target="_blank">photography</a>, logos, print materials, even a marketing campaign for the Burj Khalifa. I also built tools for my own needs, like Mytorch.tech (a conflict resolution app) and DIYDictionary (a vocabulary tracker). This mix taught me that good design is about translating vision into pixels.',
        image: designImg
      },
      {
        type: 'Independent',
        title: 'Drone Design Challenge',
        company: 'Lockheed Martin',
        year: '2017',
        description: 'Won Lockheed Martin funding to 3D-map glaciers using drone-mounted LiDAR. Our 5-person team handled the technical pipeline: researching industrial sensors, designing data architecture, and building point cloud visualizations that helped glaciologists track ice movement patterns.',
        image: droneImg
      },
      {
        type: 'School Work',
        title: 'Machine Learning Workshops',
        company: 'NYUAD',
        year: '2018',
        description: 'I designed and taught ML workshops for 26 students at NYUAD. We built classifiers and broke training datasets to understand how bias creeps into "objective" algorithms. All materials are free on my Github.',
        image: workshopImg
      },
      {
        type: 'School Work',
        title: 'Gender & Ethnicity Bias Research',
        company: 'NYUAD + Princeton',
        year: '2017',
        description: 'Partnered with a Princeton researcher to quantify the corporate glass ceiling. We used deep learning to reconstruct organizational hierarchies from LinkedIn data and predict advancement patterns across demographics. My focus was image classification.',
        image: genderImg
      },
      {
        type: 'School Work',
        title: 'Visual Gender Bias Extension',
        company: 'Chrome Extension',
        year: '2017',
        description: 'Built a Chrome extension that counted male vs. female faces during web browsing, then visualized the results. After tracking my browsing for a month, I discovered I was exposed to 3x more male faces online - bias baked into the pixels we consume daily.',
        image: bubbleImg
      }
    ]
  },
  {
    id: 'london',
    title: 'My First Job in London',
    years: '2018-19',
    description: 'London confirmed I genuinely loved building things with code. Between hunting for affordable flats and juggling side projects with a demanding day job, I discovered both my technical interests and the reality of adult life.',
    projects: [
      {
        type: 'Professional',
        title: 'Data Engineer',
        company: 'Goldman Sachs',
        year: '2018–2019',
        description: 'Millions of daily trades were waiting on batch processes designed in the mainframe era. My team rearchitected the intraday risk pipeline for prime services clients into a real-time microservices architecture using AWS, Kubernetes, and Hazelcast. Data lag dropped from minutes to seconds.',
        image: goldmanImg
      },
      {
        type: 'Independent',
        title: 'Creative Media Awards Winner',
        company: 'Mozilla Foundation',
        year: '2018–2019',
        description: 'My friends and I built what Mozilla funded with $31,500: an <a href="https://www.survivalofthebestfit.com" target="_blank">interactive website</a> that taught algorithmic bias by letting people break AI systems themselves. The website reached 102,000+ learners and caught attention from DeepMind, UNESCO, and the Government of Canada. Universities adopted it for AI ethics courses, and I gave workshops on responsible AI design. Read our <a href="https://www.survivalofthebestfit.com/reports/SOTBF_Retrospective_Report_2024.pdf" target="_blank">impact report</a> to see how we proved the best way to teach complex concepts is through experience, not papers.',
        image: mozillaImg
      }
    ]
  },
  {
    id: 'taipei',
    title: 'Taipei during COVID',
    years: '2019-2023',
    description: 'Living in Asia and working on smart home tech were high on my bucket list. When Google let me pick any team worldwide, I chose Nest in Taiwan, and suddenly my bucket list became my Monday morning.. The timing was perfect - while the world locked down during COVID, Taiwan\'s competent response meant I lived normally. I went for cutting-edge tech, stayed for the night markets, mountain trails, and a culture that restored my faith in how societies can function.',
    projects: [
      {
        type: 'Professional',
        title: 'Google Nest Thermostat',
        company: 'Google Nest',
        year: '2021–2023',
        description: 'The <a href="https://www.theverge.com/24322643/nest-learning-thermostat-4th-gen-review" target="_blank">Nest Thermostat</a> is a premium smart thermostat that learns user preferences and delivers intelligent alerts. With 15+ million units sold, it has saved 113 billion kilowatt-hours since 2011 (double Portugal\'s annual consumption). I developed sensor fusion algorithms for presence and intent detection, HVAC management, security features, and OS-level functionality. It\'s deeply satisfying to ship code that quietly fights climate change in millions of homes daily.',
        image: thermostatImg,
      },
      {
        type: 'Professional',
        title: 'Google Nest Camera & Doorbell',
        company: 'Google Nest',
        year: '2019–2021',
        description: 'Google\'s <a href="https://store.google.com/product/nest_cam_battery?hl=en-US" target="_blank">battery-powered security cameras</a> and <a href="https://store.google.com/product/nest_doorbell?hl=en-US" target="_blank">doorbells</a> pack ML intelligence into devices that must last months on a single charge. I owned features from battery management to presence detection, obsessing over every milliamp to extend idle battery life by 10%. Managing the full lifecycle from prototype to mass production (2+ million units sold) taught me that shipping hardware means sweating details users never notice.',
        image: doorbellImg,
      },
      {
        type: 'Professional',
        title: 'Open Source Contributor',
        company: 'DAPLink Project',
        year: '2022',
        description: 'Led a team of 3 to develop a novel debugging solution, contributing the <a href="https://github.com/ARMmbed/DAPLink/pull/966/files" target="_blank">code upstream</a> to the core DAPLink project. The work was presented at the 2023 Open Source Firmware Conference and used by hundreds of engineers.',
        image: daplinkImg
      },
      {
        type: 'Independent',
        title: 'Advisor & Contributor',
        company: 'Urban AI Think Tank',
        year: '2022–2025',
        description: 'As an advisor to this <a href="https://urbanai.fr/" target="_blank">French think tank</a>, I explore how AI reshapes cities and urban life. My <a href="https://medium.com/urban-ai/power-play-1a9026c36f14" target="_blank">blog post on battery politics</a> became their most-read piece of 2024, and I contributed a chapter to their book on Urban AI. I\'ve led workshops for the Champs-Élysées redevelopment project.',
        image: urbanaiImg
      },
      {
        type: 'Independent',
        title: 'MIT Urban Planning Contest',
        company: 'MIT Media Lab',
        year: '2021',
        description: 'Proposed and prototyped a street design template and citizen engagement platform for the New Taipei City Government. I worked with 4 teammates as part of a program organized by MIT Media Lab\'s City Science Group. <a href="./img/cshot-presentation.pdf" target="_blank">Check out our presentation here</a>.',
        image: cshotImg
      },
      {
        type: 'Independent',
        title: '3D Trip Renderer',
        company: 'Personal Project',
        year: '2023',
        description: 'Built a <a href="https://github.com/gaborcsapo/map-cloud" target="_blank">WebGL tool</a> that rendered travel memories on 3D maps, because photos in folders are boring. I used this project to send friends nostalgic reminders of past adventures and to learn WebGL and cloud solutions. This was my last pure fun project before ChatGPT changed how small projects are created.',
        image: tripImg
      }
    ]
  },
  {
    id: 'sf',
    title: 'San Francisco',
    years: '2023-now',
    description: 'I moved to San Francisco to work at the intersection of data and cutting-edge ML. What I didn\'t expect was falling in love with a city everyone warned me about. Yes, SF is a city of extremes... and the good parts are extraordinary, too. Where else can you hit an AI conference, have a conversation about human connection with strangers in a basement space, then grab Korean groceries for your  weekend camping trip all in the same day?',
    projects: [
      {
        type: 'Professional',
        title: 'Google Beam',
        company: 'Google Labs',
        year: '2023–Present',
        description: '<a href="https://beam.google" target="_blank">Beam</a> combines Google\'s breakthroughs in AI, 3D imaging, and light field rendering to bring dimensional depth and realism of in-person meetings to remote conversations without headsets. I architect the data flywheel for the AI research team: collection, annotation, curation, and evaluation across multiple multi-year research projects. The computer vision team depends on my infrastructure to iterate quickly and ship breakthrough features.',
        image: beamImg
      },
      {
        type: 'Professional',
        title: 'Dataset Sampling and Curation',
        company: 'Google Labs',
        year: '2024–Present',
        description: 'Built a data curation library that became our team\'s standard after improving model performance by 4% across all metrics. The system implements programmatic sampling strategies based on annotations and data diversity metrics. I\'m researching how individual data points influence model learning and how to apply embeddings for data selection. This work proves that careful curation of 10% of data can outperform random sampling of 50%.',
        image: datasetImg
      },
      {
        type: 'Professional',
        title: 'Automated Data Annotation System',
        company: 'Google Labs',
        year: '2024–Present',
        description: 'Developed an LLM-based system that autonomously annotates video data across 50+ different tasks, eliminating our biggest bottleneck. The solution won an internal AI innovation award and cut annotation costs by orders of magnitude. It proved LLMs can handle complex, multi-modal annotation tasks we assumed required human judgment. The system processes millions of frames monthly with quality matching human annotators.',
        image: annotationImg
      },
      {
        type: 'Professional',
        title: 'Human Data Collection Pipeline',
        company: 'Google Labs',
        year: '2023',
        description: 'Completely redesigned our human data collection process, resulting in 3x year-over-year increase in high-quality training data acquisition. I built feedback loops between model performance and collection priorities, automated quality checks, and created interfaces that made it easier for contributors to provide exactly what our models needed.',
        image: dataCollectionImg
      },
      {
        type: 'Professional',
        title: 'Fairness Evaluation Framework',
        company: 'Google Labs',
        year: '2024',
        description: 'Created a pre-launch evaluation system that ensures our models perform equitably across demographic groups. The framework combines statistical analysis with interactive visualizations that let researchers slice data across multiple dimensions, test hypotheses, and identify failure modes before production.',
        image: robustnessImg
      }
    ]
  }
];

