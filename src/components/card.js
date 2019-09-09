import React, { Component } from 'react';

import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* 
props:
 showStep={1} // hide only link  : parent
  showStep={2} // hide all except image  : child
   showStep={3} // show all   : when clicked
 */

class Card extends Component {
  constructor(props) {
    super(props);

    let textBgHeight = [];
    for (let i = 0; i < 50; i++) {
      textBgHeight.push(i);
    }

    this.state = {
      textBgHeight
    }
  }

  render() {
    const { hasChild, isChild, showStep, cardData } = this.props;
    const { textBgHeight } = this.state;
    const cardImageStyle = {
      color: 'white',
      background: 'url(' + cardData.content.screenshot + ') center center',
      backgroundSize: isChild ? '280px' : '300px',
      WebkitTransition: 'all', 
      msTransition: 'all', 
      height: '150px'
    };
    const contents = 'Price: $199.95\n\nPros: Long battery life, quick charging\nCons: slip out of ears, expensive, difficult to pair';
    
    return (
      <React.Fragment>
        <section className={`card-section ${isChild ? 'child-card' : ''}`}>
          <div onClick={() => this.props.onCardClicked('eee')}>
            {
              showStep === 3
              ?
                <div>
                  <div className="card-img" style={cardImageStyle}>
                    <div>
                      {
                        !cardData.content.screenshot || cardData.content.screenshot === ''
                        ?
                          <div class="card-text-img">
                            {textBgHeight.map((o) => <p>{cardData.content.text}</p>)}
                          </div>
                        : 
                          null
                      }
                    </div>
                    {
                      cardData.title && cardData.title !== '' 
                      ? 
                        <div className="card-title">
                          <span>{cardData.title}</span>
                        </div>
                      : null
                    }
                  </div>
                  {
                    cardData.content.url && cardData.content.url !== ''
                    ? 
                      <div className="card-link">
                        <span>{cardData.content.url}</span>
                      </div>
                    : null
                  }
                  {
                    cardData.userNote && cardData.userNote !== ''
                    ? 
                      <div className="card-contents">
                        {cardData.userNote}
                      </div>
                    : null
                  }
                </div>
              : showStep === 1
                ?
                <div>
                  <div className="card-img" style={cardImageStyle}>
                    {
                      !cardData.content.screenshot || cardData.content.screenshot === ''
                      ?
                        <div class="card-text-img">
                          {textBgHeight.map((o) => <p>{cardData.content.text}</p>)}
                        </div>
                      : 
                        null
                    }
                    {
                      cardData.title && cardData.title !== '' 
                      ? 
                        <div className="card-title">
                          <span>{cardData.title}</span>
                        </div>
                      : null
                    }
                  </div>
                  {
                    cardData.userNote && cardData.userNote !== ''
                    ? 
                      <div className="card-contents">
                        {cardData.userNote}
                      </div>
                    : null
                  }
                  
                </div>
                : 
                <div>
                  <div className="card-img" style={cardImageStyle}>
                    {
                      !cardData.content.screenshot || cardData.content.screenshot === ''
                      ?
                        <div class="card-text-img">
                          {textBgHeight.map((o) => <p>{cardData.content.text}</p>)}
                        </div>
                      : 
                        null
                    }
                  </div>
                </div>
            }
          </div>
          {
            hasChild ?
              <div className="card-toggle-btn" onClick={() => this.props.onToggleClicked('eee')}>
                <FontAwesomeIcon icon={cardData.showChilds ? faChevronDown : faChevronRight} />
              </div>
            : null
          }
          
        </section>
      </React.Fragment>
    )
  }
}
export default Card;