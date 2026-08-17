"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  FileText,
  Repeat2,
  Trash2,
  UserRound,
  Zap,
  Check,
} from "lucide-react";

import {
  useGetCompleteTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/features/task.features";
import UpdateTaskModal from "@/components/Dashboard/Modals/EditModals/UpdateTaskModal";

export interface Task {
  id: string;
  description: string;
  repeat: string;
  userId: string;
  date: string;
  status: "PENDING" | "COMPLETE";
  user?: {
    id: string;
    name: string;
  };
}

export default function CompletedTasks({ date }: { date: string }) {
  const {
    data,
    isLoading,
    isError,
  } = useGetCompleteTasksQuery({date},{refetchOnMountOrArgChange:true});
  const [selectedTaskId, setSelectedTaskId] =
    useState<string | null>(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] =
    useState(false);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const tasks: Task[] = data?.data ?? [];

  // ==========================================
  // Make Task Pending
  // ==========================================
  const handleToggle = async (id: string) => {
    try {
      await updateTask({
        id,
        data: {
          status: "PENDING",
        },
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================================
  // Delete Task
  // ==========================================
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <section className="mt-14">
        <h2 className="mb-4 text-[22px] font-semibold text-gray-900">
          সম্পূর্ণ কাজ
        </h2>

        <div className="rounded-lg border border-gray-200 py-12 text-center text-sm text-gray-500">
          সম্পূর্ণ কাজ লোড হচ্ছে...
        </div>
      </section>
    );
  }

  // ==========================================
  // Error
  // ==========================================
  if (isError) {
    return (
      <section className="mt-14">
        <h2 className="mb-4 text-[22px] font-semibold text-gray-900">
          সম্পূর্ণ কাজ
        </h2>

        <div className="rounded-lg border border-gray-200 py-12 text-center text-sm text-red-500">
          সম্পূর্ণ কাজ লোড করতে সমস্যা হয়েছে।
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14">
      <h2 className="mb-4 text-[22px] font-semibold text-gray-900">
        সম্পূর্ণ কাজ
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-[#119f70] text-left text-white">
              {/* Description */}
              <th className="border-r border-[#0f8e64] px-4 py-3">
                <div className="flex items-center gap-2 font-semibold">
                  <FileText size={17} />
                  কাজের বিবরণ
                </div>
              </th>

              {/* Repeat */}
              <th className="border-r border-[#0f8e64] px-4 py-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Repeat2 size={17} />
                  পুনরাবৃত্তি পরিয়ড
                </div>
              </th>

              {/* User */}
              <th className="border-r border-[#0f8e64] px-4 py-3">
                <div className="flex items-center gap-2 font-semibold">
                  <UserRound size={17} />
                  ব্যক্তি
                </div>
              </th>

              {/* Date */}
              <th className="border-r border-[#0f8e64] px-4 py-3">
                <div className="flex items-center gap-2 font-semibold">
                  <CalendarDays size={17} />
                  তারিখ
                </div>
              </th>

              {/* Actions */}
              <th className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2 font-semibold">
                  <Zap size={17} />
                  বাটন
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {!tasks.length ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  কোনো সম্পূর্ণ কাজ পাওয়া যায়নি।
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* Description */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggle(task.id)}
                        className="flex h-5 w-5 items-center justify-center rounded border border-[#039a63] bg-[#039a63] text-white transition hover:bg-[#027d50]"
                      >
                        <Check size={14} />
                      </button>

                      <span className="text-[15px] text-gray-400">
                        {task.description}
                      </span>
                    </div>
                  </td>

                  {/* Repeat */}
                  <td className="px-3 py-3 text-[15px]">
                    {task.repeat}
                  </td>

                  {/* User */}
                  <td className="px-3 py-3">
                    <div className="relative max-w-[250px]">
                      <select
                        value={task.user?.id ?? task.userId}
                        disabled
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
                      >
                        <option
                          value={task.user?.id ?? task.userId}
                        >
                          {task.user?.name || "-"}
                        </option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-3 py-3">
                    <input
                      type="date"
                      value={task.date?.slice(0, 10)}
                      readOnly
                      className="max-w-[190px] rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3">
                    <div className="flex justify-center gap-2">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTaskId(task.id);
                          setIsUpdateModalOpen(true);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dcfce9] text-[#039a63] hover:bg-[#c9f7dc]"
                      >
                        <Edit size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(task.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffe1e5] text-[#ff3b30] hover:bg-[#ffd3d8]"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>

      {/* Pagination */}
      <div className="mt-3 flex justify-end gap-1.5">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-gray-400"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#039a63] text-sm text-[#039a63]"
        >
          1
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-gray-400"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      {
        isUpdateModalOpen && <UpdateTaskModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedTaskId(null);
          }}
          taskId={selectedTaskId}
        />
      }

    </section>
  );
}