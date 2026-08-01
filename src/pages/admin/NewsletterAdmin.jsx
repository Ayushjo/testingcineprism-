import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  BarChart2,
  Users,
  Send,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const API = "https://api.thecineprism.com/api/v1/admin/newsletter";

const STATUS_COLORS = {
  DRAFT: "bg-slate-700 text-slate-200",
  SCHEDULED: "bg-amber-500/20 text-amber-300",
  SENDING: "bg-blue-500/20 text-blue-300",
  SENT: "bg-emerald-500/20 text-emerald-400",
};

const SUB_STATUS_COLORS = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400",
  PENDING: "bg-amber-500/20 text-amber-300",
  PAST_DUE: "bg-orange-500/20 text-orange-300",
  CANCELED: "bg-red-500/20 text-red-300",
  UNSUBSCRIBED: "bg-slate-600 text-slate-300",
};

// ── Shared helpers ────────────────────────────────────────────────────────────

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function Badge({ label, colorClass }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
      {label}
    </span>
  );
}

// ── Campaign editor modal ─────────────────────────────────────────────────────

const EMPTY_CONTENT = {
  spotlight: { title: "", image: "", body: "" },
  releases: [],
  editorial: { title: "", body: "" },
  hiddenGem: { title: "", year: "", director: "", synopsis: "", streamingAt: "", posterUrl: "" },
  frameOfWeek: { imageUrl: "", caption: "" },
  sceneBreakdown: { title: "", film: "", imageUrl: "", body: "" },
  trivia: { question: "", answer: "", homework: "" },
  comingNextWeek: [""],
};

