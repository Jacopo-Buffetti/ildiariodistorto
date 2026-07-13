import FormWritings from "@/Components/FormWritings/FormWritings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ModificaPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ModificaScrittoPage({
  params,
}: ModificaPageProps) {
  const { id } = await params;

  return (
    <section className="flex flex-col items-center">
      <h1 className="mb-8 text-2xl font-bold text-zinc-800">
        Modifica scritto
      </h1>
      <FormWritings mode="edit" taleId={id} />
    </section>
  );
}
