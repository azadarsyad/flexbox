import React, { Component } from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import SingleSelect from './SingleSelect'
import ApiSelect from './ApiSelect'
import Estimate from './Estimate'

var ReactRotatingText = require('react-rotating-text');

type State = {
  industry: String,
  benchmark: String,
	imageUrl: String,
	redirectToEstimate: Boolean,
};

export default class Hero extends Component<*, State> {
	state = {
		industry: 'e-commerce',
		benchmark: '',
		imageUrl: '',
		redirectToEstimate: false,
	};
	
	handleSubmit = event => {
		event.preventDefault();
		this.setState(state => ({ redirectToEstimate: !this.state.redirectToEstimate }));
	};

	onIndustryChangeHandler = opt => this.setState(state => ({ industry: opt.value }));
	onBenchmarkChangeHandler = opt => {
		this.setState(state => ({ benchmark: opt.value }));
    this.setState(state => ({ imageUrl: opt.image }));
	}

  render() {
		if (this.state.redirectToEstimate) {
			const data = {...this.state}; 
			return <Redirect to={{
								pathname: '/estimate',
								state: {data: data},
						}}/>
      // return <Estimate benchmark={this.state.benchmark} industry={this.state.industry} imageUrl={this.state.imageUrl}/>
    } else {
			return (
				<div className='bg-header hero-height'>
					<div className='container mx-auto hero-shorter-height flex items-center'>
						<div className='flex flex-col'>
							<p className="hero-title-1">Software Development and<br /> Design as a Service </p>
								<p className="hero-title-2 flex pt-8"><img className="mr-4 py-4" src="/images/Chevron_right.png" />
								<ReactRotatingText className="pt-2 text-5xl font-bold" items={['Website', 'Android', 'iOS', 'Artificial Intelligence', 'Chatbot']} color={"#ffffff"} typingInterval={100} deletingInterval={100} pause={1800} />
								</p>
						</div>
						<form className="flex flex-col w-1/3 mx-4 mt-12" onSubmit={this.handleSubmit}>
							<SingleSelect ref="industry" onOptionChange={this.onIndustryChangeHandler}/>
							<ApiSelect ref="benchmark" onOptionChange={this.onBenchmarkChangeHandler}/>
							<div className="flex mx-4 justify-between w-full">
								<button type="submit" className="bg-blue-lighter text-base rounded px-12 py-6">Get Estimate</button>
								<button className="bg-transparent hover:bg-blue-lighter border-2 border-blue-lighter text-white hover:text-black text-base rounded px-12 py-6">See Portfolio</button>
							</div>
						</form>
					</div>
				</div>
			);
		}
  }
}