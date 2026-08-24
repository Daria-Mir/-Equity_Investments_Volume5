document.addEventListener('DOMContentLoaded', () => {
    // Speech synthesis core variables
    const synth = window.speechSynthesis;
    let currentModuleId = null;
    let currentParagraphIdx = 0;
    let isSpeaking = false;
    let isPaused = false;
    let playbackRate = 1.0;
    let selectedVoiceName = '';

    // DOM Elements
    const summaryModal = document.getElementById('summary-modal');
    const summaryModalClose = document.getElementById('summary-modal-close');
    const summaryTitle = document.getElementById('summary-modal-title');
    const summaryBody = document.getElementById('summary-modal-body');
    
    const ttsPlayBtn = document.getElementById('tts-play-btn');
    const ttsPauseBtn = document.getElementById('tts-pause-btn');
    const ttsStopBtn = document.getElementById('tts-stop-btn');
    const ttsVoiceSelect = document.getElementById('tts-voice-select');
    const ttsSpeedRange = document.getElementById('tts-speed-range');
    const ttsSpeedDisplay = document.getElementById('tts-speed-display');
    const printSummaryBtn = document.getElementById('print-summary-btn');

    // Verify speech synthesis support
    const isSpeechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    if (!isSpeechSupported) {
        console.warn("Web Speech API is not supported in this browser.");
        const ttsControls = document.querySelector('.tts-controls-bar');
        if (ttsControls) {
            ttsControls.innerHTML = `<span style="color: var(--accent-red); font-size: 12px; font-weight: bold;">Text-to-Speech is not supported in this browser. Please use Chrome, Safari, or Edge.</span>`;
        }
    }

    // Populate Voice Selection list
    function populateVoices() {
        if (!isSpeechSupported) return;
        
        const voices = synth.getVoices();
        // Filter to English language voices only
        const englishVoices = voices.filter(v => v.lang.startsWith('en') || v.lang.startsWith('EN'));
        
        // Clear previous options
        ttsVoiceSelect.innerHTML = '';

        if (englishVoices.length === 0) {
            ttsVoiceSelect.innerHTML = `<option value="">System Default</option>`;
            return;
        }

        englishVoices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            // Mark high-quality neural voices
            const isNeural = voice.name.includes('Neural') || voice.name.includes('Natural');
            option.textContent = `${voice.name} (${voice.lang})${isNeural ? ' • Neural' : ''}`;
            
            // Default select recommendation: Microsoft Online voices or local system voices
            if (voice.name.includes('Microsoft') && voice.name.includes('Natural')) {
                option.selected = true;
                selectedVoiceName = voice.name;
            }
            ttsVoiceSelect.appendChild(option);
        });

        // If no Microsoft Natural voice was found, set to first voice in list
        if (!selectedVoiceName && englishVoices.length > 0) {
            selectedVoiceName = englishVoices[0].name;
        }
    }

    // Load voices asynchronously (some browsers require this callback)
    if (isSpeechSupported) {
        populateVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoices;
        }
    }

    // Trigger Summary & TTS Modal Open
    const summaryBtns = document.querySelectorAll('.summary-toggle-btn');
    summaryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modId = btn.getAttribute('data-module');
            openSummaryModal(modId);
        });
    });

    function openSummaryModal(modId) {
        currentModuleId = modId;
        const data = summaryData[modId];
        summaryTitle.textContent = `${data.title} — Executive Summary`;
        
        // Render paragraphs
        summaryBody.innerHTML = '';
        data.paragraphs.forEach((text, idx) => {
            const p = document.createElement('p');
            p.className = 'summary-paragraph';
            p.setAttribute('data-index', idx);
            p.innerHTML = text;
            
            // Add click listener to skip direct to paragraph in TTS!
            p.addEventListener('click', () => {
                if (!isSpeechSupported) return;
                jumpToParagraph(idx);
            });
            
            summaryBody.appendChild(p);
        });

        // Reset TTS states
        stopSpeech();

        // Display modal
        summaryModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    // Close Modal
    summaryModalClose.addEventListener('click', closeSummaryModal);
    
    function closeSummaryModal() {
        summaryModal.classList.remove('open');
        document.body.style.overflow = '';
        stopSpeech();
    }

    // TTS Speech Controls
    if (isSpeechSupported) {
        ttsPlayBtn.addEventListener('click', playSpeech);
        ttsPauseBtn.addEventListener('click', pauseSpeech);
        ttsStopBtn.addEventListener('click', stopSpeech);
        
        ttsVoiceSelect.addEventListener('change', (e) => {
            selectedVoiceName = e.target.value;
            if (isSpeaking) {
                // Restart current paragraph with new voice instantly
                restartCurrentParagraph();
            }
        });

        ttsSpeedRange.addEventListener('input', (e) => {
            playbackRate = parseFloat(e.target.value);
            ttsSpeedDisplay.textContent = `${playbackRate.toFixed(1)}x`;
        });

        ttsSpeedRange.addEventListener('change', () => {
            if (isSpeaking) {
                // Restart current paragraph with new rate instantly
                restartCurrentParagraph();
            }
        });
    }

    function playSpeech() {
        if (isPaused) {
            synth.resume();
            isPaused = false;
            isSpeaking = true;
            updateTTSUI();
            return;
        }

        if (!isSpeaking) {
            isSpeaking = true;
            speakParagraph(currentParagraphIdx);
        }
    }

    function pauseSpeech() {
        if (isSpeaking && !isPaused) {
            synth.pause();
            isPaused = true;
            updateTTSUI();
        }
    }

    function stopSpeech() {
        synth.cancel();
        isSpeaking = false;
        isPaused = false;
        currentParagraphIdx = 0;
        
        // Remove highlights
        const paras = summaryBody.querySelectorAll('.summary-paragraph');
        paras.forEach(p => p.classList.remove('reading-highlight'));
        
        updateTTSUI();
    }

    function speakParagraph(idx) {
        if (!isSpeaking) return;
        
        const data = summaryData[currentModuleId];
        if (idx >= data.paragraphs.length) {
            // Reached the end of the summary
            stopSpeech();
            return;
        }

        currentParagraphIdx = idx;

        // Visual highlighting
        const paras = summaryBody.querySelectorAll('.summary-paragraph');
        paras.forEach((p, pIdx) => {
            if (pIdx === idx) {
                p.classList.add('reading-highlight');
                // Scroll paragraph into view smoothly if overflowed
                p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                p.classList.remove('reading-highlight');
            }
        });

        // Cancel previous speaking item
        synth.cancel();

        // Create utterance
        const textToSpeak = data.paragraphs[idx];
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Set speech speed rate
        utterance.rate = playbackRate;

        // Set selected voice
        const voices = synth.getVoices();
        const voice = voices.find(v => v.name === selectedVoiceName);
        if (voice) {
            utterance.voice = voice;
        }

        // Speech callbacks
        utterance.onend = () => {
            if (isSpeaking && !isPaused) {
                speakParagraph(idx + 1);
            }
        };

        utterance.onerror = (event) => {
            // Chrome fires errors if cancel() is called, ignore those
            if (event.error !== 'interrupted') {
                console.error("SpeechSynthesisUtterance error: ", event.error);
                stopSpeech();
            }
        };

        synth.speak(utterance);
        updateTTSUI();
    }

    function jumpToParagraph(idx) {
        isSpeaking = true;
        isPaused = false;
        speakParagraph(idx);
    }

    function restartCurrentParagraph() {
        speakParagraph(currentParagraphIdx);
    }

    function updateTTSUI() {
        if (!isSpeechSupported) return;

        if (isSpeaking && !isPaused) {
            // Speaking state
            ttsPlayBtn.style.display = 'none';
            ttsPauseBtn.style.display = 'inline-flex';
        } else {
            // Paused or Stopped state
            ttsPlayBtn.style.display = 'inline-flex';
            ttsPauseBtn.style.display = 'none';
        }
    }

    // Print to PDF trigger
    printSummaryBtn.addEventListener('click', () => {
        window.print();
    });
});
