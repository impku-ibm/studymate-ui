# StudyMate ERP — Frontend

React SPA for the StudyMate School ERP system.

## Tech Stack
- React 19, Vite 7, Tailwind CSS 4
- React Router 7, Axios, Recharts
- Vitest + React Testing Library

## Features
- 3 role-based portals: Admin, Teacher, Student
- 15+ pages: Dashboard, Students, Teachers, Exams, Attendance, Accounts, Timetable, Staff
- Real-time data from REST APIs
- Responsive design

## Quick Start
```bash
# 1. Install
npm install

# 2. Run dev server
npm run dev
# Opens at http://localhost:5173

# 3. Build for production
npm run build
```

## Pages

### Admin Portal (`/admin`)
- Dashboard — Stats overview
- Students — Directory, enrollment, promotion
- Teachers — Directory, assignments
- Exams — Create, schedule, marks entry, results
- Attendance — Mark, summary, history, teacher self-mark
- Accounts — Fee structure, fee plans, collection, reports
- Staff — Non-teaching staff management
- Timetable — Period setup, class/teacher views
- School Setup — Academic year, classes, sections, subjects, grading

### Teacher Portal (`/teacher`)
- Dashboard — Self-attendance, quick actions
- Marks Entry — Enter marks per exam/subject
- Attendance — Mark class attendance
- Timetable — Own weekly schedule

### Student Portal (`/student`)
- Dashboard — Overview cards
- Attendance — Monthly summary
- Fees — Fee status and payments
- Results — Published exam results

## Running Tests
```bash
npm run test
# 16 tests, 0 failures
```

## Environment
The API base URL is configured in `src/api/axios.js`:
```javascript
baseURL: "http://localhost:8080"
```

For production, update this to your Render backend URL.

## Deployment (Render)
1. Create a Static Site on Render
2. Connect this GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add redirect rule: `/* → /index.html` (for SPA routing)
