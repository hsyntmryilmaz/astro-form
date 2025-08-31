# Astro-Form-Analyzer

This project collects user birth information and photos, sends them to the ChatGPT 4o API for personal analysis, and saves the data and results to a database.

## Features

- User form with birth information and photo uploads
- Integration with OpenAI GPT-4o API for analysis
- PostgreSQL database storage
- RESTful API endpoint for form submission

## Project Structure

```
astro-form-analyzer/
├── public/
│   └── index.html          # Main form page
├── routes/
│   └── analyze.js          # API route for analysis
├── services/
│   ├── openai.js           # OpenAI API integration
│   └── database.js         # Database operations
├── .env                    # Environment variables
├── package.json            # Project dependencies
├── server.js               # Main server file
└── README.md               # Project documentation
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables in the `.env` file:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - Database configuration variables

3. Initialize the database:
   ```bash
   node init-db.js
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## API Endpoints

- `POST /api/analyze` - Submit form data for analysis

## Form Fields

- First Name (required)
- Last Name (required)
- Birth Date (required)
- Birth Time (required)
- Birth Place (required)
- Face Photo (optional)
- Hand Photo (optional)

## Database Schema

The application uses a PostgreSQL database with a single table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_place TEXT NOT NULL,
  face_image_path TEXT,
  hand_image_path TEXT,
  analysis_result JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```