export interface users {
  id: number
  nama: string
  asal: string
  umur: number
  pekerjaan: string
}


export let users: users[] = [
    { id: 1, nama: "Johan karbit", asal: "bekasi", pekerjaan: "admin FB", umur: 28 },
    { id: 2, nama: "Farhan kebab", asal: "ngawi", pekerjaan: "penjual kebab", umur: 30 },
    { id: 3, nama: "Rico mandalika", asal: "lombok", pekerjaan: "pembalap F1", umur: 21 }
];