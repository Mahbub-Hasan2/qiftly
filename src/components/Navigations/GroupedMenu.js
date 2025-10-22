import Link from "next/link";
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


function extractCollectionHandle(url) {
  const match = url.match(/\/collections\/([^\/?#]+)/);
  return match ? match[1] : null;
}

    return (
        <div className="max-w-7xl mx-auto flex flex-wrap gap-10 p-6">
            {Object.entries(groupedByTag).map(([tagName, items], i) => (
                <div key={i}>

                    <h4 className="font-semibold mb-2">{tagName}</h4>
                    <ul className="space-y-1">
                        {items.map((child, j) => (
                            <li key={j}>
                                <Link
                                    href={"/collections/" + extractCollectionHandle(child.url)} // এখানে সম্পুর্ন ওয়েব সাইট ডুমেইন সহ পাত আসে , আমি চাই ডুমেইন নাম কেটে শুধু মাত্রে পাত আসোক , 
                                    className="text-sm text-gray-600 hover:text-blue-500"
                                >
                                    {child.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
    );
}

export default GroupedMenu;
