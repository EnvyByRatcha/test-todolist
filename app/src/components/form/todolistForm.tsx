import { useEffect, useState } from "react";
import type {
  TodolistFormData,
  TodolistUpdateFormData,
} from "../../interface/ITodolist";
import dayjs from "dayjs";

interface TodolistFormProps {
  selectedData?: TodolistUpdateFormData;
  onSubmit: (data: TodolistFormData) => void;
  onDelete?: (id: number) => void;
}

export default function TodolistForm({
  selectedData,
  onSubmit,
  onDelete,
}: TodolistFormProps) {
  const [formData, setFormData] = useState<
    TodolistFormData | TodolistUpdateFormData
  >({
    title: "",
    status: "pending",
    priority: "medium",
    due: "",
  });

  useEffect(() => {
    if (selectedData) {
      setFormData({
        ...selectedData,
        due: selectedData.due
          ? dayjs(selectedData.due).format("YYYY-MM-DD")
          : "",
      });
    }
  }, [selectedData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }

    onSubmit(formData);
  };

  const handleDelete = () => {
    if (onDelete && selectedData?.id) {
      if (confirm("Are you sure you want to delete this task?")) {
        console.log(2)
        onDelete(selectedData.id);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="due"
          value={formData.due || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="pt-2 space-y-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
        {selectedData && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
