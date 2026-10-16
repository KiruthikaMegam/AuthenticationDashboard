import React from "react";
import "./FormSelect.css";

function FormSelect({
    label,
    name,
    value,
    onChange,
    options = [],
    error = "",
    required = false
}) {

    return (
        <div className="form-select-group">

            <label htmlFor={name}>

                {label}

                {required && (
                    <span className="select-required">
                        *
                    </span>
                )}

            </label>


            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={
                    error
                        ? "form-select select-error"
                        : "form-select"
                }
            >

                <option value="">
                    Select {label}
                </option>


                {options.map((option) => (

                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>

                ))}

            </select>


            {error && (
                <span className="select-error-text">
                    {error}
                </span>
            )}

        </div>
    );
}

export default FormSelect;