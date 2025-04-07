
// Check if browser supports speech recognition
const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

// Create a speech recognition instance
const createSpeechRecognition = (): SpeechRecognition | null => {
  if (!isSpeechRecognitionSupported()) {
    console.warn('Speech recognition is not supported in this browser');
    return null;
  }
  
  // @ts-ignore - TypeScript doesn't have built-in types for webkitSpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  return new SpeechRecognition();
};

export { isSpeechRecognitionSupported, createSpeechRecognition };
