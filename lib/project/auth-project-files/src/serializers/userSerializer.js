exports.serialize = (user, option) => {
    switch(option){
        default:
            return {
                id: user.id,
                name: user.name,
                email: user.email
            }
    }
};

exports.collection = (userCollection, option) => {
    return userCollection.map((user) => {
        return exports.serialize(user, option);
    });
}