function CampaignEditor({ plans, token, onClose, onCreated }) {
  const [form, setForm] = useState({
    planId: plans[0]?.id || "",
    subject: "",
    previewText: "",
    content: EMPTY_CONTENT,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const setField = (path, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      const parts = path.split(".");
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const addRelease = () => {
    setForm((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        releases: [
          ...prev.content.releases,
          { title: "", genre: "", rating: "", ourTake: "", posterUrl: "" },
        ],
      },
    }));
  };

  const updateRelease = (idx, field, value) => {
    setForm((prev) => {
      const releases = [...prev.content.releases];
      releases[idx] = { ...releases[idx], [field]: value };
      return { ...prev, content: { ...prev.content, releases } };
    });
  };

  const removeRelease = (idx) => {
    setForm((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        releases: prev.content.releases.filter((_, i) => i !== idx),
      },
    }));
  };

  const updateNextWeek = (idx, value) => {
    setForm((prev) => {
      const arr = [...prev.content.comingNextWeek];
      arr[idx] = value;
      return { ...prev, content: { ...prev.content, comingNextWeek: arr } };
    });
  };

  const handleSubmit = async () => {
    if (!form.planId || !form.subject) {
      setErr("Plan and subject are required.");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      const { data } = await axios.post(
        `${API}/campaigns`,
        form,
        { headers: authHeaders(token) },
      );
      onCreated(data.campaign);
      onClose();
    } catch (e) {
      setErr(e.response?.data?.error || "Failed to create campaign.");
    } finally {
      setSaving(false);
    }
  };

  const input =
    "w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400";
  const label = "block text-xs text-slate-400 mb-1";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-10 px-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">New Campaign</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {err && (
            <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-4 py-2">
              {err}
            </p>
          )}

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Plan</label>
              <select
                className={input}
                value={form.planId}
                onChange={(e) => setField("planId", e.target.value)}
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Subject line</label>
              <input
                className={input}
                placeholder="This week in cinema..."
                value={form.subject}
                onChange={(e) => setField("subject", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={label}>Preview text (shown in inbox)</label>
            <input
              className={input}
              placeholder="Your curated digest is here…"
              value={form.previewText}
              onChange={(e) => setField("previewText", e.target.value)}
            />
          </div>

          {/* Spotlight */}
          <Section title="Industry Spotlight">
            <Field label="Title" value={form.content.spotlight.title} onChange={(v) => setField("content.spotlight.title", v)} input={input} labelClass={label} />
            <Field label="Image URL" value={form.content.spotlight.image} onChange={(v) => setField("content.spotlight.image", v)} input={input} labelClass={label} />
            <TextArea label="Body (HTML allowed)" value={form.content.spotlight.body} onChange={(v) => setField("content.spotlight.body", v)} input={input} labelClass={label} rows={4} />
          </Section>

          {/* Releases */}
          <Section title="New Releases">
            {form.content.releases.map((r, i) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-4 relative mb-3">
                <button
                  onClick={() => removeRelease(i)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Title" value={r.title} onChange={(v) => updateRelease(i, "title", v)} input={input} labelClass={label} />
                  <Field label="Genre" value={r.genre} onChange={(v) => updateRelease(i, "genre", v)} input={input} labelClass={label} />
                  <Field label="Rating (e.g. ⭐⭐⭐½)" value={r.rating} onChange={(v) => updateRelease(i, "rating", v)} input={input} labelClass={label} />
                  <Field label="Poster URL" value={r.posterUrl} onChange={(v) => updateRelease(i, "posterUrl", v)} input={input} labelClass={label} />
                </div>
                <TextArea label="Our Take" value={r.ourTake} onChange={(v) => updateRelease(i, "ourTake", v)} input={input} labelClass={label} rows={2} />
              </div>
            ))}
            <button
              onClick={addRelease}
              className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"
            >
              <Plus className="w-4 h-4" /> Add release
            </button>
          </Section>

          {/* Editorial */}
          <Section title="The Editorial">
            <Field label="Title" value={form.content.editorial.title} onChange={(v) => setField("content.editorial.title", v)} input={input} labelClass={label} />
            <TextArea label="Body (HTML allowed)" value={form.content.editorial.body} onChange={(v) => setField("content.editorial.body", v)} input={input} labelClass={label} rows={5} />
          </Section>

          {/* Hidden Gem */}
          <Section title="Hidden Gem">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title" value={form.content.hiddenGem.title} onChange={(v) => setField("content.hiddenGem.title", v)} input={input} labelClass={label} />
              <Field label="Year" value={form.content.hiddenGem.year} onChange={(v) => setField("content.hiddenGem.year", v)} input={input} labelClass={label} />
              <Field label="Director" value={form.content.hiddenGem.director} onChange={(v) => setField("content.hiddenGem.director", v)} input={input} labelClass={label} />
              <Field label="Streaming on" value={form.content.hiddenGem.streamingAt} onChange={(v) => setField("content.hiddenGem.streamingAt", v)} input={input} labelClass={label} />
              <Field label="Poster URL" value={form.content.hiddenGem.posterUrl} onChange={(v) => setField("content.hiddenGem.posterUrl", v)} input={input} labelClass={label} />
            </div>
            <TextArea label="Synopsis" value={form.content.hiddenGem.synopsis} onChange={(v) => setField("content.hiddenGem.synopsis", v)} input={input} labelClass={label} rows={3} />
          </Section>

          {/* Frame of the Week */}
          <Section title="Frame of the Week">
            <Field label="Image URL" value={form.content.frameOfWeek.imageUrl} onChange={(v) => setField("content.frameOfWeek.imageUrl", v)} input={input} labelClass={label} />
            <TextArea label="Caption" value={form.content.frameOfWeek.caption} onChange={(v) => setField("content.frameOfWeek.caption", v)} input={input} labelClass={label} rows={2} />
          </Section>

          {/* Scene Breakdown */}
          <Section title="Scene Breakdown">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title" value={form.content.sceneBreakdown.title} onChange={(v) => setField("content.sceneBreakdown.title", v)} input={input} labelClass={label} />
              <Field label="Film" value={form.content.sceneBreakdown.film} onChange={(v) => setField("content.sceneBreakdown.film", v)} input={input} labelClass={label} />
              <Field label="Image URL" value={form.content.sceneBreakdown.imageUrl} onChange={(v) => setField("content.sceneBreakdown.imageUrl", v)} input={input} labelClass={label} />
            </div>
            <TextArea label="Body (HTML allowed)" value={form.content.sceneBreakdown.body} onChange={(v) => setField("content.sceneBreakdown.body", v)} input={input} labelClass={label} rows={4} />
          </Section>

          {/* Trivia */}
          <Section title="Cinephile Trivia">
            <Field label="Question" value={form.content.trivia.question} onChange={(v) => setField("content.trivia.question", v)} input={input} labelClass={label} />
            <TextArea label="Answer" value={form.content.trivia.answer} onChange={(v) => setField("content.trivia.answer", v)} input={input} labelClass={label} rows={3} />
            <Field label="Homework (optional)" value={form.content.trivia.homework} onChange={(v) => setField("content.trivia.homework", v)} input={input} labelClass={label} />
          </Section>

          {/* Coming Next Week */}
          <Section title="Coming Next Week">
            {form.content.comingNextWeek.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  className={input}
                  placeholder={`Item ${i + 1}`}
                  value={item}
                  onChange={(e) => updateNextWeek(i, e.target.value)}
                />
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        comingNextWeek: prev.content.comingNextWeek.filter((_, j) => j !== i),
                      },
                    }))
                  }
                  className="text-slate-500 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  content: {
                    ...prev.content,
                    comingNextWeek: [...prev.content.comingNextWeek, ""],
                  },
                }))
              }
              className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"
            >
              <Plus className="w-4 h-4" /> Add item
            </button>
          </Section>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-semibold hover:bg-amber-300 disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 pb-1 border-b border-slate-700">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, input, labelClass }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        className={input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, input, labelClass, rows = 3 }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        className={`${input} resize-none`}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ── Send confirm modal ────────────────────────────────────────────────────────

