# Smart Skill Recommendation & Learning Tracker

A beginner-friendly MERN stack web application that helps users discover, assess, and track their skills to achieve career goals.

## 🚀 Features

- **User Authentication**: Simple email-password authentication without JWT
- **Skill Assessment**: Interactive quizzes to evaluate current skill levels
- **Learning Roadmap**: Personalized learning paths based on career goals
- **Progress Tracking**: Monitor learning progress and achievements
- **Skill Gap Analysis**: Identify areas for improvement
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- CSS (Custom styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs (for password hashing)

## 📂 Project Structure

```
smart-tracker/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── skillController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Skill.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── skills.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── seedData.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── ProtectedRoute.js
    │   ├── pages/
    │   │   ├── LandingPage.js
    │   │   ├── SignupPage.js
    │   │   ├── LoginPage.js
    │   │   ├── Dashboard.js
    │   │   ├── SkillSelection.js
    │   │   ├── SkillAssessment.js
    │   │   ├── SkillGapAnalysis.js
    │   │   ├── LearningRoadmap.js
    │   │   ├── ProgressTracker.js
    │   │   └── ProfilePage.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/smart-tracker
PORT=5000
```

4. Seed the database with sample skills:
```bash
node seedData.js
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📱 Pages Overview

1. **Landing Page**: Welcome page with app overview
2. **Signup Page**: User registration with career goal selection
3. **Login Page**: User authentication
4. **Dashboard**: Overview of user progress and quick actions
5. **Skill Selection**: Choose skills based on career goals
6. **Skill Assessment**: Take quizzes to evaluate skill levels
7. **Skill Gap Analysis**: View current levels and recommendations
8. **Learning Roadmap**: Personalized learning resources
9. **Progress Tracker**: Monitor learning progress and achievements
10. **Profile Page**: User information and statistics

## 🔐 Authentication System

- **Simple Implementation**: No JWT tokens or complex session management
- **Password Security**: Passwords are hashed using bcryptjs
- **Frontend State**: User data stored in React state and localStorage
- **Route Protection**: Protected routes check for user authentication

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  careerGoal: String,
  selectedSkills: [String],
  skillAssessments: [{
    skill: String,
    level: String,
    score: Number
  }],
  learningProgress: [{
    skill: String,
    progress: Number,
    completedTopics: [String]
  }]
}
```

### Skill Model
```javascript
{
  name: String,
  category: String,
  description: String,
  difficulty: String,
  careerPaths: [String],
  prerequisites: [String],
  learningResources: [{
    title: String,
    type: String,
    url: String,
    duration: String
  }],
  assessmentQuestions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    difficulty: String
  }]
}
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### User Management
- `PUT /api/user/skills` - Update selected skills
- `POST /api/user/assessment` - Submit skill assessment
- `PUT /api/user/progress` - Update learning progress
- `GET /api/user/profile/:userId` - Get user profile

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/career/:careerGoal` - Get skills by career path
- `GET /api/skills/assessment/:skillName` - Get assessment questions
- `GET /api/skills/resources/:skillName` - Get learning resources

## 🎨 UI Features

- **Modern Design**: Clean and intuitive interface
- **Responsive Layout**: Works on all device sizes
- **Progress Visualization**: Progress bars and statistics
- **Interactive Elements**: Clickable skill cards and assessments
- **Color-coded Levels**: Visual indicators for skill levels

## 🚀 Getting Started (Quick Start)

1. Clone or download the project
2. Install MongoDB and start the service
3. Run backend setup commands
4. Run frontend setup commands
5. Open `http://localhost:3000` in your browser
6. Sign up with a new account
7. Select your career goal and skills
8. Take assessments and track your progress!

## 🔍 Beginner-Friendly Explanations

### What is MERN Stack?
- **M**ongoDB: Database to store user data and skills
- **E**xpress.js: Backend framework to handle API requests
- **R**eact.js: Frontend library to build user interface
- **N**ode.js: JavaScript runtime to run backend code

### How Authentication Works?
1. User enters email and password
2. Backend checks credentials against database
3. If valid, user data is sent to frontend
4. Frontend stores user info in localStorage
5. Protected pages check if user is logged in

### How Data Flows?
1. Frontend makes API calls to backend
2. Backend processes requests and queries database
3. Database returns data to backend
4. Backend sends response to frontend
5. Frontend updates UI with new data

## 🤝 Contributing

This is a beginner-friendly project. Feel free to:
- Add new features
- Improve UI/UX
- Fix bugs
- Add more skills and assessments
- Enhance documentation

## 📝 License

This project is open source and available under the MIT License.