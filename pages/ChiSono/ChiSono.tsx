import Image from "next/image";
import Link from "next/link";

import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/Manu/Menu";
import SketchFrame from "@/Components/SketchFrame/SketchFrame";

type Section = {
  type: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  textWidth: string;
};

const SECTIONS: Section[] = [
  {
    type: "Poesia",
    title: "Poesie",
    description: "Emozioni in versi, sussurri dell'anima.",
    image: "/assets/piuma_tavolo.png",
    alt: "Icona poesie",
    textWidth: "max-w-[18ch]",
  },
  {
    type: "Racconto breve",
    title: "Racconti brevi",
    description: "Storie di vita, ordinarie o non.",
    image: "/assets/taccuino.png",
    alt: "Icona racconti brevi",
    textWidth: "max-w-[19ch]",
  },
  {
    type: "Pensiero",
    title: "Pensieri",
    description: "Riflessioni sparse, appunti di viaggio.",
    image: "/assets/candela.png",
    alt: "Icona pensieri",
    textWidth: "max-w-[20ch]",
  },
];

const sectionHref = (type: string) =>
  `/i-miei-scritti?type=${encodeURIComponent(type)}#ultimi-scritti`;

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

          <div className="grid gap-8 md:grid-cols-[316px_minmax(0,1fr)] md:items-start xl:grid-cols-[316px_minmax(0,1fr)_376px]">
            <div className="mx-auto w-full max-w-[292px] md:mx-0 md:self-start">
              <Image
                preload
                src="/assets/immagine_personale.png"
                alt="Ritratto personale"
                width={292}
                height={292}
                className="block h-auto w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0 space-y-4 text-base leading-8 text-zinc-700 sm:text-lg">
              <p>
                Mi chiamo <strong>Jacopo</strong>, per gli amici{" "}
                <strong>Ciccio</strong>. <br />
                Sono un Capricorno, ma non so se questo dica davvero qualcosa di
                me. Forse solo che vedo montagne interiori che nessun&apos;altro
                vede, e che ho quella ostinazione che nasce non dalla forza, ma
                dall&apos;insicurezza. <br />
                Scrivere, per me, non è un hobby. È un modo per non soccombere a
                ciò che mi porto dentro. <br />
                La mia mente è un luogo contorto dove i pensieri si muovono come
                ombre: a volte sussurrano, a volte urlano. Alcuni giorni mi
                sembra di essere un labirinto costruito con le mie stesse
                fragilità, e la penna è l’unico filo che posso seguire per non
                perdermi del tutto. <br />
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
            <div className="mx-auto w-full max-w-[360px] md:col-span-2 md:mx-0 md:flex md:max-w-none md:justify-center xl:col-span-1 xl:h-full xl:items-end xl:justify-end">
              <SketchFrame className="w-full max-w-[360px]">
                <Image
                  src="/assets/immagine_penna.png"
                  alt="Ritratto Penna"
                  width={360}
                  height={203}
                  className="block h-auto w-full rounded-[20px] object-contain"
                />
              </SketchFrame>
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
              {SECTIONS.map((section) => (
                <article key={section.type} className="rounded-[20px] p-3">
                  <div className="relative z-[1] flex flex-col items-center">
                    <Link
                      href={sectionHref(section.type)}
                      aria-label={`Vai a ${section.title.toLowerCase()}`}
                      className="group relative flex aspect-square w-full max-w-[310px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px]"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <SketchFrame className="h-full w-full aspect-square">
                          {null}
                        </SketchFrame>
                      </div>
                      <Image
                        src={section.image}
                        alt={section.alt}
                        width={280}
                        height={280}
                        className="block h-full max-h-[280px] w-full max-w-[280px] rounded-[20px] object-cover"
                      />
                    </Link>
                    <h3 className="mt-3 text-lg font-semibold text-zinc-800">
                      {section.title}
                    </h3>
                    <p
                      className={`mt-2 ${section.textWidth} text-sm leading-6 text-zinc-600`}
                    >
                      {section.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
