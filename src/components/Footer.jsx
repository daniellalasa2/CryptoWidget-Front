import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Get } from "../api";
import { animateScroll as scroll } from "react-scroll";
import DPAC from "../tools/DeepAccess";
import { i18n, LangContext } from "../i18n";
const BASEURL = process.env.REACT_APP_BASEURL;
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			footerData: { logo: { formats: [] } },
			contactData: {},
			loading: true,
		};
		this.handleScroll = this.handleScroll.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
	}

	handleScroll() {
		if (this.mount) {
			this.setState({ scroll: window.scrollY });
		}
	}

	scrollToTop() {
		scroll.scrollToTop();
	}
	getData = () => {
		//footer
		Get("footer", { _locale: this.props.lang })
			.then((res) => {
				this.setState({
					...this.state,
					footerData: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
				if (err.status === 404) {
					return <Redirect to="/404" />;
				} else {
					return <Redirect to="/500" />;
				}
			})
			.finally(() => {
				this.setState({
					...this.state,
					loading: false,
				});
			});
		//contact
		Get("contact", { _locale: this.props.lang })
			.then((res) => {
				this.setState({
					...this.state,
					contactData: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
				if (err.status === 404) {
					return <Redirect to="/404" />;
				} else {
					return <Redirect to="/500" />;
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
		this.mount = true;
		const el = document.querySelector("nav");
		this.setState({ top: el.offsetTop, height: el.offsetHeight });
		window.addEventListener("scroll", this.handleScroll);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.lang !== this.props.lang) {
			this.getData();
		}
		this.state.scroll > this.state.top
			? document.getElementById("scroll-top").classList.add("show")
			: document.getElementById("scroll-top").classList.remove("show");
	}

	componentWillUnmount() {
		this.mount = false;
	}
	render() {
		const footer = this.state.footerData,
			contact = this.state.contactData,
			{lang} = this.props,
			STATIC_TEXTS = i18n(this.props.lang),
			{ loading } = this.state;
		return (
			<div>
				{/*====================  footer area ====================*/}
				<div className="footer-area dark-bg">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="footer-content-wrapper section-space--inner--100">
									<div className="row">
										<div className="col-xl-3 col-lg-3 col-md-12">
											{/* footer intro wrapper */}
											<div className="footer-intro-wrapper">
												{DPAC(footer, "logo", "") && (
													<>
														<div className="footer-logo">
															<Link to={`${process.env.PUBLIC_URL}/${lang}`}>
																<img
																	src={
																		BASEURL +
																		DPAC(
																			footer,
																			"logo.formats.small.url",
																			DPAC(footer, "logo.url", ""),
																		)
																	}
																	className="img-fluid"
																	alt=""
																/>
															</Link>
														</div>
														<div className="footer-desc">
															{DPAC(footer, "summary", "")}
														</div>
													</>
												)}
											</div>
										</div>
										<div className="col-xl-2 offset-xl-1 col-lg-3 col-md-4">
											{/* footer widget */}
											{DPAC(footer, "useful_links1", "") && (
												<div className="footer-widget">
													<h4 className="footer-widget__title">
														{DPAC(footer, "useful_links1.title", "")}
													</h4>
													<ul className="footer-widget__navigation">
														{DPAC(
															footer,
															"useful_links1.link_section1",
															[],
														).map((item, i) => (
															<li key={i}>
																<a
																	target="_blank"
																	href={DPAC(item, "value", "")}>
																	{DPAC(item, "key", "")}
																</a>
															</li>
														))}
													</ul>
												</div>
											)}
										</div>

										<div className="col-xl-2 offset-xl-1 col-lg-3 col-md-4">
											{/* footer widget */}
											{DPAC(footer, "useful_links2", "") && (
												<div className="footer-widget">
													<h4 className="footer-widget__title">
														{DPAC(footer, "useful_links2.title", "")}
													</h4>
													<ul className="footer-widget__navigation">
														{DPAC(
															footer,
															"useful_links2.link_section1",
															[],
														).map((item, i) => (
															<li key={i}>
																<a
																	target="_blank"
																	href={DPAC(item, "value", "")}>
																	{DPAC(item, "key", "")}
																</a>
															</li>
														))}
													</ul>
												</div>
											)}
										</div>
										<div className="col-xl-2 offset-xl-1 col-lg-3 col-md-4">
											{/* footer widget */}
											{DPAC(footer,"enable_contact",false) && Object.keys(contact).length > 0 && (
												<div className="footer-widget mb-0">
													<h4 className="footer-widget__title">
														{STATIC_TEXTS.CONTACTUS}
													</h4>
													<div className="footer-widget__content">
														<p className="address">
															{DPAC(contact, "address", "")}
														</p>
														<ul className="contact-details">
															{DPAC(contact, "phone1", "") && (
																<li>
																	<span>
																		{STATIC_TEXTS.PHONE}:
																		<a
																			href={`tel:${DPAC(
																				contact,
																				"phone1",
																				"",
																			)}`}>
																			{DPAC(contact, "phone1", "")}
																		</a>
																	</span>
																</li>
															)}
															{DPAC(contact, "phone2", "") && (
																<li>
																	<span>
																		{STATIC_TEXTS.PHONE}:
																		<a
																			href={`tel:${DPAC(
																				contact,
																				"phone2",
																				"",
																			)}`}>
																			{DPAC(contact, "phone2", "")}
																		</a>
																	</span>
																</li>
															)}
															{DPAC(contact, "email1", "") && (
																<li>
																	<span>
																		{STATIC_TEXTS.EMAIL}:
																		<a
																			href={`mailto:${DPAC(
																				contact,
																				"email1",
																				"",
																			)}`}>
																			{DPAC(contact, "email1", "")}
																		</a>
																	</span>
																</li>
															)}
														</ul>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-copyright-wrapper">
						<div className="footer-copyright text-center">
							Copyright © 2021. All right reserved &nbsp;&nbsp;|&nbsp;&nbsp; By{" "}
							<a
								target="_blank"
								href="https://www.linkedin.com/in/danial-lalasa/">
								Daniel Lalasa
							</a>
						</div>
					</div>
				</div>
				{/*====================  End of footer area  ====================*/}
				{/*====================  scroll top ====================*/}
				<button
					className="scroll-top"
					id="scroll-top"
					onClick={this.scrollToTop}>
					<i className="ion-android-arrow-up" />
				</button>
				{/*====================  End of scroll top  ====================*/}
			</div>
		);
	}
}

export default (props) => (
	<LangContext.Consumer>
		{(context) => <Footer {...context} {...props} />}
	</LangContext.Consumer>
);
