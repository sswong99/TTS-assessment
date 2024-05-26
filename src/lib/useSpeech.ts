import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");
  useEffect(()=>{
    setCurrentSentenceIdx(0)
    setCurrentWordRange([0, 0])
  }, [sentences])

  const onEndSpeectSentence = ()=> {
    const nextSentence = currentSentenceIdx < sentences.length ? currentSentenceIdx + 1 : currentSentenceIdx
    if (nextSentence === sentences.length) {
      setPlaybackState('ended')
      setCurrentSentenceIdx(0)
    } else {
      setCurrentSentenceIdx(nextSentence)
    }
  }
  const onStateUpdate = (state: any)=> {
  
  }
  const onBoundary = (e: any)=> {
    setCurrentWordRange([e.charIndex, e.charIndex + e.charLength])
  }
  const speechEngine = createSpeechEngine({
    onBoundary: onBoundary,
    onEnd: ()=> onEndSpeectSentence(),
    onStateUpdate: ()=> onStateUpdate
  })
  const play = () => {
    if (playbackState === 'playing'){
      setPlaybackState("paused")
      return
    }
    setPlaybackState("playing")
  };
  const pause = () => {
    speechEngine.pause()
    setPlaybackState("paused")
  };
  const playSound = ()=> {
    const sentenceToplay = sentences[currentSentenceIdx] 
    speechEngine.load(sentenceToplay)
    speechEngine.play()
  }

  useEffect(()=> {
    if (playbackState === "playing"){
      playSound()
    }
  }, [currentSentenceIdx, playbackState])
  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
