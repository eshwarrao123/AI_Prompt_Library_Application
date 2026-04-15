# AI Prompt Library

A modern, full-stack application designed to save, manage, and track AI prompts. Built with a clean architecture separated into an Angular frontend and a Django REST API, it is fully containerized using Docker for seamless local development and deployment.

##  Features
- **Prompt Management:** Add, view, and list custom AI prompts with detailed complexity scores.
- **View Tracking:** Real-time, lightning-fast view counting powered by Redis.
- **Responsive UI:** Clean, structural component-based frontend built with Angular 19+ standalone components.
- **Data Persistence:** Robust PostgreSQL database for long-term secure prompt storage.
- **Containerized:** Instant setup, teardown, and live code-reloading using Docker Compose.

##  Tech Stack
- **Frontend:** Angular (Standalone Components, Reactive Forms)
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL 15
- **Cache:** Redis 7 
- **Deployment:** Docker & Docker Compose

## 📡 API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/prompts/` | Retrieve a list of all saved prompts. |
| `POST` | `/api/prompts/` | Create a new prompt (Requires `title`, `content`, `complexity`). |
| `GET` | `/api/prompts/<id>/` | Get prompt details and natively increment the Redis view counter. |

##  Architecture & Redis Integration
This application follows a standard REST API architecture:
- **Django (Backend)** acts as the core controller, securely validating interactions and saving core data to **PostgreSQL**.
- **Angular (Frontend)** communicates dynamically via HttpClient calls to the RESTful `/api/prompts/` endpoints, allowing SPA (Single Page Application) routing visually.
- **Redis Integration:** To prevent heavy database overhead from repetitive read traffic, Redis acts as a high-speed, in-memory cache. Every time a specific prompt detail is requested, the application increments a dedicated counter directly in Redis. This ensures view statistics are calculated instantly and can easily scale safely!

##  How to Run using Docker (Recommended)
You do not need to install Python, Postgres, Redis, or Node.js on your computer! All you need is Docker and Docker Compose.

1. **Ensure Docker is running** and open your terminal at the root of the project (where `docker-compose.yml` is located).
2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```
   *(Note: The `--build` flag ensures your images are freshly compiled. Live code reloading is preserved thanks to Docker volumes!)*
3. **Access the application:**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:8000/api/prompts/`

*To cleanly stop and spin down the containers, use `docker-compose down`.*

##  How to Run Locally (Without Docker)

If you prefer to run services manually, ensure you have Python, Node.js, PostgreSQL, and Redis installed locally.

### 1. Backend Setup
```bash
# Navigate to the project root
cd prompts-saver

# Create and activate a virtual environment
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

# Install requirements from the backend folder
pip install -r backend/requirements.txt

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django server
python manage.py runserver
```

### 2. Frontend Setup
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install node module dependencies
npm install

# Start the Angular development server
npx ng serve
```
Navigate to `http://localhost:4200` to view the app!
