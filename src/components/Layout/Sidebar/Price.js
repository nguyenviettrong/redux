import React from 'react';

class Price extends React.Component {
    render() {
        return (
            <div className="price-range">
                <h2>Price Range</h2>
                <div className="well text-center">
                {/* <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br /> */}
                <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
                </div>
            </div>
        );
    }
}
export default Price;