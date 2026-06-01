"use client";

import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/Manu/Menu";
import SketchFrame from "@/Components/SketchFrame/SketchFrame";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ChiSono() {
  const router = useRouter();

  const goToWritings = () => {
    router.push("/i-miei-scritti#ultimi-scritti");
  };

  const handleBoxKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToWritings();
    }
  };

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
            <div className="mx-auto md:mx-0 md:self-start">
              <Image
                src="/assets/immagine_personale.png"
                alt="Ritratto personale"
                width={292}
                height={292}
                className="h-auto w-full max-w-[292px] rounded-full object-cover"
              />
            </div>

            <div className="min-w-0 space-y-4 text-base leading-8 text-zinc-700 sm:text-lg">
              <p>
                Mi chiamo <strong>Jacopo</strong>, per gli amici{" "}
                <strong>Ciccio</strong>. <br />
                Sono un Capricorno, ma non so se questo dica davvero qualcosa di
                me. Forse solo che vedo montagne interiori che nessun'altro
                vede, e che ho quella ostinazione che nasce non dalla forza, ma
                dall'insicurezza. <br />
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
            <div className="mx-auto md:col-span-2 md:mx-0 md:flex md:justify-center xl:col-span-1 xl:h-full xl:items-end xl:justify-end">
              <SketchFrame className="w-full max-w-[360px]">
                <Image
                  src="/assets/immagine_penna.png"
                  alt="Ritratto Penna"
                  width={360}
                  height={360}
                  className="h-auto w-full max-w-[360px] rounded-[20px] object-contain"
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
              <article className="rounded-[20px] p-3">
                <div className="relative z-[1] flex flex-col items-center">
                  <div
                    className="flex cursor-pointer items-center justify-center group relative w-full max-w-[310px] aspect-square overflow-hidden rounded-[20px]"
                    role="button"
                    tabIndex={0}
                    onClick={goToWritings}
                    onKeyDown={handleBoxKeyDown}
                    aria-label="Vai alla sezione Grovigli di parole"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <SketchFrame className="h-full w-full aspect-square">
                        {null}
                      </SketchFrame>
                    </div>
                    <Image
                      src="/assets/piuma_tavolo.png"
                      alt="Icona poesie"
                      width={500}
                      height={500}
                      className="block h-full w-full object-cover rounded-[20px] max-w-[280px] max-h-[280px]"
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-800">
                    Poesie
                  </h3>
                  <p className="mt-2 max-w-[18ch] text-sm leading-6 text-zinc-600">
                    Emozioni in versi, sussurri dell&apos;anima.
                  </p>
                </div>
              </article>

              <article className="rounded-[20px] p-3">
                <div className="relative z-[1] flex flex-col items-center">
                  <div
                    className="flex cursor-pointer items-center justify-center group relative w-full max-w-[310px] aspect-square overflow-hidden rounded-[20px]"
                    role="button"
                    tabIndex={0}
                    onClick={goToWritings}
                    onKeyDown={handleBoxKeyDown}
                    aria-label="Vai alla sezione Grovigli di parole"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <SketchFrame className="h-full w-full aspect-square">
                        {null}
                      </SketchFrame>
                    </div>
                    <Image
                      src="/assets/taccuino.png"
                      alt="Icona racconti brevi"
                      width={500}
                      height={500}
                      className="block h-full w-full object-cover rounded-[20px] max-w-[280px] max-h-[280px]"
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-800">
                    Racconti brevi
                  </h3>
                  <p className="mt-2 max-w-[19ch] text-sm leading-6 text-zinc-600">
                    Storie di vita, ordinarie o non.
                  </p>
                </div>
              </article>

              <article className="rounded-[20px] p-3">
                <div className="relative z-[1] flex flex-col items-center">
                  <div
                    className="flex cursor-pointer items-center justify-center group relative w-full max-w-[310px] aspect-square overflow-hidden rounded-[20px]"
                    role="button"
                    tabIndex={0}
                    onClick={goToWritings}
                    onKeyDown={handleBoxKeyDown}
                    aria-label="Vai alla sezione Grovigli di parole"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <SketchFrame className="h-full w-full aspect-square">
                        {null}
                      </SketchFrame>
                    </div>
                    <Image
                      src="/assets/candela.png"
                      alt="Icona pensieri"
                      width={500}
                      height={500}
                      className="block h-full w-full object-cover rounded-[20px] max-w-[280px] max-h-[280px]"
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-800">
                    Pensieri
                  </h3>
                  <p className="mt-2 max-w-[20ch] text-sm leading-6 text-zinc-600">
                    Riflessioni sparse, appunti di viaggio.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
