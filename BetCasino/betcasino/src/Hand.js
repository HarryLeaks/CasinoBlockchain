import React, {Component} from 'react';

class Hand extends Component {
    render() {
        return (
            <div>
                {this.props.cards.map((card, index) => {
                    return <img src={`${card.image}`} key={index} alt="card" />
                })}
            </div>
        );
    };
};

export default Hand;