"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  PencilIcon,
  Squares2X2Icon,
  TrashIcon,
} from "@heroicons/react/24/outline";

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

type TaleWithRowId = Tale & {
  rowId: string;
};

type TalesResponse = {
  data?: Tale[];
  error?: unknown;
};

type SortableRowProps = {
  writing: TaleWithRowId;
  workingId: string | null;
  onEdit: (writing: TaleWithRowId) => void;
  onDelete: (writing: TaleWithRowId) => void;
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

function SortableRow({
  writing,
  workingId,
  onEdit,
  onDelete,
}: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: writing.rowId,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    position: "relative",
    zIndex: isDragging ? 10 : undefined,
  };

  const isWorking = workingId === writing.rowId;

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={isDragging ? "bg-zinc-100 shadow-md" : "bg-white"}
    >
      <td className="px-4 py-2 text-black">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            type="button"
            className="
    group
    flex items-center justify-center
    h-9 w-9
    rounded-xl
    bg-gradient-to-br
    from-slate-50
    to-zinc-100
    border
    border-zinc-200
    text-zinc-500
    shadow-sm
    hover:shadow-md
    hover:border-zinc-300
    hover:text-black
    transition-all
    cursor-grab
    active:cursor-grabbing
    active:scale-95
  "
            style={{ touchAction: "none" }}
          >
            <Squares2X2Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>

          <span>{writing.title || "(senza titolo)"}</span>
        </div>
      </td>

      <td className="px-4 py-2 text-black">Scritto</td>

      <td className="px-4 py-2 text-black">{formatDate(writing.createdAt)}</td>

      <td className="px-4 py-2 text-black">{formatDate(writing.updatedAt)}</td>

      <td className="px-4 py-2 text-black">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="
      group
      flex h-9 w-9 items-center justify-center
      rounded-xl
      border border-blue-200
      bg-gradient-to-br
      from-blue-50
      to-sky-100
      text-blue-600
      shadow-sm
      transition-all
      duration-150
      hover:border-blue-300
      hover:text-blue-700
      hover:shadow-md
      active:scale-95
      disabled:cursor-not-allowed
      disabled:opacity-50
      cursor-pointer
    "
              title="Modifica"
              aria-label={`Modifica ${writing.title || "scritto"}`}
              disabled={isWorking}
              onClick={() => {
                onEdit(writing);
              }}
            >
              <PencilIcon
                className="
        h-5 w-5
        transition-transform
        duration-150
        group-hover:scale-110
      "
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="
      group
      flex h-9 w-9 items-center justify-center
      rounded-xl
      border border-red-200
      bg-gradient-to-br
      from-red-50
      to-rose-100
      text-red-600
      shadow-sm
      transition-all
      duration-150
      hover:border-red-300
      hover:text-red-700
      hover:shadow-md
      active:scale-95
      disabled:cursor-not-allowed
      disabled:opacity-50
      cursor-pointer
    "
              title="Elimina"
              aria-label={`Elimina ${writing.title || "scritto"}`}
              disabled={isWorking}
              onClick={() => {
                onDelete(writing);
              }}
            >
              <TrashIcon
                className="
        h-5 w-5
        transition-transform
        duration-150
        group-hover:scale-110
      "
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function TableWritings() {
  const router = useRouter();

  const [writings, setWritings] = useState<Tale[]>([]);
  const [itemsOrder, setItemsOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);

  const [pendingDelete, setPendingDelete] = useState<TaleWithRowId | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const mappedWritings = useMemo<TaleWithRowId[]>(
    () =>
      writings
        .map((item) => ({
          ...item,
          rowId: item.id ?? item._id ?? "",
        }))
        .filter((item) => Boolean(item.rowId)),
    [writings]
  );

  const orderedWritings = useMemo(() => {
    const writingsMap = new Map(
      mappedWritings.map((writing) => [writing.rowId, writing])
    );

    return itemsOrder
      .map((rowId) => writingsMap.get(rowId))
      .filter((writing): writing is TaleWithRowId => Boolean(writing));
  }, [itemsOrder, mappedWritings]);

  const loadWritings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/tales?page=1&limit=100&sort=order&sortBy=asc",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = (await response.json()) as TalesResponse;

      if (!response.ok || data.error) {
        setError("Impossibile caricare gli scritti");
        return;
      }

      const loadedWritings = Array.isArray(data.data) ? data.data : [];

      setWritings(loadedWritings);

      setItemsOrder(
        loadedWritings
          .map((writing) => writing.id ?? writing._id ?? "")
          .filter(Boolean)
      );
    } catch {
      setError("Errore di rete durante il caricamento");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWritings();
  }, [loadWritings]);

  const handleEdit = useCallback(
    (writing: TaleWithRowId) => {
      console.log("Editing item:", writing);

      if (!writing.rowId) {
        setError("ID scritto non valido");
        return;
      }

      router.push(
        `/area-riservata/modifica/${encodeURIComponent(writing.rowId)}`
      );
    },
    [router]
  );

  const handleDeleteRequest = useCallback((writing: TaleWithRowId) => {
    setPendingDelete(writing);
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || savingOrder) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    const oldIndex = itemsOrder.indexOf(activeId);
    const newIndex = itemsOrder.indexOf(overId);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const previousOrder = itemsOrder;
    const newOrder = arrayMove(itemsOrder, oldIndex, newIndex);

    setItemsOrder(newOrder);
    setSavingOrder(true);
    setError(null);

    const payload = newOrder.map((id, index) => ({
      id,
      order: index,
    }));

    try {
      const response = await fetch("/api/tales", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: unknown;
      };

      if (!response.ok || data.error) {
        setItemsOrder(previousOrder);

        setError(
          data.error
            ? `Errore salvataggio ordine: ${String(data.error)}`
            : "Errore durante il salvataggio dell'ordine"
        );

        return;
      }

      const writingsMap = new Map(
        writings.map((writing) => [writing.id ?? writing._id ?? "", writing])
      );

      const reorderedWritings = newOrder
        .map((id) => writingsMap.get(id))
        .filter((writing): writing is Tale => Boolean(writing));

      setWritings(reorderedWritings);
    } catch {
      setItemsOrder(previousOrder);
      setError("Errore di rete durante il salvataggio dell'ordine");
    } finally {
      setSavingOrder(false);
    }
  };

  const confirmDelete = async (item: TaleWithRowId) => {
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
      const response = await fetch(`/api/tales/${rowId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: unknown;
      };

      if (!response.ok || data.error) {
        setError(
          data.error
            ? `Errore eliminazione: ${String(data.error)}`
            : "Errore durante l'eliminazione"
        );

        return;
      }

      setWritings((previousWritings) =>
        previousWritings.filter(
          (writing) => writing.id !== rowId && writing._id !== rowId
        )
      );

      setItemsOrder((previousOrder) =>
        previousOrder.filter((id) => id !== rowId)
      );

      setPendingDelete(null);
    } catch {
      setError("Errore di rete durante l'eliminazione");
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        void handleDragEnd(event);
      }}
    >
      <SortableContext
        items={itemsOrder}
        strategy={verticalListSortingStrategy}
      >
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

          {savingOrder && (
            <div className="px-4 py-2 text-sm text-zinc-600">
              Salvataggio del nuovo ordine...
            </div>
          )}

          <table className="min-w-full text-sm">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-black">
                  TITOLO
                </th>

                <th className="px-4 py-2 text-left font-bold text-black">
                  TIPO
                </th>

                <th className="px-4 py-2 text-left font-bold text-black">
                  DATA DI CREAZIONE
                </th>

                <th className="px-4 py-2 text-left font-bold text-black">
                  DATA DI MODIFICA
                </th>

                <th className="px-4 py-2 text-left font-bold text-black">
                  AZIONI
                </th>
              </tr>
            </thead>

            <tbody>
              {!loading && orderedWritings.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-black" colSpan={5}>
                    Nessuno scritto disponibile.
                  </td>
                </tr>
              )}

              {!loading &&
                orderedWritings.map((writing) => (
                  <SortableRow
                    key={writing.rowId}
                    writing={writing}
                    workingId={workingId}
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                  />
                ))}
            </tbody>
          </table>

          <ConfirmDeleteModal
            open={Boolean(pendingDelete)}
            loading={Boolean(workingId)}
            onCancel={() => {
              if (!workingId) {
                setPendingDelete(null);
              }
            }}
            onConfirm={() => {
              if (!pendingDelete) {
                return;
              }

              void confirmDelete(pendingDelete);
            }}
          />
        </div>
      </SortableContext>
    </DndContext>
  );
}
