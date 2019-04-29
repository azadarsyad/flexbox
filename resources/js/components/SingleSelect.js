import React, { Component, Fragment } from 'react';

import Select from 'react-select';

const industryOptions = [
  { value: 'e-commerce', label: 'E-Commerce'},
  { value: 'finance', label: 'Finance'},
  { value: 'education', label: 'Education'},
  { value: 'healthcare', label: 'Healthcare'},
  { value: 'other', label: 'Other Businesses'},
];

type State = {
  isClearable: boolean,
  isSearchable: boolean,
  industry: String,
};

export default class SingleSelect extends Component<*, State> {
  state = {
    isClearable: true,
    isSearchable: true,
    industry: '',
  };

  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));

  handleChange = (opt) => {
    const { onOptionChange } = this.props;
    this.setState(state => ({ industry: opt.value }));
    onOptionChange(opt);
  }

  render() {
    const {
      isClearable,
      isSearchable,
    } = this.state;
    return (
      <Fragment>
        <Select
          className="basic-single w-full mx-4"
          classNamePrefix="single-select"
          defaultValue={industryOptions[0]}
          isClearable={isClearable}
          isSearchable={isSearchable}
          onChange={opt => this.handleChange(opt)}
          name="industry"
          ref="industry"
          options={industryOptions}
          placeholder="Choose Your Industry..."
          styles={{
            dropdownIndicator: (base, state) => ({
              ...base,
              transition: "all .4s ease",
              transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
            })
          }}
        />
      </Fragment>
    );
  }
}