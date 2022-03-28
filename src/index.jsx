import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
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
			this is test
		</>;
	}
}

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.register();
