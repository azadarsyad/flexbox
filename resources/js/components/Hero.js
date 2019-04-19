import React from 'react'
import { Link } from 'react-router-dom'
import EstimateForm from './EstimateForm'

const Hero = () => (
	<div className='bg-header hero-height'>
	  <div className='container mx-auto hero-shorter-height flex items-center'>
	  	<div className='flex flex-col'>
		  	<p className="hero-title-1">Software Development <br />and Design as a Service </p>
		  	<p className="hero-title-2 flex pt-8"><img src="/images/Chevron_right.png" /><span></span></p>
	  	</div>
  		<EstimateForm />
	  </div>
	</div>
)

export default Hero