# 🎵 Glassmorphic Music Player with Room & Voting System

A modern, responsive music player with real-time room collaboration and democratic song voting system. Built with vanilla HTML, CSS, and JavaScript featuring a stunning glassmorphic design.

## ✨ Features

### 🎵 Core Music Player
- **Play/Pause Control** - Space bar support
- **Track Navigation** - Previous/Next with arrow keys
- **Volume Control** - Mouse wheel and arrow key support
- **Progress Seeking** - Click to seek functionality
- **Keyboard Shortcuts** - Full keyboard navigation
- **Audio Visualizer** - Real-time frequency visualization
- **Theme Switcher** - Multiple color themes

### 🏠 Room System
- **Create Rooms** - Host collaborative listening sessions
- **Join Rooms** - Join existing rooms with Room ID
- **Room Management** - View member count, room details
- **Leave Rooms** - Exit collaborative sessions
- **Private Rooms** - Create invite-only rooms

### 🗳️ Democratic Voting
- **Song Voting** - Upvote/downvote songs in queue
- **Real-time Updates** - Live vote counting and sorting
- **Add to Queue** - Add songs from favorites or search
- **Vote Management** - Users can change or remove votes
- **Queue Sorting** - Automatic sorting by vote score

### ❤️ Favorites System
- **Add to Favorites** - Save liked songs
- **Quick Access** - Add favorites to voting queue
- **Persistent Storage** - Favorites saved locally

### 🔍 Search & Discovery
- **Song Search** - Find and add new songs
- **Playlist Browser** - Explore curated playlists
- **Recently Played** - Quick access to recent tracks

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation
1. Clone or download the repository
2. Serve files through a local web server
3. Open `index.html` in your browser

## 📁 Project Structure

- **index.html** - Main HTML structure with all UI components
- **style.css** - Complete glassmorphic styling and responsive design
- **script.js** - Full JavaScript functionality including room and voting systems
- **README.md** - This documentation file

## 🛠️ Backend Integration Guide

### Required API Endpoints

#### Authentication
- User login, logout, and session management
- JWT token handling for secure requests

#### Room Management
- Create new collaborative rooms
- Join existing rooms with unique Room IDs
- Get room details and member information
- Leave room functionality
- List available public rooms

#### Music Library
- Fetch available tracks and albums
- Search functionality for songs and artists
- Get playlist information
- Manage user favorites (add/remove)

#### Voting System
- Get current voting queue for rooms
- Submit upvote/downvote for songs
- Add songs to room voting queue
- Remove votes from songs
- Real-time vote counting and queue sorting

### WebSocket Implementation

Implement real-time communication for:
- Room member updates when users join/leave
- Live voting updates across all room members
- Queue changes and song additions
- Current playing song synchronization
- Real-time vote counting without page refresh

### Database Requirements

#### User Management
- User profiles with authentication
- User preferences and settings
- Avatar and profile information

#### Room System
- Room creation with unique 6-digit codes
- Room metadata (name, description, privacy settings)
- Member tracking and host permissions
- Room expiration and cleanup

#### Music Catalog
- Song database with metadata
- Artist and album information
- Audio file URLs and cover art
- Duration and streaming information

#### Voting System
- Voting queue per room
- Individual vote tracking per user
- Vote history and analytics
- Real-time score calculations

#### Favorites Management
- User-specific favorite songs
- Quick access for room voting
- Persistent storage across sessions

### Security Considerations

#### Authentication & Authorization
- Secure user authentication with JWT tokens
- Room access control and permissions
- Rate limiting for API endpoints
- Input validation and sanitization

#### Data Protection
- User privacy and data encryption
- Secure WebSocket connections
- CORS configuration for frontend
- SQL injection prevention

### Performance Optimization

#### Caching Strategy
- Redis for session management
- Database query optimization
- Frequently accessed data caching
- CDN for static assets (audio files, images)

#### Scalability
- Load balancing for multiple server instances
- WebSocket connection management
- Database connection pooling
- Message queue for vote processing

### Real-time Features Implementation

#### WebSocket Events
- Room joining/leaving notifications
- Vote updates across all connected users
- Queue changes and song additions
- Play/pause synchronization
- Member count updates

#### State Synchronization
- Consistent queue ordering across clients
- Real-time vote count updates
- Current playing song sync
- User presence indicators

### Testing Strategy

#### Unit Testing
- API endpoint functionality
- Vote calculation algorithms
- Room creation and joining logic
- User authentication flows

#### Integration Testing
- WebSocket connection stability
- Real-time update propagation
- Database transaction integrity
- Frontend-backend communication

#### Load Testing
- Concurrent room usage
- High-frequency voting scenarios
- WebSocket connection limits
- Database performance under load

### Deployment Considerations

#### Infrastructure
- Cloud hosting setup (AWS, Google Cloud, Azure)
- Container deployment with Docker
- Load balancer configuration
- SSL certificate management

#### Monitoring & Logging
- API response time monitoring
- WebSocket connection tracking
- Error logging and alerting
- User activity analytics

#### Backup & Recovery
- Database backup automation
- User data recovery procedures
- System failure recovery plans
- Data migration strategies

## 🎨 Frontend Customization

### Theme System
- Multiple color schemes available
- CSS variable-based theming
- Dark/light mode support
- Custom accent color options

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly controls
- Adaptive layout system

### Accessibility Features
- Keyboard navigation support
- Screen reader compatibility
- High contrast options
- Focus indicators

## 🤝 Contributing

1. Fork the repository
2. Create feature branch for new developments
3. Follow coding standards and documentation
4. Test thoroughly before submitting
5. Create pull request with detailed description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Audio visualizer currently uses mock data (requires Web Audio API integration)
- Search functionality returns sample results (needs backend integration)
- Room persistence requires server-side implementation
- Real audio playback needs streaming service integration

## 🔮 Future Enhancements

### Core Features
- **Real Audio Streaming** - Integration with Spotify, Apple Music, or custom streaming
- **Advanced Voting** - Weighted voting based on user reputation
- **Social Features** - Friend system, user profiles, and social interactions
- **Mobile Application** - Native iOS and Android apps

### Advanced Features
- **AI Recommendations** - Machine learning-based song suggestions
- **Analytics Dashboard** - Listening statistics and user insights
- **Live DJ Mode** - Real-time mixing and transitions
- **Voice Commands** - Speech recognition for hands-free control

## 📞 Support

### For Backend Developers
- Review API endpoint specifications
- Implement WebSocket event handlers
- Set up database schema as outlined
- Configure real-time synchronization

### For Frontend Developers
- Customize themes and styling
- Add new UI components
- Enhance user interactions
- Improve accessibility features

### Getting Help
- Create issues in the repository for bugs
- Contact development team for integration questions
- Check documentation for implementation details
- Join community discussions for feature requests

***

Built with ❤️ for music lovers and developers alike. Let's make listening to music a collaborative experience! 🎵