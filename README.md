🎵 Glassmorphic Music Player with Room & Voting System
A modern, responsive music player with real-time room collaboration and democratic song voting system. Built with vanilla HTML, CSS, and JavaScript featuring a stunning glassmorphic design.

✨ Features
🎵 Core Music Player
Play/Pause Control - Space bar support

Track Navigation - Previous/Next with arrow keys

Volume Control - Mouse wheel and arrow key support

Progress Seeking - Click to seek functionality

Keyboard Shortcuts - Full keyboard navigation

Audio Visualizer - Real-time frequency visualization

Theme Switcher - Multiple color themes

🏠 Room System
Create Rooms - Host collaborative listening sessions

Join Rooms - Join existing rooms with Room ID

Room Management - View member count, room details

Leave Rooms - Exit collaborative sessions

Private Rooms - Create invite-only rooms

🗳️ Democratic Voting
Song Voting - Upvote/downvote songs in queue

Real-time Updates - Live vote counting and sorting

Add to Queue - Add songs from favorites or search

Vote Management - Users can change or remove votes

Queue Sorting - Automatic sorting by vote score

❤️ Favorites System
Add to Favorites - Save liked songs

Quick Access - Add favorites to voting queue

Persistent Storage - Favorites saved locally

🔍 Search & Discovery
Song Search - Find and add new songs

Playlist Browser - Explore curated playlists

Recently Played - Quick access to recent tracks

🚀 Getting Started
Prerequisites
Modern web browser (Chrome, Firefox, Safari, Edge)

Local web server (for development)

Installation
Clone or download the repository

Serve files through a local web server

Open index.html in your browser

bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
📁 Project Structure
text
glassmorphic-music-player/
├── index.html          # Main HTML structure
├── style.css           # Glassmorphic styling
├── script.js           # JavaScript functionality
└── README.md           # This file
🛠️ Backend Integration Guide
Required API Endpoints
Authentication
javascript
// User authentication
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/user
Room Management
javascript
// Room operations
POST /api/rooms              // Create room
GET /api/rooms/:id           // Get room details
POST /api/rooms/:id/join     // Join room
DELETE /api/rooms/:id/leave  // Leave room
GET /api/rooms               // List public rooms
Music Library
javascript
// Music operations
GET /api/tracks              // Get tracks
GET /api/tracks/search?q=    // Search tracks
GET /api/playlists           // Get playlists
POST /api/favorites          // Add to favorites
DELETE /api/favorites/:id    // Remove from favorites
Voting System
javascript
// Voting operations
GET /api/rooms/:id/queue     // Get voting queue
POST /api/rooms/:id/vote     // Submit vote
DELETE /api/rooms/:id/vote   // Remove vote
POST /api/rooms/:id/add      // Add song to queue
WebSocket Events
For real-time updates, implement these WebSocket events:

javascript
// Client -> Server
{
  type: 'join_room',
  roomId: 'ROOM123'
}

{
  type: 'vote',
  songId: 'song123',
  vote: 'up' | 'down'
}

{
  type: 'add_to_queue',
  songId: 'song123'
}

// Server -> Client
{
  type: 'room_update',
  data: {
    memberCount: 5,
    members: [...],
    currentSong: {...}
  }
}

{
  type: 'queue_update',
  data: {
    queue: [
      {
        id: 'song123',
        title: 'Song Title',
        artist: 'Artist Name',
        upVotes: 5,
        downVotes: 1,
        score: 4
      }
    ]
  }
}

