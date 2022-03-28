import React, { Component } from "react";
import { Get } from "../api";
import DPAC from "../tools/DeepAccess";
const BASEURL = process.env.REACT_APP_BASEURL;
class FeatureIconText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			featuresData: {
				features: [],
			},
			loading: true,
		};
	}
	getData = () => {
		Get("features", { _locale: this.props.lang })
			.then((res) => {
				this.setState({
					...this.state,
					featuresData: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
				if (err.status === 404) {
					// return <Redirect to="/404" />
				} else {
					// return <Redirect to="/500" />
				}
			})
			.finally(() => {
				this.setState({
					...this.state,
					loading: false,
				});
			});
	};
	componentDidMount() {
		this.getData();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.lang !== this.props.lang) {
			this.getData();
		}
	}
	render() {
		const { features } = this.state.featuresData;
		let colsDisplay = [6, 3, 3, 3, 3, 6];
		switch (features.length) {
			case 1:
				colsDisplay = 12;
				break;
			case 2:
				colsDisplay = 6;
				break;
			case 3:
                colsDisplay = 4;
				break;
			default :
                colsDisplay = 3;
				break;
		}
		let Datalist = features.map((feature, i) => {
			return (
				<div className={`col-lg-${colsDisplay} col-md-6`} key={i}>
					<div className="single-feature-icon">
						<div className="single-feature-icon__image">
							<img
								src={BASEURL + DPAC(feature, "icon.formats.thumbnail.url", DPAC(feature, "icon.url", ""))}
								className="img-fluid"
								alt=""
							/>
						</div>
						<h3 className="single-feature-icon__title">{DPAC(feature,"title","")}</h3>
						<p className="single-feature-icon__content">
							{DPAC(feature,"description","")}
						</p>
					</div>
				</div>
			);
		});

		return (
			<div>
				{/*====================  feature icon area ====================*/}
				{features && features.length > 0 && (
					<div className="feature-icon-area section-space--inner--120">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="feature-icon-wrapper">
										<div className="row">{Datalist}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{/*====================  End of feature icon area  ====================*/}
			</div>
		);
	}
}

export default FeatureIconText;
