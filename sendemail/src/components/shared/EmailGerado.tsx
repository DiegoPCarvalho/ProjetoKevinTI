
export default function EmailGerado(mensagemEmail: string, dados: any) {

    function retornaTexto(texto: string) {
        const data = texto.replace(/\n/g, "<br>")
        return data
    }

    function parseDateBrShort(dateStr: string): { y: number; m: number; d: number } | null {
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;
        const [dd, mm, aa] = parts.map(p => p.trim());

        const d = Number(dd), m = Number(mm);
        if (!d || !m) return null;

        let y = Number(aa);
        if (aa.length === 2) {
            // regra: 00–69 => 2000–2069, 70–99 => 1970–1999 (ajuste se quiser outro corte)
            y = y >= 70 ? 1900 + y : 2000 + y;
        }
        return { y, m: m - 1, d };
    }

    function sla(inicio: string): number | '' {
        const p = parseDateBrShort(inicio);
        if (!p) return '';

        // datas em UTC (zerei hora/minuto/segundo)
        const inicioUTC = Date.UTC(p.y, p.m, p.d);
        const hoje = new Date();
        const hojeUTC = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

        const MS_DIA = 24 * 60 * 60 * 1000;
        return Math.round((hojeUTC - inicioUTC) / MS_DIA);
    }


    return `
    <body>
        <div id="campoMensagem" style="white-space: pre-wrap;">
            ${retornaTexto(mensagemEmail)}
        </div>
        <br>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
            <thead style="background-color: black; color: white;">
                <tr>
                    <th>CLIENTE</th>
                    <th>EQUIPAMENTO</th>
                    <th>NS</th>
                    <th>QTDA</th>
                    <th>DATA INICIO</th>
                    <th>DATA RETORNO</th>
                    <th>QTDA DIAS</th>
                    <th>NF</th>
                    <th>PEDIDO</th>
                    <th>NFD</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
            ${dados.map((resp: any) => `
                <tr>
                    <td>${resp.CLIENTE}</td>
                    <td>${resp.EQUIPAMENTO}</td>
                    <td>${resp.NS}</td>
                    <td>${resp.QTDA}</td>
                    <td>${resp.INICIO}</td>
                    <td>${resp.RETORNO}</td>
                    <td>${sla(resp.INICIO)} dias</td>
                    <td>${resp.NF}</td>
                    <td>${resp.PEDIDO}</td>
                    <td>${resp.NFD}</td>
                    <td>${resp.STATUS}</td>
                </tr>
            `).join('')}
            </tbody>
        </table>
        <br>
        <div>
        At.te
        </div>
        <div>
            <img src="https://s6.imgcdn.dev/YNhOHo.png" width="100%" height="auto" style="display:block;">
        </div>
    </body>
    `
}
