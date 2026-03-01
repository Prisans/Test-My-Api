import React from 'react';
import { Clock, Trash2, ChevronRight } from 'lucide-react';

const Sidebar = ({ history, onSelect, onDelete }) => {
    const getMethodColor = (method) => {
        const colors = {
            GET: 'text-green-400',
            POST: 'text-yellow-400',
            PUT: 'text-blue-400',
            DELETE: 'text-red-400',
            PATCH: 'text-purple-400'
        };
        return colors[method] || 'text-gray-400';
    };

    return (
        <aside className="w-80 border-r border-border bg-card/30 flex flex-col h-[calc(100vh-3.5rem)]">
            <div className="p-4 border-b border-border flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">History</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-30 px-6 text-center">
                        <Clock className="h-12 w-12 mb-2" />
                        <p className="text-sm">No history yet. Start testing APIs!</p>
                    </div>
                ) : (
                    history.map((item) => (
                        <div
                            key={item._id}
                            className="group p-3 border-b border-border/50 hover:bg-secondary/40 cursor-pointer transition-colors relative"
                            onClick={() => onSelect(item)}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/20 ${getMethodColor(item.method)}`}>
                                    {item.method}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-xs truncate pr-6 font-mono text-muted-foreground">{item.url}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(item._id);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
