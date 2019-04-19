import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';

const options = [
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' }
];

export default class EstimateForm extends React.Component {
  this.state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}