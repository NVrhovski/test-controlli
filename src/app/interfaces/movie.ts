export interface Movie {
    Title: string,
    Poster: string,
    Type: string,
    Year: string,
    imdbID: string,
    favorite: boolean | undefined,
    description: string | undefined,
    hide: boolean | undefined
}