{
  type: 'vote_update',
  data: {
    songId: 'song123',
    upVotes: 6,
    downVotes: 1,
    userVote: 'up'
  }
}
Database Schema
Users Table
sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
Rooms Table
sql
CREATE TABLE rooms (
  id VARCHAR(6) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  host_id UUID REFERENCES users(id),
  max_members INTEGER DEFAULT 10,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
Room Members Table
sql
CREATE TABLE room_members (
  room_id VARCHAR(6) REFERENCES rooms(id),
  user_id UUID REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (room_id, user_id)
);
Songs Table
sql
CREATE TABLE songs (
  id UUID PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  album VARCHAR(200),
  duration INTEGER, -- seconds
  cover_url TEXT,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
Voting Queue Table
sql
CREATE TABLE voting_queue (
  id UUID PRIMARY KEY,
  room_id VARCHAR(6) REFERENCES rooms(id),
  song_id UUID REFERENCES songs(id),
  added_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
Votes Table
sql
CREATE TABLE votes (
  queue_item_id UUID REFERENCES voting_queue(id),
  user_id UUID REFERENCES users(id),
  vote_type VARCHAR(4) CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (queue_item_id, user_id)
);
Favorites Table
sql
CREATE TABLE favorites (
  user_id UUID REFERENCES users(id),
  song_id UUID REFERENCES songs(id),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, song_id)
);
API Response Formats
Room Details Response
json
{
  "id": "ROOM123",
  "name": "Chill Session",
  "description": "Relaxing music for work",
  "host": {
    "id": "user123",
    "username": "john_doe"
  },
  "memberCount": 5,
  "maxMembers": 10,
  "isPrivate": false,
  "currentSong": {
    "id": "song123",
    "title": "Imagine",
    "artist": "John Lennon",
    "duration": 183,
    "coverUrl": "https://example.com/cover.jpg"
  },
  "queue": [
    {
      "id": "queue123",
      "song": {
        "id": "song456",
        "title": "Bohemian Rhapsody",
        "artist": "Queen"
      },
      "upVotes": 8,
      "downVotes": 2,
      "score": 6,
      "userVote": "up"
    }
  ]
}
Vote Response
json
{
  "success": true,
  "queueItemId": "queue123",
  "upVotes": 9,
  "downVotes": 2,
  "score": 7,
  "userVote": "up"
}
Implementation Notes
Room ID Generation
Use 6-character alphanumeric codes (e.g., "AB12CD")

Ensure uniqueness across active rooms

Consider expiration for inactive rooms

Vote Scoring
Score = upVotes - downVotes

Sort queue by score (highest first)

Update queue order in real-time

Real-time Synchronization
Use WebSockets for live updates

Implement heartbeat to detect disconnections

Handle reconnection gracefully

Security Considerations
Validate room access permissions

Rate limit voting to prevent spam

Sanitize all user inputs

Implement CORS properly

Performance Optimization
Cache frequently accessed data

Implement pagination for large playlists

Use database indexes on foreign keys

Consider Redis for session management

Environment Variables
text
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/musicplayer
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret

# File Storage
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10MB

# WebSocket
WS_PORT=3001

# API
API_PORT=3000
CORS_ORIGIN=http://localhost:8000
Testing Recommendations
Unit Tests
Test room creation/joining logic

Validate voting calculations

Test user authentication

Integration Tests
Test WebSocket connections

Validate API endpoints

Test real-time updates

Load Testing
Test concurrent room usage

Validate voting system under load

Test WebSocket scalability

Deployment Considerations
Scaling
Use load balancers for multiple instances

Implement sticky sessions for WebSockets

Consider message queues for vote processing

Monitoring
Monitor WebSocket connection counts

Track API response times

Monitor database performance

Backup Strategy
Regular database backups

Backup user-generated content

Implement disaster recovery

🎨 Frontend Customization
Theme Colors
Modify CSS variables in style.css:

css
:root {
  --color-accent: #ff4d6d;
  --color-accent-light: #ff7f99;
  --color-bg: #0a0a0f;
}
Adding New Features
The modular JavaScript structure allows easy feature additions:

javascript
class NewFeature {
  constructor(musicPlayer) {
    this.player = musicPlayer;
    this.init();
  }
  
  init() {
    // Feature initialization
  }
}
🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🐛 Known Issues
Audio visualizer uses mock data (requires real audio context)

Search functionality returns mock results

Room persistence requires backend implementation

🔮 Future Enhancements
Audio Streaming - Real audio playback integration

Social Features - User profiles, friend system

Advanced Voting - Weighted voting, time-based decay

Mobile App - React Native implementation

Analytics - Listening statistics and insights

📞 Support
For backend integration support or questions:

Create an issue in the repository

Contact the development team

Check the API documentation

Built with ❤️ for music lovers and developers alike. Let's make listening to music a collaborative experience! 🎵