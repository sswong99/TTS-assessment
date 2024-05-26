import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent } from './lib/content';
import { map } from 'lodash'
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const [key, setKey] = useState(1)
  const { currentSentenceIdx, currentWordRange, play, pause, playbackState } = useSpeech(sentences);
  useEffect(() => {
    const fetchTextContent = async () => {
      const response = await fetchContent()
      const parseContent = new DOMParser().parseFromString(response, 'text/html');
      const element = parseContent.getElementsByTagName("s")
      const outputSentences = map(element, (e) => e.innerText)
      setSentences(outputSentences)
    }
    if (key) {
      fetchTextContent()
    }
  }, [key])
  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls play={play} pause={pause}
          state={playbackState}
          loadNewContent={() => {
            setKey((prevState) => prevState + 1)
          }} />
      </div>
    </div>
  );
}

export default App;
