import React from 'react';
import '../../index';

class DepartmentTable extends React.Component {
    render() { 
        return (
            <div class="table-responsive">
                <table class="table align-items-center">
                    <thead class="table-dark">
                        <tr>
                            <th class="text-center text-xs font-weight-bold">Department - Pole</th>
                            <th class="text-center text-xs font-weight-bold">Business Unit</th>
                            <th class="text-center text-xs font-weight-bold">Business Line</th>
                            <th class="text-center text-xs font-weight-bold">Status</th>
                            <th class="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">GAS</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">E&T</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">BLE</p>
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
 
export default DepartmentTable;