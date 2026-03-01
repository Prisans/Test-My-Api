import React, { useState } from 'react';
import { Send, Plus, X } from 'lucide-react';

const RequestPanel = ({ onRequest, loading }) => {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [activeTab, setActiveTab] = useState('Params');
    const [params, setParams] = useState([{ key: '', value: '', enabled: true }]);
    const [headers, setHeaders] = useState([{ key: '', value: '', enabled: true }]);
    const [body, setBody] = useState('');

    const handleSend = () => {
        if (!url) return;
        onRequest({ method, url, params, headers, body });
    };

    const addRow = (setter) => setter((prev) => [...prev, { key: '', value: '', enabled: true }]);
    const updateRow = (setter, index, field, value) => {
        setter((prev) => {
            const next = [...prev];
            next[index][field] = value;
            return next;
        });
    };
    const removeRow = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

    const Table = ({ rows, setter }) => (
        <div className="space-y-2">
            {rows.map((row, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        checked={row.enabled}
                        onChange={(e) => updateRow(setter, i, 'enabled', e.target.checked)}
                        className="accent-primary"
                    />
                    <input
                        placeholder="Key"
                        value={row.key}
                        onChange={(e) => updateRow(setter, i, 'key', e.target.value)}
                        className="flex-1 bg-secondary/50 border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary"
                    />
                    <input
                        placeholder="Value"
                        value={row.value}
                        onChange={(e) => updateRow(setter, i, 'value', e.target.value)}
                        className="flex-1 bg-secondary/50 border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary"
                    />
                    <button onClick={() => removeRow(setter, i)} className="p-1 hover:text-destructive transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
            <button
                onClick={() => addRow(setter)}
                className="flex items-center gap-1 text-xs text-primary hover:underline mt-2"
            >
                <Plus className="h-3 w-3" /> Add Row
            </button>
        </div>
    );

    return (
        <div className="flex-1 flex flex-col p-6 space-y-6">
            <div className="flex gap-2">
                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-bold text-primary outline-none focus:ring-1 focus:ring-primary"
                >
                    {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <input
                    placeholder="https://api.example.com/v1/resource"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary font-mono transition-all"
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !url}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send'}
                    <Send className="h-4 w-4" />
                </button>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex gap-6 border-b border-border mb-4">
                    {['Params', 'Headers', 'Body'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-medium transition-all relative ${
                                activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
                    {activeTab === 'Params' && <Table rows={params} setter={setParams} />}
                    {activeTab === 'Headers' && <Table rows={headers} setter={setHeaders} />}
                    {activeTab === 'Body' && (
                        <textarea
                            placeholder='{"key": "value"}'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full h-full min-h-[150px] bg-secondary/30 border border-border rounded-lg p-4 font-mono text-sm outline-none focus:border-primary/50 resize-none transition-all"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestPanel;
