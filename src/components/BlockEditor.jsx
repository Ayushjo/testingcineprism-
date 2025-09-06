import { useCallback } from "react";
import { Upload, X, Plus, Trash2 } from "lucide-react";

const BlockEditor = ({
  block,
  index,
  setBlocks,
  isSubmitting,
  handleBlockImageUpload,
}) => {
  const { type, content } = block;

  const handleContentChange = useCallback(
    (field, value) => {
      setBlocks((prev) => {
        const newBlocks = [...prev];
        newBlocks[index] = {
          ...newBlocks[index],
          content: { ...newBlocks[index].content, [field]: value },
        };
        return newBlocks;
      });
    },
    [index, setBlocks]
  );

  const handleImageRemove = useCallback(() => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index] = {
        ...newBlocks[index],
        content: { ...newBlocks[index].content, file: null, preview: "" },
      };
      return newBlocks;
    });
  }, [index, setBlocks]);

  const handleListItemChange = useCallback(
    (itemIndex, value) => {
      setBlocks((prev) => {
        const newBlocks = [...prev];
        const newItems = [...newBlocks[index].content.items];
        newItems[itemIndex] = value;
        newBlocks[index] = {
          ...newBlocks[index],
          content: { ...newBlocks[index].content, items: newItems },
        };
        return newBlocks;
      });
    },
    [index, setBlocks]
  );

  const addListItem = useCallback(() => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index] = {
        ...newBlocks[index],
        content: {
          ...newBlocks[index].content,
          items: [...newBlocks[index].content.items, ""],
        },
      };
      return newBlocks;
    });
  }, [index, setBlocks]);

  const removeListItem = useCallback(
    (itemIndex) => {
      setBlocks((prev) => {
        const newBlocks = [...prev];
        const newItems = newBlocks[index].content.items.filter(
          (_, i) => i !== itemIndex
        );
        newBlocks[index] = {
          ...newBlocks[index],
          content: { ...newBlocks[index].content, items: newItems },
        };
        return newBlocks;
      });
    },
    [index, setBlocks]
  );

  switch (type) {
    case "PARAGRAPH":
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={content.hasTitle || false}
              onChange={(e) =>
                handleContentChange("hasTitle", e.target.checked)
              }
              className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500/50"
            />
            <label className="text-sm text-slate-400">
              Add title to this paragraph
            </label>
          </div>

          {content.hasTitle && (
            <input
              type="text"
              placeholder="Paragraph title..."
              value={content.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 font-medium"
            />
          )}

          <textarea
            placeholder="Write your paragraph content..."
            value={content.text || ""}
            onChange={(e) => handleContentChange("text", e.target.value)}
            rows={4}
            className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
          />
        </div>
      );

    case "HEADING":
      return (
        <div className="space-y-3">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-slate-400">Level:</label>
            <select
              value={content.level || 2}
              onChange={(e) =>
                handleContentChange("level", parseInt(e.target.value))
              }
              className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Heading text..."
            value={content.text || ""}
            onChange={(e) => handleContentChange("text", e.target.value)}
            className={`w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 font-bold ${
              (content.level || 2) === 2
                ? "text-2xl"
                : (content.level || 2) === 3
                ? "text-xl"
                : "text-lg"
            }`}
          />
        </div>
      );

    case "IMAGE":
      return (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 bg-slate-900/30">
            {content.preview ? (
              <div className="space-y-3">
                <img
                  src={content.preview}
                  alt={content.alt || ""}
                  className="max-w-full h-auto rounded-lg border border-slate-600"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  <X size={16} /> Remove Image
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-2 text-slate-400" size={24} />
                <p className="text-slate-400 mb-2">Upload an image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleBlockImageUpload(index, e.target.files[0])
                  }
                  className="hidden"
                  id={`image-upload-${index}`}
                  disabled={isSubmitting}
                />
                <label
                  htmlFor={`image-upload-${index}`}
                  className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-lg hover:bg-emerald-500/30 cursor-pointer transition-all duration-200 disabled:opacity-50"
                >
                  Choose File
                </label>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Alt text (required for accessibility)..."
            value={content.alt || ""}
            onChange={(e) => handleContentChange("alt", e.target.value)}
            className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Caption (optional)..."
            value={content.caption || ""}
            onChange={(e) => handleContentChange("caption", e.target.value)}
            className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
          />
        </div>
      );

    case "LIST":
      return (
        <div className="space-y-3">
          <div className="flex gap-2">
            <label className="text-sm text-slate-400">Type:</label>
            <select
              value={content.type || "bullet"}
              onChange={(e) => handleContentChange("type", e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="bullet">Bullet Points</option>
              <option value="numbered">Numbered List</option>
            </select>
          </div>
          {(content.items || [""]).map((item, itemIndex) => (
            <div key={itemIndex} className="flex gap-2">
              <span className="text-slate-400 mt-2 min-w-4">
                {(content.type || "bullet") === "numbered"
                  ? `${itemIndex + 1}.`
                  : "•"}
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleListItemChange(itemIndex, e.target.value)
                }
                className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                placeholder="List item..."
              />
              {(content.items || [""]).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem(itemIndex)}
                  className="text-red-400 hover:text-red-300 p-2 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addListItem}
            className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1 transition-colors"
          >
            <Plus size={16} /> Add item
          </button>
        </div>
      );

    case "QUOTE":
      return (
        <div className="space-y-3">
          <textarea
            placeholder="Quote text..."
            value={content.text || ""}
            onChange={(e) => handleContentChange("text", e.target.value)}
            rows={3}
            className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 italic resize-none"
          />
          <input
            type="text"
            placeholder="Quote author (optional)..."
            value={content.author || ""}
            onChange={(e) => handleContentChange("author", e.target.value)}
            className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
          />
        </div>
      );

    case "DIVIDER":
      return (
        <div className="py-4">
          <hr className="border-slate-600" />
          <p className="text-center text-slate-500 text-sm mt-2">
            Section Divider
          </p>
        </div>
      );

    default:
      return <div className="text-slate-400">Unknown block type</div>;
  }
};

export default BlockEditor;
