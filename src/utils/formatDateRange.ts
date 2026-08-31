export const formatDateRange = (dateRange?: string) => {
    if (!dateRange) {
        return "";
    }

    const [startDate, endDate] = dateRange.split("_");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-");
    };

    const start = formatDate(startDate);

    if (!start) {
        return "";
    }

    if (endDate) {
        const end = formatDate(endDate);

        return end ? `${start}_${end}` : start;
    }

    return start;
};