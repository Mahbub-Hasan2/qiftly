import { useMemo } from "react";

function GroupedMenu({ menu }) {
    const groupedByTag = useMemo(() => {
        const groups = {};

        const children = Array.isArray(menu.children) ? menu.children : [];

        children.forEach((child) => {
            const tag = child.tags?.[0]; // ধরলাম প্রতি child এ একটা ট্যাগ থাকে
            if (tag) {
                if (!groups[tag]) {
                    groups[tag] = [];
                }
                groups[tag].push(child);
            }
        });

        return groups;

    }, [menu.children]);
    return (
        <div className="max-w-7xl mx-auto flex flex-wrap gap-10 p-6">
            {Object.entries(groupedByTag).map(([tagName, items], i) => (
                <div key={i}>
                    
                    <h4 className="font-semibold mb-2">{tagName}</h4>
                    <ul className="space-y-1">
                        {items.map((child, j) => (
                            <li key={j}>
                                <a
                                    href={child.url}
                                    className="text-sm text-gray-600 hover:text-blue-500"
                                >
                                    {child.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
    );
}

export default GroupedMenu;
