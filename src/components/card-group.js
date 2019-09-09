import React, { Component } from 'react';

class CardGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { groupData } = this.props;
    return (
      <React.Fragment>
        <section className="card-group-section">
          <div className="main-card">
            
          </div>
          <div className="child-card">
            // <span>https://www.cnet.com/reviews/beats-powerbeats3-wireless-review/</span>
          </div>
          
        </section>
      </React.Fragment>
    )
  }
}
export default CardGroup;