function SendConfirmModal({ campaign, token, onClose, onSent }) {
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const handleSend = async () => {
    setSending(true);
    setErr("");
    try {
      const { data } = await axios.post(
        `${API}/campaigns/${campaign.id}/send`,
        {},
        { headers: authHeaders(token) },
      );
      onSent(data.queued);
      onClose();
    } catch (e) {
      setErr(e.response?.data?.error || "Failed to send campaign.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-3">Send campaign?</h2>
        <p className="text-slate-400 text-sm mb-6">
          <strong className="text-white">{campaign.subject}</strong> will be sent to all active{" "}
          <span className="text-amber-400">{campaign.plan?.type}</span> subscribers. This cannot be undone.
        </p>
        {err && (
          <p className="text-sm text-red-400 mb-4 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
            {err}
          </p>
        )}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-400 disabled:opacity-50"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sending ? "Sending…" : "Send now"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Preview modal ─────────────────────────────────────────────────────────────

function PreviewModal({ campaign, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl flex flex-col" style={{ maxHeight: "90vh" }}>
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white truncate">{campaign.subject}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white ml-4">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2">
          <pre className="text-xs text-slate-300 whitespace-pre-wrap break-words">
            {JSON.stringify(campaign.content, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Campaigns ────────────────────────────────────────────────────────────

function CampaignsTab({ token }) {
  const [campaigns, setCampaigns] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [sendTarget, setSendTarget] = useState(null);
  const [previewTarget, setPreviewTarget] = useState(null);
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [c, p] = await Promise.all([
        axios.get(`${API}/campaigns`, { headers: authHeaders(token) }),
        axios.get("https://api.thecineprism.com/api/v1/newsletter/plans"),
      ]);
      setCampaigns(c.data.campaigns);
      setPlans(p.data.plans);
    } catch {}
    setLoading(false);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const onCreated = (campaign) => {
    setCampaigns((prev) => [campaign, ...prev]);
    setToast("Campaign saved as draft.");
    setTimeout(() => setToast(""), 3000);
  };

  const onSent = (count) => {
    load();
    setToast(`Campaign queued for ${count} subscribers.`);
    setTimeout(() => setToast(""), 4000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <div className="mb-4 px-4 py-3 bg-emerald-500/20 border border-emerald-600 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Campaigns</h2>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-amber-300"
        >
          <Plus className="w-4 h-4" /> New campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-20 text-slate-500">No campaigns yet.</div>
      ) : (
        <div className="space-y-3">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge
                    label={c.status}
                    colorClass={STATUS_COLORS[c.status] || "bg-slate-600 text-slate-300"}
                  />
                  <Badge label={c.plan?.type} colorClass="bg-slate-700 text-slate-300" />
                </div>
                <p className="text-white font-semibold truncate">{c.subject}</p>
                {c.status === "SENT" && (
                  <p className="text-xs text-slate-400 mt-1">
                    {c.totalRecipients} recipients · {c.totalSent} sent · {c.totalBounced} bounced
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setPreviewTarget(c)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                {(c.status === "DRAFT" || c.status === "SCHEDULED") && (
                  <button
                    onClick={() => setSendTarget(c)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                  >
                    <Zap className="w-3.5 h-3.5" /> Send
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showEditor && (
        <CampaignEditor
          plans={plans}
          token={token}
          onClose={() => setShowEditor(false)}
          onCreated={onCreated}
        />
      )}
      {sendTarget && (
        <SendConfirmModal
          campaign={sendTarget}
          token={token}
          onClose={() => setSendTarget(null)}
          onSent={onSent}
        />
      )}
      {previewTarget && (
        <PreviewModal campaign={previewTarget} onClose={() => setPreviewTarget(null)} />
      )}
    </div>
  );
}

// ── Tab: Subscribers ──────────────────────────────────────────────────────────

function SubscribersTab({ token }) {
  const [subscribers, setSubscribers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/subscribers`, {
        headers: authHeaders(token),
        params: { page, search: search || undefined, status: status || undefined },
      });
      setSubscribers(data.subscribers);
      setPagination(data.pagination);
    } catch {}
    setLoading(false);
  }, [token, page, search, status]);

  useEffect(() => { setPage(1); }, [search, status]);
  useEffect(() => { load(); }, [load]);

  const handleSearch = (e) => {
    if (e.key === "Enter") load();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          placeholder="Search by email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
        <select
          className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="PAST_DUE">Past Due</option>
          <option value="CANCELED">Canceled</option>
          <option value="UNSUBSCRIBED">Unsubscribed</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-20 text-slate-500">No subscribers found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Plan</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Country</th>
                  <th className="pb-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 pr-4 text-white font-medium">{s.email}</td>
                    <td className="py-3 pr-4 text-slate-300">{s.name || "—"}</td>
                    <td className="py-3 pr-4 text-slate-300">
                      {s.subscriptions[0]?.plan?.name || "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        label={s.status}
                        colorClass={SUB_STATUS_COLORS[s.status] || "bg-slate-700 text-slate-300"}
                      />
                    </td>
                    <td className="py-3 pr-4 text-slate-400">{s.country || "—"}</td>
                    <td className="py-3 text-slate-400">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-5 text-sm text-slate-400">
            <span>{pagination.total} total</span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-1.5 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-white">
                {page} / {pagination.pages}
              </span>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 hover:text-white disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Tab: Stats ────────────────────────────────────────────────────────────────

function StatsTab({ token }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/stats`, { headers: authHeaders(token) })
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-20 text-slate-500">Failed to load stats.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Active Subscribers"
          value={stats.activeSubscribers.toLocaleString()}
          sub={`${stats.totalSubscribers.toLocaleString()} total`}
          icon={Users}
          color="bg-emerald-500/20 text-emerald-400"
        />
        <StatCard
          label="Revenue This Month"
          value={`₹${Number(stats.revenueThisMonth).toLocaleString()}`}
          icon={BarChart2}
          color="bg-amber-500/20 text-amber-400"
        />
        <StatCard
          label="Churn This Month"
          value={stats.churnedThisMonth.toLocaleString()}
          sub="canceled or unsubscribed"
          icon={AlertCircle}
          color="bg-red-500/20 text-red-400"
        />
        <StatCard
          label="Bounce Rate"
          value={`${stats.bounceRate}%`}
          sub="keep below 5% for SES health"
          icon={CheckCircle}
          color={
            stats.bounceRate > 5
              ? "bg-red-500/20 text-red-400"
              : "bg-emerald-500/20 text-emerald-400"
          }
        />
        <StatCard
          label="Total Campaigns"
          value={stats.totalCampaigns.toLocaleString()}
          icon={Send}
          color="bg-blue-500/20 text-blue-400"
        />
      </div>

      {stats.bounceRate > 5 && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 text-red-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Bounce rate is high ({stats.bounceRate}%).</strong> AWS SES may suspend sending above 10%.
            Review recent campaigns for invalid email addresses.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: "campaigns", label: "Campaigns", icon: Send },
  { id: "subscribers", label: "Subscribers", icon: Users },
  { id: "stats", label: "Stats", icon: BarChart2 },
];

export default function NewsletterAdmin() {
  const { token } = useAuth();
  const [tab, setTab] = useState("campaigns");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Newsletter</h1>
          <p className="text-slate-400 text-sm">Manage campaigns, subscribers and delivery stats.</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-slate-800/50 border border-slate-700 rounded-xl p-1 mb-8 w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === id
                  ? "bg-amber-400 text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "campaigns" && <CampaignsTab token={token} />}
        {tab === "subscribers" && <SubscribersTab token={token} />}
        {tab === "stats" && <StatsTab token={token} />}
      </div>
    </div>
  );
}
