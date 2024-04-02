import "./MealPlanTable.scss";
import { Link } from "react-router-dom";

const MealPlanTable = ({ mealsPlanData }) => {
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return (
        <table className="plan-table">
            <thead>
                <tr>
                    <th>Meal Type</th>
                    {daysOfWeek.map((day) => (<th>{day}</th>))}
                </tr>
            </thead>
            <tbody>
                <td >
                    <tr><div className="plan-table__data plan-table__heading-column" >BREAKFAST</div></tr>
                    <tr><div className="plan-table__data plan-table__heading-column">LUNCH</div></tr>
                    <tr><div className="plan-table__data plan-table__heading-column">DINNER</div></tr>
                </td>
 
                {mealsPlanData.map((dayMeal) => {
                    return (
                        <td key={dayMeal.idMeal}>
                            <tr>
                                <div className="plan-table__data">
                                    <Link className="plan-table__link" to={dayMeal.breakfast[2]} target="_blank">
                                        {dayMeal.breakfast[1]}
                                    </Link>
                                </div>
                            </tr>

                            <tr>
                                <div className="plan-table__data">
                                    <Link className="plan-table__link" to={dayMeal.lunch[2]} target="_blank">
                                        {dayMeal.lunch[1]}
                                    </Link>
                                </div>
                            </tr>
                            <tr>
                                <div className="plan-table__data">
                                    <Link className="plan-table__link" to={dayMeal.dinner[2]} target="_blank">
                                        {dayMeal.dinner[1]}
                                    </Link>
                                </div>
                            </tr>
                        </td>
                    )
                })}
            </tbody>
        </table>
    );
}

export default MealPlanTable;