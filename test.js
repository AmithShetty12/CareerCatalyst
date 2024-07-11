import fs from 'fs';
import PDFDocument from 'pdfkit';
import Handlebars from 'handlebars';

const data = {
    name: "JONATHAN WRIGHT",
    title: "Lead Business Analyst",
    contact: "name@gmail.com • linkedin.com/in/jonwright • Dallas, TX",
    summary: "I am an experienced Business Analyst with a strong technical background and great project management skills. I am able to work on multiple projects at the same time, which over the years at Network Solutions have led to eight-digit efficiencies for the business. Furthermore, I immensely enjoy the process of deriving critical business insights using analytics, and then supporting or directly managing the efficiency implementation projects. My ability to move from analysis or leading a team of analysts to supporting or leading the actual project is something that could help further accelerate the velocity of work at Ion Insights.",
    skills: "Business: Budgeting • Financial Analysis • Project Management • Stakeholder Management • Business Strategy\nTechnology: Excel • VBA • SQL • QuickBooks • Power BI • Tableau • Python",
    experience: [
        {
            company: "Network Solutions LLC",
            title: "Lead Business Analyst & Project Manager",
            location: "Dallas, TX",
            dates: "2019 - Ongoing",
            tasks: [
                "Created new strategies to manage $2 million of accounts at risk, resulting in an increase of 4% in revenue in 6 months.",
                "Led the effort to deploy an automated time & expense reporting system for more than 90 onsite and offsite personnel across 3 locations.",
                "Oversaw the budget and schedule of a project to recruit, hire, and train 150 new employees at five new locations."
            ]
        },
        {
            company: "Network Solutions LLC",
            title: "Senior Business Analyst",
            location: "Dallas, TX",
            dates: "2017 - 2019",
            tasks: [
                "Through an improved pricing model, increased gross revenue of 15% in 2018 compared to 2017 with no change to fixed costs.",
                "Reduced warehouse processing time by 30% in just 3 months while industry norm is 10 months.",
                "Achieved project milestones and deliverables with an internal and external team of 10+ analysts."
            ]
        },
        {
            company: "Lauzon",
            title: "Business Analyst",
            location: "Dallas, TX",
            dates: "2013 - 2016",
            tasks: [
                "Prepared 2016 Budget with Variance analysis to prior years.",
                "Assisted merger in advanced electronics space, identifying synergy opportunities of $60M.",
                "Reduced IPS (Customer Issues) by 2.2% while impacting merely 3% of GMV.",
                "Designed and maintained 10+ data integration jobs."
            ]
        }
    ],
    education: [
        {
            school: "University of Wisconsin",
            degree: "M.Sc. in Finance",
            dates: "2012 - 2013"
        },
        {
            school: "University of Wisconsin",
            degree: "BBA: Business, Supply Chain Management",
            dates: "2008 - 2012"
        }
    ],
    certificates: [
        "PMI Professional in Business Analysis (PBA) — PMI, 2019",
        "Certified Associate in Project Management (CAPM) — PMI, 2018",
        "High-Dimensional Data Analysis — Harvard, 2017"
    ],
    interests: [
        "Giving back to my community: With my two kids, I spend at least one day each month volunteering.",
        "Horse-riding & spending time in nature: Recharging during the weekend is vital for leading a high-performing team.",
        "Developing my team into star analysts: Not only is it very satisfying, but it is also the highest value-add of any leader."
    ]
};

const template = fs.readFileSync('index.hbs', 'utf-8');
const compiledTemplate = Handlebars.compile(template);
const html = compiledTemplate(data);

const doc = new PDFDocument();
const stream = fs.createWriteStream('resume.pdf');
doc.pipe(stream);

doc.fontSize(12).text(html, { align: 'left' });

doc.end();

stream.on('finish', function() {
    console.log('PDF created successfully.');
});