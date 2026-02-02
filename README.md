# React Dashboard UI Task

## 📋 Project Overview

This project is a modern, responsive dashboard application built as part of a frontend assessment. It features a comprehensive "Main Details" form with tabbed navigation, interactive map selection, and dynamic item management. The UI is crafted with a focus on user experience, form validation, and clean component architecture.

## 🚀 Key Features

- **Multi-Tab Interface**: Seamless switching between Main Details, Social Links, and Documents.
- **Interactive Map Integration**: 
  - Visual location picker using **Leaflet**.
  - **Geosearch** functionality with autocomplete and debounce.
  - Automatic latitude/longitude synchronization.
- **Complex Form Handling**:
  - Real-time validation (Email, Phone, Postal Code).
  - Dynamic "Sub Details" section for managing multiple product items.
  - Auto-calculated fields and error handling.
- **Responsive Design**: Fully responsive layout using **Tailwind CSS**.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet Geosearch](https://github.com/smeijer/leaflet-geosearch)
- **Icons**: Heroicons / SVG

## ⚙️ Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd ui-task-react
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the application.

## 📂 Folder Structure

```
src/
├── components/        # Reusable UI components
│   ├── InputField.jsx
│   ├── MapPicker.jsx  # Map with Search & Click logic
│   ├── Tabs.jsx
│   ├── TextAreaField.jsx
│   └── ...
├── pages/
│   └── Dashboard.jsx  # Main Page Controller & Form State
├── App.jsx            # Main App Entry
└── main.jsx           # Entry point & Global Styles
```

## 📸 Screenshots

| Dashboard View | Map Selection |
|:---:|:---:|
| ![Dashboard Mockup](https://via.placeholder.com/600x400?text=Dashboard+UI) | ![Map Interaction](https://via.placeholder.com/600x400?text=Map+Picker) |

*Note: Replace placeholder links with actual screenshots of the application.*

## ⚠️ Known Limitations

- **UI Only**: This is a frontend-only implementation; data is not persisted to a backend database.
- **Mock Data**: "Save" actions currently log data to the console and trigger browser alerts.
- **Map Provider**: Uses OpenStreetMap (free tier); search results may vary compared to Google Maps.

---

**Developed by [Your Name]**
