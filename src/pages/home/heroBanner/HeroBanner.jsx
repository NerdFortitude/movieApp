import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.scss'
import useFetch from '../../../hooks/useFetch';
function HeroBanner() {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const {data, loading} = useFetch("/movie/upcomming");

    //so here we will only run the functionality 
    //  when the enter key is pressed
    //  here is an optimization assignment do it on every keyup and apply throttling
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }
    return (
        <div className="heroBanner">
            <div className="wrapper">
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover.
                        Explore now.</span>

                    <div className="searchInput">
                        <input type="text"
                            placeholder="Search for a movie or tv show..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value) }}
                            onKeyUp={searchQueryHandler}
                        />

                        <button>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner