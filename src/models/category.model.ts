export interface Category {
    id: number
    name: string
    umur?: number
}

export let categories: Category[] = [
    { id: 1, name: "remaja", umur: 15},
    { id: 2, name: "Dewasa", umur: 25},
    { id: 3, name: "orang tua", umur: 40}
]