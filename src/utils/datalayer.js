export const pushDataLayer = (payload) => {
    window.adobeDataLayer = window.adobeDataLayer || [];

    // Get user from sessionStorage
    const user = sessionStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    // Merge user data into event
    const dataWithUser = {
        ...payload,
        user: parsedUser || undefined,
    };
    
    window.adobeDataLayer.push(dataWithUser);
};  