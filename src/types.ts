export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number; // General rating
  criticScores: {
    rottenTomatoes?: number;
    imdb?: number;
  };
  genres: string[];
  director: string;
  actors: string[];
  description: string;
  poster: string;
  mood: string[];
  keywords: string[];
}

export interface FilterState {
  genres: string[];
  minRating: number;
  minRottenTomatoes: number;
  minImdb: number;
  startYear: number;
  endYear: number;
  searchQuery: string;
  moods: string[];
  director: string;
  actors: string[];
  keywords: string[];
}

export const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
  "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", 
  "Romance", "Science Fiction", "Thriller", "War", "Western"
];

export const MOODS = [
  "Epic", "Thought-provoking", "Uplifting", "Dark", "Funny", 
  "Tense", "Nostalgic", "Whimsical", "Romantic", "Gritty"
];

// Initial mock data to be displayed before AI interaction
export const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    criticScores: { rottenTomatoes: 73, imdb: 8.7 },
    genres: ["Science Fiction", "Drama", "Adventure"],
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft.",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop",
    mood: ["Epic", "Thought-provoking"],
    keywords: ["Space", "Time Travel", "Survival"]
  },
  {
    id: "2",
    title: "Grand Budapest Hotel",
    year: 2014,
    rating: 8.1,
    criticScores: { rottenTomatoes: 92, imdb: 8.1 },
    genres: ["Comedy", "Drama"],
    director: "Wes Anderson",
    actors: ["Ralph Fiennes", "Tony Revolori", "Adrien Brody"],
    description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.",
    poster: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
    mood: ["Whimsical", "Funny"],
    keywords: ["Hotel", "Art Nouveau", "Europe"]
  },
  {
    id: "3",
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    criticScores: { rottenTomatoes: 94, imdb: 9.0 },
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1000&auto=format&fit=crop",
    mood: ["Dark", "Tense", "Gritty"],
    keywords: ["Superheroes", "Crime", "Order and Chaos"]
  }
];
