// server.mjs
import express from 'express';
import bodyParser from 'body-parser';
import { spawn, exec } from 'child_process';
import { Salary, bard, job_d, career1, resume, news,run} from './api.js';
import fs from 'fs';




const app = express();
const port = 3000;


// Middleware
app.use(express.static("public"));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render("home.ejs");
});

app.get('/job_finder', (req, res) => {
  res.render("job_finder.ejs");
});

app.get('/career', (req, res) => {
  res.render("career.ejs");
});

app.get('/get_resume', (req, res) => {
  res.render("get_resume.ejs");
});

app.get('/skill_details', (req, res) => {
  res.render("skill_details.ejs");
});


// POST endpoint to generate resume and download as PDF
// POST endpoint to generate resume and download as PDF
app.post('/get_resume', async (req, res) => {
  try {
    let na = [];
    
    // Filter out empty fields
    for (const key in req.body) {
      if (req.body[key] === "") {
        na.push(key);
      }
    }
    na.forEach(key => {
      delete req.body[key];
    });
    // Generate resume content
    const result = await resume(JSON.stringify(req.body));
    console.log(result)
    
    // Write resume content to a text file
    const filePath = './function.js';
    await fs.promises.writeFile(filePath, result);
    const code = fs.readFileSync('function.js', 'utf-8');
    await waitForfunction();
    res.render('resume.ejs', { result });
  } catch (err) {
    console.error('Error generating or downloading resume:', err);
    res.status(500).send('Error generating or downloading resume');
  }
});



// POST endpoint to fetch news based on user input
app.post('/home', async (req, res) => {
  try {
    const data = req.body.username;
    const new_s = news(data);
    res.send(new_s);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).send('Error fetching news');
  }
});

// POST endpoint for job description
app.post('/job_discription', async (req, res) => {
  try {
    const d_job = req.body.only_job;
    const s_range = await Salary(d_job);
    const job_details = await job_d(d_job);
    res.render('job_discription.ejs', { result: s_range.data, job_details });
  } catch (err) {
    console.error('Error fetching job description:', err);
    res.status(500).send('Error fetching job description');
  }
});

// POST endpoint for career advice
app.post('/career', async (req, res) => {
  try {
    const user_interest = req.body.Details;
    const user_education = req.body.c_education;
    const result = await career1(user_interest, user_education);
    res.render('career.ejs', { result });
  } catch (err) {
    console.error('Error fetching career advice:', err);
    res.status(500).send('Error fetching career advice');
  }
});

// POST endpoint for job finding
app.post('/job_finder', async (req, res) => {
  try {
    const user_text = req.body.Details;
    await runPythonScript(user_text)
      .then((result) => {
        res.render('job_finder.ejs', { result });
      })
      .catch((err) => {
        console.error('Error running Python script:', err);
        res.status(500).send('Error running Python script');
      });
  } catch (err) {
    console.error('Error processing job finder:', err);
    res.status(500).send('Error processing job finder');
  }
});

let quiz;

app.get("/quiz", async(req, res) => {
  await run(`give me object of quiz questions with 10 questions of aptitude for indian technical companies inside json format
"questions": [ {"id":1 "question": "Question 1", "options": ["option1", "option2", "option3", "option4"], "answer": 0// Index of the correct answer in the options array }, {''id ":2,question": "Question 2", "options": ["option1", "option2", "option3", "option4"], "answer": 3 }, note do not add any comments`)

quiz= JSON.parse(fs.readFileSync('output.json', 'utf8'));
console.log(typeof(quiz))

    res.render('quiz.ejs', { questions: (quiz.questions)});
});

app.post('/submit-quiz', (req, res) => {
  const userAnswers = req.body;
  quiz= JSON.parse(fs.readFileSync('output.json', 'utf8'));
  let count=0;
  for(let i=1;i<=quiz.questions.length;i++){
    if(userAnswers['question'+i]==quiz.questions[i-1].answer){
      count++
    }
  }
  res.send(`Your score is ${count}`);
});

// Function to run Python script with user skills
function runPythonScript(userSkills) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('py', ['./ml/recommendation_script.py', userSkills]);
    pythonProcess.stdout.on('data', (data) => {
      resolve(data.toString());
    });
    pythonProcess.on('error', (error) => {
      reject(error);
    });
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Python process exited with code ${code}`);
      }
    });
  });
}

async function waitForfunction() {
    
  const childProcess = spawn('node', [ 'function.js']);

  childProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
  });

  childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });

  // Handle 'close' event with a promise
  const onClose = () => {
      return new Promise((resolve, reject) => {
          childProcess.on('close', (code) => {
              console.log(`child process exited with code ${code}`);
              resolve();
          });
          childProcess.on('error', (err) => {
              console.error('Failed to start subprocess.', err);
              reject(err);
          });
      });
  };

  try {
      await onClose();
  } catch (error) {
      console.error('Error running otherFile.js:', error);
  }
}



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
