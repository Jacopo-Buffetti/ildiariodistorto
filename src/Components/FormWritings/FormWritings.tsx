"use client";

import { useEffect, useState } from "react";
import { Editor } from "@hugerte/hugerte-react";
import { CreateTaleSchema } from "@/schemas/tales";

type CoverImage = {
  url: string;
  path: string;
  relativePath: string;
  name: string;
  _id?: string;
};

type TaleResponse = {
  id?: string;
  _id?: string;
  title?: string | null;
  description?: string;
  CoverImage?: CoverImage;
  error?: unknown;
};

type FormWritingsProps = {
  mode?: "create" | "edit";
  taleId?: string;
};

export default function FormWritings({
  mode = "create",
  taleId,
}: FormWritingsProps) {
  const isEditMode = mode === "edit";
  const [titolo, setTitolo] = useState("");
  const [tipo, setTipo] = useState("Poesia");
  const [contenuto, setContenuto] = useState("");
  const [coverImage, setCoverImage] = useState<CoverImage | undefined>();
  const [copertinaName, setCopertinaName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const loadTale = async () => {
      if (!isEditMode) {
        return;
      }
      if (!taleId) {
        setError("ID scritto mancante");
        return;
      }

      setLoadingData(true);
      setError(null);
      try {
        const res = await fetch(`/api/tales/${encodeURIComponent(taleId)}`, {
          method: "GET",
          credentials: "include",
        });
        const data = (await res.json()) as TaleResponse;
        if (!res.ok || data.error) {
          setError("Impossibile caricare lo scritto da modificare");
          return;
        }

        setTitolo(data.title ?? "");
        setContenuto(data.description ?? "");
        setCoverImage(data.CoverImage);
        setCopertinaName(data.CoverImage?.name ?? "");
      } catch {
        setError("Errore di rete durante il caricamento");
      } finally {
        setLoadingData(false);
      }
    };

    void loadTale();
  }, [isEditMode, taleId]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const description = String(formData.get("contenuto") ?? "");
    const copertina = formData.get("copertina");

    let nextCoverImage = coverImage;
    if (copertina instanceof File && copertina.size > 0) {
      nextCoverImage = {
        url: "",
        path: "",
        relativePath: "",
        name: copertina.name,
      };
    }

    const result = CreateTaleSchema.safeParse({
      title: titolo,
      description,
      CoverImage: nextCoverImage,
    });
    if (!result.success) {
      setError(
        "Errore di validazione: " +
          result.error.issues.map((i) => i.message).join(", ")
      );
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        isEditMode && taleId
          ? `/api/tales/${encodeURIComponent(taleId)}`
          : "/api/tales/create";
      const method = isEditMode ? "PUT" : "POST";

      let res = await fetch(endpoint, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (isEditMode && res.status === 405) {
        res = await fetch(endpoint, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.data),
        });
      }

      const data = await res.json();
      if (res.ok && !data.error) {
        setSuccess(
          isEditMode
            ? "Scritto modificato con successo!"
            : "Racconto salvato con successo!"
        );

        if (!isEditMode) {
          setTitolo("");
          setTipo("Poesia");
          setContenuto("");
          setCoverImage(undefined);
          setCopertinaName("");
          e.currentTarget.reset();
        }
      } else {
        setError("Errore dal server: " + (data.error || "Errore sconosciuto"));
      }
    } catch (err) {
      setError("Errore di rete: " + String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full space-y-6" onSubmit={onSubmit}>
      {loadingData && (
        <div className="text-zinc-700">Caricamento dati scritto...</div>
      )}
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {success && <div className="text-green-700 font-semibold">{success}</div>}
      {loading && <div className="text-zinc-700">Salvataggio in corso...</div>}
      <div>
        <label
          htmlFor="tipo"
          className="block text-sm font-medium text-zinc-700"
        >
          Tipo
        </label>
        <select
          id="tipo"
          name="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
        >
          <option>Poesia</option>
          <option>Racconto breve</option>
          <option>Pensiero</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="titolo"
          className="block text-sm font-medium text-zinc-700"
        >
          Titolo
        </label>
        <input
          id="titolo"
          name="titolo"
          type="text"
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
          className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="contenuto"
          className="block text-sm font-medium text-zinc-700"
        >
          Contenuto
        </label>
        <div className="mt-1 overflow-hidden rounded border border-zinc-300">
          <Editor
            id="contenuto"
            textareaName="contenuto"
            value={contenuto}
            onEditorChange={(value) => setContenuto(value)}
            init={{
              height: 320,
              menubar: false,
              plugins: "lists link code",
              toolbar:
                "undo redo | styles | bold italic | bullist numlist | link | code",
            }}
          />
        </div>
        <input type="hidden" name="contenuto" value={contenuto} readOnly />
      </div>
      <div>
        <label
          htmlFor="copertina"
          className="block text-sm font-medium text-zinc-700"
        >
          Copertina
        </label>
        <input
          id="copertina"
          name="copertina"
          type="file"
          className="sr-only"
          onChange={(e) => setCopertinaName(e.target.files?.[0]?.name ?? "")}
        />
        <label
          htmlFor="copertina"
          className="mt-1 inline-flex cursor-pointer rounded bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Seleziona copertina
        </label>
        <p
          className={`mt-2 text-xs font-medium ${
            copertinaName ? "text-zinc-800" : "text-zinc-600"
          }`}
        >
          {copertinaName || "Nessun file selezionato"}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || loadingData}
          className="rounded bg-zinc-800 px-6 py-2 font-semibold text-white transition hover:bg-zinc-700"
        >
          {isEditMode ? "Salva modifiche" : "Pubblica"}
        </button>
      </div>
    </form>
  );
}
