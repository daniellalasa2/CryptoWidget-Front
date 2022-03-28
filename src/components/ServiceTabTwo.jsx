import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactMarkdown from "react-markdown";
import { Get } from "../api";
import { i18n } from "../i18n";
import DPAC from "../tools/DeepAccess";
const BASEURL = process.env.REACT_APP_BASEURL;
class ServiceTabTwo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			servicesData: [],
			loading: true,
		};
	}
	getData = () => {
		Get("services", { _locale: this.props.lang })
			.then((res) => {
				this.setState({
					...this.state,
					servicesData: res.data,
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
		const services = this.state.servicesData,
			lang = this.props.lang;
		let serviceTabMenuData = [],
			serviceTabContentData = [];
		const STATIC_TEXTS = i18n(this.props.lang);
		/* service tab menu */
		if (services.length > 0) {
			services.forEach((service) => {
				serviceTabMenuData.push({
					iconUrl:
						BASEURL +
						DPAC(
							service,
							"icon.formats.thumbnail.url",
							DPAC(service, "icon.url", ""),
						),
					tabMenuName: DPAC(service, "title", ""),
				});
				serviceTabContentData.push({
					bgUrl:
						BASEURL +
						DPAC(
							service,
							"image.formats.medium.url",
							DPAC(service, "image.url", ""),
						),
					contentTitle: DPAC(service, "title", ""),
					contentDesc: DPAC(service, "summary", ""),
					id: DPAC(service, "id", ""),
				});
			});

			let serviceTabMenuDatalist = serviceTabMenuData.map((val, i) => {
				return (
					<Tab key={i}>
						{" "}
						<span className="icon">
							<img width="40" src={DPAC(val, "iconUrl", "")} />
						</span>
						<span className="text">&nbsp;&nbsp;&nbsp;{val.tabMenuName}</span>
					</Tab>
				);
			});

			/* service tab content */

			let serviceTabContentDatalist = serviceTabContentData.map((val, i) => {
				return (
					<TabPanel key={i}>
						<div
							className="service-tab__single-content-wrapper"
							style={{ backgroundImage: `url(${DPAC(val, "bgUrl", "")})` }}>
							<div className="service-tab__single-content">
								<h3 className="service-tab__title">
									{DPAC(val, "contentTitle", "")}
								</h3>
								<div className="service-tab__text">
									<ReactMarkdown transformImageUri={(src) => BASEURL + src}>
										{DPAC(val, "contentDesc", "")}
									</ReactMarkdown>
								</div>
								<Link
									to={{
										pathname: `/${lang}/services`,
										state: { activeTab: DPAC(val, "id", "") },
									}}
									className="see-more-link">
									{STATIC_TEXTS.SEEMORE}
								</Link>
							</div>
						</div>
					</TabPanel>
				);
			});

			return (
				<div>
					{/*====================  service tab area ====================*/}
					<div className="service-tab-area section-space--inner--120">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									{/* section title */}
									<div className="section-title-area text-center section-space--bottom--50">
										<h2 className="section-title">
											{STATIC_TEXTS.OURSERVICES}
										</h2>
										{/* <p className="section-subtitle">Quality and innovation are two arms of services</p> */}
									</div>
								</div>
								<div className="col-lg-12">
									{/* service tab wrapper */}

									<div className="service-tab-wrapper">
										<Tabs>
											<div className="row no-gutters">
												<div className="col-md-4">
													<TabList>
														<div className="service-tab__link-wrapper">
															{serviceTabMenuDatalist}
														</div>
													</TabList>
												</div>

												<div className="col-md-8">
													{serviceTabContentDatalist}
												</div>
											</div>
										</Tabs>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*====================  End of service tab area  ====================*/}
				</div>
			);
		} else {
			return <></>;
		}
	}
}

export default ServiceTabTwo;
