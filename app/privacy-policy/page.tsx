import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/Manu/Menu";

export default function PrivacyPolicy() {
  const h1Style = {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
    color: "#111",
  };

  const h2Style = {
    fontSize: "1.35rem",
    fontWeight: 700,
    marginTop: "1.8rem",
    marginBottom: "0.6rem",
    color: "#111",
  };

  const pStyle = {
    marginBottom: "0.9rem",
    color: "#111",
  };

  const ulStyle = {
    marginBottom: "1rem",
    paddingLeft: "1.4rem",
    listStyleType: "disc" as const,
    color: "#111",
  };

  const liStyle = {
    marginBottom: "0.35rem",
  };

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
        <h1 style={h1Style}>Privacy Policy</h1>
        <p style={pStyle}>
          <strong>Ultimo aggiornamento:</strong> 14 maggio 2026
        </p>

        <h2 style={h2Style}>Titolare del trattamento</h2>
        <p style={pStyle}>
          Il titolare del trattamento dei dati è:
          <br />
          <br />
          Jacopo Buffetti
          <br />
          Email:{" "}
          <a href="mailto:jacopo.buffetti@gmail.com">
            jacopo.buffetti@gmail.com
          </a>
        </p>

        <h2 style={h2Style}>Dati raccolti</h2>
        <p style={pStyle}>
          Il sito può raccogliere alcuni dati personali necessari al
          funzionamento dell’area riservata e alla sicurezza del servizio.
        </p>

        <p style={pStyle}>I dati trattati possono includere:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>indirizzo email utilizzato come username;</li>
          <li style={liStyle}>
            password di accesso (memorizzata in forma protetta e non leggibile);
          </li>
          <li style={liStyle}>
            dati tecnici di navigazione generati automaticamente dal server,
            come indirizzo IP, user-agent, data e ora delle richieste.
          </li>
        </ul>

        <h2 style={h2Style}>Finalità del trattamento</h2>
        <p style={pStyle}>I dati vengono trattati esclusivamente per:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>consentire l’accesso all’area riservata;</li>
          <li style={liStyle}>garantire la sicurezza del sito;</li>
          <li style={liStyle}>
            prevenire accessi non autorizzati o attività abusive;
          </li>
          <li style={liStyle}>
            assicurare il corretto funzionamento tecnico del servizio.
          </li>
        </ul>

        <h2 style={h2Style}>Base giuridica del trattamento</h2>
        <p style={pStyle}>
          Il trattamento dei dati avviene sulla base del legittimo interesse del
          titolare alla gestione e sicurezza del sito e dell’area riservata.
        </p>

        <h2 style={h2Style}>Modalità di conservazione</h2>
        <p style={pStyle}>
          Le password non vengono memorizzate in chiaro ma tramite sistemi di
          hashing sicuri.
        </p>
        <p style={pStyle}>
          I dati sono conservati con misure tecniche adeguate per ridurre il
          rischio di accessi non autorizzati, perdita o divulgazione.
        </p>

        <h2 style={h2Style}>Hosting e servizi tecnici</h2>
        <p style={pStyle}>
          Il sito è ospitato tramite{" "}
          <a href="https://vercel.com" target="_blank" rel="noreferrer">
            Vercel
          </a>
          , che può trattare dati tecnici necessari all’erogazione del servizio.
        </p>

        <h2 style={h2Style}>Cookie</h2>
        <p style={pStyle}>
          Il sito utilizza esclusivamente cookie tecnici necessari al
          funzionamento dell’autenticazione e della sessione utente.
        </p>
        <p style={pStyle}>
          Non vengono utilizzati cookie di profilazione o pubblicitari.
        </p>

        <h2 style={h2Style}>Conservazione dei dati</h2>
        <p style={pStyle}>
          I dati vengono conservati per il tempo necessario al funzionamento
          dell’area riservata o fino alla richiesta di cancellazione da parte
          dell’utente.
        </p>

        <h2 style={h2Style}>Diritti dell’utente</h2>
        <p style={pStyle}>Gli utenti possono richiedere:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>accesso ai propri dati;</li>
          <li style={liStyle}>rettifica;</li>
          <li style={liStyle}>cancellazione;</li>
          <li style={liStyle}>
            limitazione del trattamento nei casi previsti dalla normativa.
          </li>
        </ul>

        <p style={pStyle}>
          Le richieste possono essere inviate all’indirizzo email indicato
          sopra.
        </p>

        <h2 style={h2Style}>Modifiche alla presente policy</h2>
        <p style={pStyle}>
          Questa Privacy Policy può essere aggiornata in qualsiasi momento. Le
          modifiche saranno pubblicate su questa pagina.
        </p>
      </div>
      <Footer />
    </>
  );
}
