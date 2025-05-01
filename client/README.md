# Scholarship Finder

A web application that helps students find and apply for scholarships based on their academic profile, demographics, and interests.

## Features

- **User Authentication**: Secure registration and login
- **Scholarship Database**: Browse and search available scholarships
- **Personalized Recommendations**: Get scholarship recommendations based on your profile
- **User Profiles**: Create and manage your academic profile
- **Detailed Scholarship Information**: View scholarship details, requirements, and application process

## Tech Stack

- **Frontend**: React, React Router, React Bootstrap, Formik, Yup
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB
- **Data Collection**: Python web scraper using BeautifulSoup

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Python 3.x (for web scraper)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/scholarship-finder.git
cd scholarship-finder
```

#### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit the `.env` file with your MongoDB connection string and JWT secret.

#### 3. Set up the frontend

```bash
cd ../client
npm install
```

#### 4. Set up the web scraper (optional)

```bash
cd ../scraper
pip install -r requirements.txt
```

### Running the Application

#### 1. Start MongoDB

Make sure MongoDB is running on your system.

#### 2. Start the backend server

```bash
cd server
npm run dev
```

The server will start on http://localhost:5000

#### 3. Start the frontend

```bash
cd client
npm start
```

The React application will start on http://localhost:3000

#### 4. Run the web scraper (optional)

```bash
cd scraper
python scholarship_scraper.py
```

This will populate your database with scholarship data.

## Project Structure

```
scholarship-finder/
├── client/              # React frontend
│   ├── public/          # Public assets
│   └── src/             # Source files
│       ├── components/  # Reusable components
│       ├── context/     # Context API providers
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── utils/       # Utility functions
├── server/              # Node.js backend
│   ├── src/             # Source files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Database models
│   │   └── routes/      # API routes
│   └── .env             # Environment variables
└── scraper/             # Python web scraper
    ├── scholarship_scraper.py  # Main scraper script
    └── requirements.txt        # Python dependencies
```

## Development Workflow

1. **Data Collection**: Run the scraper to collect scholarship data
2. **Backend Development**: Implement APIs and database models
3. **Frontend Development**: Build UI components and integrate with APIs
4. **Testing**: Test the application features
5. **Deployment**: Deploy the application to a hosting provider

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Scholarships

- `GET /api/scholarships` - Get all scholarships
- `GET /api/scholarships/:id` - Get scholarship by ID
- `GET /api/scholarships/recommended` - Get recommended scholarships (requires auth)
- `GET /api/scholarships/search?q=query` - Search scholarships

### User Profile

- `GET /api/profile` - Get user profile (requires auth)
- `POST /api/profile` - Create or update user profile (requires auth)

## Future Enhancements

- Email notifications for scholarship deadlines
- Application tracking system
- Scholarship reviews and ratings
- Admin dashboard for scholarship providers
- Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.