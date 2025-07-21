// utils/productUtils.js

/**
 * ক্যাটাগরি অনুযায়ী প্রডাক্ট গুলো ফিল্টার করে ট্যাবের জন্য ডেটা রিটার্ন করবে
 * @param {Array} products - পুরো প্রডাক্ট লিস্ট
 * @param {Array} categories - যেসব ক্যাটাগরি ট্যাবে দেখাবেন, যেমন ['cakes', 'cookies']
 * @returns {Object} - {'Cakes': [...], 'Cookies': [...], ...} এই ফরম্যাটে
 */
export function prepareTabsData(products, categories) {
  if (!products || products.length === 0) return {};

  const tabsData = {};
  categories.forEach((category) => {
    // প্রথম অক্ষর বড় করে
    const tabName = category.charAt(0).toUpperCase() + category.slice(1);
    tabsData[tabName] = products.filter(p => p.category === category);
  });

  return tabsData;
}
