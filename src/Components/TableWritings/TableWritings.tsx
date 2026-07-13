"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
        "/api/tales?page=1&limit=100&sort=order&sortBy=asc",
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

  // Sortable drag & drop using @dnd-kit/core + @dnd-kit/sortable
  const [itemsOrder, setItemsOrder] = useState<string[]>([]);

  useEffect(() => {
    setItemsOrder(mappedWritings.map((w) => w.rowId));
  }, [mappedWritings]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = itemsOrder.indexOf(String(active.id));
    const newIndex = itemsOrder.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const newOrder = arrayMove(itemsOrder, oldIndex, newIndex);
    setItemsOrder(newOrder);

    // reorder writings state to match newOrder
    setWritings((prev) => {
      const map = new Map(prev.map((p) => [p.id ?? p._id ?? "", p]));
      return newOrder.map((id) => map.get(id)!).filter(Boolean) as Tale[];
    });

    // Persist full order to server: send array [{id, order}]
    const payload = newOrder.map((id, idx) => ({ id, order: idx }));
    try {
      const res = await fetch(`/api/tales`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resp = await res.json().catch(() => ({}));
      if (!res.ok || resp?.error) {
        setError(
          resp?.error
            ? `Errore salvataggio ordine: ${String(resp.error)}`
            : "Errore salvataggio ordine"
        );
      }
    } catch (e) {
      setError("Errore di rete durante il salvataggio dell'ordine");
    }
  };

  function SortableRow({ writing }: { writing: Tale & { rowId: string } }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: writing.rowId });
    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      touchAction: "none",
      userSelect: "none",
      cursor: "grab",
    };

    return (
      <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
    );
  }

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

          {!loading && mappedWritings.length > 0 && (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={itemsOrder}
                strategy={verticalListSortingStrategy}
              >
                {mappedWritings.map((writing) => (
                  <SortableRow
                    key={writing.rowId || writing.title || writing.description}
                    writing={writing as Tale & { rowId: string }}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
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
