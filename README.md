#  Forecast Monitoring App

> A full-stack web application that monitors **wind power generation forecasts vs actual generation** using UK BMRS datasets.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-Technical%20Evaluation-blue?style=flat)

---

##  Table of Contents

- [Project Overview](#-project-overview)
- [Application Features](#-application-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [How to Use](#-how-to-use)
- [API Data Processing](#-api-data-processing)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## Project Overview

Wind power generation is highly dependent on weather conditions. Accurate forecasting is critical for electricity grid management.

This application allows users to:

-  View **actual wind power generation**
-  Compare it with **forecasted generation**
-  Analyze **forecast error metrics**
-  Filter by **date range**
- Adjust **forecast horizon**

The system retrieves data from the **BMRS API** datasets:

| Dataset   | Description                      |
|-----------|----------------------------------|
| `FUELHH`  | Actual wind power generation     |
| `WINDFOR` | Forecasted wind power generation |

---

##  Application Features

### Forecast Monitoring Dashboard

The dashboard includes:

- Start time / End time filtering
- Forecast horizon slider
- Actual vs Forecast line chart
- Forecast error statistics

###  Chart Visualization

-  **Blue line** — Actual wind generation
-  **Green line** — Forecasted generation

### Statistics Panel

| Metric               | Description                          |
|----------------------|--------------------------------------|
| Mean Error           | Average of all errors                |
| Median Error         | Middle value of error distribution   |
| P90 Error            | 90th percentile error                |
| P99 Error            | 99th percentile error                |
| Mean Absolute Error  | Average of absolute errors           |
| RMSE                 | Root Mean Square Error               |

---

##  Technology Stack

### Frontend

| Library        | Purpose               |
|----------------|-----------------------|
| React (Vite)   | UI Framework          |
| Tailwind CSS   | Styling               |
| Recharts       | Chart visualizations  |
| Axios          | API communication     |
| Day.js         | Date formatting       |

### Backend

| Library      | Purpose                   |
|--------------|---------------------------|
| Node.js      | Runtime environment       |
| Express.js   | Web server framework      |
| BMRS API     | Data source integration   |

### Deployment

| Layer    | Platform                        |
|----------|---------------------------------|
| Frontend | Vercel                          |
| Backend  |  Render    

---

##  Prerequisites

Ensure the following software is installed before running the project:

| Software  | Version  |
|-----------|----------|
| Node.js   | v18+     |
| npm       | v9+      |
| Git       | latest   |

Check installed versions:

```bash
node -v
npm -v
```

---

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/forecast-monitor-app.git
cd forecast-monitor-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

**Dependencies include:** `express`, `axios`, `cors`, `dotenv`, `nodemon`

#### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
```

#### Run Backend Server

```bash
npm start
# or with nodemon:
npm run dev
```

**Expected output:**

```
Server running on http://localhost:5000
Actual records: 2
Forecast records: 73
```

#### Test API Endpoint

```
GET http://localhost:5000/api/generation
```

**Example Response:**

```json
{
  "data": [
    {
      "time": "2026-03-14T00:00:00Z",
      "actual": 8174,
      "forecast": 9378,
      "error": 1204
    }
  ],
  "stats": {
    "meanError": 1204,
    "medianError": 1204,
    "rmse": 1204
  }
}
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

**Dependencies include:** `react`, `recharts`, `axios`, `dayjs`, `tailwindcss`

#### Run Frontend Application

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

##  Project Structure

```
forecast-monitor-app/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── generation.routes.js
│   ├── controllers/
│   │   └── generation.controller.js
│   ├── services/
│   │   ├── actual.service.js
│   │   ├── forecast.service.js
│   │   └── processing.service.js
│   ├── utils/
│   │   ├── forecastFilter.js
│   │   └── dateUtils.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── generationApi.js
    │   ├── components/
    │   │   ├── ChartCard.jsx
    │   │   ├── Filters.jsx
    │   │   ├── HorizonSlider.jsx
    │   │   ├── StatsPanel.jsx
    │   │   └── Loader.jsx
    │   ├── hooks/
    │   │   └── useGenerationData.js
    │   ├── pages/
    │   │   └── Dashboard.jsx
    │   ├── utils/
    │   │   └── transformData.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

---

## How to Use

1. Select **Start Time**
2. Select **End Time**
3. Adjust the **Forecast Horizon Slider**
4. Click **Apply**

The dashboard will display:

- Actual generation
- Forecasted generation
- Forecast error statistics

---

##  API Data Processing

The backend performs the following operations:

1. Fetch **Actual generation data** from BMRS API
2. Fetch **Forecast generation data**
3. Filter forecasts by **forecast horizon**
4. Match forecast and actual values by **target time**
5. Compute **forecast errors**

**Error calculation:**

```
error = forecast - actual
```

**Statistics computed:** Mean Error, Median Error, P90, P99, Mean Absolute Error, RMSE

---

##  Deployment

### Frontend — Vercel

```bash
npm install -g vercel
vercel
```

### Backend — Render 




## Future Improvements

- [ ] Error distribution charts
- [ ] Forecast horizon comparison
- [ ] Dark mode UI
- [ ] Wind reliability analysis
- [ ] Real-time API caching
- [ ] Mobile optimized dashboard

---

##  Author

| Field    | Details                                                      |
|----------|--------------------------------------------------------------|
| Name     | Ganesh                                                       |
| Role     | Full Stack Developer                                         |
| Skills   | JavaScript, React, Node.js, Data Analysis, API Integration   |

---

##  License

This project is provided for **technical evaluation and demonstration purposes**.
