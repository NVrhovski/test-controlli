import { Movie } from "./movie";

export interface MovieResponse {
    Response: string,
    totalResults: string,
    Search: Movie[]
}