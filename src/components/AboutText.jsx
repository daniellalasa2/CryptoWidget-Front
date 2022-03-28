import React, { Component } from "react";
import { Get } from "../api";
import ReactMarkdown from "react-markdown";
import { i18n } from "../i18n";
import DPAC from "../tools/DeepAccess";
const BASEURL = process.env.REACT_APP_BASEURL;
class AboutText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aboutData: {
				summary_image: {},
			},
			loading: true,
		};
	}
	getData = () => {
		Get("about", { _locale: this.props.lang })
			.then((res) => {
				this.setState({
					...this.state,
					aboutData: res.data,
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
		const about = this.state.aboutData;
		const STATIC_TEXTS = i18n(this.props.lang);
		return (
			<div>
				{/*====================  about text area ====================*/}
				{DPAC(about,"summary_image","") && DPAC(about,"summary","") && (
					<div className="about-text-area grey-bg section-space--inner--120">
						<div className="container">
							<div className="row align-items-center">
								<div className="col-lg-6 col-md-6">
									<div className="video-cta-content">
										<h4 className="video-cta-content__small-title">
											{STATIC_TEXTS.ABOUTUS}
										</h4>
										<ReactMarkdown transformImageUri={(src)=>BASEURL+src} className="video-cta-content__text">
											{DPAC(about,"summary","")}
										</ReactMarkdown>
										<a
											href={`${process.env.PUBLIC_URL}/contact-us`}
											className="ht-btn ht-btn--round">
											{STATIC_TEXTS.CONTACTUS}
										</a>
									</div>
								</div>
								<div className="col-md-6">
									<div className="cta-video-image__image">
										<img
											src={
												DPAC(about,"summary_image","") && BASEURL + DPAC(about,"summary_image.formats.small.url",DPAC(about,"summary_image.url",""))
											}
											className="img-fluid"
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{/*====================  End of about text area  ====================*/}
			</div>
		);
	}
}

export default AboutText;
