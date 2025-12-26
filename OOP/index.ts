import { AkunBank } from "./akun"
import { Bank } from "./bank"

const BSI = new Bank("Bank Syariah Indonesia", "Jakarta")
const BCA = new Bank("Bank Central Asia", "SCBD")


const Ucup = new AkunBank(BSI, "Yusuf Ramadhani", 10000000, 111222333)


// BSI.getNama()
// BSI.getAlamat()
// BCA.getNama()
// BCA.getAlamat()

// Ucup.getNama()
// Ucup.getPemilik()
// Ucup.getSaldo()
// Ucup.getNoRekening()

// Ucup.deposit(15000000)
// Ucup.getSaldo()
// Ucup.tarik(100000)
// Ucup.getSaldo



