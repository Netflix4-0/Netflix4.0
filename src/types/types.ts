export interface MovieData {
    title: string;
    year: number;
    rating: string;
    actors: string[];
    genre: string;
    synopsis: string;
    thumbnail: string;
    isTrending?: boolean;
    poster?: string;
}