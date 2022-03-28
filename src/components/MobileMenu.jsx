import React, { Component } from "react";
import { Link } from "react-router-dom";
import DPAC from "../tools/DeepAccess";
import { i18n } from "../i18n";
import history from "../history";
class MobileMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
	}

	toggleMobileMenu = () => {
		this.setState({
			active: !this.state.active,
		});
	};
    changeLang = (nextLang) => {
		let newPathname = history.location.pathname.replace(`/${this.props.lang}`,`/${nextLang}`)
		history.push({ pathname: newPathname });
		this.props.setLang(nextLang);
	};
	componentDidMount() {
		var offCanvasNav = document.getElementById("offcanvas-navigation");
		var offCanvasNavSubMenu = offCanvasNav.querySelectorAll(".sub-menu");

		for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
			offCanvasNavSubMenu[i].insertAdjacentHTML(
				"beforebegin",
				"<span class='menu-expand'><i></i></span>",
			);
		}

		var menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
		var numMenuExpand = menuExpand.length;

		function sideMenuExpand() {
			if (this.parentElement.classList.contains("active") === true) {
				this.parentElement.classList.remove("active");
			} else {
				for (let i = 0; i < numMenuExpand; i++) {
					menuExpand[i].parentElement.classList.remove("active");
				}
				this.parentElement.classList.add("active");
			}
		}

		for (let i = 0; i < numMenuExpand; i++) {
			menuExpand[i].addEventListener("click", sideMenuExpand);
		}
	}

	render() {
		const { lang, header, contact } = this.props,
			STATIC_TEXTS = i18n(lang);
		return (
			<div>
				{/*=======  offcanvas mobile menu  =======*/}
				<div
					className={`offcanvas-mobile-menu ${
						this.state.active ? "active" : ""
					} `}
					id="mobile-menu-overlay">
					<a
						href=""
						className="offcanvas-menu-close"
						id="mobile-menu-close-trigger"
						onClick={this.toggleMobileMenu}>
						<i className="ion-android-close" />
					</a>
					<div className="offcanvas-wrapper">
						<div className="offcanvas-inner-content">
							<div className="offcanvas-mobile-search-area">
								<form action="#">
									<input type="search" placeholder="Search ..." />
									<button type="submit">
										<i className="fa fa-search" />
									</button>
								</form>
							</div>
							<nav className="offcanvas-navigation" id="offcanvas-navigation">
								<ul>
									<li>
										<Link to={`${process.env.PUBLIC_URL}/${lang}`}>
											{STATIC_TEXTS.HOME}
										</Link>
									</li>
									<li>
										<Link to={`${process.env.PUBLIC_URL}/${lang}/about-us`}>
											{STATIC_TEXTS.ABOUT}
										</Link>
									</li>
									<li>
										<Link to={`${process.env.PUBLIC_URL}/${lang}/products`}>
											{STATIC_TEXTS.PRODUCTS}
										</Link>
									</li>
									<li>
										<Link to={`${process.env.PUBLIC_URL}/${lang}/services`}>
											{STATIC_TEXTS.SERVICES}
										</Link>
									</li>
									<li>
										<Link to={`${process.env.PUBLIC_URL}/${lang}/projects`}>
											{STATIC_TEXTS.PROJECTS}
										</Link>
									</li>
									<li>
										<Link to={`${process.env.PUBLIC_URL}/${lang}/contact-us`}>
											{STATIC_TEXTS.CONTACT}
										</Link>{" "}
									</li>
									<li>
										<i
											style={{ color: "black", fontSize: "16px" }}
											className="zmdi zmdi-globe"
										/>
										<button
											style={{
												marginTop: "100px",
												color: "black",
												backgroundColor: "transparent",
												border: "none",
												fontSize: "16px",
											}}
											onClick={() =>
												this.changeLang(lang === "tr" ? "en" : "tr")
											}>
											{lang === "tr" ? "EN" : "TR"}
										</button>
									</li>
								</ul>
							</nav>

							<div className="offcanvas-widget-area">
								{header &&
									(DPAC(header, "enable_phone", "") ||
										DPAC(header, "enable_address", "")) &&
									Object.keys(contact).length > 0 && (
										<div className="off-canvas-contact-widget">
											<div className="header-contact-info">
												<ul className="header-contact-info__list">
													<li>
														<i className="ion-android-phone-portrait" />{" "}
														<a href={`tel://${DPAC(contact, "phone1", "")}`}>
															{DPAC(contact, "phone1", "")}
														</a>
													</li>
													<li>
														<i className="ion-android-phone-portrait" />{" "}
														<a href={`tel://${DPAC(contact, "phone2", "")}`}>
															{DPAC(contact, "phone2", "")}
														</a>
													</li>
													<li>
														<i className="ion-android-mail" />{" "}
														<a href={`mailto:${DPAC(contact, "email1", "")}`}>
															{DPAC(contact, "email1", "")}
														</a>
													</li>
												</ul>
											</div>
										</div>
									)}

								{/*Off Canvas Widget Social Start*/}
								<div className="off-canvas-widget-social">
									{header &&
										DPAC(header, "social_links", "") &&
										DPAC(header, "social_links", []).map((item, i) => (
											<a
												key={i}
												href={DPAC(item, "link", "")}
												title={DPAC(item, "social_network_name", "")}
												target="_blank">
												<i
													style={{ color: "black" }}
													className={`zmdi zmdi-${DPAC(
														item,
														"social_network_name",
														"",
													).toLowerCase()}`}
												/>
											</a>
										))}
								</div>
								{/*Off Canvas Widget Social End*/}
							</div>
						</div>
					</div>
				</div>
				{/*=======  End of offcanvas mobile menu  =======*/}
			</div>
		);
	}
}

export default MobileMenu;
