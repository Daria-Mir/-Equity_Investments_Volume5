document.addEventListener('DOMContentLoaded', () => {
    // Audio files list
    const playlist = [
        {
            num: 1,
            title: "Market Organization and Structure",
            sub: "The Global Financial Time Machine",
            src: "audiofiles/Module 1_The_Global_Financial_Time_Machine.mp3"
        },
        {
            num: 2,
            title: "Security Market Indexes",
            sub: "How Security Market Indexes Really Work",
            src: "audiofiles/Module 2_How_Security_Market_Indexes_Really_Work.mp3"
        },
        {
            num: 3,
            title: "Market Efficiency",
            sub: "Can You Actually Outsmart the Market?",
            src: "audiofiles/Module_3_Can_You_Actually_Outsmart_the_Market_.mp3"
        },
        {
            num: 4,
            title: "Overview of Equity Securities",
            sub: "The Hidden Machinery of Global Equities",
            src: "audiofiles/Module 4_The_hidden_machinery_of_global_equities.mp3"
        },
        {
            num: 5,
            title: "Company Analysis - Past and Present",
            sub: "Retail Profits Hide in Membership Fees",
            src: "audiofiles/Module_5_Retail_profits_hide_in_membership_fees.mp3"
        },
        {
            num: 6,
            title: "Industry and Competitive Analysis",
            sub: "Why Industry Structure Beats Great Execution",
            src: "audiofiles/Module_6_Why_industry_structure_beats_great_execution.mp3"
        },
        {
            num: 7,
            title: "Company Analysis - Forecasting",
            sub: "How Professionals Forecast Company Financial Results",
            src: "audiofiles/Module_7_How_professionals_forecast_company_financial_results.mp3"
        },
        {
            num: 8,
            title: "Equity Valuation - Concepts and Basic Tools",
            sub: "Three Models for Calculating Intrinsic Value",
            src: "audiofiles/Module_8_Three models for calculating intrinsic value.mp3"
        }
    ];

    // Player Elements
    const audio = new Audio();
    let currentTrackIndex = -1;
    let isPlaying = false;
    let playbackSpeed = 1.0;

    // DOM Elements
    const masterPlayer = document.getElementById('master-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBarWrapper = document.getElementById('progress-bar-wrapper');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const trackThumb = document.getElementById('track-thumb');
    const trackTitleText = document.getElementById('track-title-text');
    const trackSubtitleText = document.getElementById('track-subtitle-text');
    
    // Volume
    const volumeSliderWrapper = document.getElementById('volume-slider-wrapper');
    const volumeFill = document.getElementById('volume-fill');
    const volumeIcon = document.getElementById('volume-icon');
    let isMuted = false;
    let previousVolume = 0.8;

    // Speed / Velocity controller (native select on mobile/desktop)
    const speedSelect = document.getElementById('speed-select');

    // Initialize volume
    audio.volume = previousVolume;

    // Module Play Buttons
    const moduleCards = document.querySelectorAll('.module-card');
    const modulePlayBtns = document.querySelectorAll('.play-module-btn');

    // Click on book cover / main play button to start from track 1
    const mainPlayBtn = document.getElementById('main-play-btn');
    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentTrackIndex === -1) {
                playTrack(0);
            } else {
                togglePlay();
            }
        });
    }

    // Update Media Session (Lock screen controls for iOS/Android)
    function updateMediaSession(index) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: playlist[index].title,
                artist: "CFA Study Companion",
                album: "Volume 5: Equity Investments",
                artwork: [
                    { src: 'cfa_book_cover.png', sizes: '512x512', type: 'image/png' }
                ]
            });

            // Set action handlers
            navigator.mediaSession.setActionHandler('play', togglePlay);
            navigator.mediaSession.setActionHandler('pause', togglePlay);
            navigator.mediaSession.setActionHandler('previoustrack', playPrevious);
            navigator.mediaSession.setActionHandler('nexttrack', playNext);
        }
    }

    // Play a specific track
    function playTrack(index) {
        if (index < 0 || index >= playlist.length) return;

        // If it's a new track, load it
        if (currentTrackIndex !== index) {
            currentTrackIndex = index;
            audio.src = playlist[index].src;
            audio.load();
            
            // Update track details in player
            trackThumb.textContent = playlist[index].num;
            trackTitleText.textContent = playlist[index].title;
            trackSubtitleText.textContent = playlist[index].sub;
            
            // Set playback speed
            if (speedSelect) {
                speedSelect.value = playbackSpeed.toString();
            }
            audio.playbackRate = playbackSpeed;

            // Make player visible
            masterPlayer.classList.add('visible');
        }

        audio.play()
            .then(() => {
                isPlaying = true;
                updateUI();
                updateMediaSession(index);
            })
            .catch(error => {
                console.error("Audio playback failed: ", error);
            });
    }

    // Toggle Play/Pause
    function togglePlay() {
        if (currentTrackIndex === -1) {
            playTrack(0);
            return;
        }

        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play().then(() => {
                isPlaying = true;
            });
        }
        updateUI();
    }

    // Update UI Elements
    function updateUI() {
        // Sync media session playback state
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
        }

        // Master Play/Pause icon
        if (isPlaying) {
            playPauseBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                    <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                </svg>
            `;
        } else {
            playPauseBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="transform: translateX(1px)">
                    <path d="M8 5v14l11-7z"></path>
                </svg>
            `;
        }

        // Module-specific cards active states and play icons
        moduleCards.forEach((card, idx) => {
            const btn = card.querySelector('.play-module-btn');
            if (idx === currentTrackIndex) {
                card.classList.add('active-track');
                if (isPlaying) {
                    btn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                            <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                        </svg>
                    `;
                } else {
                    btn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="transform: translateX(1px)">
                            <path d="M8 5v14l11-7z"></path>
                        </svg>
                    `;
                }
            } else {
                card.classList.remove('active-track');
                btn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="transform: translateX(1px)">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                `;
            }
        });
    }

    // Previous / Next Track
    function playPrevious() {
        if (currentTrackIndex > 0) {
            playTrack(currentTrackIndex - 1);
        } else {
            playTrack(playlist.length - 1); // Wrap around
        }
    }

    function playNext() {
        if (currentTrackIndex < playlist.length - 1) {
            playTrack(currentTrackIndex + 1);
        } else {
            playTrack(0); // Wrap around
        }
    }

    // Time Formatting
    function formatTime(seconds) {
        if (isNaN(seconds)) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Event Listeners for Player Control Buttons
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);

    // Audio Event Handlers
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
        playNext();
    });

    // Ensure playback rate (speed) is sticky on mobile devices when audio plays
    audio.addEventListener('play', () => {
        audio.playbackRate = playbackSpeed;
    });

    // Safari mobile can sometimes reset speed on pause/play or duration change
    audio.addEventListener('ratechange', () => {
        if (audio.playbackRate !== playbackSpeed) {
            audio.playbackRate = playbackSpeed;
        }
    });

    // Seek in Progress Bar
    progressBarWrapper.addEventListener('click', (e) => {
        if (currentTrackIndex === -1) return;
        const rect = progressBarWrapper.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = clickX / width;
        audio.currentTime = percent * audio.duration;
    });

    // Touch support for progress bar (scrubbing on mobile)
    progressBarWrapper.addEventListener('touchmove', (e) => {
        if (currentTrackIndex === -1) return;
        const rect = progressBarWrapper.getBoundingClientRect();
        const touch = e.touches[0];
        const clickX = touch.clientX - rect.left;
        const width = rect.width;
        let percent = clickX / width;
        percent = Math.max(0, Math.min(1, percent)); // clamp 0-1
        audio.currentTime = percent * audio.duration;
    });

    // Playback Speed (Velocity) Selector Logic
    if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
            playbackSpeed = parseFloat(e.target.value);
            audio.playbackRate = playbackSpeed;
        });
    }

    // Volume Slider Click/Drag
    function updateVolume(e) {
        const rect = volumeSliderWrapper.getBoundingClientRect();
        let clientX = e.clientX;
        if (e.touches) {
            clientX = e.touches[0].clientX;
        }
        const clickX = clientX - rect.left;
        const width = rect.width;
        let percent = clickX / width;
        percent = Math.max(0, Math.min(1, percent)); // clamp 0-1
        
        audio.volume = percent;
        volumeFill.style.width = `${percent * 100}%`;
        
        if (percent === 0) {
            isMuted = true;
            updateVolumeIcon(0);
        } else {
            isMuted = false;
            previousVolume = percent;
            updateVolumeIcon(percent);
        }
    }

    function updateVolumeIcon(vol) {
        if (vol === 0) {
            volumeIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                </svg>
            `;
        } else if (vol < 0.5) {
            volumeIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path>
                </svg>
            `;
        } else {
            volumeIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                </svg>
            `;
        }
    }

    volumeSliderWrapper.addEventListener('click', updateVolume);

    // Mute Button Toggle
    volumeIcon.addEventListener('click', () => {
        if (isMuted) {
            audio.volume = previousVolume;
            isMuted = false;
            volumeFill.style.width = `${previousVolume * 100}%`;
            updateVolumeIcon(previousVolume);
        } else {
            previousVolume = audio.volume;
            audio.volume = 0;
            isMuted = true;
            volumeFill.style.width = `0%`;
            updateVolumeIcon(0);
        }
    });

    // Add click events to module cards' play buttons
    modulePlayBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentTrackIndex === index) {
                togglePlay();
            } else {
                playTrack(index);
            }
        });
    });
    
    // Also clicking anywhere on the card header/meta could trigger it
    moduleCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Check if user clicked inside visual or table or a button
            if (e.target.closest('.module-visual') || e.target.closest('.play-module-btn')) {
                return; // Do not trigger play if clicking visual
            }
            if (currentTrackIndex === index) {
                togglePlay();
            } else {
                playTrack(index);
            }
        });
    });
});
