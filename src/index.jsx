import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import Home from "./Home";
import { Get } from "./api";
import DPAC from "./tools/DeepAccess";
class Root extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {

	}
	render() {
		return <>
			<Home/>
		</>;
	}
}

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.register();
