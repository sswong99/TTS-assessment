/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  return <div data-testid="currently-reading" className="currently-reading">
    {sentences.map((res, index) => {
      const highLightArea = index === currentSentenceIdx
      const charArray = res.split("")
      return <div className={highLightArea ? 'currently-reading-text' : ''}>
        {charArray.map((single_char, single_index) => {
          let highLightWord = highLightArea && (single_index >= currentWordRange[0] && single_index <= currentWordRange[1])
          return <span className={highLightWord ? 'highlightWord' : ''}>{single_char}</span>
        })}
      </div>
    })}

  </div>;
};
