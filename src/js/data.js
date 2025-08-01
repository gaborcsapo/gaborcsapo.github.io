// Timeline-based portfolio data organized by life chapters
export const timelineData = {
  chapters: [
    {
      id: "nyuad",
      title: "Studies & Exploration",
      location: "Abu Dhabi, UAE",
      years: "2014 - 2018",
      description: "University years at NYU Abu Dhabi, discovering my passion for technology and its impact on society",
      projects: [
        // Work projects first
        {
          type: "work",
          title: "Webdesign Intern at BlitzBringer",
          meta: "Frankfurt - Summer 2015 - 3 months",
          image: "./img/blitz.jpg",
          description: `Blitzbringer is a startup in Frankfurt, Germany working on a crowdsourced delivery service. I learnt a lot about <strong>web design, business, marketing</strong> while designing the company's website, but the real learning outcomes were about life. I moved to a completely new city with zero help, zero people I knew and zero money and I had find a way to make the most out of what I had, which was a pleasant challenge.`
        },
        {
          type: "work",
          title: "Software Engineer Intern at CTED",
          meta: "Ghana and Abu Dhabi - Summer 2016 - 4 months",
          image: "./img/CTED.jpg",
          description: `Joined the Center for Technology and Economic Development to research novel ways, in which technology can create economic development in Africa. Prototyped an <strong>SMS-based taxi app on Android</strong> with the potential to provide 21st century service in rural regions. Extended a road network analyzing program using <strong>NodeJS and socket.io</strong> in a team of 5 to battle shortages in Ghana.`
        },
        {
          type: "work",
          title: "Data Viz Intern at CSLC",
          meta: "Fall 2016 - 6 months",
          image: "./img/greenland.jpg",
          description: `Approached the Center for Sea Level Change looking for project ideas for a class. Designed the first successful visualization of a unique dataset of 300,000 salinity, temperature and depth data points collected by tags put on seals in fjords of Greenland using <strong>D3JS</strong>. As a result, I joined an expedition to <strong>Greenland</strong> and I'm designing a drone LiDAR payload to 3D map glaciers.`
        },
        {
          type: "work",
          title: "Data Science Intern at SVL",
          meta: "Scotland - Summer 2017 - 3 months",
          image: "./img/scotland.jpg",
          description: `My previous internships inspired me to reach out to the first responsible financial consulting firm, SocioVestix Lab to learn more about sustainable startups. Proposed and built a PDF extraction and language processing application cutting down data collection efforts from 2 months to 1 week.`
        },
        {
          type: "work",
          title: "Freelance",
          meta: "Since Fall 2014",
          image: "./img/freelance.jpg",
          description: `Many people need websites to showcase their works or to market themselves online. However many of them don't know how to make a good website, and that's what I'm trying to help with. I created <strong>two art archives and internal news portal</strong> for a department at NYUAD. Working on these projects taught me how to deal with clients with little knowledge about tech, and helped me develop my project management habits.`
        },
        // Hobby projects in decreasing importance
        {
          type: "hobby",
          title: "Machine Learning Workshops",
          meta: "2018 | Sklearn - Python - Jupyter - Pandas",
          image: "./img/workshop.jpg",
          description: `The workshop is part of a series of Interactive Media workshops at New York University Abu Dhabi and <a href="https://medium.com/@gaborcsapo/nyuad-ai-workshop-bf02172f59eb" target="_blank"><strong>all materials</strong></a> are free to use. After spending so much time studying machine learning, I thought it was high time to give back to the community that helped me develop personally. As a result, I designed a workshop and helped 26 students understand machine learning, automation and training data bias.`
        },
        {
          type: "hobby",
          title: "Gender & Ethnicity Bias",
          meta: "2017 | Tensorflow - Jupyter - Linux - OpenCV",
          image: "./img/gender.png",
          description: `Quantifying the glass ceiling for ethnicities and genders in corporate structures. Together with a researcher from Princeton, we are trying to determine statistically how much harder it is to climb the corporate ladder for minorities. The project applies Deep Learning to reconstruct corporate structure from job titles and to predict gender and ethnicity from noisy labels. The resulting paper is currently under review.`
        },
        {
          type: "hobby",
          title: "Drone Design Challenge",
          meta: "2017 | PCAL - C - Raspberry Pi - Linux - CloudCompare",
          image: "./img/drone.png",
          description: `Won funding on the Lockheed Martin Drone Design Challenge to realize our idea to 3D map glaciers using a lidar device put on a drone. After building a team of 5 students, my task was researching the lidar market, designing the data pipeline and visualizing the resulting point cloud. Read more about the design in our <a href="/img/drone_proposal.pdf" target="_blank"><strong>proposal</strong></a>. Our goal is to help scientist understand the motion of glaciers.`
        },
        {
          type: "hobby",
          title: "Seal Project",
          meta: "2016 - 2017 | D3JS - Node - Google Maps API",
          image: "./img/seal.png",
          description: `Started as a class project, but after going beyond the class requirements with <a href="https://sealproject.herokuapp.com" target="_blank"><strong>this D3JS visualization</strong></a>, it ended up as a research project with the Center for Sea Level Change. Our dataset is collected by tags put on seals, and I designed a visualization that breaks down the 3D temporal information into 3 views.`
        },
        {
          type: "hobby",
          title: "Mytorch.tech",
          meta: "2017 | Node - Javascript - Twilio - Google OAuth - MongoDB",
          image: "./img/mytorch.png",
          description: `<a href="https://github.com/gaborcsapo/mytorch.tech" target="_blank"><strong>Mytorch.tech</strong></a> offers a conflict resolution method to the legal gray area of substance abuses in the UAE. The app opens communication channels to resolve conflicts by contacting the person in charge appropriate to the situation in order to avoid unnecessary trouble.`
        },
        {
          type: "hobby",
          title: "Visual Gender Bias Experiment",
          meta: "2017 | Chrome Extensions - Node - Linux - Tensorflow - D3JS",
          image: "./img/bubble.jpg",
          description: `Building on the results from the Gender Ethnicity project, I created a Chrome Extension to compare the number of male/female faces that people are presented with during a regular browsing session. <a href="pages/gender-bias/index.html" target="_blank"><strong>Click here</strong></a> to check out the results of analyzing my browsing habits for 1 month!`
        },
        {
          type: "hobby",
          title: "Interactive Websites",
          meta: "2015 - 2018 | Angular 2 - Ionic 2 - WebAudio API - Instagram API - Google Maps API - Twitter API - ThreeJS - SocketIO - CouchDB - P5 - ToneJS - Arduino - D3 - Twilio",
          image: "./img/interactive.png",
          description: `The web holds countless opportunities to create web applications that leverage public data and digital services from a wide range of existing web products. I have played around with APIs and user experiences to design captivating websites. Check out the <a href="pages/perfect-weather/perfectWeather.html" target="_blank"><strong>very first website</strong></a> I ever created.`
        },
        {
          type: "hobby",
          title: "DIYDictionary",
          meta: "2015 | Ionic Framework - AngularJS - SQLite",
          image: "./img/DIYD.jpg",
          description: `This is a selfish project. When I moved a foreign language environment, I met countless new words that I wanted to learn myself. First, I wrote them on pieces of papers, but I kept losing them. I wished there had been an app to store the words electronically… Then I realized I'm a CS major, why not make one for myself?!? I was introduced at a <strong>Hackathon in Shanghai</strong> to Hybrid Apps and I wanted to give them a try.`
        },
        {
          type: "hobby",
          title: "Game Design",
          meta: "2014 - 2015",
          image: "./img/games.jpg",
          description: `I like to have fun while I'm learning and the easiest way to do so is to design games. My very first program was a copy of the <strong>Snake game</strong> that I used to play on my Dad's Nokia. I also created a <strong>2D Creativity Puzzle Game</strong>, that requires some brain power and the demolishment of mental walls to solve. In my Software Engineering class we learnt about the Factory, Singleton, Decorator, etc patterns by creating <strong>board games</strong>.`
        },
        {
          type: "hobby",
          title: "Visual & Computational Design",
          meta: "",
          image: "./img/visual.png",
          description: `People decide whether to buy/use/watch a product in 3 seconds. Coders have to acknowledge that humans are visual mammals who judge by the looks, and use that to create the best experiences. I contributed to <strong>logo, printout, website designs and a marketing campaign for the Burj Khalifa in Dubai</strong>. However, my specialty lies in <strong>computational and AI art</strong>. Also, check out <a href="https://goo.gl/photos/p3Rjq9RH8nSQYmpz8" target="_blank"><strong>my favorite photographs here</strong></a>.`
        }
      ]
    },
    {
      id: "london",
      title: "Professional Beginning",
      location: "London, UK",
      years: "2018 - 2019",
      description: "First full-time role at Goldman Sachs while launching an award-winning project on algorithmic bias",
      projects: [
        // Work projects first
        {
          type: "work",
          title: "Software Engineer at Goldman Sachs",
          meta: "London - July 2018 - August 2019",
          image: "./img/goldman.jpg",
          description: `Re-engineering the live intraday risk pipeline of Goldman Sachs as part of a global team. Migrating the system to a micro services architecture to increase scalability and maintainability. The solution manages millions of trades every day and reduces lag from 2 minutes to seconds. The data pipeline is built using Kubernetes, Gitlab, Hazelcast and Java.`
        },
        // Hobby projects
        {
          type: "hobby",
          title: "Mozilla Creative Media Awards",
          meta: "2018 - 2019 | Machine Learning - PIXI.js - JS - UX",
          image: "./img/mozilla.jpg",
          description: `Three passionate friends and I designed a web-based educational game <a href="https://www.survivalofthebestfit.com/" target="_blank"><strong>survivalofthebestfit.com</strong></a> to teach future policy makers where algorithmic bias in AI systems stems from and why accountability matters. We received <a href="https://medium.com/read-write-participate/would-an-algorithm-hire-you-or-ignore-your-resume-db315a873c91" target="_blank"><strong>the Creative Media Awards $25,000 prize</strong></a>, and the project has been mentioned by DeepMind, code.org and O'reilly. Over 37,000 people completed the game in their free time, in class assignments or in corporate trainings.`
        }
      ]
    },
    {
      id: "taipei",
      title: "IoT & Urban Innovation",
      location: "Taipei, Taiwan",
      years: "2019 - 2023",
      description: "Deep dive into IoT development at Google while exploring urban planning and AI applications",
      projects: [
        // Work projects first
        {
          type: "work",
          title: "Software Engineer at Google Nest",
          meta: "Taipei - October 2019 - March 2023",
          image: "./img/taipei.jpg",
          description: `Designing and productioning Google Nest <a href="https://www.youtube.com/watch?v=20367DapHlc" target="_blank"><strong>energy saving thermostats</strong></a>, <a href="https://www.youtube.com/watch?v=_NYGYAv56LU" target="_blank"><strong>ML powered security cameras</strong></a> and other novel smart home devices. My team is responsible for IoT platform software, prototyping and factory builds in Vietnam.`
        },
        // Hobby projects
        {
          type: "hobby",
          title: "Urban AI Think Tank",
          meta: "2022 - 2023 | Urban Planning - Research - Writing",
          image: "./img/urbanai.jpg",
          description: `Contributed to the <a href="https://urbanai.fr/" target="_blank"><strong>Urban AI Think Tank</strong></a> by researching urban planning topics such as <a href="https://www.pca-stream.com/en/articles/do-cities-metabolize-202/" target="_blank"><strong>urban metabolism</strong></a>, meaningful inefficiencies and urban interfaces and also worked on the Champs-Elysees redesign project of the architecture studio, PCA-Stream.`
        },
        {
          type: "hobby",
          title: "MIT Urban Planning Contest",
          meta: "2021 | Urban Planning - Project Management",
          image: "./img/cshot.jpg",
          description: `Proposed and prototyped a street design template and citizen engagement platform for the New Taipei City Government. I worked with 4 other teammates as part of a program organized by the City Science Group at MIT Media Lab. Check out our presentation <a href="/img/cshot-presentation.pdf" target="_blank"><strong>here</strong></a>.`
        }
      ]
    },
    {
      id: "sanfrancisco",
      title: "AI & Computer Vision",
      location: "San Francisco, USA",
      years: "2023 - Present",
      description: "Leading advanced AI projects at Google, focusing on LLM applications and computer vision research",
      projects: [
        // Work projects first
        {
          type: "work",
          title: "Software Engineer at Google Beam",
          meta: "San Francisco - March 2023 - Present",
          image: "./img/taipei.jpg", // placeholder image for now
          description: `Working on cutting-edge Google Beam projects, developing LLM-based autoannotators and video search capabilities. Leading human data collection initiatives and optimizing training data sampling for computer vision research teams in the data flywheel ecosystem.`
        }
      ]
    }
  ]
};

// Legacy data structure for backward compatibility
export const portfolioData = {
  projects: [],
  experiences: []
};