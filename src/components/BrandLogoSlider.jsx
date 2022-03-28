import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Get } from "../api";
import Swiper from "react-id-swiper";
import DPAC from "../tools/DeepAccess";
const BASEURL = process.env.REACT_APP_BASEURL;
class BrandLogoSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partnershipsData: {
				partnerships: [],
			},
		};
	}
	componentDidMount() {
		Get("partnerships")
			.then((res) => {
				this.setState({
					...this.state,
					partnershipsData: res.data,
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
	}
	render() {
		const {partnerships} = this.state.partnershipsData;
		const params = {
			slidesPerView: 4,
			loop: true,
			speed: 1000,
			spaceBetween: 30,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			// Responsive breakpoints
			breakpoints: {
				1499: {
					slidesPerView: 4,
				},

				991: {
					slidesPerView: 3,
				},

				767: {
					slidesPerView: 3,
				},

				575: {
					slidesPerView: 1,
				},
			},
		};

		let DataList = partnerships.map((partner, i) => {
			return (
				<div className="swiper-slide brand-logo-slider__single" key={i}>
					<div className="image text-center">
						<a href={DPAC(partner,"title","")} target="_blank">
							<img
								style={{ maxWidth: "200px" }}
								src={BASEURL + DPAC(partner, "icon.url", "")}
								className="img-fluid"
								alt={DPAC(partner,"description","")}
							/>
						</a>
					</div>
				</div>
			);
		});

		return (
			<div>
				{/*====================  brand logo area ====================*/}
				{DPAC(partnerships,"length",[]) > 0 && (
					<div className="brand-logo-slider-area section-space--inner--60">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									{/* brand logo slider */}
									<div className="brand-logo-slider__container-area">
										<Swiper {...params}>{DataList}</Swiper>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{/*====================  End of brand logo area  ====================*/}
			</div>
		);
	}
}

export default BrandLogoSlider;
