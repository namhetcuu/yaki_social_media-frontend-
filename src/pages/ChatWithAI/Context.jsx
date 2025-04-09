import { createContext, useState } from "react";
import runChat from "../../Utils/gemini"

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setInput("");
    setShowResult(false);
    setResultData("");
    setLoading(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const actualPrompt = prompt !== undefined ? prompt : input;

    setRecentPrompt(actualPrompt);
    setPrevPrompts((prev) => [...prev, actualPrompt]);

    const response = await runChat(actualPrompt);

    // Format: **bold**, *linebreak*
    let formattedResponse = response
      .split("**")
      .map((text, i) => (i % 2 === 1 ? `<b>${text}</b>` : text))
      .join("");

    formattedResponse = formattedResponse.split("*").join("<br>");
    const words = formattedResponse.split(" ");

    words.forEach((word, i) => delayPara(i, word + " "));

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
