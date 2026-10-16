export function formatDate(date) {

    if (!date) {
        return "";
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


export function getInitials(name) {

    if (!name) {
        return "";
    }

    const words =
        name.split(" ");

    let initials = "";

    for (const word of words) {

        if (word) {

            initials +=
                word.charAt(0).toUpperCase();
        }

        if (initials.length === 2) {
            break;
        }
    }

    return initials;
}


export function capitalize(value) {

    if (!value) {
        return "";
    }

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );
}