export default function TableHead(){
    return <thead>
        <tr>
            <th className="text-center">ID</th>
            <th className="text-center" colSpan={2}>Nama Produk</th>
            <th className="text-center">Harga</th>
            <th className="text-center">Jumlah</th>
            <th className="text-center">Total Harga</th>
        </tr>
    </thead>
}