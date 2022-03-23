import React, { PureComponent } from 'react';
import '../../index';

class CustomerTable extends React.Component {
    render() { 
        return (
            <div class="table-responsive">
                <table class="table align-items-center">
                    <thead class="table-primary">
                        <tr>
                            <th class="text-center text-xs font-weight-bold">Customer</th>
                            <th class="text-center text-xs font-weight-bold">SPA partner</th>
                            <th class="text-center text-xs font-weight-bold">Business Unit</th>
                            <th class="text-center text-xs font-weight-bold">Business Line</th>
                            <th class="text-center text-xs font-weight-bold">Pole / Departement</th>
                            <th class="text-center text-xs font-weight-bold">Customer Group</th>
                            <th class="text-center text-xs font-weight-bold">Area</th>
                            <th class="text-center text-xs font-weight-bold">Country</th>
                            <th class="text-center text-xs font-weight-bold">Status</th>
                            <th class="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="align-middle text-center text-sm"> 
                                <p class="text-xs font-weight-bold">New</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold"></p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">E&T</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">GIS.BLE</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">Water</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">New</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">Italy</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">India</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm badge-success">Active</span>
                            </td>
                            <td class="align-middle text-center">
                            <button type="button" class="btn btn-danger btn-circle btn-sm opacity-5">-</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default CustomerTable;