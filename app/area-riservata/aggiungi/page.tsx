import FormWritings from "@/Components/FormWritings/FormWritings";

export default function AggiungiScritto() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="mb-8 text-2xl font-bold text-zinc-800">
        Aggiungi nuovo scritto
      </h1>
      <FormWritings />
    </section>
  );
}
