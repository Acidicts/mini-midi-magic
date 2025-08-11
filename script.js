// Initialize the Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Note frequencies (4th octave)
const noteFrequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
};

// Function to play a note
function playNote(frequency) {
    // Create oscillator
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect the oscillator to output
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure the oscillator
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // Set up gain envelope for more natural sound
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    
    // Start and stop
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Add click event listeners to all piano keys
document.addEventListener('DOMContentLoaded', () => {
    // Get all piano keys
    const keys = Object.keys(noteFrequencies);
    
    keys.forEach(note => {
        const button = document.getElementById(note);
        if (button) {
            button.addEventListener('click', () => {
                playNote(noteFrequencies[note]);
            });
        }
    });
});

document.getElementById('pian_btn').addEventListener('click', () => {
    const piano = document.getElementById('piano');
    
    if (piano.classList.contains('hidden')) {
        // Show piano with fade in
        piano.classList.remove('hidden');
        setTimeout(() => {
            piano.classList.add('show');
        }, 10);
    } else {
        // Hide piano with fade out
        piano.classList.add('fade-out');
        setTimeout(() => {
            piano.classList.remove('show', 'fade-out');
            piano.classList.add('hidden');
        }, 500);
    }
});

document.getElementById("RSVP").addEventListener("click", function() {
    window.location.href = "/rsvp";
});

document.getElementById("guides_btn").addEventListener("click", function() {
    window.location.href = "/guides";
});