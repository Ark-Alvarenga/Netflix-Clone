const API_KEY = '1cf93fd81aae721c3bdd9bc79d9c24b3';
const API_BASE = 'https://api.themoviedb.org/3';

/*
netflix originals
trending
top rated
action
etc
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Netflix Originals',
                items: await basicFetch(`/discover/tv?with_network=213&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recommended for you',
                items: await basicFetch(`/trending/all/week?language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'top rated',
                title: 'Top Rated',
                items: await basicFetch(`/movie/top_rated?&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFetch(`/discover/movie?with_genre=28&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedy',
                items: await basicFetch(`/discover/movie?with_genre=35&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Horror',
                items: await basicFetch(`/discover/movie?with_genre=27&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genre=10749&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentary',
                items: await basicFetch(`/discover/movie?with_genre=99&language=en-US&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info= await basicFetch (`/movie/${movieId}?language=en-US&api_key=${API_KEY}`); 
                break;
                case 'tv':
                    info= await basicFetch (`/tv/${movieId}?language=en-US&api_key=${API_KEY}`);
                break;
                default:
                    info= null;
                break;
            }
        }

        return info;
    }
}

