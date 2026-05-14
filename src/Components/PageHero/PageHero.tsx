export default function PageHero() {
  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url(/assets/immagine_copertina_home.png)",
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <h1 className="blockquote relative z-10 px-6 text-center text-3xl text-white md:text-5xl">
        Dove finiscono i silenzi, iniziano le parole che ci salvano
      </h1>
    </div>
  );
}
