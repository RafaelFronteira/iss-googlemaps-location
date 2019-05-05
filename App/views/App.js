import React, {Component} from 'react';

import { IssMap } from './iss-map/IssMap';
import { SlideComponent } from './slidershow/SlideComponent';

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showInfos: true
    };
  }
  render() {
    return (
      this.state.showInfos ? 
       <SlideComponent onShowMap={ () => this.showIss() } /> :
       <IssMap />
    );
  }


  showIss() {
    this.setState({ showInfos: false });
  }
}