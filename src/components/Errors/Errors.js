import React from 'react';

class Errors extends React.Component {

    elm_errors = () => {
        if(this.props.error){
            return this.props.error.map((item,index) => {
                return <p key={index} className="text-danger">{item}</p>
            })
        }
    }

    render() {
        return (
            <div>
                {this.elm_errors()}
            </div>
        );
    }
}
export default Errors;