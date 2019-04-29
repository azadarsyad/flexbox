import React, { Component} from 'react';

export default class ItemControl extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
        <div>
            <p className='text-xl this-black font-bold pt-4'>Do you need {this.props.item}?</p>
            <p className='text-grey-darkest pt-4'>Follow the <a href="/" className='no-underline this-blue'>Link</a> to know more about the design process.</p>
            {/* <div className='flex pt-4'>
                <button ref={ref} onClick={() => } className='active-btn'>Yes</button>
                <button ref={ref} onClick={() => this.handleClick(this.noDesignBtn, this.yesDesignBtn, false, 0)} className='inactive-btn flex justify-between px-4'><span className=''>No</span><span className=''>- MYR{items[0].value}</span></button>
            </div> */}
        </div>
        );
    }
}