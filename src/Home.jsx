import React, { Component } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Get } from "./api";
class Home extends Component {
	handleChange = () => {
		return true;
	};
	render() {
		return (
			<div>
				<div className="header full-width">
					<div className="title">
						<h3>Exchange</h3>
					</div>
					<div className="header-content">
						<Stack spacing={5} direction="row">
							<div className="input-child">
								<span>Currency from</span>
								<Select
									id="currency-select"
									className="select border-radius-default"
									value={10}
									displayEmpty
									inputProps={{ "aria-label": "Without label" }}
									onChange={this.handleChange}>
									<MenuItem value={10}>Bitcoin</MenuItem>
									<MenuItem value={20}>Ethereum</MenuItem>
									<MenuItem value={30}>Ripple</MenuItem>
								</Select>
							</div>

							<div className="input-child">
								<span>Amount</span>
								<TextField
									variant="outlined"
									className="text-field border-radius-default"
								/>
							</div>

							<div className="equals">=</div>
							<div className="input-child">
								<span>Currency to</span>
								<Select
									id="demo-simple-select"
									value={10}
									className="select border-radius-default"
									displayEmpty
									inputProps={{ "aria-label": "Without label" }}
									onChange={this.handleChange}>
									<MenuItem value={10}>USD</MenuItem>
									<MenuItem value={20}>EUR</MenuItem>
								</Select>
							</div>
							<div className="input-child border-radius-default">
								<span>Amount</span>
								<TextField
									variant="outlined"
									className="text-field"
								/>
							</div>
							<Button variant="contained" className="save-button border-radius-default">Save</Button>
						</Stack>
						{/* <div className="col-lg-6 col-md-6">
							<select className="input">
								<option>1</option>
							</select>
							<input type="text" value="1" className="input"/>
							=
							<select className="input">
								<option>usd</option>
							</select>
							<input type="text" value="$48.000" className="input"/>
							<button className="button">Save</button>
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
