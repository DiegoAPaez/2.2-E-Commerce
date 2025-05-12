export const getData = async () => {
    try {
        const response = await fetch("../data/products.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to load products:", error);
        return [];
    }
};
