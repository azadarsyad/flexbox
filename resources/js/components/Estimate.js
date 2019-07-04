import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';
import {Helmet} from "react-helmet";

const items = [
  { key: 'hasDesign', value: 2000, role: 'UI/UX Designer', days: 5},
  { key: 'hasPayment', value: 1800, role: null, days: 2},
  { key: 'hasCMS', value: 2100, role: null, days: 7},
  { key: 'hasBackend', value: 1900, role: 'Back-end Developer', days: 5},
  { key: 'hasFrontend', value: 2500, role: 'Front-end Developer', days: 7},
];

type State = {
  industry: String,
  benchmark: String,
  imageUrl: String,
  price: Integer,
  duration: Integer,
  hasPayment: Boolean,
  hasCMS: Boolean,
  hasWordpress: Boolean,
  hasBackend: Boolean,
  hasFrontend: Boolean,
  hasDesign: Boolean,
  isLoading: Boolean,
  error: Boolean,
};

export default class Estimate extends Component<*, State> {
  constructor(props){
    super(props);
    if(this.props.location.state){
      this.state = {
        industry: this.props.location.state.data.industry,
        benchmark: this.props.location.state.data.benchmark,
        imageUrl: this.props.location.state.data.imageUrl,
        price: 10300,
        duration: 11,
        hasPayment: true,
        hasCMS: true,
        hasBackend: true,
        hasFrontend: true,
        hasDesign: true,
        isLoading: false,
        error: false,
      };
    } else if(sessionStorage.industry) {
      this.state = {
        industry: sessionStorage.industry ,
        benchmark: sessionStorage.benchmark,
        imageUrl: sessionStorage.imageUrl,
        price: 10300,
        duration: 11,
        hasPayment: true,
        hasCMS: true,
        hasBackend: true,
        hasFrontend: true,
        hasDesign: true,
        isLoading: false,
        error: false,
      };
    } else{
      window.location.href = '/';
    }
  }

  componentDidMount(){
    this.setState({ isLoading: true });
    let API = `https://u9yiyc7rch.execute-api.ap-southeast-1.amazonaws.com/default/tech-list?query=${this.state.benchmark}`;
    alert(API);
    axios.get(API,
      { 
        crossDomain: true,
        headers: {
          "x-api-key": "sEW2Ucs8tC1BWECmkeUBF1miKbQbTG0D4Pqv3ptm"
        },
      })
      .then(result => {
        let data = JSON.parse(result.data);
        console.log(data);
        // this.setState({
        //   hits: result.data.hits,
        //   isLoading: false
        // });
      })
      .catch(error => {
        alert(error);
        this.setState({
          error:true ,
          isLoading: false
        })
      });
  }

	componentWillUnmount() {
		if(!sessionStorage.industry){
			sessionStorage.setItem("industry", this.state.industry);
			sessionStorage.setItem("benchmark", this.state.benchmark);
			sessionStorage.setItem("imageUrl", this.state.imageUrl);
		} else {
			sessionStorage.industry = this.state.industry;
			sessionStorage.benchmark = this.state.benchmark;
			sessionStorage.imageUrl = this.state.imageUrl;
		}
  }

  toggleItem = (item, item2, val, key) => {
    if(key == 0){
      this.setState(state => ({ hasDesign: val }));
    } else if(key == 1){
      this.setState(state => ({ hasPayment: val }));
    } else if(key == 2){
      this.setState(state => ({ hasCMS: val }));
    } else if(key == 3){
      this.setState(state => ({ hasBackend: val }));
    } else if(key == 4){
      this.setState(state => ({ hasFrontend: val }));
    }
    if(val == true){
      item.setAttribute("disabled", "disabled");
      item.className = 'active-btn';
      item2.removeAttribute("disabled");
      item2.className = 'inactive-btn flex justify-between px-4';
      this.recalculate(items[key], 'add')
    } else if(val == false) {
      item.setAttribute("disabled", "disabled");
      item.className = 'active-btn noBtn-active border-r flex justify-between px-4'
      item2.removeAttribute("disabled");
      item2.className = 'inactive-btn yesBtn-inactive'
      this.recalculate(items[key], 'deduct')
    }
  }

  recalculate = (item, operator) => {
    if(operator == 'add'){
      this.setState(state => ({ price: this.state.price + item.value }));
      this.setState(state => ({ duration: Math.round(((this.state.duration * 4) + item.days) / 4) }));
    } else {
      this.setState(state => ({ price: this.state.price - item.value }));
      this.setState(state => ({ duration: Math.round(((this.state.duration * 4) - item.days) / 4) }));
    }
  }

