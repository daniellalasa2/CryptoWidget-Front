import React, { Component } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

class PhotoGallery extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { items } = this.props;
		/* project gallery image list */
		const PhotoItem = ({ url, group }) => (
			<div className="col-xl-3 col-lg-4 col-sm-6 col-12 section-space--top--10">
				<LightgalleryItem group={group} src={url}>
					<button className="gallery-item single-gallery-thumb">
						<div
							style={{ height: "150px", width: "270px", overflow: "hidden" }}>
							<img src={url} className="img-fluid" alt={"ALTERNATIVE"} />
							<span className="plus" />
						</div>
					</button>
				</LightgalleryItem>
			</div>
		);

		return (
			<div>
				<LightgalleryProvider>
					<div className="row row-5">
						{items &&
							items.map((p, idx) => (
								<PhotoItem key={idx} url={p} group="group1" />
							))}
					</div>
				</LightgalleryProvider>
			</div>
		);
	}
}

export default PhotoGallery;
