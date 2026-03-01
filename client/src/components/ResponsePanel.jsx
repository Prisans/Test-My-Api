import React from 'react';
import { Terminal, Database, Clock, Server } from 'lucide-react';

const ResponsePanel = ({ response, loading }) => {
    if (loading) {
        return (
            <div className="flex-1 border-t border-border bg-card/10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 animate-pulse opacity-50">
                    <Terminal className="h-12 w-12 text-primary" />
                    <p className="font-mono text-sm">Waiting for response...</p>
                </div>
            </div>
        );
    }

    if (!response) {
        return (
            <div className="flex-1 border-t border-border bg-card/10 flex flex-col items-center justify-center opacity-20">
                <Database className="h-16 w-16 mb-4" />
                <p className="text-xl font-bold">No Response Yet</p>
                <p className="text-sm">Click Send to test your API</p>
            </div>
        );
    }

    const { status, statusText, time, size, data, headers } = response;
    const isError = status >= 400;

    return (
        <div className="flex-1 border-t border-border bg-card/20 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Status:</span>
                        <span className={`text-sm font-bold ${isError ? 'text-destructive' : 'text-green-400'}`}>
                            {status} {statusText}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Time:</span>
                        <span className="text-sm font-bold text-primary">{time} ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Size:</span>
                        <span className="text-sm font-bold text-primary">{(size / 1024).toFixed(2)} KB</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex min-h-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide font-mono text-sm">
                    <div className="mb-4 text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Terminal className="h-3 w-3" /> Response Body
                    </div>
                    <pre className="bg-black/30 p-4 rounded-xl border border-white/5 overflow-x-auto">
                        <code className="text-blue-200">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default ResponsePanel;
