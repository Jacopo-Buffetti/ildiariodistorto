const endpointLists = {
    // AUTHENTICATION
    register: () => "auth/register/",
    // USERS
    getAllUsers: () => "users/list/",
    userById: (userID: string) => `users/${userID}/`,

    // TALES OR STORIES
    addTale: () => "tales/create", // POST
    taleById: (taleID: string) => `tales/${taleID}/`, // PATCH - DELETE - GET
    talesList: (page: number, limit: number) => `tales/?limit=${limit}&page=${page}`
};

export default endpointLists;
