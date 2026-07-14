"use client";

import { useEffect, useState, useRef } from "react";
import { Editor } from "@hugerte/hugerte-react";
import type { TaleImage } from "@/schemas/tales";
import { TALE_FORM_KEYS } from "@/schemas/tales";
import { CheckIcon, PhotoIcon } from "@heroicons/react/24/outline";

type CoverImage = TaleImage;

type TaleResponse = {
  id?: string;
  _id?: string;
  title?: string | null;
  type?: string;
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
  const [coverPreview, setCoverPreview] = useState<string | undefined>();
  const prevObjectUrlRef = useRef<string | null>(null);
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
        setTipo(data.type ?? "Poesia");
        setContenuto(data.description ?? "");
        setCoverImage(data.CoverImage);
        setCopertinaName(data.CoverImage?.name ?? "");
        setCoverPreview(data.CoverImage?.url ?? undefined);
      } catch {
        setError("Errore di rete durante il caricamento");
      } finally {
        setLoadingData(false);
      }
    };

    void loadTale();
  }, [isEditMode, taleId]);

  useEffect(() => {
    return () => {
      if (prevObjectUrlRef.current) {
        try {
          URL.revokeObjectURL(prevObjectUrlRef.current);
        } catch {}
        prevObjectUrlRef.current = null;
      }
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Prendi i valori direttamente dallo stato React
    const copertinaInput = (
      form.elements.namedItem("copertina") as HTMLInputElement
    )?.files?.[0];

    const formData = new FormData();
    formData.append(TALE_FORM_KEYS.title, titolo);
    formData.append(TALE_FORM_KEYS.tipo, tipo);
    formData.append(TALE_FORM_KEYS.description, contenuto);
    if (copertinaInput && copertinaInput.size > 0) {
      formData.append("CoverImage", copertinaInput, copertinaInput.name);
      formData.append("fileName", copertinaInput.name);
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
        body: formData,
      });

      if (isEditMode && res.status === 405) {
        res = await fetch(endpoint, {
          method: "PATCH",
          credentials: "include",
          body: formData,
        });
      }

      const data = (await res.json()) as {
        error?: unknown;
        code?: string;
        message?: string;
      };
      if (res.ok && !data.error && !data.code) {
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
          if (prevObjectUrlRef.current) {
            try {
              URL.revokeObjectURL(prevObjectUrlRef.current);
            } catch {}
            prevObjectUrlRef.current = null;
          }
          setCoverPreview(undefined);
          form.reset();
        }
      } else {
        const serverMessage =
          typeof data.message === "string"
            ? data.message
            : typeof data.error === "string"
              ? data.error
              : "Errore sconosciuto";
        setError("Errore dal server: " + serverMessage);
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
              browser_spellcheck: true,
              contextmenu_never_use_native: false,
              plugins: "lists link code",
              toolbar:
                "undo redo | styles | bold italic | bullist numlist | link | code",
            }}
          />
        </div>
        <input type="hidden" name="contenuto" value={contenuto} readOnly />
      </div>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="copertina"
            className="block text-sm font-semibold text-zinc-700"
          >
            Copertina
          </label>

          <input
            id="copertina"
            name="copertina"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setCopertinaName(file?.name ?? "");
              // revoke previous object URL if any
              if (prevObjectUrlRef.current) {
                try {
                  URL.revokeObjectURL(prevObjectUrlRef.current);
                } catch {}
                prevObjectUrlRef.current = null;
              }
              if (file) {
                const objUrl = URL.createObjectURL(file);
                prevObjectUrlRef.current = objUrl;
                setCoverPreview(objUrl);
              } else {
                setCoverPreview(undefined);
              }
            }}
          />

          <div className="mt-2 flex items-center gap-4 justify-between">
            <label
              htmlFor="copertina"
              className="
        group
        inline-flex
        cursor-pointer
        items-center
        gap-3
        rounded-2xl
        border
        border-sky-200
        bg-white
        px-5
        py-3
        font-semibold
        text-zinc-800
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-sky-300
        hover:bg-sky-50
        hover:shadow-md
        active:translate-y-0
        active:scale-95
      "
            >
              <span
                className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-sky-500
          text-white
          transition-all
          duration-300
          group-hover:rotate-6
          group-hover:scale-110
          group-hover:bg-sky-600
        "
              >
                <PhotoIcon className="h-5 w-5" aria-hidden="true" />
              </span>

              <span>Seleziona copertina</span>
            </label>

            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Anteprima copertina"
                className="h-16 w-24 rounded object-cover border border-zinc-200"
              />
            ) : (
              <div className="h-16 w-24 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-center text-xs text-zinc-400">
                Anteprima
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div></div>
            <div
              className={`
              mt-3
              flex
              min-h-12
              items-center
              rounded-xl
              border
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                copertinaName
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
              }
              `}
            >
              <span className="truncate">
                {copertinaName || "Nessun file selezionato"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-24">
          <button
            type="submit"
            disabled={loading || loadingData}
            className="
        group
        inline-flex
        cursor-pointer
        items-center
        gap-3
        rounded-2xl
        border
        border-emerald-200
        bg-gradient-to-br
        from-emerald-50
        to-green-100
        px-6
        py-3
        font-semibold
        text-emerald-800
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-emerald-300
        hover:shadow-lg
        active:translate-y-0
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:translate-y-0
        disabled:hover:shadow-sm
      "
          >
            <span
              className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-emerald-600
          text-white
          transition-all
          duration-300
          group-hover:rotate-12
          group-hover:scale-110
          group-disabled:rotate-0
          group-disabled:scale-100
        "
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            <span>
              {loading
                ? "Salvataggio..."
                : isEditMode
                  ? "Salva modifiche"
                  : "Pubblica"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
