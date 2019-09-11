exports.serialize = (<model>, option) => {
    switch(option){
        default:
            return {
            }
    }
};

exports.collection = (<model>Collection, option) => {
    return <model>Collection.map((<model>) => {
        return exports.serialize(<model>, option);
    });
}
