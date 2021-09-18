import React, { useState, useEffect } from "react";
// thu vien npm install --save react-speech-recognition
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// anh
import mic1 from "../image/mic4.svg";
import mic2 from "../image/mic3.svg";

// style
import "./style/style.css";

function Mic({ VietnameseKey, setColor }) {
  const [statusMic, setStatusMic] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const texts = transcript.toLowerCase().trim();
  if (texts.includes("thời tiết tại")) {
    const contentText = texts.split("tại")[1].trim();
    VietnameseKey(contentText);
  }
  if (texts.includes("đổi màu nền")) {
    const contentText = texts.split("nền")[1].trim();
    setColor(contentText);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Trình duyệt không hỗ trợ nhận dạng giọng nói.</span>;
  }

  //mic
  const onClickMic = () => {
    let start = statusMic;
    if (start === true) {
      setStatusMic(false);
      SpeechRecognition.startListening();
    } else {
      setStatusMic(true);
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  };

  return (
    <React.Fragment>
      <img
        className="mic"
        src={listening ? mic2 : mic1}
        alt="search"
        onClick={onClickMic}
      />
    </React.Fragment>
  );
}

Mic.propTypes = {};

Mic.defaultPros = {};

export default Mic;
