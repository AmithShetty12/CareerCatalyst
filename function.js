import PDFDocument from 'pdfkit';
import fs from 'fs';

function generateBeautifulResume(details, outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50
  });

  // Pipe the PDF into a writable stream
  doc.pipe(fs.createWriteStream(outputPath));

  // Function to add a line with specific styling
  function addLine(yOffset) {
    doc.strokeColor('#444444')
       .moveTo(doc.page.margins.left, yOffset)
       .lineTo(doc.page.width - doc.page.margins.right, yOffset)
       .lineWidth(1)
       .stroke();
  }

  // Function to add page borders
  function addPageBorders() {
    doc.lineWidth(2);
    doc.strokeColor('#444444');
    doc.rect(doc.page.margins.left - 20, doc.page.margins.top - 20, doc.page.width - doc.page.margins.left - doc.page.margins.right + 40, doc.page.height - doc.page.margins.top - doc.page.margins.bottom + 40).stroke();
  }

  // Event listener to add borders on each page addition
  doc.on('pageAdded', () => {
    addPageBorders();
  });

  // Function to add content for each section
  function addContent() {
    const {
      fullname,
      email,
      phone,
      github,
      linkedin,
      portfolio,
      address,
      summary,
      education,
      experience,
      hardSkills,
      softSkills,
      projects,
      nationality
    } = details;

    // Header Information
    doc.fontSize(28)
       .fillColor('#333333')
       .text(fullname.toUpperCase(), { align: 'center' })
       .moveDown(0.5);

    // Contact Information
    const contactInfo = [
      address,
      email,
      phone,
      nationality,
      github,
      linkedin,
      portfolio
    ];

    const contactOptions = {
      width: doc.page.width - 2 * doc.page.margins.left,
      align: 'center'
    };

    doc.fontSize(12)
       .fillColor('#666666')
       .text(contactInfo.join('\n'), contactOptions)
       .moveDown(1);

    // Draw a line below personal information
    addLine(doc.y + 10);

    // Section: Summary
    doc.fontSize(15)
       .fillColor('#333333')
       .text('SUMMARY', { underline: true })
       .moveDown(0.5);
    doc.fontSize(12)
       .fillColor('#666666')
       .text(summary)
       .moveDown(1);

    // Section: Education
    doc.fontSize(15)
       .fillColor('#333333')
       .text('EDUCATION', { underline: true })
       .moveDown(0.5);
    doc.fontSize(12)
       .fillColor('#666666')
       .text(education.join('\n'))
       .moveDown(1);

    // Section: Hard Skills
    if (hardSkills && hardSkills.length > 0) {
      doc.fontSize(15)
         .fillColor('#333333')
         .text('HARD SKILLS', { underline: true })
         .moveDown(0.5);
      doc.fontSize(12)
         .fillColor('#666666')
         .list(hardSkills, { bulletIndent: 10 })
         .moveDown(1);
    }

    // Section: Soft Skills
    if (softSkills && softSkills.length > 0) {
      doc.fontSize(15)
         .fillColor('#333333')
         .text('SOFT SKILLS', { underline: true })
         .moveDown(0.5);
      doc.fontSize(12)
         .fillColor('#666666')
         .list(softSkills, { bulletIndent: 10 })
         .moveDown(1);
    }

    // Section: Projects
    if (projects && projects.length > 0) {
      doc.fontSize(15)
         .fillColor('#333333')
         .text('PROJECTS', { underline: true })
         .moveDown(0.5);
         doc.fontSize(12)
         .fillColor('#666666')
         .list(projects, { bulletIndent: 10 })
         .moveDown(1);
      doc.moveDown(1);
    }

    // Section: Experience
    if (experience) {
      doc.fontSize(15)
         .fillColor('#333333')
         .text('EXPERIENCE', { underline: true })
         .moveDown(0.5);
      doc.fontSize(12)
         .fillColor('#666666')
         .text(experience.replace(/\n/g, '\n\n'))
         .moveDown(1);
    }
  }

  // Add initial page border
  addPageBorders();

  // Add content to the PDF
  addContent();

  // Finalize the PDF and end the stream
  doc.end();
}

// Example usage with updated project
const resumeDetails = {
  fullname: "Mohammed Jumaan",
  email: "mohammedjumaan.mf@gmail.com",
  phone: "9886262303",
  github: "https://github.com/johndoe",
  linkedin: "https://www.linkedin.com/in/johndoe",
  portfolio: "https://johndoeportfolio.com",
  address: "Rasul Layout Near Kaveri Hospital\nMohammed",
  summary: "Enthusiastic Computer Science student with a solid foundation in algorithms, data structures, and programming languages including Python, Java, and C++. Proven ability to apply theoretical knowledge to solve practical problems, demonstrated through coursework and hands-on projects. Eager to leverage academic achievements and passion for technology in a dynamic internship role to gain real-world experience and contribute to innovative solutions.",
  education: ["Bachelor of Science in Computer Science, University of XYZ, 2015-2019"],
  experience: "No experience",
  hardSkills: [
    "Programming skills: C, C++, Java"
  ],
  softSkills: [
    "Public speaking skills"
  ],
  projects: [
    "E-commerce website"
  ],
  nationality: "Indian"
};

generateBeautifulResume(resumeDetails, './public/resume.pdf');
