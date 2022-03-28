import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Get } from "../api";
import { Link } from "react-router-dom";
import DPAC from "../tools/DeepAccess";
const BASEURL = process.env.REACT_APP_BASEURL;
class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	
	render() {
		
		return (
			<div>hi</div>
		);
	}
}

export default <NavBar />;
