import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-title">
                <h1>
                    <span className="pokemon-title-blue">WORLD'S</span>
                    <span className="pokemon-title-yellow">POKEMON</span>
                </h1>
            </div>
            
            <div className="video-container">
                <iframe
                    width="800"
                    height="450"
                    src="https://www.youtube.com/embed/jVm1NbrXaXc?autoplay=1&mute=0"
                    title="Pokemon Theme Song"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Home;