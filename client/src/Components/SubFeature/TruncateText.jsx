import React from 'react';

function TruncateText({ text, maxLength }) {
    function truncate(str, num) {
        return str.length > num ? str.slice(0, num) + "..." : str;
    }

    const truncated = truncate(text, maxLength);

    return (
        <p className="text-description">{truncated}</p>
    );
}

export default TruncateText;
