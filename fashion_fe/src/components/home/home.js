import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {

	const navigate = useNavigate();

	return (
		<div className="no-container " style={{ marginLeft: "0px", marginRight: "0px" }}>
			<div className="row">
				<div className="col" id="content">
					<div className="">
						<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
							<div className="carousel-indicators">
								<button style={{ height: "10px", width: "10px", borderRadius: "50%" }} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
								<button style={{ height: "10px", width: "10px", borderRadius: "50%" }} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
								<button style={{ height: "10px", width: "10px", borderRadius: "50%" }} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
							</div>
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/27/1762b155-699b-4ee6-bdd1-d4db303429a21658915715614-GGS_july---22_Desktop.jpg" className="d-block w-100" alt="..." />
								</div>
								<div className="carousel-item">
									<img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg" className="d-block w-100" alt="..." />
								</div>
								<div className="carousel-item">
									<img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg" className="d-block w-100" alt="..." />
								</div>
							</div>
							<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
								<span style={{ backgroundColor: "black", borderRadius: "50%" }} className="carousel-control-prev-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Previous</span>
							</button>
							<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
								<span style={{ backgroundColor: "black", borderRadius: "50%" }} className="carousel-control-next-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>
					</div>
					<div className="d-flex justify-content-center mt-4 mb-4">
						<button type="button" className="btn btn-secondary btn-dark p-3" onClick={() => navigate(`/products`, { state: { items: "" } })}>GET STARTED</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
