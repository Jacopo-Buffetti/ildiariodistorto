import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/Manu/Menu";
import Image from "next/image";

export default function ChiSono() {
  return (
    <>
      <Menu />
      <main className="mx-auto w-full px-6 py-10 sm:px-10 sm:py-14">
        <section className="mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-semibold uppercase tracking-[0.2em] text-zinc-800 sm:text-4xl blockquote">
              Chi sono
            </h1>
            <div className="mx-auto mt-4 h-[2px] w-14 bg-zinc-400" />
          </header>

          <div className="grid gap-8 md:grid-cols-[300px_1fr_400px] md:items-start">
            <div className="mx-auto md:mx-0 md:self-start">
              <Image
                src="/assets/immagine_personale.png"
                alt="Ritratto personale"
                width={280}
                height={280}
                className="h-[280px] w-[280px] rounded-full object-cover"
              />
            </div>

            <div className="space-y-4 text-base leading-8 text-zinc-700 sm:text-lg">
              <p>
                Mi chiamo <strong>Jacopo</strong>. <br />
                Sono un Capricorno, ma non so se questo dica davvero qualcosa di
                me. Forse solo che ho imparato a salire montagne interiori che
                nessuno vede, e a farlo in silenzio, con quella ostinazione che
                nasce non dalla forza, ma dalla necessità. <br />
                Scrivere, per me, non è un hobby. È un modo per non soccombere a
                ciò che mi porto dentro. <br />
                La mia mente è un luogo dove i pensieri si muovono come ombre: a
                volte sussurrano, a volte urlano. Alcuni giorni mi sembra di
                essere un labirinto costruito con le mie stesse fragilità, e la
                penna è l’unico filo che posso seguire per non perdermi del
                tutto. <br />
                Le parole sono il rifugio in cui mi nascondo quando fuori fa
                troppo rumore. Sono la coperta che tiro fino a coprirmi il viso,
                sperando che il mondo non trovi il modo di entrare. Eppure,
                paradossalmente, sono anche il modo in cui scelgo di mostrarmi:
                schegge di me che lascio cadere sulla pagina, forse per
                alleggerirmi, forse per sentirmi meno solo. <br />
                Scrivo ciò che non riesco a dire. <br />
                Scrivo ciò che mi spaventa. <br />
                Scrivo ciò che resta sospeso tra ciò che sono e ciò che temo di
                essere. <br />
                Le poesie, i racconti, i pensieri che troverai qui non nascono
                dalla luce, ma da crepe in cui la luce tarda ad arrivare. Sono
                tentativi maldestri di capire perché alcune ferite non
                guariscono mai completamente, o perché certi ricordi continuano
                a bussare anche quando li chiudi a chiave. <br />
                Questo spazio non è un altare né una vetrina. È un luogo
                appartato, come una stanza senza finestre, dove finalmente posso
                togliermi le maschere che porto durante il giorno. Se deciderai
                di entrare, fallo con passo lieve: qui ogni parola è un
                frammento di pelle. <br />
                Forse, leggendo, scoprirai una parte oscura di te stesso che
                avevi dimenticato. O forse passerai oltre. In entrambi i casi,
                sappi che ogni riga è una confessione, un pezzo di un caos che
                cerco da anni di mettere in ordine senza mai riuscirci davvero.
                <br />
                Scrivere, per me, è questo: una lotta silenziosa per non
                smettere di sentire.
              </p>
            </div>
            <div className="mx-auto md:mx-0 md:flex md:h-full md:items-end md:justify-end">
              <Image
                src="/assets/immagine_penna.png"
                alt="Ritratto Penna"
                width={400}
                height={400}
                className="h-auto w-[400px] object-contain md:w-[400px] rounded-[20px]"
              />
            </div>
          </div>

          <div className="my-10 h-px w-full bg-zinc-300" />

          <section aria-labelledby="cosa-troverai" className="text-center">
            <h2
              id="cosa-troverai"
              className="text-xl font-semibold uppercase tracking-[0.18em] text-zinc-800"
            >
              Cosa troverai qui
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <article className="flex flex-col items-center">
                <Image
                  src="/assets/piuma_tavolo.png"
                  alt="Icona poesie"
                  width={500}
                  height={500}
                  className="object-contain rounded-[20px]"
                />
                <h3 className="mt-3 text-lg font-semibold text-zinc-800">
                  Poesie
                </h3>
                <p className="mt-2 max-w-[18ch] text-sm leading-6 text-zinc-600">
                  Emozioni in versi, sussurri dell&apos;anima.
                </p>
              </article>

              <article className="flex flex-col items-center">
                <Image
                  src="/assets/taccuino.png"
                  alt="Icona racconti brevi"
                  width={500}
                  height={500}
                  className="object-contain rounded-[20px]"
                />
                <h3 className="mt-3 text-lg font-semibold text-zinc-800">
                  Racconti brevi
                </h3>
                <p className="mt-2 max-w-[19ch] text-sm leading-6 text-zinc-600">
                  Storie di vita, ordinarie o non.
                </p>
              </article>

              <article className="flex flex-col items-center">
                <Image
                  src="/assets/candela.png"
                  alt="Icona pensieri"
                  width={500}
                  height={500}
                  className="object-contain rounded-[20px]"
                />
                <h3 className="mt-3 text-lg font-semibold text-zinc-800">
                  Pensieri
                </h3>
                <p className="mt-2 max-w-[20ch] text-sm leading-6 text-zinc-600">
                  Riflessioni sparse, appunti di viaggio.
                </p>
              </article>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
