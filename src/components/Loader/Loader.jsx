import React from "react";
import "./Loader.css";

function Loader({
    text = "Loading..."
}) {

    return (
        <div className="common-loader">

            <span className="loader-circle" />

            <span className="loader-text">
                {text}
            </span>

        </div>
    );
}

export default Loader;