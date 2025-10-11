class TextToSpeechService {
  constructor() {
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  speak(text, onEnd) {
    if (!this.synthesis) return;

    // Stop any ongoing speech
    this.stop();

    // Create new utterance
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings for Pokédex-like speech
    this.currentUtterance.rate = 0.9;
    this.currentUtterance.pitch = 1.0;
    this.currentUtterance.volume = 0.8;

    // Try to use a more robotic/digital voice if available
    if (this.synthesis) {
      const voices = this.synthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Daniel')
      );
      
      if (preferredVoice) {
        this.currentUtterance.voice = preferredVoice;
      }

      // Set up event handlers
      this.currentUtterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      // Speak the text
      this.synthesis.speak(this.currentUtterance);
    }
  }

  stop() {
    if (this.synthesis && (this.synthesis.speaking || this.synthesis.pending)) {
      this.synthesis.cancel();
    }
    this.currentUtterance = null;
  }

  isSpeaking() {
    return this.synthesis ? this.synthesis.speaking : false;
  }

  getVoices() {
    return this.synthesis ? this.synthesis.getVoices() : [];
  }
}

export const textToSpeech = new TextToSpeechService();