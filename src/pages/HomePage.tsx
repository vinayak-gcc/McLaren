import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";

const HomePage = () => {
	const homeRef = useRef<HTMLDivElement>(null);

	return (
		<div className="App">
			<Navbar homeRef={homeRef} />
			<Home homeRef={homeRef} />
		</div>
	);
};

export default HomePage;
