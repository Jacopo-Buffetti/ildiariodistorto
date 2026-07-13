"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DragDropManager, Draggable } from "@dnd-kit/dom";

import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal/ConfirmDeleteModal";
import { CreateTaleSchema } from "@/schemas/tales";

type Tale = {
  id?: string;
  _id?: string;
  title?: string | null;
  description: string;
  CoverImage?: {
    url: string;
    path: string;
    relativePath: string;
    name: string;
    _id?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

type TalesResponse = {
  data?: Tale[];
  error?: unknown;
};

const formatDate = (value?: string) => {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleDateString("it-IT");
};

export default function TableWritings() {
  const router = useRouter();
  const [writings, setWritings] = useState<Tale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<
    (Tale & { rowId: string }) | null
  >(null);

  const mappedWritings = useMemo(
    () =>
      writings.map((item) => ({ ...item, rowId: item.id ?? item._id ?? "" })),
    [writings]
  );

  const loadWritings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "/api/tales?page=1&limit=100&sort=updatedAt&sortBy=asc",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = (await res.json()) as TalesResponse;
      if (!res.ok || data.error) {
        setError("Impossibile caricare gli scritti");
        return;
      }
      setWritings(Array.isArray(data.data) ? data.data : []);
    } catch {
      setError("Errore di rete durante il caricamento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadWritings();
  }, []);

  const handleEdit = (item: Tale & { rowId: string }) => {
    const rowId = item.rowId;
    if (!rowId) {
      setError("ID scritto non valido");
      return;
    }
    router.push(`/area-riservata/modifica/${encodeURIComponent(rowId)}`);
  };

  // Drag & drop (make table rows draggable) using @dnd-kit/dom
  const managerRef = useRef<null | any>(null);
  const draggablesRef = useRef<Record<string, any>>({});

  useEffect(() => {
    // create manager once on mount
    managerRef.current = new DragDropManager();
    return () => {
      // cleanup draggables
      Object.keys(draggablesRef.current).forEach((key) => {
        try {
          draggablesRef.current[key]?.destroy?.();
        } catch {
          // ignore
        }
        delete draggablesRef.current[key];
      });
      managerRef.current = null;
    };
  }, []);

  const registerDraggable = (el: HTMLTableRowElement | null, id: string) => {
    const manager = managerRef.current;
    if (!id) return;

    // if element is unmounted, destroy existing draggable
    if (!el) {
      const existing = draggablesRef.current[id];
      if (existing) {
        try {
          existing.destroy?.();
        } catch {}
        delete draggablesRef.current[id];
      }
      return;
    }

    // if already registered with same element, skip
    if (draggablesRef.current[id] && draggablesRef.current[id].element === el) {
      return;
    }

    // destroy previous if present
    if (draggablesRef.current[id]) {
      try {
        draggablesRef.current[id].destroy?.();
      } catch {}
      delete draggablesRef.current[id];
    }

    if (!manager) return;

    try {
      const draggable = new Draggable({ id, element: el }, manager);
      // some lightweight affordances
      el.style.touchAction = "none";
      el.style.userSelect = "none";
      el.style.cursor = "grab";
      el.setAttribute("data-draggable-id", id);
      draggablesRef.current[id] = draggable;
    } catch (e) {
      // fail silently if API differs
      // as a fallback, make native draggable to at least allow move
      try {
        el.setAttribute("draggable", "true");
      } catch {}
    }
  };

  const confirmDelete = async (item: Tale & { rowId: string }) => {
    const rowId = item.rowId;
    if (!rowId) {
      setError("ID scritto non valido");
      return;
    }

    const payload = {
      title: item.title ?? "",
      description: item.description ?? "",
      CoverImage: item.CoverImage,
    };

    const parsed = CreateTaleSchema.safeParse(payload);
    if (!parsed.success) {
      setError("Dati non validi per l'eliminazione");
      return;
    }

    setWorkingId(rowId);
    setError(null);
    try {
      const res = await fetch(`/api/tales/${rowId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: unknown };
      if (!res.ok || data.error) {
        setError(
          data?.error
            ? `Errore eliminazione: ${String(data.error)}`
            : "Errore eliminazione"
        );
        return;
      }

      setWritings((prev) =>
        prev.filter((row) => row.id !== rowId && row._id !== rowId)
      );
      setPendingDelete(null);
    } catch {
      setError("Errore di rete durante l'eliminazione");
    } finally {
      setWorkingId(null);
    }
  };

  // TODO fare la PUT per il reorder degli scritti, con un drag and drop della tabella

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 bg-white shadow">
      {error && (
        <div className="px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}
      {loading && (
        <div className="px-4 py-3 text-sm text-zinc-700">
          Caricamento scritti...
        </div>
      )}
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-2 text-left font-bold text-black">TITOLO</th>
            <th className="px-4 py-2 text-left font-bold text-black">TIPO</th>
            <th className="px-4 py-2 text-left font-bold text-black">
              DATA DI CREAZIONE
            </th>
            <th className="px-4 py-2 text-left font-bold text-black">
              DATA DI MODIFICA
            </th>
            <th className="px-4 py-2 text-left font-bold text-black">AZIONI</th>
          </tr>
        </thead>
        <tbody>
          {!loading && mappedWritings.length === 0 && (
            <tr>
              <td className="px-4 py-3 text-black" colSpan={5}>
                Nessuno scritto disponibile.
              </td>
            </tr>
          )}
          {mappedWritings.map((writing) => (
            <tr key={writing.rowId || writing.title || writing.description}>
              <td className="px-4 py-2 text-black">
                {writing.title || "(senza titolo)"}
              </td>
              <td className="px-4 py-2 text-black">Scritto</td>
              <td className="px-4 py-2 text-black">
                {formatDate(writing.createdAt)}
              </td>
              <td className="px-4 py-2 text-black">
                {formatDate(writing.updatedAt)}
              </td>
              <td className="px-4 py-2 text-black">
                <div className="flex gap-2">
                  <button
                    className="text-black disabled:opacity-50"
                    title="Modifica"
                    disabled={workingId === writing.rowId}
                    onClick={() => void handleEdit(writing)}
                    type="button"
                  >
                    ✏️
                  </button>
                  <button
                    className="text-black disabled:opacity-50"
                    title="Elimina"
                    disabled={workingId === writing.rowId}
                    onClick={() => setPendingDelete(writing)}
                    type="button"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDeleteModal
        open={Boolean(pendingDelete)}
        loading={Boolean(workingId)}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) {
            return;
          }
          void confirmDelete(pendingDelete);
        }}
      />
    </div>
  );
}
