# Job Finding Android App  

A **Job Finding Android App** built using **React Native, Firebase, and Node.js**, designed to streamline the job search and recruitment process.  

## 🚀 Features  

### 👤 User (Job Seeker)  
- Registration & Login with Firebase Authentication  
- Profile creation & management  
- Search for jobs with filters  
- Save jobs for later  
- Apply to jobs and track applications  

### 🏢 Recruiter  
- Recruiter registration & login  
- Create, Read, Update, Delete (CRUD) job postings  
- Manage applicants for posted jobs  

### 📌 Planned Enhancements  
- **AI-driven interview preparation features** to help candidates practice and prepare.  

## 🛠️ Tech Stack  
- **Frontend**: React Native  
- **Backend**: Node.js + Express.js  
- **Database & Auth**: Firebase (Firestore + Authentication)  
- **Cloud Storage**: Firebase Storage  

## 📂 Project Structure  
```
job-finding-app/
│── App.js/             # Main File
│── src/                # React Native frontend code
│   ├── components/     # UI components
│   ├── screens/        # App screens
│   ├── services/       # Firebase services
│   ├── utils/          # UI colors
│   ├── navigation/     # Application Navigation
│── assets/             # Images, icons
│── README.md           # Project documentation
│── package.json        # Dependencies
```

## ⚙️ Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/yamanrajsingh/Job_Finding_Android_App
cd Job_Finding_Android_App
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Setup Firebase  
- Create a project in [Firebase Console](https://console.firebase.google.com/)  
- Enable Authentication (Email/Password)  
- Create Firestore Database  
- Update Firebase config in `/Config.js`  

### 4. Run the app  
```bash
npm run start
```

```

