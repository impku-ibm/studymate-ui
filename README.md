# School Management System – Admin UI

This repository contains the **Admin UI (Frontend)** for the School Management System.  
The UI is built **backend-first**, strictly aligned with already implemented backend APIs, without redesigning or reworking backend logic.

The goal is to provide a **clean, ERP-style interface** for managing school master data.

---

## 🛠 Tech Stack

- **React** (Functional Components + Hooks)
- **Axios** – REST API communication
- **Tailwind CSS** – Styling & layout
- **JWT-based Authentication** (handled by backend)
- **RESTful APIs**

---

## 🎯 Scope of This UI (Current Phase)

This UI currently focuses on **School Master Data Setup**, which acts as the foundation for all academic and operational modules.

---

## ✅ Modules Implemented So Far

### 1️⃣ Academic Year Management
- Create Academic Year
- Automatically enforces **only one ACTIVE academic year**
- List all academic years
- Status badges (ACTIVE / INACTIVE)
- Activate academic year via API

**APIs Used**

---

### 2️⃣ Class Management
- Fetch and list classes
- Class selection acts as a **context selector** for Sections and Subjects

**APIs Used**

---

### 3️⃣ Section Management
- Sections are always managed **within a selected class**
- First class is auto-selected on page load
- Sections auto-load when class changes
- Create section via modal
- Immediate refresh after creation

**APIs Used**

---

### 4️⃣ Subject Management
- Subjects are managed under **Class + Academic Year**
- Subject creation and listing integrated with existing backend APIs
- Same UI pattern as Sections
- No backend rework or duplication

**APIs Used**

---

## 🧠 UX & Design Decisions

- **Context-first UI**
  - Sections are never shown without a Class
  - Subjects are never shown without Class / Academic Year
- **No empty screens**
  - Default class auto-selected
  - Data loads automatically on page load
- **ERP-style design**
  - Tables for listing data
  - Modals for create actions
- **Minimal user actions**
- **Backend is the single source of truth**

---

## 🔄 Data Hierarchy Followed


Each UI screen strictly respects this hierarchy.

---

## 📁 Project Structure (Simplified)

src/
├── api/
│ └── axios.js
├── components/
│ ├── academicYear/
│ │ ├── AcademicYearTable.jsx
│ │ └── AddAcademicYearModal.jsx
│ ├── class/
│ │ └── ClassSetup.jsx
│ ├── section/
│ │ ├── SectionSetup.jsx
│ │ └── AddSectionModal.jsx
│ └── subject/
│ ├── SubjectSetup.jsx
│ └── AddSubjectModal.jsx
├── pages/
│ └── SchoolSetup.jsx
└── App.jsx


---

## ⚙️ Setup & Run Instructions

### 1️⃣ Install dependencies
```bash
npm install
npm run dev
npm start