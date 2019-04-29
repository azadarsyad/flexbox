import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';
import axios from 'axios';
import { type } from 'os';
import { Duplex } from 'stream';

import { components } from 'react-select';
const { Option, SingleValue, DropdownIndicator } = components;
const IconOption = (props) => (
    <Option {...props}>
      <span className="flex"><img className="mx-4" src={props.data.image}></img>{props.data.label}</span>
    </Option>
);

const IconSingleValue = (props) => (
  <SingleValue {...props}>
    <span className="flex"><img className="mx-4" src={props.data.image}></img>{props.data.label}</span>
  </SingleValue>
);

const SearchDropDown = () => {
    return <i className="fas fa-search mx-2 text-grey hover:text-black py-2 pl-1"></i>;
};

const getList = (inputValue: string) => {
  if(inputValue == ""){
    var inputValue = "A";
  }
  return axios.get(`https://jb1y8wkbsk.execute-api.ap-southeast-1.amazonaws.com/default/getWebsiteList?query=${inputValue}`,
    { 
      crossDomain: true,
      headers: {
        "x-api-key": "cq7ncfTKyr4CpKnhsFjROmCW01x9H743Gl1DjrT3"
      },
    })
      .then(res => {
        var data = JSON.parse(res.data);
        let options = data['Domains'].map(domain =>({
          value: domain['name'], label: domain['name'], image: domain['image']
        }));
        return options;
      });
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(getList(inputValue));
    }, 1000);
  });

type State = {
  benchmark: String,
  imageUrl: String,
};

export default class ApiSelect extends Component<*, State> {

  state = {
    benchmark: '',
    imageUrl: '',
  };

  handleChange = (opt) => {
    this.setState(state => ({ benchmark: opt.value }));
    this.setState(state => ({ imageUrl: opt.image }));
    const { onOptionChange } = this.props;
    onOptionChange(opt);
  }

  render() {
    const {
      benchmark,
      imageUrl,
    } = this.state;
    return (
      <div>
        <AsyncSelect
          className="w-full mx-4 my-3"
          name="benchmark"
          ref="benchmark"
          classNamePrefix="api-select"
          cacheOptions
          loadOptions={promiseOptions}
          defaultOptions
          placeholder="Search Benchmark"
          isClearable={true}
          onChange={opt => this.handleChange(opt)}
          components={{ Option: IconOption, SingleValue: IconSingleValue }}
          styles={{
            dropdownIndicator: (base, state) => ({
              ...base,
              transition: "all .4s ease",
              transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
            })
          }}
        />
      </div>
    );
  }
}