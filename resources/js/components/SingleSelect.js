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
};

export default class SingleSelect extends Component<*, State> {
  state = {
    isClearable: true,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));
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
          name="industry"
          options={industryOptions}
          placeholder="Choose Your Industry..."
        />
      </Fragment>
    );
  }
}