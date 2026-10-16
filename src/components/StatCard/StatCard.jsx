import React from "react";

import "./StatCard.css";

function StatCard({
    title,
    value,
    description,
    icon,
    trend,
    trendType = "positive"
}) {

    return (
        <div className="stat-card">

            <div className="stat-card-top">

                <div className="stat-icon">
                    {icon}
                </div>


                {trend && (
                    <span
                        className={
                            `stat-trend ${trendType}`
                        }
                    >
                        {trend}
                    </span>
                )}

            </div>


            <div className="stat-value">
                {value}
            </div>


            <div className="stat-title">
                {title}
            </div>


            {description && (
                <div className="stat-description">
                    {description}
                </div>
            )}

        </div>
    );
}

export default StatCard;