import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

const messages = [
  {
    me: "ibad siddiqui",
    message: "kjandjansdjkn",
    time: "askdajdnasjk"
  },
  {
    teacher: "siddiqui",
    message: "kjandjansdjkn",
    time: "askdajdnasjk"
  },
  {
    teacher: "siddiqui",
    message: "kjandjansdjkn",
    time: "askdajdnasjk"
  },
  {
    me: "ibad siddiqui",
    message: "kjandjansdjkn",
    time: "askdajdnasjk"
  }
]
class Sharing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      // mes/sage
    }
  }

  componentDidMount() {
    // this.setState({
    //   messages: [...messages]
    // })
  }

  sendMessage(text){
    
  }

  render() {
    return (

      <div className="body">

        <h2>Chat Messages</h2>

        {
          this.state.messages.map((message) => {
            if (message.me === "ibad siddiqui" && message.me !== undefined) {
              return (

                <div className="container">
                  <p>{message.message}</p>
                  <span className="time-right">{message.time}</span>
                </div>
              )
            } else {
              return (
                <div className="container darker">
                  <p>{message.message}</p>
                  <span className="time-left">{message.time}</span>
                </div>

              )
            }


          })
        }

        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <input className="text-box" />
          <button type="submit"> Send</button>
        </div>
      </div>
    );
  }
}

export default Sharing;
