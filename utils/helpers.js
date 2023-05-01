module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    format_amount: (amount) => {
        // format large numbers with commas
        return parseInt(amount).toLocaleString();
    },
    sort_by_date: (posts) => {
        // Sort posts by date created in descending order
        return posts.sort((a, b) => {
            return new Date(b.date_created) - new Date(a.date_created);
        });
    },
};
