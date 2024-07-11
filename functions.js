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
       .text(fullname, { align: 'center' })
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
       .text('Summary', { underline: true })
       .moveDown(0.5);
    doc.fontSize(12)
       .fillColor('#666666')
       .text(summary)
       .moveDown(1);

    // Section: Education
    doc.fontSize(15)
       .fillColor('#333333')
       .text('Education', { underline: true })
       .moveDown(0.5);
    doc.fontSize(12)
       .fillColor('#666666')
       .text(education.join('\n'))
       .moveDown(1);

    // Section: Hard Skills
    if (hardSkills && hardSkills.length > 0) {
      doc.fontSize(15)
         .fillColor('#333333')
         .text('Hard Skills', { underline: true })
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
         .text('Soft Skills', { underline: true })
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
         .text('Projects', { underline: true })
         .moveDown(0.5);
         doc.fontSize(12)
         .fillColor('#666666')
         .list(softSkills, { bulletIndent: 10 })
         .moveDown(1);
      doc.moveDown(1);
    }

    // Section: Experience
    if (experience) {
      doc.fontSize(15)
         .fillColor('#333333')
         .text('Experience', { underline: true })
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
  fullname: "Your Name",
  email: "youremail@gmail.com",
  phone: "your_number",
  github: "https://github.com/your_github_profile",
  linkedin: "https://www.linkedin.com/in/your_linkedin_profile",
  portfolio: "https://your_website.com",
  address: "Your Address: location, City, State, Country",
  summary: "Your Summary: Briefly describe your professional background and career goals. Include your skills, experience, and certifications.",
  education: ["your_education details 1", "your_education details 2", "your_education details 3"],
  experience: "your experiance",
  hardSkills: [
    'hardskils1','hardskils2','hardskils3'
  ],
  softSkills: [
    'softskils1','softskils2','softskils3'
  ],
  projects: [
    'project1','project2','project3'
  ],
  nationality: "your_nationality",
};

generateBeautifulResume(resumeDetails, './public/resume.pdf');
 
  