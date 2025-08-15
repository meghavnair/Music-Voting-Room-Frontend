/* ================================
   🎵 Glassmorphic Music Player JS
   ================================ */

class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 355; // 5:55 in seconds
        this.volume = 70;
        this.currentTrack = 0;
        this.isShuffling = false;
        this.isRepeating = false;
        
        // Room and voting system
        this.currentRoom = null;
        this.votingQueue = [];
        this.favorites = [
            {
                title: "Imagine",
                artist: "John Lennon",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
            },
            {
                title: "Bohemian Rhapsody",
                artist: "Queen",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
            },
            {
                title: "Hotel California",
                artist: "Eagles",
                image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop"
            }
        ];
        
        this.tracks = [
            {
                title: "Bohemian Rhapsody",
                artist: "Queen",
                album: "A Night at the Opera",
                duration: "5:55",
                cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
            },
            {
                title: "Imagine",
                artist: "John Lennon",
                album: "Imagine",
                duration: "3:03",
                cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop"
            },
            {
                title: "Stairway to Heaven",
                artist: "Led Zeppelin",
                album: "Led Zeppelin IV",
                duration: "8:02",
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
            },
            {
                title: "Hotel California",
                artist: "Eagles",
                album: "Hotel California",
                duration: "6:30",
                cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
            }
        ];

        this.playlists = [
            {
                name: "Chill Vibes",
                description: "Perfect for relaxing",
                trackCount: 24,
                cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
            },
            {
                name: "Workout Mix",
                description: "High energy beats",
                trackCount: 32,
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop"
            },
            {
                name: "Focus Flow",
                description: "Concentration music",
                trackCount: 18,
                cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
            },
            {
                name: "Late Night",
                description: "Smooth jazz & soul",
                trackCount: 27,
                cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop"
            }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePlayerDisplay();
        this.startProgressTimer();
        this.addScrollEffects();
        this.addSearchFunctionality();
        this.addPlaylistInteractions();
        this.addTrackListInteractions();
        this.addNavigationEffects();
        this.initializeVoting();
    }

    // Room Management Functions
    createRoom() {
        const roomName = document.getElementById('roomNameInput').value;
        const description = document.getElementById('roomDescription').value;
        const maxMembers = document.getElementById('maxMembers').value;
        const isPrivate = document.getElementById('privateRoom').checked;

        if (!roomName.trim()) {
            this.showNotification('Error', 'Please enter a room name');
            return;
        }

        // Generate room ID
        const roomId = this.generateRoomId();
        
        this.currentRoom = {
            id: roomId,
            name: roomName,
            description: description,
            maxMembers: parseInt(maxMembers),
            isPrivate: isPrivate,
            members: 1,
            host: true
        };

        this.updateRoomDisplay();
        this.closeModal('createRoomModal');
        this.showNotification('Room Created', `Room "${roomName}" created! Room ID: ${roomId}`);
        
        // Clear form
        this.clearRoomForm();
    }

    joinRoom() {
        const roomId = document.getElementById('roomIdInput').value;
        
        if (!roomId.trim()) {
            this.showNotification('Error', 'Please enter a room ID');
            return;
        }

        // Simulate joining room
        this.currentRoom = {
            id: roomId,
            name: `Room ${roomId}`,
            members: Math.floor(Math.random() * 10) + 2,
            host: false
        };

        this.updateRoomDisplay();
        this.closeModal('joinRoomModal');
        this.showNotification('Joined Room', `Successfully joined room: ${roomId}`);
        
        // Clear form
        document.getElementById('roomIdInput').value = '';
    }

    leaveRoom() {
        if (!this.currentRoom) return;

        const roomName = this.currentRoom.name;
        this.currentRoom = null;
        this.votingQueue = [];
        
        document.getElementById('roomStatus').style.display = 'none';
        document.getElementById('votingSection').style.display = 'none';
        
        this.updateVotingList();
        this.showNotification('Left Room', `You left "${roomName}"`);
    }

    updateRoomDisplay() {
        if (!this.currentRoom) return;

        document.getElementById('roomName').textContent = this.currentRoom.name;
        document.getElementById('roomId').textContent = this.currentRoom.id;
        document.getElementById('memberCount').textContent = this.currentRoom.members;
        document.getElementById('roomStatus').style.display = 'block';
        document.getElementById('votingSection').style.display = 'block';
    }

    generateRoomId() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    clearRoomForm() {
        document.getElementById('roomNameInput').value = '';
        document.getElementById('roomDescription').value = '';
        document.getElementById('maxMembers').value = '5';
        document.getElementById('privateRoom').checked = false;
    }

    // Voting System Functions
    initializeVoting() {
        // Initialize with some sample voting items
        this.votingQueue = [
            {
                title: "Imagine",
                artist: "John Lennon",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop",
                upVotes: 5,
                downVotes: 1,
                userVote: null
            },
            {
                title: "Stairway to Heaven",
                artist: "Led Zeppelin",
                image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=60&h=60&fit=crop",
                upVotes: 8,
                downVotes: 2,
                userVote: null
            }
        ];
    }

    addTrackToVoting(title, artist, image) {
        if (!this.currentRoom) {
            this.showNotification('Error', 'You need to be in a room to vote for songs');
            return;
        }

        // Check if song already exists in voting queue
        const existingSong = this.votingQueue.find(song => 
            song.title === title && song.artist === artist
        );

        if (existingSong) {
            this.showNotification('Already Added', 'This song is already in the voting queue');
            return;
        }

        const newVotingItem = {
            title,
            artist,
            image,
            upVotes: 1,
            downVotes: 0,
            userVote: 'up'
        };

        this.votingQueue.push(newVotingItem);
        this.updateVotingList();
        this.showNotification('Added to Voting', `"${title}" added to voting queue`);
    }

    addCurrentToVoting() {
        const currentTrack = this.tracks[this.currentTrack];
        this.addTrackToVoting(currentTrack.title, currentTrack.artist, currentTrack.cover);
    }

    addCurrentToFavorites() {
        const currentTrack = this.tracks[this.currentTrack];
        this.addToFavorites(currentTrack.title, currentTrack.artist, currentTrack.cover);
    }

    addToFavorites(title, artist, image) {
        // Check if already in favorites
        const existingFavorite = this.favorites.find(fav => 
            fav.title === title && fav.artist === artist
        );

        if (existingFavorite) {
            this.showNotification('Already Favorited', 'This song is already in your favorites');
            return;
        }

        this.favorites.push({ title, artist, image });
        this.showNotification('Added to Favorites', `"${title}" added to your favorites`);
    }

    voteForSong(button, voteType) {
        if (!this.currentRoom) {
            this.showNotification('Error', 'You need to be in a room to vote');
            return;
        }

        const votingItem = button.closest('.voting-item');
        const title = votingItem.querySelector('.track-details h4').textContent;
        const artist = votingItem.querySelector('.track-details p').textContent;
        
        const songIndex = this.votingQueue.findIndex(song => 
            song.title === title && song.artist === artist
        );

        if (songIndex === -1) return;

        const song = this.votingQueue[songIndex];
        
        // Remove previous vote if exists
        if (song.userVote === 'up') {
            song.upVotes--;
        } else if (song.userVote === 'down') {
            song.downVotes--;
        }

        // Add new vote
        if (song.userVote === voteType) {
            // Remove vote if clicking same button
            song.userVote = null;
        } else {
            // Add new vote
            song.userVote = voteType;
            if (voteType === 'up') {
                song.upVotes++;
            } else {
                song.downVotes++;
            }
        }

        this.updateVotingList();
        this.showNotification('Vote Updated', `Your vote for "${title}" has been updated`);
    }

    updateVotingList() {
        const votingList = document.getElementById('votingList');
        if (!votingList) return;

        // Sort by score (upVotes - downVotes)
        const sortedQueue = [...this.votingQueue].sort((a, b) => 
            (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes)
        );

        votingList.innerHTML = sortedQueue.map(song => {
            const score = song.upVotes - song.downVotes;
            const upActive = song.userVote === 'up' ? 'style="background: rgba(16, 185, 129, 0.4);"' : '';
            const downActive = song.userVote === 'down' ? 'style="background: rgba(239, 68, 68, 0.4);"' : '';

            return `
                <div class="voting-item">
                    <img src="${song.image}" alt="Track">
                    <div class="track-details">
                        <h4>${song.title}</h4>
                        <p>${song.artist}</p>
                    </div>
                    <div class="vote-controls">
                        <button class="vote-btn" onclick="musicPlayer.voteForSong(this, 'up')" ${upActive}>
                            <i class="fas fa-thumbs-up"></i>
                            <span class="vote-count">${song.upVotes}</span>
                        </button>
                        <button class="vote-btn" onclick="musicPlayer.voteForSong(this, 'down')" ${downActive}>
                            <i class="fas fa-thumbs-down"></i>
                            <span class="vote-count">${song.downVotes}</span>
                        </button>
                    </div>
                    <div class="vote-score">${score >= 0 ? '+' : ''}${score}</div>
                </div>
            `;
        }).join('');
    }

    addFavoriteToVoting(title, artist, image) {
        this.addTrackToVoting(title, artist, image);
        this.closeModal('addSongModal');
    }

    loadFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        if (!favoritesList) return;

        favoritesList.innerHTML = this.favorites.map(fav => `
            <div class="favorite-item" onclick="musicPlayer.addFavoriteToVoting('${fav.title}', '${fav.artist}', '${fav.image}')">
                <img src="${fav.image}" alt="Track">
                <div class="track-details">
                    <h4>${fav.title}</h4>
                    <p>${fav.artist}</p>
                </div>
                <button class="add-btn">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `).join('');
    }

    searchSongs() {
        const query = document.getElementById('songSearchInput').value;
        const searchResults = document.getElementById('searchResults');
        
        if (!query.trim()) {
            searchResults.innerHTML = '';
            return;
        }

        // Mock search results
        const mockResults = [
            {
                title: "Sweet Child O' Mine",
                artist: "Guns N' Roses",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
            },
            {
                title: "Thunderstruck",
                artist: "AC/DC",
                image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=60&h=60&fit=crop"
            }
        ].filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
        );

        searchResults.innerHTML = mockResults.map(song => `
            <div class="favorite-item" onclick="musicPlayer.addTrackToVoting('${song.title}', '${song.artist}', '${song.image}'); musicPlayer.closeModal('addSongModal');">
                <img src="${song.image}" alt="Track">
                <div class="track-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
                <button class="add-btn">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `).join('');
    }

    // Modal Functions
    openCreateRoomModal() {
        document.getElementById('createRoomModal').style.display = 'flex';
    }

    openJoinRoomModal() {
        document.getElementById('joinRoomModal').style.display = 'flex';
    }

    openAddSongModal() {
        document.getElementById('addSongModal').style.display = 'flex';
        this.loadFavorites();
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    bindEvents() {
        // Play/Pause button
        const playPauseBtn = document.querySelector('.play-pause');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }

        // Previous/Next buttons
        const prevBtn = document.querySelector('.control-btn:first-child');
        const nextBtn = document.querySelector('.control-btn:last-child');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousTrack());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextTrack());

        // Volume control
        const volumeSlider = document.querySelector('.volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        }

        // Progress control
        const progressSlider = document.querySelector('.progress-slider');
        if (progressSlider) {
            progressSlider.addEventListener('input', (e) => this.setProgress(e.target.value));
        }

        // Heart/Like button
        const heartBtn = document.querySelector('.extra-btn');
        if (heartBtn) {
            heartBtn.addEventListener('click', () => this.toggleLike());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Modal close on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const playPauseBtn = document.querySelector('.play-pause i');
        
        if (this.isPlaying) {
            playPauseBtn.className = 'fas fa-pause';
            this.showNotification('Now Playing', `${this.tracks[this.currentTrack].title} by ${this.tracks[this.currentTrack].artist}`);
        } else {
            playPauseBtn.className = 'fas fa-play';
            this.showNotification('Paused', 'Music paused');
        }

        // Add visual feedback
        const playPauseButton = document.querySelector('.play-pause');
        playPauseButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playPauseButton.style.transform = 'scale(1)';
        }, 150);
    }

    previousTrack() {
        this.currentTrack = this.currentTrack > 0 ? this.currentTrack - 1 : this.tracks.length - 1;
        this.currentTime = 0;
        this.updatePlayerDisplay();
        this.showNotification('Previous Track', `${this.tracks[this.currentTrack].title}`);
    }

    nextTrack() {
        this.currentTrack = this.currentTrack < this.tracks.length - 1 ? this.currentTrack + 1 : 0;
        this.currentTime = 0;
        this.updatePlayerDisplay();
        this.showNotification('Next Track', `${this.tracks[this.currentTrack].title}`);
    }

    setVolume(value) {
        this.volume = value;
        const volumeIcon = document.querySelector('.volume-control i');
        
        if (value == 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (value < 50) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }

    setProgress(value) {
        this.currentTime = (value / 100) * this.duration;
        this.updateTimeDisplay();
    }

    toggleLike() {
        const heartBtn = document.querySelector('.extra-btn i');
        const isLiked = heartBtn.classList.contains('fas');
        
        if (isLiked) {
            heartBtn.className = 'far fa-heart';
            this.showNotification('Removed from Favorites', 'Track removed from your favorites');
        } else {
            heartBtn.className = 'fas fa-heart';
            heartBtn.style.color = 'var(--color-accent)';
            this.showNotification('Added to Favorites', 'Track added to your favorites');
        }
    }

    updatePlayerDisplay() {
        const track = this.tracks[this.currentTrack];
        
        // Update track info
        const albumCover = document.querySelector('.album-cover');
        const trackTitle = document.querySelector('.track-details h4');
        const trackArtist = document.querySelector('.track-details p');
        
        if (albumCover) albumCover.src = track.cover;
        if (trackTitle) trackTitle.textContent = track.title;
        if (trackArtist) trackArtist.textContent = track.artist;
        
        // Update duration
        this.duration = this.parseDuration(track.duration);
        this.updateTimeDisplay();
    }

    updateTimeDisplay() {
        const timeDisplay = document.querySelector('.time');
        if (timeDisplay) {
            const current = this.formatTime(this.currentTime);
            const total = this.tracks[this.currentTrack].duration;
            timeDisplay.textContent = `${current} / ${total}`;
        }

        // Update progress bar
        const progressSlider = document.querySelector('.progress-slider');
        if (progressSlider) {
            const progress = (this.currentTime / this.duration) * 100;
            progressSlider.value = progress;
        }
    }

    startProgressTimer() {
        setInterval(() => {
            if (this.isPlaying && this.currentTime < this.duration) {
                this.currentTime += 1;
                this.updateTimeDisplay();
                
                // Auto advance to next track
                if (this.currentTime >= this.duration) {
                    this.nextTrack();
                }
            }
        }, 1000);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    parseDuration(duration) {
        const [mins, secs] = duration.split(':').map(Number);
        return mins * 60 + secs;
    }

    handleKeyboardShortcuts(e) {
        // Prevent shortcuts when typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousTrack();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextTrack();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.setVolume(Math.min(100, this.volume + 5));
                document.querySelector('.volume-slider').value = this.volume;
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.setVolume(Math.max(0, this.volume - 5));
                document.querySelector('.volume-slider').value = this.volume;
                break;
            case 'Escape':
                // Close any open modals
                const openModals = document.querySelectorAll('.modal[style*="flex"]');
                openModals.forEach(modal => modal.style.display = 'none');
                break;
        }
    }

    showNotification(title, message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-card);
            backdrop-filter: blur(var(--blur));
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-md);
            color: var(--color-text);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    addScrollEffects() {
        // Parallax effect for background orbs
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const orbs = document.querySelectorAll('.bg-orbs span');
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Fade in effect for cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards
        const cards = document.querySelectorAll('.playlist-card, .stat-card, .track-item');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    addSearchFunctionality() {
        const searchInput = document.querySelector('.search-bar input');
        const searchBtn = document.querySelector('.search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.debounce(this.performSearch.bind(this), 300)(e.target.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput.value;
                this.performSearch(query);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) return;

        // Simulate search with visual feedback
        const searchBtn = document.querySelector('.search-btn');
        const originalHTML = searchBtn.innerHTML;
        
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            searchBtn.innerHTML = originalHTML;
            searchBtn.style.pointerEvents = 'auto';
            this.showNotification('Search Results', `Found results for "${query}"`);
        }, 1000);
    }

    addPlaylistInteractions() {
        const playlistCards = document.querySelectorAll('.playlist-card');
        
        playlistCards.forEach((card, index) => {
            // Add click to play
            card.addEventListener('click', () => {
                this.playPlaylist(index);
            });

            // Add context menu
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, 'playlist', index);
            });
        });

        // Playlist play buttons
        const playBtns = document.querySelectorAll('.play-btn');
        playBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playPlaylist(index);
                
                // Visual feedback
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1.1)';
                }, 100);
            });
        });
    }

    playPlaylist(index) {
        const playlist = this.playlists[index];
        this.showNotification('Playing Playlist', `Started playing "${playlist.name}"`);
        
        // Simulate playlist loading
        if (!this.isPlaying) {
            this.togglePlayPause();
        }
    }

    addTrackListInteractions() {
        const trackItems = document.querySelectorAll('.track-item');
        
        trackItems.forEach((item, index) => {
            // Add hover effect for action buttons
            item.addEventListener('mouseenter', () => {
                const actionBtns = item.querySelectorAll('.track-action');
                actionBtns.forEach(btn => {
                    btn.style.opacity = '1';
                });
            });

            item.addEventListener('mouseleave', () => {
                const actionBtns = item.querySelectorAll('.track-action');
                actionBtns.forEach(btn => {
                    btn.style.opacity = '0';
                });
            });

            // Double click to play
            item.addEventListener('dblclick', () => {
                this.playTrackFromList(index);
            });
        });
    }

    playTrackFromList(index) {
        this.currentTrack = index;
        this.currentTime = 0;
        this.updatePlayerDisplay();
        
        if (!this.isPlaying) {
            this.togglePlayPause();
        }
        
        this.showNotification('Now Playing', `${this.tracks[index].title} by ${this.tracks[index].artist}`);
    }

    addNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get the link text
                const linkText = link.querySelector('span').textContent;
                this.showNotification('Navigation', `Switched to ${linkText}`);
            });
        });

        // User profile click
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            userProfile.addEventListener('click', () => {
                this.showUserMenu();
            });
        }
    }

    showUserMenu() {
        this.showNotification('User Menu', 'Profile options would appear here');
    }

    showContextMenu(e, type, index) {
        // Create context menu
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            background: var(--color-card);
            backdrop-filter: blur(var(--blur));
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: var(--space-sm);
            z-index: 10000;
            min-width: 150px;
            box-shadow: var(--shadow-lg);
        `;

        const menuItems = [
            { icon: 'fa-play', text: 'Play', action: () => this.playPlaylist(index) },
            { icon: 'fa-plus', text: 'Add to Queue', action: () => this.showNotification('Added', 'Added to queue') },
            { icon: 'fa-heart', text: 'Add to Favorites', action: () => this.showNotification('Favorited', 'Added to favorites') },
            { icon: 'fa-share', text: 'Share', action: () => this.showNotification('Share', 'Share options') }
        ];

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.style.cssText = `
                padding: var(--space-sm);
                cursor: pointer;
                border-radius: var(--radius-sm);
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                transition: background 0.2s ease;
                color: var(--color-text);
            `;
            menuItem.innerHTML = `<i class="fas ${item.icon}"></i> ${item.text}`;
            
            menuItem.addEventListener('mouseenter', () => {
                menuItem.style.background = 'var(--color-card-hover)';
            });
            
            menuItem.addEventListener('mouseleave', () => {
                menuItem.style.background = 'transparent';
            });
            
            menuItem.addEventListener('click', () => {
                item.action();
                document.body.removeChild(menu);
            });
            
            menu.appendChild(menuItem);
        });

        document.body.appendChild(menu);

        // Remove menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function removeMenu() {
                if (menu.parentNode) {
                    menu.parentNode.removeChild(menu);
                }
                document.removeEventListener('click', removeMenu);
            });
        }, 100);
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Advanced Audio Visualizer
class AudioVisualizer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.analyser = null;
        this.bufferLength = 0;
        this.dataArray = null;
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.createAudioContext();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 300;
        this.canvas.height = 100;
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border-radius: var(--radius-md);
            opacity: 0.7;
            pointer-events: none;
        `;

        const playerWidget = document.querySelector('.player-widget');
        if (playerWidget) {
            playerWidget.style.position = 'relative';
            playerWidget.appendChild(this.canvas);
        }

        this.ctx = this.canvas.getContext('2d');
    }

    createAudioContext() {
        // Create mock audio data for visualization
        this.bufferLength = 64;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Generate mock frequency data
        for (let i = 0; i < this.bufferLength; i++) {
            this.dataArray[i] = Math.random() * 255;
        }
        
        this.draw();
    }

    draw() {
        const { width, height } = this.canvas;
        
        this.ctx.clearRect(0, 0, width, height);
        
        const barWidth = width / this.bufferLength;
        let x = 0;
        
        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = (this.dataArray[i] / 255) * height * 0.8;
            
            const gradient = this.ctx.createLinearGradient(0, height, 0, height - barHeight);
            gradient.addColorStop(0, 'rgba(255, 77, 109, 0.8)');
            gradient.addColorStop(0.5, 'rgba(255, 127, 153, 0.6)');
            gradient.addColorStop(1, 'rgba(255, 77, 109, 0.3)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
            
            x += barWidth;
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.themes = {
            default: {
                name: 'Default',
                colors: {
                    bg: '#0a0a0f',
                    accent: '#ff4d6d',
                    accentLight: '#ff7f99'
                }
            },
            blue: {
                name: 'Ocean Blue',
                colors: {
                    bg: '#0a0f1a',
                    accent: '#4d9eff',
                    accentLight: '#7fb3ff'
                }
            },
            purple: {
                name: 'Purple Rain',
                colors: {
                    bg: '#0f0a1a',
                    accent: '#9d4eff',
                    accentLight: '#b37fff'
                }
            },
            black: {
                name: 'Monochrome',
                colors: {
                    bg: '#0f0a1a',
                    accent: '#828086ff',
                    accentLight: '#d8d8daff'
                }
            },
            green: {
                name: 'Forest Green',
                colors: {
                    bg: '#0a1a0f',
                    accent: '#4dff6d',
                    accentLight: '#7fff99'
                }
            }
        };
        
        this.currentTheme = 'default';
        this.addThemeSelector();
    }

    addThemeSelector() {
        const themeBtn = document.createElement('button');
        themeBtn.innerHTML = '<i class="fas fa-palette"></i>';
        themeBtn.className = 'theme-toggle';
        themeBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--color-accent);
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        themeBtn.addEventListener('click', () => this.showThemeSelector());
        document.body.appendChild(themeBtn);
    }

    showThemeSelector() {
        const modal = document.createElement('div');
        modal.className = 'theme-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;

        const themeGrid = document.createElement('div');
        themeGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-md);
            padding: var(--space-xl);
            background: var(--color-card);
            border-radius: var(--radius-xl);
            border: 1px solid var(--color-border);
        `;

        Object.entries(this.themes).forEach(([key, theme]) => {
            const themeCard = document.createElement('div');
            themeCard.style.cssText = `
                padding: var(--space-md);
                border-radius: var(--radius-md);
                cursor: pointer;
                text-align: center;
                border: 2px solid ${key === this.currentTheme ? theme.colors.accent : 'transparent'};
                background: ${theme.colors.bg};
                transition: all 0.3s ease;
            `;

            themeCard.innerHTML = `
                <div style="width: 40px; height: 40px; background: ${theme.colors.accent}; border-radius: 50%; margin: 0 auto var(--space-sm);"></div>
                <h4 style="color: ${theme.colors.accent};">${theme.name}</h4>
            `;

            themeCard.addEventListener('click', () => {
                this.applyTheme(key);
                document.body.removeChild(modal);
            });

            themeGrid.appendChild(themeCard);
        });

        modal.appendChild(themeGrid);
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    applyTheme(themeKey) {
        const theme = this.themes[themeKey];
        const root = document.documentElement;
        
        Object.entries(theme.colors).forEach(([property, value]) => {
            root.style.setProperty(`--color-${property}`, value);
        });
        
        this.currentTheme = themeKey;
        localStorage.setItem('musicPlayerTheme', themeKey);
    }
}

// Global variables for HTML onclick handlers
let musicPlayer;

// Global functions for HTML onclick handlers
function openCreateRoomModal() {
    musicPlayer.openCreateRoomModal();
}

function openJoinRoomModal() {
    musicPlayer.openJoinRoomModal();
}

function openAddSongModal() {
    musicPlayer.openAddSongModal();
}

function closeModal(modalId) {
    musicPlayer.closeModal(modalId);
}

function createRoom() {
    musicPlayer.createRoom();
}

function joinRoom() {
    musicPlayer.joinRoom();
}

function leaveRoom() {
    musicPlayer.leaveRoom();
}

function addCurrentToFavorites() {
    musicPlayer.addCurrentToFavorites();
}

function addCurrentToVoting() {
    musicPlayer.addCurrentToVoting();
}

function addToFavorites(title, artist, image) {
    musicPlayer.addToFavorites(title, artist, image);
}

function addTrackToVoting(title, artist, image) {
    musicPlayer.addTrackToVoting(title, artist, image);
}

function addFavoriteToVoting(title, artist, image) {
    musicPlayer.addFavoriteToVoting(title, artist, image);
}

function voteForSong(button, voteType) {
    musicPlayer.voteForSong(button, voteType);
}

function searchSongs() {
    musicPlayer.searchSongs();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    musicPlayer = new MusicPlayer();
    const audioVisualizer = new AudioVisualizer();
    const themeManager = new ThemeManager();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('musicPlayerTheme');
    if (savedTheme && themeManager.themes[savedTheme]) {
        themeManager.applyTheme(savedTheme);
    }
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 50vh;">
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 3px solid var(--color-border); border-top: 3px solid var(--color-accent); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto var(--space-md);"></div>
                <p style="color: var(--color-text-secondary);">Loading your music...</p>
            </div>
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Simulate loading
    setTimeout(() => {
        if (loader.parentNode) {
            loader.remove();
        }
    }, 2000);
    
    console.log('🎵 Glassmorphic Music Player with Room & Voting System Initialized!');
});
