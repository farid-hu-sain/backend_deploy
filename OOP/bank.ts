interface IBank {
    nama : string
    alamat : string

    getNama() : void
    getAlamat() : void
}


export class Bank implements IBank {
    nama : string
    alamat : string


    constructor(nama: string, alamat: string) {
        this.nama = 'BSI'
        this.alamat = 'Jakarta'
    }

    getNama() {
        console.log(this.alamat)
    }

    getAlamat() {
        console.log(this.alamat);
        
    }
}

