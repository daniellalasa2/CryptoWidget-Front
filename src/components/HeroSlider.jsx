import React, { Component } from "react";
import { Get } from "../api";
import Swiper from "react-id-swiper";
import DPAC from "../tools/DeepAccess";
import { i18n } from "../i18n";
import ReactMarkdown from "react-markdown";
const BASEURL = process.env.REACT_APP_BASEURL;
class HeroSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sliderData: { slide: [] },
			loading: true,
		};
	}
	getData = () => {
		Get("slider", { _locale: this.props.lang })
			.then((res) => {
				this.setState({
					...this.state,
					sliderData: res.data,
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
		const slider = this.state.sliderData,
			{ loading } = this.state,
			STATIC_TEXTS = i18n(this.props.lang),
			params = {
				slidesPerView: 1,
				loop: true,
				speed: 1000,
				watchSlidesVisibility: true,
				effect: "fade",
				navigation: {
					nextEl: ".ht-swiper-button-next",
					prevEl: ".ht-swiper-button-prev",
				},
				renderPrevButton: () => (
					<div className="ht-swiper-button-prev ht-swiper-button-nav d-none d-xl-block">
						<i className="ion-ios-arrow-left" />
					</div>
				),
				renderNextButton: () => (
					<div className="ht-swiper-button-next ht-swiper-button-nav d-none d-xl-block">
						<i className="ion-ios-arrow-forward" />
					</div>
				),
				autoplay: {
					delay: 5000,
				},
			};

		let DataList = DPAC(slider, "slide", []).map((slide, i) => {
			return (
				<div className="swiper-slide" key={i}>
					<div
						className="hero-slider__single-item"
						style={{
							backgroundImage: `url(${
								BASEURL +
								DPAC(
									slide,
									"image.formats.large.url",
									DPAC(slide, "image.url", ""),
								)
							})`,
						}}>
						<div className="hero-slider__content-wrapper">
							<div className="container">
								<div className="row">
									<div className="col-lg-12">
										<div className="hero-slider__content m-auto text-center">
											{/* <h2 className="hero-slider__title">
												{DPAC(slide, "title", "")}
											</h2> */}
											<ReactMarkdown className={"hero-slider__text"}>
												{DPAC(slide, "description", "")}
											</ReactMarkdown>

											{DPAC(slide, "button_enable", "") && (
												<a
													className="hero-slider__btn hero-slider__btn--style2"
													href={DPAC(slide, "button_link", "")}>
													{DPAC(slide, "button_title", "")}
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
		return !loading ? (
			DPAC(slider, "slide", []).length && (
				<div>
					{/*====================  hero slider area ====================*/}
					<div className="hero-alider-area">
						<Swiper {...params}>{DataList}</Swiper>
					</div>
					{/*====================  End of hero slider area  ====================*/}
				</div>
			)
		) : (
			<div style={{ width: "100%", textAlign: "center" }}>
				<br />
				<br />
				<br />
				<br />
				<br />
				<h3 style={{ color: "gray" }}>{STATIC_TEXTS.LOADING}</h3>
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		);
	}
}

export default HeroSlider;
