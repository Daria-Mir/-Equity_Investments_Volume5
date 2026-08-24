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
            // Check if user clicked inside visual, play button, quiz actions, or quiz containers
            if (
                e.target.closest('.module-visual') || 
                e.target.closest('.play-module-btn') || 
                e.target.closest('.module-actions') || 
                e.target.closest('.quiz-container')
            ) {
                return; // Do not trigger play
            }
            if (currentTrackIndex === index) {
                togglePlay();
            } else {
                playTrack(index);
            }
        });
    });

    // ==========================================================================
    // CFA Quiz Engine Logic
    // ==========================================================================
    const quizStates = {}; // Holds state for active quizzes

    // Toggle Quiz Container
    const quizToggleBtns = document.querySelectorAll('.quiz-toggle-btn');
    quizToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modId = btn.getAttribute('data-module');
            const container = document.getElementById(`quiz-container-${modId}`);
            
            if (container.style.display === 'block') {
                container.style.display = 'none';
                btn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    Practice Quiz
                `;
            } else {
                container.style.display = 'block';
                btn.innerHTML = 'Close Quiz';
                startQuiz(modId, container);
            }
        });
    });

    // Load Quiz Scores from localStorage
    function loadQuizProgress() {
        const savedScores = localStorage.getItem('cfa_quiz_scores');
        if (savedScores) {
            const scores = JSON.parse(savedScores);
            Object.keys(scores).forEach(modId => {
                const btn = document.querySelector(`.quiz-toggle-btn[data-module="${modId}"]`);
                if (btn) {
                    btn.setAttribute('data-completed', 'true');
                    // Add checkmark indicator
                    if (!btn.querySelector('.checkmark')) {
                        btn.insertAdjacentHTML('beforeend', ` <span class="checkmark" style="color: var(--accent-green); margin-left: 6px;">✓ (${scores[modId]}/6)</span>`);
                    }
                }
            });
        }
    }
    loadQuizProgress();

    function startQuiz(modId, container) {
        const questions = quizData[modId].questions;
        quizStates[modId] = {
            currentIdx: 0,
            score: 0,
            selectedOpt: null,
            submitted: false,
            answers: []
        };
        renderQuizQuestion(modId, container);
    }

    function renderQuizQuestion(modId, container) {
        const state = quizStates[modId];
        const question = quizData[modId].questions[state.currentIdx];
        const totalQuestions = quizData[modId].questions.length;
        
        state.selectedOpt = null;
        state.submitted = false;

        const progressPercent = (state.currentIdx / totalQuestions) * 100;

        let optionsHtml = '';
        Object.keys(question.options).forEach(key => {
            optionsHtml += `
                <button class="quiz-option-btn" data-option="${key}">
                    <span class="quiz-option-letter">${key}</span>
                    <span class="quiz-option-text">${escapeHtml(question.options[key])}</span>
                </button>
            `;
        });

        container.innerHTML = `
            <div class="quiz-question-box">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 11px; color: var(--text-secondary);">
                    <span>Question ${state.currentIdx + 1} of ${totalQuestions}</span>
                    <span>CFA Level I Difficulty</span>
                </div>
                <div class="progress-bar-wrapper" style="height: 3px; background: rgba(255,255,255,0.05); margin-bottom: 20px;">
                    <div style="height: 100%; background: var(--accent-blue); width: ${progressPercent}%; transition: width 0.3s ease;"></div>
                </div>
                ${question.scenario ? `<div class="quiz-scenario">${escapeHtml(question.scenario)}</div>` : ''}
                <div class="quiz-question-text">${escapeHtml(question.question)}</div>
                
                <div class="quiz-options-list">
                    ${optionsHtml}
                </div>
                
                <div id="quiz-explanation-${modId}" class="quiz-explanation-box" style="display: none;">
                    <div class="quiz-explanation-title">Explanation</div>
                    <div class="quiz-explanation-text">${formatExplanation(question.explanation)}</div>
                </div>

                <div class="quiz-footer">
                    <span class="quiz-score-badge">Score: ${state.score}/${totalQuestions}</span>
                    <button id="quiz-submit-${modId}" class="btn-primary" disabled style="padding: 10px 20px; font-size: 13px; border-radius: 20px;">Submit Answer</button>
                </div>
            </div>
        `;

        // Attach option click listeners
        const optionBtns = container.querySelectorAll('.quiz-option-btn');
        const submitBtn = container.querySelector(`#quiz-submit-${modId}`);

        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (state.submitted) return;
                
                optionBtns.forEach(o => o.classList.remove('selected'));
                btn.classList.add('selected');
                state.selectedOpt = btn.getAttribute('data-option');
                submitBtn.removeAttribute('disabled');
            });
        });

        // Submit button listener
        submitBtn.addEventListener('click', () => {
            if (state.submitted) {
                // Next question logic
                state.currentIdx++;
                if (state.currentIdx < totalQuestions) {
                    renderQuizQuestion(modId, container);
                } else {
                    renderQuizResults(modId, container);
                }
                return;
            }

            // Submit logic
            state.submitted = true;
            const isCorrect = state.selectedOpt === question.correct;
            if (isCorrect) {
                state.score++;
            }
            state.answers.push({
                questionId: question.id,
                selected: state.selectedOpt,
                correct: question.correct,
                isCorrect: isCorrect
            });

            // Highlight buttons
            optionBtns.forEach(btn => {
                const opt = btn.getAttribute('data-option');
                btn.classList.remove('selected');
                if (opt === question.correct) {
                    btn.classList.add('correct');
                } else if (opt === state.selectedOpt) {
                    btn.classList.add('incorrect');
                }
                btn.setAttribute('disabled', 'true');
            });

            // Show explanation
            const expBox = container.querySelector(`#quiz-explanation-${modId}`);
            const expTitle = expBox.querySelector('.quiz-explanation-title');
            if (isCorrect) {
                expTitle.style.color = 'var(--accent-green)';
                expTitle.textContent = 'Correct Answer';
            } else {
                expTitle.style.color = 'var(--accent-red)';
                expTitle.textContent = `Incorrect (Correct Option: ${question.correct})`;
            }
            expBox.style.display = 'block';

            // Change submit button text
            submitBtn.textContent = (state.currentIdx + 1 < totalQuestions) ? 'Next Question' : 'View Results';
        });
    }

    function renderQuizResults(modId, container) {
        const state = quizStates[modId];
        const total = quizData[modId].questions.length;
        const percent = Math.round((state.score / total) * 100);
        const dashOffset = 251.2 - (251.2 * percent) / 100; // SVG circle length is 2 * PI * r = 2 * 3.14 * 40 = 251.2

        container.innerHTML = `
            <div class="quiz-results-dashboard">
                <div class="score-circle-container">
                    <svg class="score-circle-svg" viewBox="0 0 100 100">
                        <circle class="score-circle-bg" cx="50" cy="50" r="40"></circle>
                        <circle class="score-circle-bar" cx="50" cy="50" r="40" stroke-dasharray="251.2" stroke-dashoffset="${dashOffset}"></circle>
                    </svg>
                    <div class="score-text">${percent}%</div>
                </div>
                <h4 style="color: #fff; font-family: var(--font-heading); margin-bottom: 8px; font-size: 18px;">Quiz Completed</h4>
                <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 20px;">
                    You scored <strong>${state.score}</strong> out of <strong>${total}</strong>.
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="quiz-retake-${modId}" class="btn-primary" style="padding: 10px 20px; font-size: 13px; border-radius: 20px;">Retake Quiz</button>
                </div>
            </div>
        `;

        // Save progress to localStorage
        const savedScores = localStorage.getItem('cfa_quiz_scores') ? JSON.parse(localStorage.getItem('cfa_quiz_scores')) : {};
        if (!savedScores[modId] || state.score > savedScores[modId]) {
            savedScores[modId] = state.score;
            localStorage.setItem('cfa_quiz_scores', JSON.stringify(savedScores));
            
            // Update toggle button text
            const btn = document.querySelector(`.quiz-toggle-btn[data-module="${modId}"]`);
            if (btn) {
                btn.setAttribute('data-completed', 'true');
                const checkmark = btn.querySelector('.checkmark');
                if (checkmark) {
                    checkmark.textContent = `✓ (${state.score}/6)`;
                } else {
                    btn.insertAdjacentHTML('beforeend', ` <span class="checkmark" style="color: var(--accent-green); margin-left: 6px;">✓ (${state.score}/6)</span>`);
                }
            }
        }

        container.querySelector(`#quiz-retake-${modId}`).addEventListener('click', () => {
            startQuiz(modId, container);
        });
    }

    // Final Exam Interactivity
    const startFinalBtn = document.getElementById('start-final-exam-btn');
    const finalContainer = document.getElementById('final-exam-quiz-container');
    const finalVisual = document.getElementById('final-exam-visual');

    if (startFinalBtn) {
        startFinalBtn.addEventListener('click', () => {
            if (finalContainer.style.display === 'block') {
                finalContainer.style.display = 'none';
                finalVisual.style.display = 'flex';
                startFinalBtn.textContent = 'Start Final Exam';
            } else {
                finalContainer.style.display = 'block';
                finalVisual.style.display = 'none';
                startFinalBtn.textContent = 'Close Final Exam';
                startFinalExam();
            }
        });
    }

    function startFinalExam() {
        // Load the 12 non-overlapping final exam questions directly from the "final" pool
        const compiledQuestions = quizData["final"].questions.map(q => ({
            ...q,
            moduleNum: "Final",
            moduleTitle: "Comprehensive Exam"
        }));
        
        // Shuffle them for better dynamics
        compiledQuestions.sort(() => Math.random() - 0.5);

        quizStates["final"] = {
            currentIdx: 0,
            score: 0,
            selectedOpt: null,
            submitted: false,
            answers: [],
            compiledQuestions: compiledQuestions
        };

        renderFinalQuestion();
    }

    function renderFinalQuestion() {
        const state = quizStates["final"];
        const question = state.compiledQuestions[state.currentIdx];
        const totalQuestions = state.compiledQuestions.length;
        
        state.selectedOpt = null;
        state.submitted = false;

        const progressPercent = (state.currentIdx / totalQuestions) * 100;

        let optionsHtml = '';
        Object.keys(question.options).forEach(key => {
            optionsHtml += `
                <button class="quiz-option-btn" data-option="${key}">
                    <span class="quiz-option-letter">${key}</span>
                    <span class="quiz-option-text">${escapeHtml(question.options[key])}</span>
                </button>
            `;
        });

        finalContainer.innerHTML = `
            <div class="quiz-question-box">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 11px; color: var(--text-secondary);">
                    <span>Question ${state.currentIdx + 1} of ${totalQuestions}</span>
                    <span style="color: var(--accent-gold);">Topic: ${escapeHtml(question.moduleTitle)}</span>
                </div>
                <div class="progress-bar-wrapper" style="height: 3px; background: rgba(255,255,255,0.05); margin-bottom: 20px;">
                    <div style="height: 100%; background: var(--accent-gold); width: ${progressPercent}%; transition: width 0.3s ease;"></div>
                </div>
                ${question.scenario ? `<div class="quiz-scenario">${escapeHtml(question.scenario)}</div>` : ''}
                <div class="quiz-question-text">${escapeHtml(question.question)}</div>
                
                <div class="quiz-options-list">
                    ${optionsHtml}
                </div>
                
                <div id="quiz-explanation-final" class="quiz-explanation-box" style="display: none;">
                    <div class="quiz-explanation-title">Explanation</div>
                    <div class="quiz-explanation-text">${formatExplanation(question.explanation)}</div>
                </div>

                <div class="quiz-footer">
                    <span class="quiz-score-badge" style="color: var(--accent-gold);">Final Exam Score: ${state.score}/${totalQuestions}</span>
                    <button id="quiz-submit-final" class="btn-primary" disabled style="padding: 10px 20px; font-size: 13px; border-radius: 20px;">Submit Answer</button>
                </div>
            </div>
        `;

        const optionBtns = finalContainer.querySelectorAll('.quiz-option-btn');
        const submitBtn = finalContainer.querySelector('#quiz-submit-final');

        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (state.submitted) return;
                
                optionBtns.forEach(o => o.classList.remove('selected'));
                btn.classList.add('selected');
                state.selectedOpt = btn.getAttribute('data-option');
                submitBtn.removeAttribute('disabled');
            });
        });

        submitBtn.addEventListener('click', () => {
            if (state.submitted) {
                state.currentIdx++;
                if (state.currentIdx < totalQuestions) {
                    renderFinalQuestion();
                } else {
                    renderFinalResults();
                }
                return;
            }

            state.submitted = true;
            const isCorrect = state.selectedOpt === question.correct;
            if (isCorrect) {
                state.score++;
            }
            state.answers.push({
                questionId: question.id,
                moduleNum: question.moduleNum,
                moduleTitle: question.moduleTitle,
                selected: state.selectedOpt,
                correct: question.correct,
                isCorrect: isCorrect
            });

            optionBtns.forEach(btn => {
                const opt = btn.getAttribute('data-option');
                btn.classList.remove('selected');
                if (opt === question.correct) {
                    btn.classList.add('correct');
                } else if (opt === state.selectedOpt) {
                    btn.classList.add('incorrect');
                }
                btn.setAttribute('disabled', 'true');
            });

            const expBox = finalContainer.querySelector('#quiz-explanation-final');
            const expTitle = expBox.querySelector('.quiz-explanation-title');
            if (isCorrect) {
                expTitle.style.color = 'var(--accent-green)';
                expTitle.textContent = 'Correct Answer';
            } else {
                expTitle.style.color = 'var(--accent-red)';
                expTitle.textContent = `Incorrect (Correct Option: ${question.correct})`;
            }
            expBox.style.display = 'block';

            submitBtn.textContent = (state.currentIdx + 1 < totalQuestions) ? 'Next Question' : 'View Results';
        });
    }

    function renderFinalResults() {
        const state = quizStates["final"];
        const total = state.compiledQuestions.length;
        const percent = Math.round((state.score / total) * 100);
        const dashOffset = 251.2 - (251.2 * percent) / 100;

        let breakdownHtml = '';
        state.answers.forEach(ans => {
            breakdownHtml += `
                <div class="result-row">
                    <span style="font-weight: 500;">Module ${ans.moduleNum}: ${escapeHtml(ans.moduleTitle)}</span>
                    <span style="color: ${ans.isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'}; font-weight: 700;">
                        ${ans.isCorrect ? '✓ Correct' : `✗ Incorrect (Chose ${ans.selected}, Correct: ${ans.correct})`}
                    </span>
                </div>
            `;
        });

        finalContainer.innerHTML = `
            <div class="quiz-results-dashboard">
                <div class="score-circle-container">
                    <svg class="score-circle-svg" viewBox="0 0 100 100">
                        <circle class="score-circle-bg" cx="50" cy="50" r="40"></circle>
                        <circle class="score-circle-bar" cx="50" cy="50" r="40" stroke-dasharray="251.2" stroke-dashoffset="${dashOffset}"></circle>
                    </svg>
                    <div class="score-text">${percent}%</div>
                </div>
                <h4 style="color: #fff; font-family: var(--font-heading); margin-bottom: 8px; font-size: 20px;">Exam Completed</h4>
                <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 16px;">
                    You scored <strong>${state.score}</strong> out of <strong>${total}</strong> on this comprehensive exam.
                </p>
                
                <h5 style="color: #fff; font-family: var(--font-heading); text-align: left; font-size: 14px; margin: 24px 0 10px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">Topic Areas Breakdown</h5>
                <div class="final-results-grid">
                    ${breakdownHtml}
                </div>

                <div style="display: flex; gap: 12px; justify-content: center; margin-top: 24px;">
                    <button id="final-exam-retake" class="btn-primary" style="padding: 10px 20px; font-size: 13px; border-radius: 20px;">Retake Exam</button>
                </div>
            </div>
        `;

        finalContainer.querySelector('#final-exam-retake').addEventListener('click', () => {
            startFinalExam();
        });
    }

    // Helper functions for escaping text & formatting explanations
    function escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.toString().replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    function formatExplanation(text) {
        if (!text) return '';
        // Line breaks convertion for readable paragraphs
        return escapeHtml(text).replace(/\n/g, '<br>');
    }
});
