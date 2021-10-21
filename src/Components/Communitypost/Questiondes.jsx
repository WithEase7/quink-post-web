import React, { useEffect, useState } from "react";
import "../../Styles/Communitypost/questiondes.css";
import ImageIcon from "@material-ui/icons/Image";
import AttachmentIcon from "@material-ui/icons/Attachment";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BACKEND from "../Constants/Backend"
import axios from "axios"
import { useSelector } from "react-redux";

function Questiondes(props) {
const [answers, setanswers] = useState([])
const [inputValue, setinputValue] = useState("")
  const questionId = props.location.questionId;
  const question = props.location.question;
  const globalUser = useSelector(state => state)
  console.log(globalUser)
  // const answers=[]
  // console.log(props.location.answers)

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/community/inside/getAllAnswer/${questionId}`)
        console.log(result.data.answers,"<<<<<<<<<<<<<<<<this is answers of question")
        // console.log(result.data)
        setanswers(result.data.answers)
        
        // setanswers(result.data.answers)
      } catch (e) { console.log(e) }
    })()
  },[])

  const sendAnswer=async()=>{
    try {
      console.log("yes")
      if (inputValue != "") {
        // console.log(input,"lll")
        const result = await axios.patch(`${BACKEND}/community/inside/answer`, {
          answer: inputValue,
          user: globalUser.user._id,
          questionId: questionId
        })
        console.log(result.data, "kkkkkkkkkkkkkkkkkkk")
        if (result.data.success) {
          setinputValue("")
          // settoggle(!toggle)
        }


      }
      else { console.log("enter your suggestion") }



    } catch (e) { console.log(e) }
  }

  // console.log(props.location)
  return (
    <div className="community-question-container">
      <div className="community-question-header">
     {question}
      </div>
      <div className="addanswer-box">
        <div>
          <textarea
            name=""
            id=""
            value={inputValue}
            onChange={(value)=>{setinputValue(value.target.value)}}
            cols="30"
            rows="10"
            placeholder="Write Answer..."
            className="addanswer-box-textarea"
          ></textarea>
        </div>
        <div className="addanswer-box-buttons">
          <div className="add-answer-icons">
            <ImageIcon className="add-answer-icons-each" />
            <AttachmentIcon />
          </div>
          <div className="add-answer-button" onClick={sendAnswer}>Add Answer</div>
        </div>
      </div>
      {(() => {
        return answers.map((answer, key) => {
          return (
            <div className="answerbox" key={key}>
              <div>
              {answer.answer}
              </div>
              <div className="answer-vote-icons">
                <div className="answer-vote-icons-each green">
                  <ArrowUpwardIcon /> {answer.likedBy.length}
                </div>
                <div className="answer-vote-icons-each red">
                  <ArrowDownwardIcon /> 23
                </div>
              </div>
            </div>
          );
        });
      })()}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
      {/* <div className="answerbox">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
          maiores est nesciunt culpa earum asperiores inventore minima
          aspernatur. Officiis obcaecati, sint porro totam, maiores ipsam
          tenetur sed fugit fuga cumque numquam tempora. Officia, ullam!
        </div>
        <div className="answer-vote-icons">
          <div className="answer-vote-icons-each green">
            <ArrowUpwardIcon /> 123
          </div>
          <div className="answer-vote-icons-each red">
            <ArrowDownwardIcon /> 23
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Questiondes;