  render() {
    return (
      <div className='container mx-auto p-2 py-8'>
        <Helmet
            style={[{
                "cssText": `
                    body {
                        background-color: #FAFBFC;
                    }

                    .bg-header {
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12),
                        0 2px 4px 0 rgba(0,0,0,0.08);
                        background-color:#0640A3;
                    }
                `
            }]}
        />
        <div className='flex justify-around'>
          <div className='pricing-table'>
            <p className='text-grey text-sm font-bold'>APPROXIMATE PRICE AND TIMELINE</p>
            <p className='text-4xl this-black font-bold pt-4'>Customize your website<br/></p>
            <p className="flex items-center">
              <span className='text-4xl this-black pr-2 font-bold'>base on</span>
              <img className='pt-2 pr-2' src={this.state.imageUrl} />
              <span className="this-blue text-4xl font-bold">{this.state.benchmark}</span>
            </p>
            <p className='text-grey pt-12 text-sm font-bold'>TEAM NEEDED</p>
            <p className='text-xl this-black pt-4'>Project Manager, UI/UX Designer, Front-end<br/> Developer, Back-end Developer, SEO Specialist,<br/> Content Manager</p>
            <div className='flex justify-between'>
              <div className=''>
                <p className='text-grey pt-12 text-sm font-bold'>EST. PRICE</p>
                <p className='text-4xl this-black font-bold pt-4'>MYR{this.state.price}<br/></p>
              </div>
              <div className=''>
                <p className='text-grey pt-12 text-sm font-bold'>DURATION (WEEKS)</p>
                <p className='text-4xl this-black font-bold pt-4'>{this.state.duration}<br/></p>
              </div>
            </div>
          </div>
          <div className='pricing-control'>
            <div>
              <p className='text-xl this-black font-bold pt-4'>Do you need design?</p>
              <p className='text-grey-darkest pt-4'>Follow the <a href="/" className='no-underline this-blue'>Link</a> to know more about the design process.</p>
              <div className='flex pt-4'>
                <button ref={yesDesignBtn => { this.yesDesignBtn = yesDesignBtn; }} onClick={() => this.toggleItem(this.yesDesignBtn, this.noDesignBtn, true, 0)} className='active-btn'>Yes</button>
                <button ref={noDesignBtn => { this.noDesignBtn = noDesignBtn; }} onClick={() => this.toggleItem(this.noDesignBtn, this.yesDesignBtn, false, 0)} className='inactive-btn flex justify-between px-4'><span className=''>No</span><span className=''>- MYR{items[0].value}</span></button>
              </div>
            </div>
            <div className='pt-6'>
              <p className='text-xl this-black font-bold pt-4'>Do you need payment gateway?</p>
              <p className='text-grey-darkest pt-4'>Follow the <a href="/" className='no-underline this-blue'>Link</a> to know more about the payment gateway integration.</p>
              <div className='flex pt-4'>
                <button ref={yesPaymentBtn => { this.yesPaymentBtn = yesPaymentBtn; }} onClick={() => this.toggleItem(this.yesPaymentBtn, this.noPaymentBtn, true, 1)} className='active-btn'>Yes</button>
                <button ref={noPaymentBtn => { this.noPaymentBtn = noPaymentBtn; }} onClick={() => this.toggleItem(this.noPaymentBtn, this.yesPaymentBtn, false, 1)} className='inactive-btn flex justify-between px-4'><span className=''>No</span><span className=''>- MYR{items[1].value}</span></button>
              </div>
            </div>
            <div className='pt-6'>
              <p className='text-xl this-black font-bold pt-4'>Do you need Content Management System?</p>
              <p className='text-grey-darkest pt-4'>Follow the <a href="/" className='no-underline this-blue'>Link</a> to know more about the Content Management System.</p>
              <div className='flex pt-4'>
                <button ref={yesCMSBtn => { this.yesCMSBtn = yesCMSBtn; }} onClick={() => this.toggleItem(this.yesCMSBtn, this.noCMSBtn, true, 2)} className='active-btn'>Yes</button>
                <button ref={noCMSBtn => { this.noCMSBtn = noCMSBtn; }} onClick={() => this.toggleItem(this.noCMSBtn, this.yesCMSBtn, false, 2)} className='inactive-btn flex justify-between px-4'><span className=''>No</span><span className=''>- MYR{items[2].value}</span></button>
              </div>
            </div>
            <div className='pt-6'>
              <p className='text-xl this-black font-bold pt-4'>Do you need Back-end Development?</p>
              <p className='text-grey-darkest pt-4'>Follow the <a href="/" className='no-underline this-blue'>Link</a> to know more about the Back-end Development.</p>
              <div className='flex pt-4'>
                <button ref={yesBackendBtn => { this.yesBackendBtn = yesBackendBtn; }} onClick={() => this.toggleItem(this.yesBackendBtn, this.noBackendBtn, true, 3)} className='active-btn'>Yes</button>
                <button ref={noBackendBtn => { this.noBackendBtn = noBackendBtn; }} onClick={() => this.toggleItem(this.noBackendBtn, this.yesBackendBtn, false, 3)} className='inactive-btn flex justify-between px-4'><span className=''>No</span><span className=''>- MYR{items[3].value}</span></button>
              </div>
            </div>
            <div className='pt-6'>
              <p className='text-xl this-black font-bold pt-4'>Do you need Front-end Development?</p>
              <p className='text-grey-darkest pt-4'>Follow the <a href="/" className='no-underline this-blue'>Link</a> to know more about the Front-end Development.</p>
              <div className='flex pt-4'>
                <button ref={yesFrontendBtn => { this.yesFrontendBtn = yesFrontendBtn; }} onClick={() => this.toggleItem(this.yesFrontendBtn, this.noFrontendBtn, true, 4)} className='active-btn'>Yes</button>
                <button ref={noFrontendBtn => { this.noFrontendBtn = noFrontendBtn; }} onClick={() => this.toggleItem(this.noFrontendBtn, this.yesFrontendBtn, false, 4)} className='inactive-btn flex justify-between px-4'><span className=''>No</span><span className=''>- MYR{items[4].value}</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}