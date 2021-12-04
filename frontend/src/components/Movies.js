import React, { useEffect, useState } from 'react'

function Movies() {

    const [allMovies, SetAllMovies] = useState([])
    const [loading, SetLoading] = useState(true)

    useEffect(() => {
        const func = async () => {
            let resp = await fetch('http://127.0.0.1:8000/api/movies')
            SetLoading(false)
            SetAllMovies(await resp.json())
            console.log(allMovies);
        }
        func();
    }, [])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="bg-secon">
            <div className="container py-5">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-dark">Top IMdB Movies</h2>
                    </div>
                    <div className="card-body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Poster</th>
                                    <th>Movie</th>
                                    <th>Director</th>
                                    <th>Casts</th>
                                    <th>Year</th>
                                    {/* <th>Description</th> */}
                                    <th>IMDB Rating</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    allMovies.map((elem) => {
                                        return(
                                        <tr>
                                            <td>{elem['movie_rank']}</td>
                                            <td>
                                            <img src={elem['movie_image_url']} alt="movie_poster" />
                                            </td>
                                            <td>{elem['movie_title']}</td>
                                            <td>{elem['nested_movie_director']}</td>
                                            <td>{elem['nested_movie_casts']}</td>
                                            <td>{elem['movie_year']}</td>
                                            {/* <td>{elem['nested_movie_desc']}</td> */}
                                            <td>{elem['imdb_rating']}</td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movies
