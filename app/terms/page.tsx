import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/Manu/Menu";

export default function Terms() {
  return (
    <>
      <Menu />
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "0 20px",
          lineHeight: "1.6",
          color: "#111",
        }}
      >
        <h1>Termini e Condizioni</h1>
        <p>
          <strong>Ultimo aggiornamento:</strong> 14 maggio 2026
        </p>

        <h2>1. Accettazione dei termini</h2>
        <p>
          Accedendo e utilizzando il sito “Il Diario Distorto”, l’utente accetta
          i presenti Termini e Condizioni. Se non si accettano i termini, si
          invita a non utilizzare il sito.
        </p>

        <h2>2. Descrizione del servizio</h2>
        <p>
          Il sito “Il Diario Distorto” è un progetto personale che raccoglie
          racconti, pensieri e poesie. Alcune sezioni del sito possono essere
          accessibili solo tramite area riservata.
        </p>

        <h2>3. Accesso all’area riservata</h2>
        <p>
          L’accesso all’area riservata è consentito esclusivamente agli utenti
          autorizzati dal titolare del sito. Le credenziali vengono create
          direttamente dal titolare e non è prevista registrazione pubblica.
        </p>

        <p>
          L’utente è responsabile della riservatezza delle proprie credenziali e
          si impegna a non condividerle con terzi.
        </p>

        <h2>4. Uso del sito</h2>
        <p>
          L’utente si impegna a utilizzare il sito in modo corretto e legale e a
          non:
        </p>
        <ul>
          <li>tentare accessi non autorizzati;</li>
          <li>compromettere il funzionamento del sito;</li>
          <li>utilizzare il sito per scopi illeciti o dannosi;</li>
          <li>interferire con la sicurezza del servizio.</li>
        </ul>

        <h2>5. Proprietà dei contenuti e diritto d’autore</h2>
        <p>
          Tutti i contenuti presenti sul sito “Il Diario Distorto”, inclusi
          testi, racconti, poesie e qualsiasi altro materiale originale, sono di
          proprietà esclusiva del titolare del sito, salvo diversa indicazione.
        </p>

        <p>
          I contenuti sono protetti dalla normativa vigente sul diritto
          d’autore.
        </p>

        <p>
          Non è consentita la copia, la riproduzione, la distribuzione, la
          pubblicazione o qualsiasi altro utilizzo, totale o parziale, dei
          contenuti senza autorizzazione esplicita e preventiva del titolare.
        </p>

        <p>
          È consentita la sola consultazione personale dei contenuti all’interno
          del sito.
        </p>

        <h2>6. Limitazione di responsabilità</h2>
        <p>
          Il titolare non garantisce che il sito sia sempre disponibile, privo
          di interruzioni o esente da errori tecnici.
        </p>

        <p>Il sito viene fornito “così com’è”, senza garanzie di alcun tipo.</p>

        <h2>7. Modifiche ai termini</h2>
        <p>
          Il titolare si riserva il diritto di modificare i presenti Termini e
          Condizioni in qualsiasi momento. Le modifiche saranno pubblicate su
          questa pagina.
        </p>

        <h2>8. Contatti</h2>
        <p>
          Per qualsiasi richiesta è possibile contattare il titolare del sito:
          <br />
          <a href="mailto:jacopo.buffetti@gmail.com">
            jacopo.buffetti@gmail.com
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}
