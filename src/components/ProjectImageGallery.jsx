import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Get } from "../api";
import { i18n } from "../i18n";
import DPAC from "../tools/DeepAccess";
const BASEURL = process.env.REACT_APP_BASEURL;
class ProjectImageGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectsData: [],
			loading: true,
		};
	}
	getData = () => {
		Get("projects", { _locale: this.props.lang })
			.then((res) => {
				this.setState({
					...this.state,
					projectsData: res.data,
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
		const projects = this.state.projectsData.slice(0, 4),
			lang = this.props.lang;

		// let colsDisplay = [6, 3, 3, 3, 3, 6];
		const STATIC_TEXTS = i18n(this.props.lang);
		// switch (projects.length) {
		// 	case (1, 2, 3, 4):
		// 		colsDisplay = [6, 6, 6, 6];
		// 		break;
		// 	case 5:
		// 		colsDisplay = [6, 6, 3, 3, 6];
		// 		break;
		// 	case 6:
		// 		break;
		// 	default:
		// 		break;
		// }
		return (
			<div>
				{/*====================  project gallery area ====================*/}
				{projects.length > 0 && (
					<div className="project-gallery-area section-space--inner--120 grey-bg">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									{/* section title */}
									<div className="section-title-area text-center section-space--bottom--50">
										<h2 className="section-title">
											{STATIC_TEXTS.LATESTPROJECTS}
										</h2>
										{/* <p className="section-subtitle">We delivered our services with the best quality</p> */}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="project-gallery-wrapper">
										<div className="row">
											{projects.map((project, i) => (
												<div key={i} className="col-md-6 col-mobile-6">
													<div className="single-gallery-project">
														<div className="single-gallery-project__image">
															<img
																src={
																	BASEURL +
																	DPAC(
																		project,
																		"main_image.formats.thumbnail.url",
																		DPAC(project, "main_image.url", ""),
																	)
																}
																className="img-fluid"
																alt=""
															/>
														</div>
														<div className="single-gallery-project__content">
															<h4 className="title">
																{DPAC(project, "title", "")}
															</h4>
															<Link
																target="_blank"
																to={`/${lang}/project-details/${DPAC(
																	project,
																	"id",
																	"",
																)}`}>
																{STATIC_TEXTS.SEEMORE}
															</Link>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{/*====================  End of project gallery area  ====================*/}
			</div>
		);
	}
}

export default ProjectImageGallery;
