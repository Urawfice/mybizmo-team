import React from "react";
import "./payout.scss";
function Payout(props) {
  return (
    <div>
      <table class="table" style={{ marginTop: "5%" }}>
        <thead className="table-header-fin">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Gross Salary</th>
            <th scope="col">Other</th>
            <th scope="col">Gross Pay</th>
            <th scope="col">Charges</th>
            <th scope="col">Fees</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Payout;
